const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/protocol-scatter.m-Drgxap_P.js","assets/wharfkit-CgoYgCEG.js","assets/vendor-CP16y5pE.js"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { a as getDefaultExportFromCjs } from "./vendor-CP16y5pE.js";
import { U as UInt64, C as Checksum256, a as Checksum512, S as Serializer, B as Bytes, b as Struct, P as PrivateKey, c as ChainId, d as SigningRequest, e as Signature, A as AbstractWalletPlugin, W as WalletPluginMetadata, L as Logo, f as PublicKey, R as ResolvedSigningRequest, g as PermissionLevel, _ as __awaiter, h as __generator, i as __values, j as __spreadArray, k as __read, l as __extends, m as __asyncGenerator, n as __await, o as __asyncValues, p as cancelable, I as IdentityProof, T as TimePointSec, N as Name, q as Transaction, r as UInt32, s as Asset } from "./wharfkit-CgoYgCEG.js";
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/market-alphatest/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled = function(promises$2) {
      return Promise.all(promises$2.map((p) => Promise.resolve(p).then((value$1) => ({
        status: "fulfilled",
        value: value$1
      }), (reason) => ({
        status: "rejected",
        reason
      }))));
    };
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = allSettled(deps.map((dep) => {
      dep = assetsURL(dep);
      if (dep in seen) return;
      seen[dep] = true;
      const isCss = dep.endsWith(".css");
      const cssSelector = isCss ? '[rel="stylesheet"]' : "";
      if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
      const link = document.createElement("link");
      link.rel = isCss ? "stylesheet" : scriptRel;
      if (!isCss) link.as = "script";
      link.crossOrigin = "";
      link.href = dep;
      if (cspNonce) link.setAttribute("nonce", cspNonce);
      document.head.appendChild(link);
      if (isCss) return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
      });
    }));
  }
  function handlePreloadError(err$2) {
    const e$1 = new Event("vite:preloadError", { cancelable: true });
    e$1.payload = err$2;
    window.dispatchEvent(e$1);
    if (!e$1.defaultPrevented) throw err$2;
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
var eventemitter3 = { exports: {} };
var hasRequiredEventemitter3;
function requireEventemitter3() {
  if (hasRequiredEventemitter3) return eventemitter3.exports;
  hasRequiredEventemitter3 = 1;
  (function(module) {
    var has = Object.prototype.hasOwnProperty, prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name2;
      if (this._eventsCount === 0) return names;
      for (name2 in events = this._events) {
        if (has.call(events, name2)) names.push(prefix ? name2.slice(1) : name2);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    {
      module.exports = EventEmitter2;
    }
  })(eventemitter3);
  return eventemitter3.exports;
}
var eventemitter3Exports = requireEventemitter3();
const EventEmitter = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter3Exports);
/**
 * @greymass/buoy v1.0.4
 * https://github.com/greymass/buoy-client
 *
 * @license
 * Copyright (c) 2021 FFF00 Agents AB & Greymass Inc. All Rights Reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 *  1. Redistribution of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 * 
 *  2. Redistribution in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 * 
 *  3. Neither the name of the copyright holder nor the names of its contributors
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
class SocketError extends Error {
  constructor(event) {
    super("Socket error");
    __publicField(this, "event");
    __publicField(this, "code", "E_NETWORK");
    this.event = event;
  }
}
class MessageError extends Error {
  constructor(reason, underlyingError) {
    super(reason);
    __publicField(this, "reason");
    __publicField(this, "underlyingError");
    __publicField(this, "code", "E_MESSAGE");
    this.reason = reason;
    this.underlyingError = underlyingError;
  }
}
const globalBuoy$1 = globalThis || window;
var ListenerEncoding;
(function(ListenerEncoding2) {
  ListenerEncoding2["binary"] = "binary";
  ListenerEncoding2["text"] = "text";
  ListenerEncoding2["json"] = "json";
})(ListenerEncoding || (ListenerEncoding = {}));
class Listener extends EventEmitter {
  constructor(options) {
    super();
    __publicField(this, "url");
    __publicField(this, "active", false);
    __publicField(this, "socket");
    __publicField(this, "timer");
    __publicField(this, "reconnectTimer");
    __publicField(this, "encoding");
    __publicField(this, "WebSocket");
    if (!options.service) {
      throw new Error("Options must include a service url");
    }
    if (!options.channel) {
      throw new Error("Options must include a channel name");
    }
    const baseUrl = options.service.replace(/^http/, "ws").replace(/\/$/, "");
    this.url = `${baseUrl}/${options.channel}?v=2`;
    this.encoding = options.encoding || ListenerEncoding.text;
    this.WebSocket = options.WebSocket || globalBuoy$1.WebSocket;
    if (options.autoConnect !== false) {
      this.connect();
    }
  }
  connect() {
    if (this.active)
      return;
    this.active = true;
    let retries = 0;
    let pingTimer;
    const connect2 = () => {
      const socket = new this.WebSocket(this.url);
      socket.onmessage = (event) => {
        if (typeof Blob !== "undefined" && event.data instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            this.handleMessage(new Uint8Array(reader.result));
          };
          reader.onerror = () => {
            this.emit("error", new MessageError("Could not read message"));
          };
          reader.readAsArrayBuffer(event.data);
        } else if (typeof event.data === "string") {
          this.handleMessage(new TextEncoder().encode(event.data));
        } else if (typeof globalBuoy$1.Buffer !== "undefined" && (event.data instanceof globalBuoy$1.Buffer || Array.isArray(event.data))) {
          let buffer = event.data;
          if (!globalBuoy$1.Buffer.isBuffer(buffer)) {
            buffer = globalBuoy$1.Buffer.concat(buffer);
          }
          this.handleMessage(new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength));
        } else if (event.data instanceof Uint8Array) {
          this.handleMessage(event.data);
        } else if (event.data instanceof ArrayBuffer) {
          this.handleMessage(new Uint8Array(event.data));
        } else {
          this.emit("error", new MessageError("Unhandled event data type"));
        }
      };
      socket.onerror = (event) => {
        if (this.socket === socket && this.active) {
          this.emit("error", new SocketError(event));
        }
      };
      socket.onopen = () => {
        retries = 0;
        this.emit("connect");
      };
      socket.onclose = () => {
        if (this.active) {
          clearTimeout(this.timer);
          this.timer = setTimeout(connect2, backoff(retries++));
        }
        this.socket = void 0;
        clearTimeout(pingTimer);
        if (this.reconnectTimer) {
          clearInterval(this.reconnectTimer);
        }
        this.emit("disconnect");
      };
      this.setupReconnectionTimer();
      const nodeSocket = socket;
      if (typeof nodeSocket.on === "function" && typeof nodeSocket.terminate === "function") {
        nodeSocket.on("ping", () => {
          clearTimeout(pingTimer);
          pingTimer = setTimeout(() => {
            nodeSocket.terminate();
          }, 15 * 1e3);
        });
      }
      this.socket = socket;
    };
    connect2();
  }
  disconnect() {
    this.active = false;
    if (this.socket && (this.socket.readyState === this.WebSocket.OPEN || this.socket.readyState === this.WebSocket.CONNECTING)) {
      this.socket.close(1e3);
    }
  }
  get isConnected() {
    return this.active && this.socket?.readyState == this.WebSocket.OPEN;
  }
  handleMessage(bytes) {
    if (bytes[0] === 66 && bytes[1] === 66 && bytes[2] === 1) {
      this.socket?.send(new Uint8Array([66, 66, 2, bytes[3]]));
      bytes = bytes.subarray(4);
    }
    let message;
    switch (this.encoding) {
      case ListenerEncoding.binary:
        message = bytes;
        break;
      case ListenerEncoding.text:
        message = new TextDecoder().decode(bytes);
        break;
      case ListenerEncoding.json: {
        try {
          message = JSON.parse(new TextDecoder().decode(bytes));
        } catch (error2) {
          this.emit("error", new MessageError("Unable to decode JSON", error2));
          return;
        }
      }
    }
    this.emit("message", message);
  }
  setupReconnectionTimer() {
    this.reconnectTimer = setInterval(() => {
      this.socket?.close(1e3);
    }, 10 * 60 * 1e3);
  }
}
function backoff(tries) {
  return Math.min(Math.pow(tries * 7, 2), 5 * 1e3);
}
function receive(options, ctx) {
  return new Promise((resolve, reject) => {
    const listener = new Listener({ ...options, autoConnect: true });
    let timer;
    let lastError;
    const done = (error2, message) => {
      clearTimeout(timer);
      if (error2) {
        reject(error2);
      } else {
        resolve(message);
      }
      listener.disconnect();
    };
    if (options.timeout) {
      timer = setTimeout(() => {
        done(new MessageError("Timed out", lastError));
      }, options.timeout);
    }
    listener.on("error", (error2) => {
      if (!(error2 instanceof SocketError)) {
        done(error2);
      } else {
        lastError = error2;
      }
    });
    listener.once("message", (message) => {
      done(void 0, message);
    });
  });
}
const globalBuoy = globalThis || window;
var SendResult;
(function(SendResult2) {
  SendResult2["buffered"] = "buffered";
  SendResult2["delivered"] = "delivered";
})(SendResult || (SendResult = {}));
async function send(message, options) {
  const fetch2 = options.fetch || globalBuoy.fetch;
  const baseUrl = options.service.replace(/^ws/, "http").replace(/\/$/, "");
  const url = `${baseUrl}/${options.channel}`;
  const headers = {};
  if (options.requireDelivery) {
    if (!options.timeout) {
      throw new Error("requireDelivery can only be used with timeout");
    }
    headers["X-Buoy-Wait"] = `${Math.ceil(options.timeout / 1e3)}`;
  } else if (options.timeout) {
    headers["X-Buoy-Soft-Wait"] = `${Math.ceil(options.timeout / 1e3)}`;
  }
  let body;
  if (typeof message === "string" || message instanceof Uint8Array) {
    body = message;
  } else {
    body = JSON.stringify(message);
  }
  const response = await fetch2(url, { method: "POST", body, headers });
  if (Math.floor(response.status / 100) !== 2) {
    if (response.status === 408) {
      throw new Error("Unable to deliver message");
    } else if (response.status === 410) {
      throw new Error("Request cancelled");
    } else {
      throw new Error(`Unexpected status code ${response.status}`);
    }
  }
  return response.headers.get("X-Buoy-Delivery") || SendResult.buffered;
}
/**
 * @wharfkit/sealed-messages v1.1.0
 * https://github.com/wharfkit/sealed-messages
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
function __decorate$2(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let SealedMessage = class SealedMessage2 extends Struct {
};
__decorate$2([
  Struct.field("public_key")
], SealedMessage.prototype, "from", void 0);
__decorate$2([
  Struct.field("uint64")
], SealedMessage.prototype, "nonce", void 0);
__decorate$2([
  Struct.field("bytes")
], SealedMessage.prototype, "ciphertext", void 0);
__decorate$2([
  Struct.field("uint32")
], SealedMessage.prototype, "checksum", void 0);
SealedMessage = __decorate$2([
  Struct.type("sealed_message")
], SealedMessage);
async function createSymmetricKey(secret, nonce) {
  const key = Checksum512.hash(Serializer.encode({ object: nonce }).appending(secret.array));
  return await crypto.subtle.importKey("raw", key.array.slice(0, 32), { name: "AES-CBC" }, false, [
    "encrypt",
    "decrypt"
  ]);
}
function createIV(nonce, secret) {
  return Checksum512.hash(Serializer.encode({ object: nonce }).appending(secret.array));
}
async function encryptMessage(iv, symmetricKey, message) {
  return Bytes.from(await crypto.subtle.encrypt({ name: "AES-CBC", iv: iv.array.slice(32, 48) }, symmetricKey, Bytes.from(message, "utf8").array));
}
async function sealedMessagePayload(message, privateKey, publicKey, nonce) {
  if (!nonce) {
    nonce = UInt64.random();
  }
  const secret = privateKey.sharedSecret(publicKey);
  const iv = createIV(nonce, secret);
  const symmetricKey = await createSymmetricKey(secret, nonce);
  const ciphertext = await encryptMessage(iv, symmetricKey, message);
  const checksumView = new DataView(Checksum256.hash(iv.array).array.buffer);
  const checksum = checksumView.getUint32(0, true);
  return new SealedMessage({
    from: privateKey.toPublic(),
    nonce,
    ciphertext,
    checksum
  });
}
/**
 * @wharfkit/protocol-esr v1.5.0
 * https://github.com/wharfkit/protocol-esr
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
function __decorate$1(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
typeof SuppressedError === "function" ? SuppressedError : function(error2, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error2, e.suppressed = suppressed, e;
};
let LinkCreate = class LinkCreate2 extends Struct {
};
__decorate$1([
  Struct.field("name")
], LinkCreate.prototype, "session_name", void 0);
__decorate$1([
  Struct.field("public_key")
], LinkCreate.prototype, "request_key", void 0);
__decorate$1([
  Struct.field("string", { extension: true })
], LinkCreate.prototype, "user_agent", void 0);
LinkCreate = __decorate$1([
  Struct.type("link_create")
], LinkCreate);
let LinkInfo = class LinkInfo2 extends Struct {
};
__decorate$1([
  Struct.field("time_point_sec")
], LinkInfo.prototype, "expiration", void 0);
LinkInfo = __decorate$1([
  Struct.type("link_info")
], LinkInfo);
let BuoyMessage = class BuoyMessage2 extends Struct {
};
__decorate$1([
  Struct.field("public_key")
], BuoyMessage.prototype, "from", void 0);
__decorate$1([
  Struct.field("uint64")
], BuoyMessage.prototype, "nonce", void 0);
__decorate$1([
  Struct.field("bytes")
], BuoyMessage.prototype, "ciphertext", void 0);
__decorate$1([
  Struct.field("uint32")
], BuoyMessage.prototype, "checksum", void 0);
BuoyMessage = __decorate$1([
  Struct.type("buoy_message")
], BuoyMessage);
let BuoySession = class BuoySession2 extends Struct {
};
__decorate$1([
  Struct.field("name")
], BuoySession.prototype, "session_name", void 0);
__decorate$1([
  Struct.field("public_key")
], BuoySession.prototype, "request_key", void 0);
__decorate$1([
  Struct.field("string", { extension: true })
], BuoySession.prototype, "user_agent", void 0);
BuoySession = __decorate$1([
  Struct.type("buoy_session")
], BuoySession);
let BuoyInfo = class BuoyInfo2 extends Struct {
};
__decorate$1([
  Struct.field("time_point_sec")
], BuoyInfo.prototype, "expiration", void 0);
BuoyInfo = __decorate$1([
  Struct.type("buoy_info")
], BuoyInfo);
async function waitForCallback(callbackArgs, buoyWs, t) {
  const callbackResponse = await receive({ ...callbackArgs, WebSocket: buoyWs || WebSocket });
  if (!callbackResponse) {
    throw new Error(callbackResponse.rejected);
  }
  if (typeof callbackResponse.rejected === "string") {
    throw new Error(callbackResponse.rejected);
  }
  const payload = JSON.parse(callbackResponse);
  if (payload.sa === void 0 || payload.sp === void 0 || payload.cid === void 0) {
    throw new Error(t("error.cancelled", { default: "The request was cancelled from Anchor." }));
  }
  return payload;
}
function uuid() {
  let uuid2 = "", ii;
  const chars = "0123456789abcdef";
  for (ii = 0; ii < 36; ii += 1) {
    switch (ii) {
      case 8:
      case 13:
      case 18:
      case 23:
        uuid2 += "-";
        break;
      case 14:
        uuid2 += "4";
        break;
      case 19:
        uuid2 += chars[Math.random() * 4 | 0 + 8];
        break;
      default:
        uuid2 += chars[Math.random() * 16 | 0];
    }
  }
  return uuid2;
}
function generateReturnUrl$1() {
  if (isAppleHandheld$1() && isReactNativeApp$1()) {
    return void 0;
  }
  if (isChromeiOS$1()) {
    return "googlechrome://";
  }
  if (isFirefoxiOS$1()) {
    return "firefox:://";
  }
  if (isAppleHandheld$1() && isBrave$1()) {
    return "brave://";
  }
  if (isAppleHandheld$1()) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let rv = window.location.href.split("#")[0] + "#";
    for (let i = 0; i < 8; i++) {
      rv += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return rv;
  }
  if (isAndroid$1() && isFirefox$1()) {
    return "android-app://org.mozilla.firefox";
  }
  if (isAndroid$1() && isEdge$1()) {
    return "android-app://com.microsoft.emmx";
  }
  if (isAndroid$1() && isOpera$1()) {
    return "android-app://com.opera.browser";
  }
  if (isAndroid$1() && isBrave$1()) {
    return "android-app://com.brave.browser";
  }
  if (isAndroid$1() && isAndroidWebView$1()) {
    return "android-app://webview";
  }
  if (isAndroid$1() && isChromeMobile$1()) {
    return "android-app://com.android.chrome";
  }
  return window.location.href;
}
function isAppleHandheld$1() {
  return /iP(ad|od|hone)/i.test(navigator.userAgent);
}
function isChromeiOS$1() {
  return /CriOS/.test(navigator.userAgent);
}
function isChromeMobile$1() {
  return /Chrome\/[.0-9]* Mobile/i.test(navigator.userAgent);
}
function isFirefox$1() {
  return /Firefox/i.test(navigator.userAgent);
}
function isFirefoxiOS$1() {
  return /FxiOS/.test(navigator.userAgent);
}
function isOpera$1() {
  return /OPR/.test(navigator.userAgent) || /Opera/.test(navigator.userAgent);
}
function isEdge$1() {
  return /Edg/.test(navigator.userAgent);
}
function isBrave$1() {
  return navigator["brave"] && typeof navigator["brave"].isBrave === "function";
}
function isAndroid$1() {
  return /Android/.test(navigator.userAgent);
}
function isReactNativeApp$1() {
  return !!window.ReactNativeWebView;
}
function isAndroidWebView$1() {
  return /wv/.test(navigator.userAgent) || /Android/.test(navigator.userAgent) && isReactNativeApp$1();
}
function isKnownMobile() {
  return isAppleHandheld$1() || isChromeiOS$1() || isChromeMobile$1() || isFirefoxiOS$1() || isAndroid$1() || isAndroidWebView$1();
}
async function createIdentityRequest(context, buoyUrl) {
  const privateKey = PrivateKey.generate("K1");
  const requestKey = privateKey.toPublic();
  const createInfo = BuoySession.from({
    session_name: context.appName,
    request_key: requestKey,
    user_agent: getUserAgent()
  });
  const isMultiChain = !(context.chain || context.chains.length === 1);
  const callbackChannel = prepareCallbackChannel(buoyUrl);
  const chainId = isMultiChain ? null : context.chain ? ChainId.from(context.chain.id.array) : null;
  const chainIds = isMultiChain ? context.chains.map((c) => ChainId.from(c.id.array)) : [];
  const request = SigningRequest.identity({
    callback: prepareCallback(callbackChannel),
    scope: String(context.appName),
    chainId,
    chainIds,
    info: {
      link: createInfo,
      scope: String(context.appName)
    }
  }, context.esrOptions);
  const sameDeviceRequest = request.clone();
  if (typeof window !== "undefined") {
    const returnUrl = generateReturnUrl$1();
    sameDeviceRequest.setInfoKey("same_device", true);
    if (returnUrl !== void 0) {
      sameDeviceRequest.setInfoKey("return_path", returnUrl);
    }
  }
  return {
    callback: callbackChannel,
    request,
    sameDeviceRequest,
    requestKey,
    privateKey
  };
}
function setTransactionCallback(request, buoyUrl) {
  const callback = prepareCallbackChannel(buoyUrl);
  request.setCallback(`${callback.service}/${callback.channel}`, true);
  return callback;
}
function getUserAgent() {
  const version2 = "1.5.0";
  let agent = `@wharfkit/protocol-esr ${version2}`;
  if (typeof navigator !== "undefined") {
    agent += " " + navigator.userAgent;
  }
  return agent;
}
function prepareCallback(callbackChannel) {
  const { service, channel } = callbackChannel;
  return {
    url: `${service}/${channel}`,
    background: true
  };
}
function prepareCallbackChannel(buoyUrl) {
  return {
    service: buoyUrl,
    channel: uuid()
  };
}
async function sealMessage(message, privateKey, publicKey, nonce) {
  return sealedMessagePayload(message, privateKey, publicKey, nonce);
}
async function verifyLoginCallbackResponse(callbackResponse, context) {
  if (!callbackResponse.sig || callbackResponse.sig.length === 0) {
    throw new Error("Invalid response, must have at least one signature");
  }
  let chain;
  if (!context.chain && context.chains.length > 1) {
    if (!callbackResponse.cid) {
      throw new Error("Multi chain response payload must specify resolved chain id (cid)");
    }
  } else {
    chain = context.chain || context.chains[0];
    if (callbackResponse.cid && String(chain.id) !== callbackResponse.cid) {
      throw new Error("Got response for wrong chain id");
    }
  }
}
function extractSignaturesFromCallback(payload) {
  const signatures = [];
  let index = 0;
  let sig = payload.sig;
  while (sig) {
    signatures.push(String(sig));
    sig = payload[`sig${index}`];
    index++;
  }
  return [...new Set(signatures)].map((s) => Signature.from(s));
}
function isCallback$1(object) {
  return "tx" in object;
}
/**
 * @wharfkit/wallet-plugin-anchor v1.6.0
 * https://github.com/wharfkit/wallet-plugin-anchor
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
var login$1$1 = {
  title: "Connect with Anchor",
  body: "Scan with Anchor on your mobile device or click the button below to open on this device.",
  link: "Launch Anchor"
};
var transact$1$1 = {
  title: "Complete using Anchor",
  body: 'Please open your Anchor Wallet on "{{channelName}}" to review and approve this transaction.',
  label: "Sign manually or with another device",
  link: "Trigger Manually",
  "await": "Waiting for response from Anchor"
};
var error$1$1 = {
  expired: "The request expired, please try again.",
  invalid_response: "Invalid response from Anchor, must contain link_ch, link_key, link_name and cid flags.",
  not_completed: "The request was not completed.",
  cancelled: "The request was cancelled from Anchor."
};
var en$1 = {
  login: login$1$1,
  transact: transact$1$1,
  error: error$1$1
};
var ko$1 = {};
var login$4 = {
  link: "启动Anchor",
  body: "在您的设备上使用Anchor扫描或者点击下方按钮打开。",
  title: "连接Anchor"
};
var error$4 = {
  cancelled: "请求已从Anchor取消。",
  not_completed: "此请求未完成。",
  invalid_response: "无效的Anchor响应，必须包含link_ch, link_key, link_name和cid标识符。",
  expired: "请求已过期，请重试。"
};
var transact$4 = {
  "await": "等待Anchor响应",
  link: "手动触发",
  label: "手动或使用其他设备签约",
  body: '请在"{{channelName}}"上打开您的Anchor钱包以浏览并批准此交易。',
  title: "完成使用Anchor"
};
var zh_hans$1 = {
  login: login$4,
  error: error$4,
  transact: transact$4
};
var zh_hant$1 = {};
var defaultTranslations$1 = {
  en: en$1,
  ko: ko$1,
  "zh-Hans": zh_hans$1,
  "zh-Hant": zh_hant$1
};
class WalletPluginAnchor extends AbstractWalletPlugin {
  constructor(options) {
    super();
    this.id = "anchor";
    this.translations = defaultTranslations$1;
    this.config = {
      // Should the user interface display a chain selector?
      requiresChainSelect: false,
      // Should the user interface display a permission selector?
      requiresPermissionSelect: false
    };
    this.metadata = WalletPluginMetadata.from({
      name: "Anchor",
      description: "",
      logo: Logo.from({
        dark: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS40NCwgMCwgMCwgMS40NCwgLTguNTAxOTI1LCAtNTcuMDc0NTcpIiBzdHlsZT0iIj4KICAgIDx0aXRsZT5XaGl0ZTwvdGl0bGU+CiAgICA8Y2lyY2xlIGN4PSI5NC43OTMiIGN5PSIxMjguNTI0IiByPSI4MCIgZmlsbD0iI0ZCRkRGRiIvPgogICAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0gOTQuNzk5IDc4LjUyNCBDIDk3LjA5OCA3OC41MjQgOTkuMTk1IDc5LjgzNyAxMDAuMTk4IDgxLjkwNiBMIDEyNC4yMDQgMTMxLjQwNiBMIDEyNC43NDYgMTMyLjUyNCBMIDExMS40MDkgMTMyLjUyNCBMIDEwNy41MyAxMjQuNTI0IEwgODIuMDY5IDEyNC41MjQgTCA3OC4xODkgMTMyLjUyNCBMIDY0Ljg1MyAxMzIuNTI0IEwgNjUuMzk1IDEzMS40MDYgTCA4OS40MDEgODEuOTA2IEMgOTAuNDA0IDc5LjgzNyA5Mi41MDEgNzguNTI0IDk0Ljc5OSA3OC41MjQgWiBNIDg2LjkxOSAxMTQuNTI0IEwgMTAyLjY4IDExNC41MjQgTCA5NC43OTkgOTguMjc0IEwgODYuOTE5IDExNC41MjQgWiBNIDExMi43OTMgMTQ5LjUyNCBMIDEyNC43OTggMTQ5LjUyNCBDIDEyNC40MzcgMTY1LjY3NiAxMTEuMDY3IDE3OC41MjQgOTQuNzk5IDE3OC41MjQgQyA3OC41MzIgMTc4LjUyNCA2NS4xNjIgMTY1LjY3NiA2NC44MDEgMTQ5LjUyNCBMIDc2LjgwNiAxNDkuNTI0IEMgNzcuMDg3IDE1Ni44NzggODEuOTc0IDE2My4xNTUgODguNzkzIDE2NS41MiBMIDg4Ljc5MyAxNDEuNTI0IEMgODguNzkzIDEzOC4yMSA5MS40OCAxMzUuNTI0IDk0Ljc5MyAxMzUuNTI0IEMgOTguMTA3IDEzNS41MjQgMTAwLjc5MyAxMzguMjEgMTAwLjc5MyAxNDEuNTI0IEwgMTAwLjc5MyAxNjUuNTI0IEMgMTA3LjYyIDE2My4xNjIgMTEyLjUxMSAxNTYuODgzIDExMi43OTMgMTQ5LjUyNCBaIiBmaWxsPSIjMzY1MEEyIi8+CiAgPC9nPgo8L3N2Zz4=",
        light: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDE2MCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjgwIiBjeT0iODAiIHI9IjgwIiBmaWxsPSIjMzY1MEEyIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNODAuMDA2MyAzMEM4Mi4zMDUxIDMwIDg0LjQwMTkgMzEuMzEzNCA4NS40MDUgMzMuMzgxOEwxMDkuNDExIDgyLjg4MjJMMTA5Ljk1MyA4NEg5Ni42MTYzTDkyLjczNjYgNzZINjcuMjc1OUw2My4zOTYxIDg0SDUwLjA1OTRMNTAuNjAxNyA4Mi44ODE4TDc0LjYwNzcgMzMuMzgxOEM3NS42MTA4IDMxLjMxMzQgNzcuNzA3NSAzMCA4MC4wMDYzIDMwWk03Mi4xMjU2IDY2SDg3Ljg4N0w4MC4wMDYzIDQ5Ljc1MDFMNzIuMTI1NiA2NlpNOTcuOTk5NSAxMDFIMTEwLjAwNUMxMDkuNjQ0IDExNy4xNTIgOTYuMjczOCAxMzAgODAuMDA2MyAxMzBDNjMuNzM4OCAxMzAgNTAuMzY4NiAxMTcuMTUyIDUwLjAwNzggMTAxSDYyLjAxMzFDNjIuMjk0MSAxMDguMzU0IDY3LjE4MDQgMTE0LjYzMSA3NC4wMDAzIDExNi45OTZWOTNDNzQuMDAwMyA4OS42ODYzIDc2LjY4NjYgODcgODAuMDAwMyA4N0M4My4zMTQgODcgODYuMDAwMyA4OS42ODYzIDg2LjAwMDMgOTNWMTE3QzkyLjgyNjUgMTE0LjYzOCA5Ny43MTgzIDEwOC4zNTkgOTcuOTk5NSAxMDFaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K"
      }),
      homepage: "https://greymass.com/anchor",
      download: "https://greymass.com/anchor/download"
    });
    this.buoyUrl = options?.buoyUrl || "https://cb.anchor.link";
    this.buoyWs = options?.buoyWs;
  }
  /**
   * Performs the wallet logic required to login and return the chain and permission level to use.
   *
   * @param options WalletPluginLoginOptions
   * @returns Promise<WalletPluginLoginResponse>
   */
  login(context) {
    return new Promise((resolve, reject) => {
      this.handleLogin(context).then((response) => {
        resolve(response);
      }).catch((error2) => {
        reject(error2);
      });
    });
  }
  async handleLogin(context) {
    if (!context.ui) {
      throw new Error("No UI available");
    }
    const t = context.ui.getTranslate(this.id);
    const { callback, request, sameDeviceRequest, requestKey, privateKey } = await createIdentityRequest(context, this.buoyUrl);
    const elements = [
      {
        type: "link",
        label: t("login.link", { default: "Launch Anchor" }),
        data: {
          href: sameDeviceRequest.encode(true, false, "esr:"),
          label: t("login.link", { default: "Launch Anchor" }),
          variant: "primary"
        }
      }
    ];
    if (!isKnownMobile()) {
      elements.unshift({
        type: "qr",
        data: request.encode(true, false, "esr:")
      });
    }
    window.location.href = sameDeviceRequest.encode(true, false, "esr:");
    const promptResponse = context.ui?.prompt({
      title: t("login.title", { default: "Connect with Anchor" }),
      body: t("login.body", {
        default: "Scan with Anchor on your mobile device or click the button below to open on this device."
      }),
      elements
    });
    promptResponse.catch(() => {
      console.info("Modal closed");
    });
    const callbackResponse = await waitForCallback(callback, this.buoyWs, t);
    verifyLoginCallbackResponse(callbackResponse, context);
    if (!callbackResponse.cid || !callbackResponse.sa || !callbackResponse.sp) {
      throw new Error("Invalid callback response");
    }
    if (callbackResponse.link_ch && callbackResponse.link_key && callbackResponse.link_name) {
      this.data.requestKey = requestKey;
      this.data.privateKey = privateKey;
      this.data.signerKey = callbackResponse.link_key && PublicKey.from(callbackResponse.link_key);
      this.data.channelUrl = callbackResponse.link_ch;
      this.data.channelName = callbackResponse.link_name;
      try {
        if (callbackResponse.link_meta) {
          const metadata = JSON.parse(callbackResponse.link_meta);
          this.data.sameDevice = metadata.sameDevice;
          this.data.launchUrl = metadata.launchUrl;
          this.data.triggerUrl = metadata.triggerUrl;
        }
      } catch (e) {
      }
    }
    const resolvedResponse = await ResolvedSigningRequest.fromPayload(callbackResponse, context.esrOptions);
    const identityProof = resolvedResponse.getIdentityProof(callbackResponse.sig);
    return {
      chain: Checksum256.from(callbackResponse.cid),
      permissionLevel: PermissionLevel.from({
        actor: callbackResponse.sa,
        permission: callbackResponse.sp
      }),
      identityProof
    };
  }
  /**
   * Performs the wallet logic required to sign a transaction and return the signature.
   *
   * @param chain ChainDefinition
   * @param resolved ResolvedSigningRequest
   * @returns Promise<Signature>
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sign(resolved, context) {
    return this.handleSigningRequest(resolved, context);
  }
  async handleSigningRequest(resolved, context) {
    if (!context.ui) {
      throw new Error("No UI available");
    }
    const t = context.ui.getTranslate(this.id);
    const expiration = resolved.transaction.expiration.toDate();
    const now = /* @__PURE__ */ new Date();
    const expiresIn = Math.floor(expiration.getTime() - now.getTime());
    const modifiedRequest = await context.createRequest({ transaction: resolved.transaction });
    modifiedRequest.setInfoKey("link", LinkInfo.from({
      expiration
    }));
    const callback = setTransactionCallback(modifiedRequest, this.buoyUrl);
    const request = modifiedRequest.encode(true, false);
    const isSameDevice = this.data.sameDevice !== false;
    const sameDeviceRequest = modifiedRequest.clone();
    const returnUrl = generateReturnUrl$1();
    sameDeviceRequest.setInfoKey("same_device", true);
    if (returnUrl) {
      sameDeviceRequest.setInfoKey("return_path", returnUrl);
    }
    if (this.data.sameDevice) {
      if (this.data.launchUrl) {
        window.location.href = this.data.launchUrl;
      } else if (isAppleHandheld$1()) {
        window.location.href = "anchor://link";
      }
    }
    const signManually = () => {
      context.ui?.prompt({
        title: t("transact.sign_manually.title", { default: "Sign manually" }),
        body: t("transact.sign_manually.body", {
          default: "Scan the QR-code with Anchor on another device or use the button to open it here."
        }),
        elements: [
          {
            type: "qr",
            data: String(request)
          },
          {
            type: "link",
            label: t("transact.sign_manually.link.title", { default: "Open Anchor" }),
            data: {
              href: String(sameDeviceRequest),
              label: t("transact.sign_manually.link.title", { default: "Open Anchor" })
            }
          }
        ]
      });
    };
    const promptPromise = context.ui.prompt({
      title: t("transact.title", { default: "Complete using Anchor" }),
      body: t("transact.body", {
        channelName: this.data.channelName,
        default: `Please open your Anchor Wallet on "${this.data.channelName}" to review and approve this transaction.`
      }),
      elements: [
        {
          type: "countdown",
          data: {
            label: t("transact.await", { default: "Waiting for response from Anchor" }),
            end: expiration.toISOString()
          }
        },
        {
          type: "button",
          label: t("transact.label", { default: "Sign manually or with another device" }),
          data: {
            onClick: isSameDevice ? () => window.location.href = sameDeviceRequest.encode() : signManually,
            label: t("transact.label", {
              default: "Sign manually or with another device"
            })
          }
        }
      ]
    });
    const timer = setTimeout(() => {
      if (!context.ui) {
        throw new Error("No UI available");
      }
      promptPromise.cancel(t("error.expired", { default: "The request expired, please try again." }));
    }, expiresIn);
    promptPromise.catch(() => clearTimeout(timer));
    const callbackPromise = waitForCallback(callback, this.buoyWs, t);
    if (this.data.channelUrl) {
      const service = new URL(this.data.channelUrl).origin;
      const channel = new URL(this.data.channelUrl).pathname.substring(1);
      const sealedMessage = await sealMessage((this.data.sameDevice ? sameDeviceRequest : modifiedRequest).encode(true, false, "esr:"), PrivateKey.from(this.data.privateKey), PublicKey.from(this.data.signerKey));
      send(Serializer.encode({ object: sealedMessage }).array, {
        service,
        channel
      });
    } else {
      window.location.href = sameDeviceRequest.encode();
    }
    const callbackResponse = await Promise.race([callbackPromise, promptPromise]).finally(() => {
      clearTimeout(timer);
    });
    const wasSuccessful = isCallback$1(callbackResponse) && extractSignaturesFromCallback(callbackResponse).length > 0;
    if (wasSuccessful) {
      const resolvedRequest = await ResolvedSigningRequest.fromPayload(callbackResponse, context.esrOptions);
      return {
        signatures: extractSignaturesFromCallback(callbackResponse),
        resolved: resolvedRequest
      };
    }
    const errorString = t("error.not_completed", { default: "The request was not completed." });
    promptPromise.cancel(errorString);
    throw new Error(errorString);
  }
}
const byteToHex$1 = [];
for (let i = 0; i < 256; ++i) {
  byteToHex$1.push((i + 256).toString(16).slice(1));
}
function unsafeStringify$1(arr, offset = 0) {
  return (byteToHex$1[arr[offset + 0]] + byteToHex$1[arr[offset + 1]] + byteToHex$1[arr[offset + 2]] + byteToHex$1[arr[offset + 3]] + "-" + byteToHex$1[arr[offset + 4]] + byteToHex$1[arr[offset + 5]] + "-" + byteToHex$1[arr[offset + 6]] + byteToHex$1[arr[offset + 7]] + "-" + byteToHex$1[arr[offset + 8]] + byteToHex$1[arr[offset + 9]] + "-" + byteToHex$1[arr[offset + 10]] + byteToHex$1[arr[offset + 11]] + byteToHex$1[arr[offset + 12]] + byteToHex$1[arr[offset + 13]] + byteToHex$1[arr[offset + 14]] + byteToHex$1[arr[offset + 15]]).toLowerCase();
}
let getRandomValues$1;
const rnds8$1 = new Uint8Array(16);
function rng$1() {
  if (!getRandomValues$1) {
    if (typeof crypto === "undefined" || !crypto.getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
    getRandomValues$1 = crypto.getRandomValues.bind(crypto);
  }
  return getRandomValues$1(rnds8$1);
}
const randomUUID$1 = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native$1 = { randomUUID: randomUUID$1 };
function v4$1(options, buf, offset) {
  if (native$1.randomUUID && !buf && !options) {
    return native$1.randomUUID();
  }
  options = options || {};
  const rnds = options.random ?? options.rng?.() ?? rng$1();
  if (rnds.length < 16) {
    throw new Error("Random bytes length must be >= 16");
  }
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    if (offset < 0 || offset + 16 > buf.length) {
      throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
    }
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify$1(rnds);
}
const AWS_CLOUDWATCH_CATEGORY$1 = "Logging";
const USER_AGENT_HEADER$1 = "x-amz-user-agent";
const NO_HUBCALLBACK_PROVIDED_EXCEPTION$1 = "NoHubcallbackProvidedException";
var LogType$1;
(function(LogType2) {
  LogType2["DEBUG"] = "DEBUG";
  LogType2["ERROR"] = "ERROR";
  LogType2["INFO"] = "INFO";
  LogType2["WARN"] = "WARN";
  LogType2["VERBOSE"] = "VERBOSE";
  LogType2["NONE"] = "NONE";
})(LogType$1 || (LogType$1 = {}));
const LOG_LEVELS$1 = {
  VERBOSE: 1,
  DEBUG: 2,
  INFO: 3,
  WARN: 4,
  ERROR: 5,
  NONE: 6
};
let ConsoleLogger$1 = class ConsoleLogger {
  /**
   * @constructor
   * @param {string} name - Name of the logger
   */
  constructor(name2, level = LogType$1.WARN) {
    this.name = name2;
    this.level = level;
    this._pluggables = [];
  }
  _padding(n) {
    return n < 10 ? "0" + n : "" + n;
  }
  _ts() {
    const dt = /* @__PURE__ */ new Date();
    return [this._padding(dt.getMinutes()), this._padding(dt.getSeconds())].join(":") + "." + dt.getMilliseconds();
  }
  configure(config2) {
    if (!config2)
      return this._config;
    this._config = config2;
    return this._config;
  }
  /**
   * Write log
   * @method
   * @memeberof Logger
   * @param {LogType|string} type - log type, default INFO
   * @param {string|object} msg - Logging message or object
   */
  _log(type, ...msg) {
    let loggerLevelName = this.level;
    if (ConsoleLogger.LOG_LEVEL) {
      loggerLevelName = ConsoleLogger.LOG_LEVEL;
    }
    if (typeof window !== "undefined" && window.LOG_LEVEL) {
      loggerLevelName = window.LOG_LEVEL;
    }
    const loggerLevel = LOG_LEVELS$1[loggerLevelName];
    const typeLevel = LOG_LEVELS$1[type];
    if (!(typeLevel >= loggerLevel)) {
      return;
    }
    let log = console.log.bind(console);
    if (type === LogType$1.ERROR && console.error) {
      log = console.error.bind(console);
    }
    if (type === LogType$1.WARN && console.warn) {
      log = console.warn.bind(console);
    }
    if (ConsoleLogger.BIND_ALL_LOG_LEVELS) {
      if (type === LogType$1.INFO && console.info) {
        log = console.info.bind(console);
      }
      if (type === LogType$1.DEBUG && console.debug) {
        log = console.debug.bind(console);
      }
    }
    const prefix = `[${type}] ${this._ts()} ${this.name}`;
    let message = "";
    if (msg.length === 1 && typeof msg[0] === "string") {
      message = `${prefix} - ${msg[0]}`;
      log(message);
    } else if (msg.length === 1) {
      message = `${prefix} ${msg[0]}`;
      log(prefix, msg[0]);
    } else if (typeof msg[0] === "string") {
      let obj = msg.slice(1);
      if (obj.length === 1) {
        obj = obj[0];
      }
      message = `${prefix} - ${msg[0]} ${obj}`;
      log(`${prefix} - ${msg[0]}`, obj);
    } else {
      message = `${prefix} ${msg}`;
      log(prefix, msg);
    }
    for (const plugin of this._pluggables) {
      const logEvent = { message, timestamp: Date.now() };
      plugin.pushLogs([logEvent]);
    }
  }
  /**
   * Write General log. Default to INFO
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  log(...msg) {
    this._log(LogType$1.INFO, ...msg);
  }
  /**
   * Write INFO log
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  info(...msg) {
    this._log(LogType$1.INFO, ...msg);
  }
  /**
   * Write WARN log
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  warn(...msg) {
    this._log(LogType$1.WARN, ...msg);
  }
  /**
   * Write ERROR log
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  error(...msg) {
    this._log(LogType$1.ERROR, ...msg);
  }
  /**
   * Write DEBUG log
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  debug(...msg) {
    this._log(LogType$1.DEBUG, ...msg);
  }
  /**
   * Write VERBOSE log
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  verbose(...msg) {
    this._log(LogType$1.VERBOSE, ...msg);
  }
  addPluggable(pluggable) {
    if (pluggable && pluggable.getCategoryName() === AWS_CLOUDWATCH_CATEGORY$1) {
      this._pluggables.push(pluggable);
      pluggable.configure(this._config);
    }
  }
  listPluggables() {
    return this._pluggables;
  }
};
ConsoleLogger$1.LOG_LEVEL = null;
ConsoleLogger$1.BIND_ALL_LOG_LEVELS = false;
let AmplifyError$1 = class AmplifyError extends Error {
  /**
   *  Constructs an AmplifyError.
   *
   * @param message text that describes the main problem.
   * @param underlyingError the underlying cause of the error.
   * @param recoverySuggestion suggestion to recover from the error.
   *
   */
  constructor({ message, name: name2, recoverySuggestion, underlyingError, metadata }) {
    super(message);
    this.name = name2;
    this.underlyingError = underlyingError;
    this.recoverySuggestion = recoverySuggestion;
    if (metadata) {
      const { extendedRequestId, httpStatusCode, requestId } = metadata;
      this.metadata = { extendedRequestId, httpStatusCode, requestId };
    }
    this.constructor = AmplifyError;
    Object.setPrototypeOf(this, AmplifyError.prototype);
  }
};
var AmplifyErrorCode$1;
(function(AmplifyErrorCode2) {
  AmplifyErrorCode2["NoEndpointId"] = "NoEndpointId";
  AmplifyErrorCode2["PlatformNotSupported"] = "PlatformNotSupported";
  AmplifyErrorCode2["Unknown"] = "Unknown";
  AmplifyErrorCode2["NetworkError"] = "NetworkError";
})(AmplifyErrorCode$1 || (AmplifyErrorCode$1 = {}));
const AMPLIFY_SYMBOL$1 = typeof Symbol !== "undefined" ? Symbol("amplify_default") : "@@amplify_default";
const logger$b = new ConsoleLogger$1("Hub");
let HubClass$1 = class HubClass {
  constructor(name2) {
    this.listeners = /* @__PURE__ */ new Map();
    this.protectedChannels = [
      "core",
      "auth",
      "api",
      "analytics",
      "interactions",
      "pubsub",
      "storage",
      "ui",
      "xr"
    ];
    this.name = name2;
  }
  /**
   * Used internally to remove a Hub listener.
   *
   * @remarks
   * This private method is for internal use only. Instead of calling Hub.remove, call the result of Hub.listen.
   */
  _remove(channel, listener) {
    const holder = this.listeners.get(channel);
    if (!holder) {
      logger$b.warn(`No listeners for ${channel}`);
      return;
    }
    this.listeners.set(channel, [
      ...holder.filter(({ callback }) => callback !== listener)
    ]);
  }
  dispatch(channel, payload, source, ampSymbol) {
    if (typeof channel === "string" && this.protectedChannels.indexOf(channel) > -1) {
      const hasAccess = ampSymbol === AMPLIFY_SYMBOL$1;
      if (!hasAccess) {
        logger$b.warn(`WARNING: ${channel} is protected and dispatching on it can have unintended consequences`);
      }
    }
    const capsule = {
      channel,
      payload: { ...payload },
      source,
      patternInfo: []
    };
    try {
      this._toListeners(capsule);
    } catch (e) {
      logger$b.error(e);
    }
  }
  listen(channel, callback, listenerName = "noname") {
    let cb;
    if (typeof callback !== "function") {
      throw new AmplifyError$1({
        name: NO_HUBCALLBACK_PROVIDED_EXCEPTION$1,
        message: "No callback supplied to Hub"
      });
    } else {
      cb = callback;
    }
    let holder = this.listeners.get(channel);
    if (!holder) {
      holder = [];
      this.listeners.set(channel, holder);
    }
    holder.push({
      name: listenerName,
      callback: cb
    });
    return () => {
      this._remove(channel, cb);
    };
  }
  _toListeners(capsule) {
    const { channel, payload } = capsule;
    const holder = this.listeners.get(channel);
    if (holder) {
      holder.forEach((listener) => {
        logger$b.debug(`Dispatching to ${channel} with `, payload);
        try {
          listener.callback(capsule);
        } catch (e) {
          logger$b.error(e);
        }
      });
    }
  }
};
const Hub$1 = new HubClass$1("__default__");
const getBtoa = () => {
  if (typeof window !== "undefined" && typeof window.btoa === "function") {
    return window.btoa;
  }
  if (typeof btoa === "function") {
    return btoa;
  }
  throw new AmplifyError$1({
    name: "Base64EncoderError",
    message: "Cannot resolve the `btoa` function from the environment."
  });
};
const isNonRetryableError = (obj) => {
  const key = "nonRetryable";
  return obj && obj[key];
};
const logger$a = new ConsoleLogger$1("retryUtil");
async function retry(functionToRetry, args, delayFn, onTerminate) {
  if (typeof functionToRetry !== "function") {
    throw Error("functionToRetry must be a function");
  }
  return new Promise(async (resolve, reject) => {
    let attempt = 0;
    let terminated = false;
    let wakeUp = () => {
    };
    let lastError;
    while (!terminated) {
      attempt++;
      logger$a.debug(`${functionToRetry.name} attempt #${attempt} with this vars: ${JSON.stringify(args)}`);
      try {
        resolve(await functionToRetry(...args));
        return;
      } catch (err) {
        lastError = err;
        logger$a.debug(`error on ${functionToRetry.name}`, err);
        if (isNonRetryableError(err)) {
          logger$a.debug(`${functionToRetry.name} non retryable error`, err);
          reject(err);
          return;
        }
        const retryIn = delayFn(attempt, args, err);
        logger$a.debug(`${functionToRetry.name} retrying in ${retryIn} ms`);
        if (retryIn === false || terminated) {
          reject(err);
          return;
        } else {
          await new Promise((_resolve) => {
            wakeUp = _resolve;
            setTimeout(wakeUp, retryIn);
          });
        }
      }
    }
    reject(lastError);
  });
}
const deepFreeze = (object) => {
  const propNames = Reflect.ownKeys(object);
  for (const name2 of propNames) {
    const value = object[name2];
    if (value && typeof value === "object" || typeof value === "function") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
};
const logger$9 = new ConsoleLogger$1("parseAWSExports");
const authTypeMapping = {
  API_KEY: "apiKey",
  AWS_IAM: "iam",
  AMAZON_COGNITO_USER_POOLS: "userPool",
  OPENID_CONNECT: "oidc",
  NONE: "none",
  AWS_LAMBDA: "lambda",
  // `LAMBDA` is an incorrect value that was added during the v6 rewrite.
  // Keeping it as a valid value until v7 to prevent breaking customers who might
  // be relying on it as a workaround.
  // ref: https://github.com/aws-amplify/amplify-js/pull/12922
  // TODO: @v7 remove next line
  LAMBDA: "lambda"
};
const parseAWSExports = (config2 = {}) => {
  if (!Object.prototype.hasOwnProperty.call(config2, "aws_project_region")) {
    throw new AmplifyError$1({
      name: "InvalidParameterException",
      message: "Invalid config parameter.",
      recoverySuggestion: "Ensure passing the config object imported from  `amplifyconfiguration.json`."
    });
  }
  const { aws_appsync_apiKey, aws_appsync_authenticationType, aws_appsync_graphqlEndpoint, aws_appsync_region, aws_bots_config, aws_cognito_identity_pool_id, aws_cognito_sign_up_verification_method, aws_cognito_mfa_configuration, aws_cognito_mfa_types, aws_cognito_password_protection_settings, aws_cognito_verification_mechanisms, aws_cognito_signup_attributes, aws_cognito_social_providers, aws_cognito_username_attributes, aws_mandatory_sign_in, aws_mobile_analytics_app_id, aws_mobile_analytics_app_region, aws_user_files_s3_bucket, aws_user_files_s3_bucket_region, aws_user_files_s3_dangerously_connect_to_http_endpoint_for_testing, aws_user_pools_id, aws_user_pools_web_client_id, geo, oauth, predictions, aws_cloud_logic_custom, Notifications, modelIntrospection } = config2;
  const amplifyConfig = {};
  if (aws_mobile_analytics_app_id) {
    amplifyConfig.Analytics = {
      Pinpoint: {
        appId: aws_mobile_analytics_app_id,
        region: aws_mobile_analytics_app_region
      }
    };
  }
  const { InAppMessaging, Push } = Notifications ?? {};
  if (InAppMessaging?.AWSPinpoint || Push?.AWSPinpoint) {
    if (InAppMessaging?.AWSPinpoint) {
      const { appId, region } = InAppMessaging.AWSPinpoint;
      amplifyConfig.Notifications = {
        InAppMessaging: {
          Pinpoint: {
            appId,
            region
          }
        }
      };
    }
    if (Push?.AWSPinpoint) {
      const { appId, region } = Push.AWSPinpoint;
      amplifyConfig.Notifications = {
        ...amplifyConfig.Notifications,
        PushNotification: {
          Pinpoint: {
            appId,
            region
          }
        }
      };
    }
  }
  if (Array.isArray(aws_bots_config)) {
    amplifyConfig.Interactions = {
      LexV1: Object.fromEntries(aws_bots_config.map((bot) => [bot.name, bot]))
    };
  }
  if (aws_appsync_graphqlEndpoint) {
    const defaultAuthMode = authTypeMapping[aws_appsync_authenticationType];
    if (!defaultAuthMode) {
      logger$9.debug(`Invalid authentication type ${aws_appsync_authenticationType}. Falling back to IAM.`);
    }
    amplifyConfig.API = {
      GraphQL: {
        endpoint: aws_appsync_graphqlEndpoint,
        apiKey: aws_appsync_apiKey,
        region: aws_appsync_region,
        defaultAuthMode: defaultAuthMode ?? "iam"
      }
    };
    if (modelIntrospection) {
      amplifyConfig.API.GraphQL.modelIntrospection = modelIntrospection;
    }
  }
  const mfaConfig = aws_cognito_mfa_configuration ? {
    status: aws_cognito_mfa_configuration && aws_cognito_mfa_configuration.toLowerCase(),
    totpEnabled: aws_cognito_mfa_types?.includes("TOTP") ?? false,
    smsEnabled: aws_cognito_mfa_types?.includes("SMS") ?? false
  } : void 0;
  const passwordFormatConfig = aws_cognito_password_protection_settings ? {
    minLength: aws_cognito_password_protection_settings.passwordPolicyMinLength,
    requireLowercase: aws_cognito_password_protection_settings.passwordPolicyCharacters?.includes("REQUIRES_LOWERCASE") ?? false,
    requireUppercase: aws_cognito_password_protection_settings.passwordPolicyCharacters?.includes("REQUIRES_UPPERCASE") ?? false,
    requireNumbers: aws_cognito_password_protection_settings.passwordPolicyCharacters?.includes("REQUIRES_NUMBERS") ?? false,
    requireSpecialCharacters: aws_cognito_password_protection_settings.passwordPolicyCharacters?.includes("REQUIRES_SYMBOLS") ?? false
  } : void 0;
  const mergedUserAttributes = Array.from(/* @__PURE__ */ new Set([
    ...aws_cognito_verification_mechanisms ?? [],
    ...aws_cognito_signup_attributes ?? []
  ]));
  const userAttributes = mergedUserAttributes.reduce((attributes, key) => ({
    ...attributes,
    // All user attributes generated by the CLI are required
    [key.toLowerCase()]: { required: true }
  }), {});
  const loginWithEmailEnabled = aws_cognito_username_attributes?.includes("EMAIL") ?? false;
  const loginWithPhoneEnabled = aws_cognito_username_attributes?.includes("PHONE_NUMBER") ?? false;
  if (aws_cognito_identity_pool_id || aws_user_pools_id) {
    amplifyConfig.Auth = {
      Cognito: {
        identityPoolId: aws_cognito_identity_pool_id,
        allowGuestAccess: aws_mandatory_sign_in !== "enable",
        signUpVerificationMethod: aws_cognito_sign_up_verification_method,
        userAttributes,
        userPoolClientId: aws_user_pools_web_client_id,
        userPoolId: aws_user_pools_id,
        mfa: mfaConfig,
        passwordFormat: passwordFormatConfig,
        loginWith: {
          username: !(loginWithEmailEnabled || loginWithPhoneEnabled),
          email: loginWithEmailEnabled,
          phone: loginWithPhoneEnabled
        }
      }
    };
  }
  const hasOAuthConfig = oauth ? Object.keys(oauth).length > 0 : false;
  const hasSocialProviderConfig = aws_cognito_social_providers ? aws_cognito_social_providers.length > 0 : false;
  if (amplifyConfig.Auth && hasOAuthConfig) {
    amplifyConfig.Auth.Cognito.loginWith = {
      ...amplifyConfig.Auth.Cognito.loginWith,
      oauth: {
        ...getOAuthConfig(oauth),
        ...hasSocialProviderConfig && {
          providers: parseSocialProviders(aws_cognito_social_providers)
        }
      }
    };
  }
  if (aws_user_files_s3_bucket) {
    amplifyConfig.Storage = {
      S3: {
        bucket: aws_user_files_s3_bucket,
        region: aws_user_files_s3_bucket_region,
        dangerouslyConnectToHttpEndpointForTesting: aws_user_files_s3_dangerously_connect_to_http_endpoint_for_testing
      }
    };
  }
  if (geo) {
    const { amazon_location_service } = geo;
    amplifyConfig.Geo = {
      LocationService: {
        maps: amazon_location_service.maps,
        geofenceCollections: amazon_location_service.geofenceCollections,
        searchIndices: amazon_location_service.search_indices,
        region: amazon_location_service.region
      }
    };
  }
  if (aws_cloud_logic_custom) {
    amplifyConfig.API = {
      ...amplifyConfig.API,
      REST: aws_cloud_logic_custom.reduce((acc, api2) => {
        const { name: name2, endpoint, region, service } = api2;
        return {
          ...acc,
          [name2]: {
            endpoint,
            ...service ? { service } : void 0,
            ...region ? { region } : void 0
          }
        };
      }, {})
    };
  }
  if (predictions) {
    const { VoiceId: voiceId } = predictions?.convert?.speechGenerator?.defaults ?? {};
    amplifyConfig.Predictions = voiceId ? {
      ...predictions,
      convert: {
        ...predictions.convert,
        speechGenerator: {
          ...predictions.convert.speechGenerator,
          defaults: { voiceId }
        }
      }
    } : predictions;
  }
  return amplifyConfig;
};
const getRedirectUrl = (redirectStr) => redirectStr?.split(",") ?? [];
const getOAuthConfig = ({ domain, scope, redirectSignIn, redirectSignOut, responseType }) => ({
  domain,
  scopes: scope,
  redirectSignIn: getRedirectUrl(redirectSignIn),
  redirectSignOut: getRedirectUrl(redirectSignOut),
  responseType
});
const parseSocialProviders = (aws_cognito_social_providers) => {
  return aws_cognito_social_providers.map((provider) => {
    const updatedProvider = provider.toLowerCase();
    return updatedProvider.charAt(0).toUpperCase() + updatedProvider.slice(1);
  });
};
const ADD_OAUTH_LISTENER = Symbol("oauth-listener");
function isAmplifyOutputs(config2) {
  const { version: version2 } = config2;
  if (!version2) {
    return false;
  }
  return version2.startsWith("1");
}
function parseStorage(amplifyOutputsStorageProperties) {
  if (!amplifyOutputsStorageProperties) {
    return void 0;
  }
  const { bucket_name, aws_region, buckets } = amplifyOutputsStorageProperties;
  return {
    S3: {
      bucket: bucket_name,
      region: aws_region,
      buckets: buckets && createBucketInfoMap(buckets)
    }
  };
}
function parseAuth(amplifyOutputsAuthProperties) {
  if (!amplifyOutputsAuthProperties) {
    return void 0;
  }
  const { user_pool_id, user_pool_client_id, identity_pool_id, password_policy, mfa_configuration, mfa_methods, unauthenticated_identities_enabled, oauth, username_attributes, standard_required_attributes, groups } = amplifyOutputsAuthProperties;
  const authConfig = {
    Cognito: {
      userPoolId: user_pool_id,
      userPoolClientId: user_pool_client_id,
      groups
    }
  };
  if (identity_pool_id) {
    authConfig.Cognito = {
      ...authConfig.Cognito,
      identityPoolId: identity_pool_id
    };
  }
  if (password_policy) {
    authConfig.Cognito.passwordFormat = {
      requireLowercase: password_policy.require_lowercase,
      requireNumbers: password_policy.require_numbers,
      requireUppercase: password_policy.require_uppercase,
      requireSpecialCharacters: password_policy.require_symbols,
      minLength: password_policy.min_length ?? 6
    };
  }
  if (mfa_configuration) {
    authConfig.Cognito.mfa = {
      status: getMfaStatus(mfa_configuration),
      smsEnabled: mfa_methods?.includes("SMS"),
      totpEnabled: mfa_methods?.includes("TOTP")
    };
  }
  if (unauthenticated_identities_enabled) {
    authConfig.Cognito.allowGuestAccess = unauthenticated_identities_enabled;
  }
  if (oauth) {
    authConfig.Cognito.loginWith = {
      oauth: {
        domain: oauth.domain,
        redirectSignIn: oauth.redirect_sign_in_uri,
        redirectSignOut: oauth.redirect_sign_out_uri,
        responseType: oauth.response_type === "token" ? "token" : "code",
        scopes: oauth.scopes,
        providers: getOAuthProviders(oauth.identity_providers)
      }
    };
  }
  if (username_attributes) {
    authConfig.Cognito.loginWith = {
      ...authConfig.Cognito.loginWith,
      email: username_attributes.includes("email"),
      phone: username_attributes.includes("phone_number"),
      // Signing in with a username is not currently supported in Gen2, this should always evaluate to false
      username: username_attributes.includes("username")
    };
  }
  if (standard_required_attributes) {
    authConfig.Cognito.userAttributes = standard_required_attributes.reduce((acc, curr) => ({ ...acc, [curr]: { required: true } }), {});
  }
  return authConfig;
}
function parseAnalytics(amplifyOutputsAnalyticsProperties) {
  if (!amplifyOutputsAnalyticsProperties?.amazon_pinpoint) {
    return void 0;
  }
  const { amazon_pinpoint } = amplifyOutputsAnalyticsProperties;
  return {
    Pinpoint: {
      appId: amazon_pinpoint.app_id,
      region: amazon_pinpoint.aws_region
    }
  };
}
function parseGeo(amplifyOutputsAnalyticsProperties) {
  if (!amplifyOutputsAnalyticsProperties) {
    return void 0;
  }
  const { aws_region, geofence_collections, maps, search_indices } = amplifyOutputsAnalyticsProperties;
  return {
    LocationService: {
      region: aws_region,
      searchIndices: search_indices,
      geofenceCollections: geofence_collections,
      maps
    }
  };
}
function parseData(amplifyOutputsDataProperties) {
  if (!amplifyOutputsDataProperties) {
    return void 0;
  }
  const { aws_region, default_authorization_type, url, api_key, model_introspection } = amplifyOutputsDataProperties;
  const GraphQL = {
    endpoint: url,
    defaultAuthMode: getGraphQLAuthMode(default_authorization_type),
    region: aws_region,
    apiKey: api_key,
    modelIntrospection: model_introspection
  };
  return {
    GraphQL
  };
}
function parseCustom(amplifyOutputsCustomProperties) {
  if (!amplifyOutputsCustomProperties?.events) {
    return void 0;
  }
  const { url, aws_region, api_key, default_authorization_type } = amplifyOutputsCustomProperties.events;
  const Events = {
    endpoint: url,
    defaultAuthMode: getGraphQLAuthMode(default_authorization_type),
    region: aws_region,
    apiKey: api_key
  };
  return {
    Events
  };
}
function parseNotifications(amplifyOutputsNotificationsProperties) {
  if (!amplifyOutputsNotificationsProperties) {
    return void 0;
  }
  const { aws_region, channels, amazon_pinpoint_app_id } = amplifyOutputsNotificationsProperties;
  const hasInAppMessaging = channels.includes("IN_APP_MESSAGING");
  const hasPushNotification = channels.includes("APNS") || channels.includes("FCM");
  if (!(hasInAppMessaging || hasPushNotification)) {
    return void 0;
  }
  const notificationsConfig = {};
  if (hasInAppMessaging) {
    notificationsConfig.InAppMessaging = {
      Pinpoint: {
        appId: amazon_pinpoint_app_id,
        region: aws_region
      }
    };
  }
  if (hasPushNotification) {
    notificationsConfig.PushNotification = {
      Pinpoint: {
        appId: amazon_pinpoint_app_id,
        region: aws_region
      }
    };
  }
  return notificationsConfig;
}
function parseAmplifyOutputs(amplifyOutputs) {
  const resourcesConfig = {};
  if (amplifyOutputs.storage) {
    resourcesConfig.Storage = parseStorage(amplifyOutputs.storage);
  }
  if (amplifyOutputs.auth) {
    resourcesConfig.Auth = parseAuth(amplifyOutputs.auth);
  }
  if (amplifyOutputs.analytics) {
    resourcesConfig.Analytics = parseAnalytics(amplifyOutputs.analytics);
  }
  if (amplifyOutputs.geo) {
    resourcesConfig.Geo = parseGeo(amplifyOutputs.geo);
  }
  if (amplifyOutputs.data) {
    resourcesConfig.API = parseData(amplifyOutputs.data);
  }
  if (amplifyOutputs.custom) {
    const customConfig = parseCustom(amplifyOutputs.custom);
    if (customConfig && "Events" in customConfig) {
      resourcesConfig.API = { ...resourcesConfig.API, ...customConfig };
    }
  }
  if (amplifyOutputs.notifications) {
    resourcesConfig.Notifications = parseNotifications(amplifyOutputs.notifications);
  }
  return resourcesConfig;
}
const authModeNames = {
  AMAZON_COGNITO_USER_POOLS: "userPool",
  API_KEY: "apiKey",
  AWS_IAM: "iam",
  AWS_LAMBDA: "lambda",
  OPENID_CONNECT: "oidc"
};
function getGraphQLAuthMode(authType) {
  return authModeNames[authType];
}
const providerNames = {
  GOOGLE: "Google",
  LOGIN_WITH_AMAZON: "Amazon",
  FACEBOOK: "Facebook",
  SIGN_IN_WITH_APPLE: "Apple"
};
function getOAuthProviders(providers = []) {
  return providers.reduce((oAuthProviders, provider) => {
    if (providerNames[provider] !== void 0) {
      oAuthProviders.push(providerNames[provider]);
    }
    return oAuthProviders;
  }, []);
}
function getMfaStatus(mfaConfiguration) {
  if (mfaConfiguration === "OPTIONAL")
    return "optional";
  if (mfaConfiguration === "REQUIRED")
    return "on";
  return "off";
}
function createBucketInfoMap(buckets) {
  const mappedBuckets = {};
  buckets.forEach(({ name: name2, bucket_name: bucketName, aws_region: region, paths }) => {
    if (name2 in mappedBuckets) {
      throw new Error(`Duplicate friendly name found: ${name2}. Name must be unique.`);
    }
    const sanitizedPaths = paths ? Object.entries(paths).reduce((acc, [key, value]) => {
      if (value !== void 0) {
        acc[key] = value;
      }
      return acc;
    }, {}) : void 0;
    mappedBuckets[name2] = {
      bucketName,
      region,
      paths: sanitizedPaths
    };
  });
  return mappedBuckets;
}
const parseAmplifyConfig = (amplifyConfig) => {
  if (Object.keys(amplifyConfig).some((key) => key.startsWith("aws_"))) {
    return parseAWSExports(amplifyConfig);
  } else if (isAmplifyOutputs(amplifyConfig)) {
    return parseAmplifyOutputs(amplifyConfig);
  } else {
    return amplifyConfig;
  }
};
var BLOCK_SIZE = 64;
var DIGEST_LENGTH = 32;
var KEY = new Uint32Array([
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
]);
var INIT = [
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
];
var MAX_HASHABLE_LENGTH = Math.pow(2, 53) - 1;
var RawSha256 = (
  /** @class */
  (function() {
    function RawSha2562() {
      this.state = Int32Array.from(INIT);
      this.temp = new Int32Array(64);
      this.buffer = new Uint8Array(64);
      this.bufferLength = 0;
      this.bytesHashed = 0;
      this.finished = false;
    }
    RawSha2562.prototype.update = function(data) {
      if (this.finished) {
        throw new Error("Attempted to update an already finished hash.");
      }
      var position = 0;
      var byteLength = data.byteLength;
      this.bytesHashed += byteLength;
      if (this.bytesHashed * 8 > MAX_HASHABLE_LENGTH) {
        throw new Error("Cannot hash more than 2^53 - 1 bits");
      }
      while (byteLength > 0) {
        this.buffer[this.bufferLength++] = data[position++];
        byteLength--;
        if (this.bufferLength === BLOCK_SIZE) {
          this.hashBuffer();
          this.bufferLength = 0;
        }
      }
    };
    RawSha2562.prototype.digest = function() {
      if (!this.finished) {
        var bitsHashed = this.bytesHashed * 8;
        var bufferView = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
        var undecoratedLength = this.bufferLength;
        bufferView.setUint8(this.bufferLength++, 128);
        if (undecoratedLength % BLOCK_SIZE >= BLOCK_SIZE - 8) {
          for (var i = this.bufferLength; i < BLOCK_SIZE; i++) {
            bufferView.setUint8(i, 0);
          }
          this.hashBuffer();
          this.bufferLength = 0;
        }
        for (var i = this.bufferLength; i < BLOCK_SIZE - 8; i++) {
          bufferView.setUint8(i, 0);
        }
        bufferView.setUint32(BLOCK_SIZE - 8, Math.floor(bitsHashed / 4294967296), true);
        bufferView.setUint32(BLOCK_SIZE - 4, bitsHashed);
        this.hashBuffer();
        this.finished = true;
      }
      var out = new Uint8Array(DIGEST_LENGTH);
      for (var i = 0; i < 8; i++) {
        out[i * 4] = this.state[i] >>> 24 & 255;
        out[i * 4 + 1] = this.state[i] >>> 16 & 255;
        out[i * 4 + 2] = this.state[i] >>> 8 & 255;
        out[i * 4 + 3] = this.state[i] >>> 0 & 255;
      }
      return out;
    };
    RawSha2562.prototype.hashBuffer = function() {
      var _a = this, buffer = _a.buffer, state = _a.state;
      var state0 = state[0], state1 = state[1], state2 = state[2], state3 = state[3], state4 = state[4], state5 = state[5], state6 = state[6], state7 = state[7];
      for (var i = 0; i < BLOCK_SIZE; i++) {
        if (i < 16) {
          this.temp[i] = (buffer[i * 4] & 255) << 24 | (buffer[i * 4 + 1] & 255) << 16 | (buffer[i * 4 + 2] & 255) << 8 | buffer[i * 4 + 3] & 255;
        } else {
          var u = this.temp[i - 2];
          var t1_1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ u >>> 10;
          u = this.temp[i - 15];
          var t2_1 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ u >>> 3;
          this.temp[i] = (t1_1 + this.temp[i - 7] | 0) + (t2_1 + this.temp[i - 16] | 0);
        }
        var t1 = (((state4 >>> 6 | state4 << 26) ^ (state4 >>> 11 | state4 << 21) ^ (state4 >>> 25 | state4 << 7)) + (state4 & state5 ^ ~state4 & state6) | 0) + (state7 + (KEY[i] + this.temp[i] | 0) | 0) | 0;
        var t2 = ((state0 >>> 2 | state0 << 30) ^ (state0 >>> 13 | state0 << 19) ^ (state0 >>> 22 | state0 << 10)) + (state0 & state1 ^ state0 & state2 ^ state1 & state2) | 0;
        state7 = state6;
        state6 = state5;
        state5 = state4;
        state4 = state3 + t1 | 0;
        state3 = state2;
        state2 = state1;
        state1 = state0;
        state0 = t1 + t2 | 0;
      }
      state[0] += state0;
      state[1] += state1;
      state[2] += state2;
      state[3] += state3;
      state[4] += state4;
      state[5] += state5;
      state[6] += state6;
      state[7] += state7;
    };
    return RawSha2562;
  })()
);
const fromUtf8$2 = (input) => new TextEncoder().encode(input);
var fromUtf8$1 = typeof Buffer !== "undefined" && Buffer.from ? function(input) {
  return Buffer.from(input, "utf8");
} : fromUtf8$2;
function convertToBuffer(data) {
  if (data instanceof Uint8Array)
    return data;
  if (typeof data === "string") {
    return fromUtf8$1(data);
  }
  if (ArrayBuffer.isView(data)) {
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
  }
  return new Uint8Array(data);
}
function isEmptyData(data) {
  if (typeof data === "string") {
    return data.length === 0;
  }
  return data.byteLength === 0;
}
var Sha256 = (
  /** @class */
  (function() {
    function Sha2562(secret) {
      this.secret = secret;
      this.hash = new RawSha256();
      this.reset();
    }
    Sha2562.prototype.update = function(toHash) {
      if (isEmptyData(toHash) || this.error) {
        return;
      }
      try {
        this.hash.update(convertToBuffer(toHash));
      } catch (e) {
        this.error = e;
      }
    };
    Sha2562.prototype.digestSync = function() {
      if (this.error) {
        throw this.error;
      }
      if (this.outer) {
        if (!this.outer.finished) {
          this.outer.update(this.hash.digest());
        }
        return this.outer.digest();
      }
      return this.hash.digest();
    };
    Sha2562.prototype.digest = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          return [2, this.digestSync()];
        });
      });
    };
    Sha2562.prototype.reset = function() {
      this.hash = new RawSha256();
      if (this.secret) {
        this.outer = new RawSha256();
        var inner = bufferFromSecret(this.secret);
        var outer = new Uint8Array(BLOCK_SIZE);
        outer.set(inner);
        for (var i = 0; i < BLOCK_SIZE; i++) {
          inner[i] ^= 54;
          outer[i] ^= 92;
        }
        this.hash.update(inner);
        this.outer.update(outer);
        for (var i = 0; i < inner.byteLength; i++) {
          inner[i] = 0;
        }
      }
    };
    return Sha2562;
  })()
);
function bufferFromSecret(secret) {
  var input = convertToBuffer(secret);
  if (input.byteLength > BLOCK_SIZE) {
    var bufferHash = new RawSha256();
    bufferHash.update(input);
    input = bufferHash.digest();
  }
  var buffer = new Uint8Array(BLOCK_SIZE);
  buffer.set(input);
  return buffer;
}
const SHORT_TO_HEX = {};
for (let i = 0; i < 256; i++) {
  let encodedByte = i.toString(16).toLowerCase();
  if (encodedByte.length === 1) {
    encodedByte = `0${encodedByte}`;
  }
  SHORT_TO_HEX[i] = encodedByte;
}
function toHex(bytes) {
  let out = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    out += SHORT_TO_HEX[bytes[i]];
  }
  return out;
}
var Framework$1;
(function(Framework2) {
  Framework2["WebUnknown"] = "0";
  Framework2["React"] = "1";
  Framework2["NextJs"] = "2";
  Framework2["Angular"] = "3";
  Framework2["VueJs"] = "4";
  Framework2["Nuxt"] = "5";
  Framework2["Svelte"] = "6";
  Framework2["ServerSideUnknown"] = "100";
  Framework2["ReactSSR"] = "101";
  Framework2["NextJsSSR"] = "102";
  Framework2["AngularSSR"] = "103";
  Framework2["VueJsSSR"] = "104";
  Framework2["NuxtSSR"] = "105";
  Framework2["SvelteSSR"] = "106";
  Framework2["ReactNative"] = "201";
  Framework2["Expo"] = "202";
})(Framework$1 || (Framework$1 = {}));
var Category$1;
(function(Category2) {
  Category2["AI"] = "ai";
  Category2["API"] = "api";
  Category2["Auth"] = "auth";
  Category2["Analytics"] = "analytics";
  Category2["DataStore"] = "datastore";
  Category2["Geo"] = "geo";
  Category2["InAppMessaging"] = "inappmessaging";
  Category2["Interactions"] = "interactions";
  Category2["Predictions"] = "predictions";
  Category2["PubSub"] = "pubsub";
  Category2["PushNotification"] = "pushnotification";
  Category2["Storage"] = "storage";
})(Category$1 || (Category$1 = {}));
var AiAction$2;
(function(AiAction2) {
  AiAction2["CreateConversation"] = "1";
  AiAction2["GetConversation"] = "2";
  AiAction2["ListConversations"] = "3";
  AiAction2["DeleteConversation"] = "4";
  AiAction2["SendMessage"] = "5";
  AiAction2["ListMessages"] = "6";
  AiAction2["OnMessage"] = "7";
  AiAction2["Generation"] = "8";
  AiAction2["UpdateConversation"] = "9";
})(AiAction$2 || (AiAction$2 = {}));
var AnalyticsAction$1;
(function(AnalyticsAction2) {
  AnalyticsAction2["Record"] = "1";
  AnalyticsAction2["IdentifyUser"] = "2";
})(AnalyticsAction$1 || (AnalyticsAction$1 = {}));
var ApiAction$1;
(function(ApiAction2) {
  ApiAction2["GraphQl"] = "1";
  ApiAction2["Get"] = "2";
  ApiAction2["Post"] = "3";
  ApiAction2["Put"] = "4";
  ApiAction2["Patch"] = "5";
  ApiAction2["Del"] = "6";
  ApiAction2["Head"] = "7";
})(ApiAction$1 || (ApiAction$1 = {}));
var AuthAction$1;
(function(AuthAction2) {
  AuthAction2["SignUp"] = "1";
  AuthAction2["ConfirmSignUp"] = "2";
  AuthAction2["ResendSignUpCode"] = "3";
  AuthAction2["SignIn"] = "4";
  AuthAction2["FetchMFAPreference"] = "6";
  AuthAction2["UpdateMFAPreference"] = "7";
  AuthAction2["SetUpTOTP"] = "10";
  AuthAction2["VerifyTOTPSetup"] = "11";
  AuthAction2["ConfirmSignIn"] = "12";
  AuthAction2["DeleteUserAttributes"] = "15";
  AuthAction2["DeleteUser"] = "16";
  AuthAction2["UpdateUserAttributes"] = "17";
  AuthAction2["FetchUserAttributes"] = "18";
  AuthAction2["ConfirmUserAttribute"] = "22";
  AuthAction2["SignOut"] = "26";
  AuthAction2["UpdatePassword"] = "27";
  AuthAction2["ResetPassword"] = "28";
  AuthAction2["ConfirmResetPassword"] = "29";
  AuthAction2["FederatedSignIn"] = "30";
  AuthAction2["RememberDevice"] = "32";
  AuthAction2["ForgetDevice"] = "33";
  AuthAction2["FetchDevices"] = "34";
  AuthAction2["SendUserAttributeVerificationCode"] = "35";
  AuthAction2["SignInWithRedirect"] = "36";
  AuthAction2["StartWebAuthnRegistration"] = "37";
  AuthAction2["CompleteWebAuthnRegistration"] = "38";
  AuthAction2["ListWebAuthnCredentials"] = "39";
  AuthAction2["DeleteWebAuthnCredential"] = "40";
})(AuthAction$1 || (AuthAction$1 = {}));
var DataStoreAction$1;
(function(DataStoreAction2) {
  DataStoreAction2["Subscribe"] = "1";
  DataStoreAction2["GraphQl"] = "2";
})(DataStoreAction$1 || (DataStoreAction$1 = {}));
var GeoAction$1;
(function(GeoAction2) {
  GeoAction2["SearchByText"] = "0";
  GeoAction2["SearchByCoordinates"] = "1";
  GeoAction2["SearchForSuggestions"] = "2";
  GeoAction2["SearchByPlaceId"] = "3";
  GeoAction2["SaveGeofences"] = "4";
  GeoAction2["GetGeofence"] = "5";
  GeoAction2["ListGeofences"] = "6";
  GeoAction2["DeleteGeofences"] = "7";
})(GeoAction$1 || (GeoAction$1 = {}));
var InAppMessagingAction$1;
(function(InAppMessagingAction2) {
  InAppMessagingAction2["SyncMessages"] = "1";
  InAppMessagingAction2["IdentifyUser"] = "2";
  InAppMessagingAction2["NotifyMessageInteraction"] = "3";
})(InAppMessagingAction$1 || (InAppMessagingAction$1 = {}));
var InteractionsAction$1;
(function(InteractionsAction2) {
  InteractionsAction2["None"] = "0";
})(InteractionsAction$1 || (InteractionsAction$1 = {}));
var PredictionsAction$1;
(function(PredictionsAction2) {
  PredictionsAction2["Convert"] = "1";
  PredictionsAction2["Identify"] = "2";
  PredictionsAction2["Interpret"] = "3";
})(PredictionsAction$1 || (PredictionsAction$1 = {}));
var PubSubAction$1;
(function(PubSubAction2) {
  PubSubAction2["Subscribe"] = "1";
})(PubSubAction$1 || (PubSubAction$1 = {}));
var PushNotificationAction$1;
(function(PushNotificationAction2) {
  PushNotificationAction2["InitializePushNotifications"] = "1";
  PushNotificationAction2["IdentifyUser"] = "2";
})(PushNotificationAction$1 || (PushNotificationAction$1 = {}));
var StorageAction$1;
(function(StorageAction2) {
  StorageAction2["UploadData"] = "1";
  StorageAction2["DownloadData"] = "2";
  StorageAction2["List"] = "3";
  StorageAction2["Copy"] = "4";
  StorageAction2["Remove"] = "5";
  StorageAction2["GetProperties"] = "6";
  StorageAction2["GetUrl"] = "7";
  StorageAction2["GetDataAccess"] = "8";
  StorageAction2["ListCallerAccessGrants"] = "9";
})(StorageAction$1 || (StorageAction$1 = {}));
const version$1 = "6.15.6";
const globalExists$1 = () => {
  return typeof globalThis !== "undefined";
};
const windowExists$1 = () => {
  return typeof window !== "undefined";
};
const documentExists$1 = () => {
  return typeof document !== "undefined";
};
const processExists$1 = () => {
  return typeof process !== "undefined";
};
const keyPrefixMatch$1 = (object, prefix) => {
  return !!Object.keys(object).find((key) => key.startsWith(prefix));
};
var define_process_env_default$5 = {};
function reactWebDetect$1() {
  const elementKeyPrefixedWithReact = (key) => {
    return key.startsWith("_react") || key.startsWith("__react");
  };
  const elementIsReactEnabled = (element) => {
    return Object.keys(element).find(elementKeyPrefixedWithReact);
  };
  const allElementsWithId = () => Array.from(document.querySelectorAll("[id]"));
  return documentExists$1() && allElementsWithId().some(elementIsReactEnabled);
}
function reactSSRDetect$1() {
  return processExists$1() && typeof define_process_env_default$5 !== "undefined" && !!Object.keys(define_process_env_default$5).find((key) => key.includes("react"));
}
function vueWebDetect$1() {
  return windowExists$1() && keyPrefixMatch$1(window, "__VUE");
}
function vueSSRDetect$1() {
  return globalExists$1() && keyPrefixMatch$1(globalThis, "__VUE");
}
var define_process_env_default$4 = {};
function svelteWebDetect$1() {
  return windowExists$1() && keyPrefixMatch$1(window, "__SVELTE");
}
function svelteSSRDetect$1() {
  return processExists$1() && typeof define_process_env_default$4 !== "undefined" && !!Object.keys(define_process_env_default$4).find((key) => key.includes("svelte"));
}
function nextWebDetect$1() {
  return windowExists$1() && window.next && typeof window.next === "object";
}
function nextSSRDetect$1() {
  return globalExists$1() && (keyPrefixMatch$1(globalThis, "__next") || keyPrefixMatch$1(globalThis, "__NEXT"));
}
function nuxtWebDetect$1() {
  return windowExists$1() && (window.__NUXT__ !== void 0 || window.$nuxt !== void 0);
}
function nuxtSSRDetect$1() {
  return globalExists$1() && typeof globalThis.__NUXT_PATHS__ !== "undefined";
}
var define_process_env_default$3 = {};
function angularWebDetect$1() {
  const angularVersionSetInDocument = Boolean(documentExists$1() && document.querySelector("[ng-version]"));
  const angularContentSetInWindow = Boolean(windowExists$1() && typeof window.ng !== "undefined");
  return angularVersionSetInDocument || angularContentSetInWindow;
}
function angularSSRDetect$1() {
  return processExists$1() && typeof define_process_env_default$3 === "object" && define_process_env_default$3.npm_lifecycle_script?.startsWith("ng ") || false;
}
function reactNativeDetect$1() {
  return typeof navigator !== "undefined" && typeof navigator.product !== "undefined" && navigator.product === "ReactNative";
}
function expoDetect$1() {
  return globalExists$1() && typeof globalThis.expo !== "undefined";
}
function webDetect$1() {
  return windowExists$1();
}
const detectionMap$1 = [
  // First, detect mobile
  { platform: Framework$1.Expo, detectionMethod: expoDetect$1 },
  { platform: Framework$1.ReactNative, detectionMethod: reactNativeDetect$1 },
  // Next, detect web frameworks
  { platform: Framework$1.NextJs, detectionMethod: nextWebDetect$1 },
  { platform: Framework$1.Nuxt, detectionMethod: nuxtWebDetect$1 },
  { platform: Framework$1.Angular, detectionMethod: angularWebDetect$1 },
  { platform: Framework$1.React, detectionMethod: reactWebDetect$1 },
  { platform: Framework$1.VueJs, detectionMethod: vueWebDetect$1 },
  { platform: Framework$1.Svelte, detectionMethod: svelteWebDetect$1 },
  { platform: Framework$1.WebUnknown, detectionMethod: webDetect$1 },
  // Last, detect ssr frameworks
  { platform: Framework$1.NextJsSSR, detectionMethod: nextSSRDetect$1 },
  { platform: Framework$1.NuxtSSR, detectionMethod: nuxtSSRDetect$1 },
  { platform: Framework$1.ReactSSR, detectionMethod: reactSSRDetect$1 },
  { platform: Framework$1.VueJsSSR, detectionMethod: vueSSRDetect$1 },
  { platform: Framework$1.AngularSSR, detectionMethod: angularSSRDetect$1 },
  { platform: Framework$1.SvelteSSR, detectionMethod: svelteSSRDetect$1 }
];
function detect$1() {
  return detectionMap$1.find((detectionEntry) => detectionEntry.detectionMethod())?.platform || Framework$1.ServerSideUnknown;
}
let frameworkCache$1;
const frameworkChangeObservers$1 = [];
let resetTriggered$1 = false;
const SSR_RESET_TIMEOUT$1 = 10;
const WEB_RESET_TIMEOUT$1 = 10;
const PRIME_FRAMEWORK_DELAY$1 = 1e3;
const detectFramework$1 = () => {
  if (!frameworkCache$1) {
    frameworkCache$1 = detect$1();
    if (resetTriggered$1) {
      while (frameworkChangeObservers$1.length) {
        frameworkChangeObservers$1.pop()?.();
      }
    } else {
      frameworkChangeObservers$1.forEach((fcn) => {
        fcn();
      });
    }
    resetTimeout$1(Framework$1.ServerSideUnknown, SSR_RESET_TIMEOUT$1);
    resetTimeout$1(Framework$1.WebUnknown, WEB_RESET_TIMEOUT$1);
  }
  return frameworkCache$1;
};
function clearCache$1() {
  frameworkCache$1 = void 0;
}
function resetTimeout$1(framework, delay) {
  if (frameworkCache$1 === framework && !resetTriggered$1) {
    setTimeout(() => {
      clearCache$1();
      resetTriggered$1 = true;
      setTimeout(detectFramework$1, PRIME_FRAMEWORK_DELAY$1);
    }, delay);
  }
}
const customUserAgentState$1 = {};
const getCustomUserAgent$1 = (category, api2) => customUserAgentState$1[category]?.[api2]?.additionalDetails;
const BASE_USER_AGENT$1 = `aws-amplify`;
const sanitizeAmplifyVersion$1 = (amplifyVersion) => amplifyVersion.replace(/\+.*/, "");
const getAmplifyUserAgentObject$1 = ({ category, action } = {}) => {
  const userAgent = [
    [BASE_USER_AGENT$1, sanitizeAmplifyVersion$1(version$1)]
  ];
  if (category) {
    userAgent.push([category, action]);
  }
  userAgent.push(["framework", detectFramework$1()]);
  if (category && action) {
    const customState = getCustomUserAgent$1(category, action);
    if (customState) {
      customState.forEach((state) => {
        userAgent.push(state);
      });
    }
  }
  return userAgent;
};
const getAmplifyUserAgent$1 = (customUserAgentDetails) => {
  const userAgent = getAmplifyUserAgentObject$1(customUserAgentDetails);
  const userAgentString = userAgent.map(([agentKey, agentValue]) => agentKey && agentValue ? `${agentKey}/${agentValue}` : agentKey).join(" ");
  return userAgentString;
};
function isFunction(value) {
  return typeof value === "function";
}
function createErrorClass(createImpl) {
  var _super = function(instance) {
    Error.call(instance);
    instance.stack = new Error().stack;
  };
  var ctorFunc = createImpl(_super);
  ctorFunc.prototype = Object.create(Error.prototype);
  ctorFunc.prototype.constructor = ctorFunc;
  return ctorFunc;
}
var UnsubscriptionError = createErrorClass(function(_super) {
  return function UnsubscriptionErrorImpl(errors) {
    _super(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
      return i + 1 + ") " + err.toString();
    }).join("\n  ") : "";
    this.name = "UnsubscriptionError";
    this.errors = errors;
  };
});
function arrRemove(arr, item) {
  if (arr) {
    var index = arr.indexOf(item);
    0 <= index && arr.splice(index, 1);
  }
}
var Subscription = (function() {
  function Subscription2(initialTeardown) {
    this.initialTeardown = initialTeardown;
    this.closed = false;
    this._parentage = null;
    this._finalizers = null;
  }
  Subscription2.prototype.unsubscribe = function() {
    var e_1, _a, e_2, _b;
    var errors;
    if (!this.closed) {
      this.closed = true;
      var _parentage = this._parentage;
      if (_parentage) {
        this._parentage = null;
        if (Array.isArray(_parentage)) {
          try {
            for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
              var parent_1 = _parentage_1_1.value;
              parent_1.remove(this);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        } else {
          _parentage.remove(this);
        }
      }
      var initialFinalizer = this.initialTeardown;
      if (isFunction(initialFinalizer)) {
        try {
          initialFinalizer();
        } catch (e) {
          errors = e instanceof UnsubscriptionError ? e.errors : [e];
        }
      }
      var _finalizers = this._finalizers;
      if (_finalizers) {
        this._finalizers = null;
        try {
          for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
            var finalizer = _finalizers_1_1.value;
            try {
              execFinalizer(finalizer);
            } catch (err) {
              errors = errors !== null && errors !== void 0 ? errors : [];
              if (err instanceof UnsubscriptionError) {
                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
              } else {
                errors.push(err);
              }
            }
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
          } finally {
            if (e_2) throw e_2.error;
          }
        }
      }
      if (errors) {
        throw new UnsubscriptionError(errors);
      }
    }
  };
  Subscription2.prototype.add = function(teardown) {
    var _a;
    if (teardown && teardown !== this) {
      if (this.closed) {
        execFinalizer(teardown);
      } else {
        if (teardown instanceof Subscription2) {
          if (teardown.closed || teardown._hasParent(this)) {
            return;
          }
          teardown._addParent(this);
        }
        (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
      }
    }
  };
  Subscription2.prototype._hasParent = function(parent) {
    var _parentage = this._parentage;
    return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
  };
  Subscription2.prototype._addParent = function(parent) {
    var _parentage = this._parentage;
    this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
  };
  Subscription2.prototype._removeParent = function(parent) {
    var _parentage = this._parentage;
    if (_parentage === parent) {
      this._parentage = null;
    } else if (Array.isArray(_parentage)) {
      arrRemove(_parentage, parent);
    }
  };
  Subscription2.prototype.remove = function(teardown) {
    var _finalizers = this._finalizers;
    _finalizers && arrRemove(_finalizers, teardown);
    if (teardown instanceof Subscription2) {
      teardown._removeParent(this);
    }
  };
  Subscription2.EMPTY = (function() {
    var empty = new Subscription2();
    empty.closed = true;
    return empty;
  })();
  return Subscription2;
})();
Subscription.EMPTY;
function isSubscription(value) {
  return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
}
function execFinalizer(finalizer) {
  if (isFunction(finalizer)) {
    finalizer();
  } else {
    finalizer.unsubscribe();
  }
}
var config = {
  Promise: void 0
};
var timeoutProvider = {
  setTimeout: function(handler, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
  },
  clearTimeout: function(handle) {
    return clearTimeout(handle);
  },
  delegate: void 0
};
function reportUnhandledError(err) {
  timeoutProvider.setTimeout(function() {
    {
      throw err;
    }
  });
}
function noop() {
}
function errorContext(cb) {
  {
    cb();
  }
}
var Subscriber = (function(_super) {
  __extends(Subscriber2, _super);
  function Subscriber2(destination) {
    var _this = _super.call(this) || this;
    _this.isStopped = false;
    if (destination) {
      _this.destination = destination;
      if (isSubscription(destination)) {
        destination.add(_this);
      }
    } else {
      _this.destination = EMPTY_OBSERVER;
    }
    return _this;
  }
  Subscriber2.create = function(next, error2, complete) {
    return new SafeSubscriber(next, error2, complete);
  };
  Subscriber2.prototype.next = function(value) {
    if (this.isStopped) ;
    else {
      this._next(value);
    }
  };
  Subscriber2.prototype.error = function(err) {
    if (this.isStopped) ;
    else {
      this.isStopped = true;
      this._error(err);
    }
  };
  Subscriber2.prototype.complete = function() {
    if (this.isStopped) ;
    else {
      this.isStopped = true;
      this._complete();
    }
  };
  Subscriber2.prototype.unsubscribe = function() {
    if (!this.closed) {
      this.isStopped = true;
      _super.prototype.unsubscribe.call(this);
      this.destination = null;
    }
  };
  Subscriber2.prototype._next = function(value) {
    this.destination.next(value);
  };
  Subscriber2.prototype._error = function(err) {
    try {
      this.destination.error(err);
    } finally {
      this.unsubscribe();
    }
  };
  Subscriber2.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  };
  return Subscriber2;
})(Subscription);
var ConsumerObserver = (function() {
  function ConsumerObserver2(partialObserver) {
    this.partialObserver = partialObserver;
  }
  ConsumerObserver2.prototype.next = function(value) {
    var partialObserver = this.partialObserver;
    if (partialObserver.next) {
      try {
        partialObserver.next(value);
      } catch (error2) {
        handleUnhandledError(error2);
      }
    }
  };
  ConsumerObserver2.prototype.error = function(err) {
    var partialObserver = this.partialObserver;
    if (partialObserver.error) {
      try {
        partialObserver.error(err);
      } catch (error2) {
        handleUnhandledError(error2);
      }
    } else {
      handleUnhandledError(err);
    }
  };
  ConsumerObserver2.prototype.complete = function() {
    var partialObserver = this.partialObserver;
    if (partialObserver.complete) {
      try {
        partialObserver.complete();
      } catch (error2) {
        handleUnhandledError(error2);
      }
    }
  };
  return ConsumerObserver2;
})();
var SafeSubscriber = (function(_super) {
  __extends(SafeSubscriber2, _super);
  function SafeSubscriber2(observerOrNext, error2, complete) {
    var _this = _super.call(this) || this;
    var partialObserver;
    if (isFunction(observerOrNext) || !observerOrNext) {
      partialObserver = {
        next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
        error: error2 !== null && error2 !== void 0 ? error2 : void 0,
        complete: complete !== null && complete !== void 0 ? complete : void 0
      };
    } else {
      {
        partialObserver = observerOrNext;
      }
    }
    _this.destination = new ConsumerObserver(partialObserver);
    return _this;
  }
  return SafeSubscriber2;
})(Subscriber);
function handleUnhandledError(error2) {
  {
    reportUnhandledError(error2);
  }
}
function defaultErrorHandler(err) {
  throw err;
}
var EMPTY_OBSERVER = {
  closed: true,
  next: noop,
  error: defaultErrorHandler,
  complete: noop
};
var observable = (function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
})();
function identity(x) {
  return x;
}
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return identity;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return function piped(input) {
    return fns.reduce(function(prev, fn) {
      return fn(prev);
    }, input);
  };
}
var Observable = (function() {
  function Observable2(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  Observable2.prototype.lift = function(operator) {
    var observable2 = new Observable2();
    observable2.source = this;
    observable2.operator = operator;
    return observable2;
  };
  Observable2.prototype.subscribe = function(observerOrNext, error2, complete) {
    var _this = this;
    var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error2, complete);
    errorContext(function() {
      var _a = _this, operator = _a.operator, source = _a.source;
      subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
    });
    return subscriber;
  };
  Observable2.prototype._trySubscribe = function(sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
  };
  Observable2.prototype.forEach = function(next, promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var subscriber = new SafeSubscriber({
        next: function(value) {
          try {
            next(value);
          } catch (err) {
            reject(err);
            subscriber.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
      _this.subscribe(subscriber);
    });
  };
  Observable2.prototype._subscribe = function(subscriber) {
    var _a;
    return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
  };
  Observable2.prototype[observable] = function() {
    return this;
  };
  Observable2.prototype.pipe = function() {
    var operations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }
    return pipeFromArray(operations)(this);
  };
  Observable2.prototype.toPromise = function(promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var value;
      _this.subscribe(function(x) {
        return value = x;
      }, function(err) {
        return reject(err);
      }, function() {
        return resolve(value);
      });
    });
  };
  Observable2.create = function(subscribe) {
    return new Observable2(subscribe);
  };
  return Observable2;
})();
function getPromiseCtor(promiseCtor) {
  var _a;
  return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
  return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
  return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
}
function hasLift(source) {
  return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init2) {
  return function(source) {
    if (hasLift(source)) {
      return source.lift(function(liftedSource) {
        try {
          return init2(liftedSource, this);
        } catch (err) {
          this.error(err);
        }
      });
    }
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
  return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = (function(_super) {
  __extends(OperatorSubscriber2, _super);
  function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
    var _this = _super.call(this, destination) || this;
    _this.onFinalize = onFinalize;
    _this.shouldUnsubscribe = shouldUnsubscribe;
    _this._next = onNext ? function(value) {
      try {
        onNext(value);
      } catch (err) {
        destination.error(err);
      }
    } : _super.prototype._next;
    _this._error = onError ? function(err) {
      try {
        onError(err);
      } catch (err2) {
        destination.error(err2);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._error;
    _this._complete = onComplete ? function() {
      try {
        onComplete();
      } catch (err) {
        destination.error(err);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._complete;
    return _this;
  }
  OperatorSubscriber2.prototype.unsubscribe = function() {
    var _a;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var closed_1 = this.closed;
      _super.prototype.unsubscribe.call(this);
      !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    }
  };
  return OperatorSubscriber2;
})(Subscriber);
var isArrayLike = (function(x) {
  return x && typeof x.length === "number" && typeof x !== "function";
});
function isPromise(value) {
  return isFunction(value === null || value === void 0 ? void 0 : value.then);
}
function isInteropObservable(input) {
  return isFunction(input[observable]);
}
function isAsyncIterable(obj) {
  return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
function createInvalidObservableTypeError(input) {
  return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function getSymbolIterator() {
  if (typeof Symbol !== "function" || !Symbol.iterator) {
    return "@@iterator";
  }
  return Symbol.iterator;
}
var iterator = getSymbolIterator();
function isIterable(input) {
  return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}
function readableStreamLikeToAsyncGenerator(readableStream) {
  return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
    var reader, _a, value, done;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          reader = readableStream.getReader();
          _b.label = 1;
        case 1:
          _b.trys.push([1, , 9, 10]);
          _b.label = 2;
        case 2:
          return [4, __await(reader.read())];
        case 3:
          _a = _b.sent(), value = _a.value, done = _a.done;
          if (!done) return [3, 5];
          return [4, __await(void 0)];
        case 4:
          return [2, _b.sent()];
        case 5:
          return [4, __await(value)];
        case 6:
          return [4, _b.sent()];
        case 7:
          _b.sent();
          return [3, 2];
        case 8:
          return [3, 10];
        case 9:
          reader.releaseLock();
          return [7];
        case 10:
          return [2];
      }
    });
  });
}
function isReadableStreamLike(obj) {
  return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
function innerFrom(input) {
  if (input instanceof Observable) {
    return input;
  }
  if (input != null) {
    if (isInteropObservable(input)) {
      return fromInteropObservable(input);
    }
    if (isArrayLike(input)) {
      return fromArrayLike(input);
    }
    if (isPromise(input)) {
      return fromPromise(input);
    }
    if (isAsyncIterable(input)) {
      return fromAsyncIterable(input);
    }
    if (isIterable(input)) {
      return fromIterable(input);
    }
    if (isReadableStreamLike(input)) {
      return fromReadableStreamLike(input);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
  return new Observable(function(subscriber) {
    var obs = obj[observable]();
    if (isFunction(obs.subscribe)) {
      return obs.subscribe(subscriber);
    }
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function fromArrayLike(array) {
  return new Observable(function(subscriber) {
    for (var i = 0; i < array.length && !subscriber.closed; i++) {
      subscriber.next(array[i]);
    }
    subscriber.complete();
  });
}
function fromPromise(promise) {
  return new Observable(function(subscriber) {
    promise.then(function(value) {
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }, function(err) {
      return subscriber.error(err);
    }).then(null, reportUnhandledError);
  });
}
function fromIterable(iterable) {
  return new Observable(function(subscriber) {
    var e_1, _a;
    try {
      for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
        var value = iterable_1_1.value;
        subscriber.next(value);
        if (subscriber.closed) {
          return;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    subscriber.complete();
  });
}
function fromAsyncIterable(asyncIterable) {
  return new Observable(function(subscriber) {
    process$1(asyncIterable, subscriber).catch(function(err) {
      return subscriber.error(err);
    });
  });
}
function fromReadableStreamLike(readableStream) {
  return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process$1(asyncIterable, subscriber) {
  var asyncIterable_1, asyncIterable_1_1;
  var e_2, _a;
  return __awaiter(this, void 0, void 0, function() {
    var value, e_2_1;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 5, 6, 11]);
          asyncIterable_1 = __asyncValues(asyncIterable);
          _b.label = 1;
        case 1:
          return [4, asyncIterable_1.next()];
        case 2:
          if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
          value = asyncIterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return [2];
          }
          _b.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          e_2_1 = _b.sent();
          e_2 = { error: e_2_1 };
          return [3, 11];
        case 6:
          _b.trys.push([6, , 9, 10]);
          if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
          return [4, _a.call(asyncIterable_1)];
        case 7:
          _b.sent();
          _b.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (e_2) throw e_2.error;
          return [7];
        case 10:
          return [7];
        case 11:
          subscriber.complete();
          return [2];
      }
    });
  });
}
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
  if (delay === void 0) {
    delay = 0;
  }
  if (repeat === void 0) {
    repeat = false;
  }
  var scheduleSubscription = scheduler.schedule(function() {
    work();
    if (repeat) {
      parentSubscription.add(this.schedule(null, delay));
    } else {
      this.unsubscribe();
    }
  }, delay);
  parentSubscription.add(scheduleSubscription);
  if (!repeat) {
    return scheduleSubscription;
  }
}
function observeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return operate(function(source, subscriber) {
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.next(value);
      }, delay);
    }, function() {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.complete();
      }, delay);
    }, function(err) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.error(err);
      }, delay);
    }));
  });
}
function subscribeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return operate(function(source, subscriber) {
    subscriber.add(scheduler.schedule(function() {
      return source.subscribe(subscriber);
    }, delay));
  });
}
function scheduleObservable(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
function schedulePromise(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
function scheduleArray(input, scheduler) {
  return new Observable(function(subscriber) {
    var i = 0;
    return scheduler.schedule(function() {
      if (i === input.length) {
        subscriber.complete();
      } else {
        subscriber.next(input[i++]);
        if (!subscriber.closed) {
          this.schedule();
        }
      }
    });
  });
}
function scheduleIterable(input, scheduler) {
  return new Observable(function(subscriber) {
    var iterator$1;
    executeSchedule(subscriber, scheduler, function() {
      iterator$1 = input[iterator]();
      executeSchedule(subscriber, scheduler, function() {
        var _a;
        var value;
        var done;
        try {
          _a = iterator$1.next(), value = _a.value, done = _a.done;
        } catch (err) {
          subscriber.error(err);
          return;
        }
        if (done) {
          subscriber.complete();
        } else {
          subscriber.next(value);
        }
      }, 0, true);
    });
    return function() {
      return isFunction(iterator$1 === null || iterator$1 === void 0 ? void 0 : iterator$1.return) && iterator$1.return();
    };
  });
}
function scheduleAsyncIterable(input, scheduler) {
  if (!input) {
    throw new Error("Iterable cannot be null");
  }
  return new Observable(function(subscriber) {
    executeSchedule(subscriber, scheduler, function() {
      var iterator2 = input[Symbol.asyncIterator]();
      executeSchedule(subscriber, scheduler, function() {
        iterator2.next().then(function(result) {
          if (result.done) {
            subscriber.complete();
          } else {
            subscriber.next(result.value);
          }
        });
      }, 0, true);
    });
  });
}
function scheduleReadableStreamLike(input, scheduler) {
  return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}
function scheduled(input, scheduler) {
  if (input != null) {
    if (isInteropObservable(input)) {
      return scheduleObservable(input, scheduler);
    }
    if (isArrayLike(input)) {
      return scheduleArray(input, scheduler);
    }
    if (isPromise(input)) {
      return schedulePromise(input, scheduler);
    }
    if (isAsyncIterable(input)) {
      return scheduleAsyncIterable(input, scheduler);
    }
    if (isIterable(input)) {
      return scheduleIterable(input, scheduler);
    }
    if (isReadableStreamLike(input)) {
      return scheduleReadableStreamLike(input, scheduler);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function from(input, scheduler) {
  return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}
function map(project, thisArg) {
  return operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      subscriber.next(project.call(thisArg, value, index++));
    }));
  });
}
function filter(predicate, thisArg) {
  return operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return predicate.call(thisArg, value, index++) && subscriber.next(value);
    }));
  });
}
function catchError(selector) {
  return operate(function(source, subscriber) {
    var innerSub = null;
    var syncUnsub = false;
    var handledResult;
    innerSub = source.subscribe(createOperatorSubscriber(subscriber, void 0, void 0, function(err) {
      handledResult = innerFrom(selector(err, catchError(selector)(source)));
      if (innerSub) {
        innerSub.unsubscribe();
        innerSub = null;
        handledResult.subscribe(subscriber);
      } else {
        syncUnsub = true;
      }
    }));
    if (syncUnsub) {
      innerSub.unsubscribe();
      innerSub = null;
      handledResult.subscribe(subscriber);
    }
  });
}
const isWebWorker = () => {
  if (typeof self === "undefined") {
    return false;
  }
  const selfContext = self;
  return typeof selfContext.WorkerGlobalScope !== "undefined" && self instanceof selfContext.WorkerGlobalScope;
};
class Reachability {
  networkMonitor(_) {
    const globalObj = isWebWorker() ? self : typeof window !== "undefined" && window;
    if (!globalObj) {
      return from([{ online: true }]);
    }
    return new Observable((observer) => {
      observer.next({ online: globalObj.navigator.onLine });
      const notifyOnline = () => {
        observer.next({ online: true });
      };
      const notifyOffline = () => {
        observer.next({ online: false });
      };
      globalObj.addEventListener("online", notifyOnline);
      globalObj.addEventListener("offline", notifyOffline);
      Reachability._observers.push(observer);
      return () => {
        globalObj.removeEventListener("online", notifyOnline);
        globalObj.removeEventListener("offline", notifyOffline);
        Reachability._observers = Reachability._observers.filter((_observer) => _observer !== observer);
      };
    });
  }
  // expose observers to simulate offline mode for integration testing
  static _observerOverride(status) {
    for (const observer of this._observers) {
      if (observer.closed) {
        this._observers = this._observers.filter((_observer) => _observer !== observer);
        continue;
      }
      observer?.next && observer.next(status);
    }
  }
}
Reachability._observers = [];
const logger$8 = new ConsoleLogger$1("Auth");
class AuthClass {
  /**
   * Configure Auth category
   *
   * @internal
   *
   * @param authResourcesConfig - Resources configurations required by Auth providers.
   * @param authOptions - Client options used by library
   *
   * @returns void
   */
  configure(authResourcesConfig, authOptions) {
    this.authConfig = authResourcesConfig;
    this.authOptions = authOptions;
    if (authResourcesConfig && authResourcesConfig.Cognito?.userPoolEndpoint) {
      logger$8.warn(getCustomEndpointWarningMessage("Amazon Cognito User Pool"));
    }
    if (authResourcesConfig && authResourcesConfig.Cognito?.identityPoolEndpoint) {
      logger$8.warn(getCustomEndpointWarningMessage("Amazon Cognito Identity Pool"));
    }
  }
  /**
   * Fetch the auth tokens, and the temporary AWS credentials and identity if they are configured. By default it
   * will automatically refresh expired auth tokens if a valid refresh token is present. You can force a refresh
   * of non-expired tokens with `{ forceRefresh: true }` input.
   *
   * @param options - Options configuring the fetch behavior.
   *
   * @returns Promise of current auth session {@link AuthSession}.
   */
  async fetchAuthSession(options = {}) {
    let credentialsAndIdentityId;
    let userSub;
    const tokens = await this.getTokens(options);
    if (tokens) {
      userSub = tokens.accessToken?.payload?.sub;
      credentialsAndIdentityId = await this.authOptions?.credentialsProvider?.getCredentialsAndIdentityId({
        authConfig: this.authConfig,
        tokens,
        authenticated: true,
        forceRefresh: options.forceRefresh
      });
    } else {
      credentialsAndIdentityId = await this.authOptions?.credentialsProvider?.getCredentialsAndIdentityId({
        authConfig: this.authConfig,
        authenticated: false,
        forceRefresh: options.forceRefresh
      });
    }
    return {
      tokens,
      credentials: credentialsAndIdentityId?.credentials,
      identityId: credentialsAndIdentityId?.identityId,
      userSub
    };
  }
  async clearCredentials() {
    await this.authOptions?.credentialsProvider?.clearCredentialsAndIdentityId();
  }
  async getTokens(options) {
    return await this.authOptions?.tokenProvider?.getTokens(options) ?? void 0;
  }
}
const getCustomEndpointWarningMessage = (target) => `You are using a custom Amazon ${target} endpoint, ensure the endpoint is correct.`;
class AmplifyClass {
  constructor() {
    this.oAuthListener = void 0;
    this.isConfigured = false;
    this.resourcesConfig = {};
    this.libraryOptions = {};
    this.Auth = new AuthClass();
  }
  /**
   * Configures Amplify for use with your back-end resources.
   *
   * @remarks
   * This API does not perform any merging of either `resourcesConfig` or `libraryOptions`. The most recently
   * provided values will be used after configuration.
   *
   * @remarks
   * `configure` can be used to specify additional library options where available for supported categories.
   *
   * @param resourceConfig - Back-end resource configuration. Typically provided via the `aws-exports.js` file.
   * @param libraryOptions - Additional options for customizing the behavior of the library.
   */
  configure(resourcesConfig, libraryOptions) {
    const resolvedResourceConfig = parseAmplifyConfig(resourcesConfig);
    this.resourcesConfig = resolvedResourceConfig;
    if (libraryOptions) {
      this.libraryOptions = libraryOptions;
    }
    this.resourcesConfig = deepFreeze(this.resourcesConfig);
    this.Auth.configure(this.resourcesConfig.Auth, this.libraryOptions.Auth);
    Hub$1.dispatch("core", {
      event: "configure",
      data: this.resourcesConfig
    }, "Configure", AMPLIFY_SYMBOL$1);
    this.notifyOAuthListener();
    this.isConfigured = true;
  }
  /**
   * Provides access to the current back-end resource configuration for the Library.
   *
   * @returns Returns the immutable back-end resource configuration.
   */
  getConfig() {
    if (!this.isConfigured) {
      console.warn(`Amplify has not been configured. Please call Amplify.configure() before using this service.`);
    }
    return this.resourcesConfig;
  }
  /** @internal */
  [ADD_OAUTH_LISTENER](listener) {
    if (this.resourcesConfig.Auth?.Cognito.loginWith?.oauth) {
      listener(this.resourcesConfig.Auth?.Cognito);
    } else {
      this.oAuthListener = listener;
    }
  }
  notifyOAuthListener() {
    if (!this.resourcesConfig.Auth?.Cognito.loginWith?.oauth || !this.oAuthListener) {
      return;
    }
    this.oAuthListener(this.resourcesConfig.Auth?.Cognito);
    this.oAuthListener = void 0;
  }
}
const Amplify = new AmplifyClass();
const fetchAuthSession$1 = (amplify, options) => {
  return amplify.Auth.fetchAuthSession(options);
};
const fetchAuthSession = (options) => {
  return fetchAuthSession$1(Amplify, options);
};
const parseMetadata$1 = (response) => {
  const { headers, statusCode } = response;
  return {
    ...isMetadataBearer$1(response) ? response.$metadata : {},
    httpStatusCode: statusCode,
    requestId: headers["x-amzn-requestid"] ?? headers["x-amzn-request-id"] ?? headers["x-amz-request-id"],
    extendedRequestId: headers["x-amz-id-2"],
    cfId: headers["x-amz-cf-id"]
  };
};
const isMetadataBearer$1 = (response) => typeof response?.$metadata === "object";
const parseJsonError$1 = async (response) => {
  if (!response || response.statusCode < 300) {
    return;
  }
  const body = await parseJsonBody$1(response);
  const sanitizeErrorCode = (rawValue) => {
    const [cleanValue] = rawValue.toString().split(/[,:]+/);
    if (cleanValue.includes("#")) {
      return cleanValue.split("#")[1];
    }
    return cleanValue;
  };
  const code = sanitizeErrorCode(response.headers["x-amzn-errortype"] ?? body.code ?? body.__type ?? "UnknownError");
  const message = body.message ?? body.Message ?? "Unknown error";
  const error2 = new Error(message);
  return Object.assign(error2, {
    name: code,
    $metadata: parseMetadata$1(response)
  });
};
const parseJsonBody$1 = async (response) => {
  if (!response.body) {
    throw new Error("Missing response payload");
  }
  const output = await response.body.json();
  return Object.assign(output, {
    $metadata: parseMetadata$1(response)
  });
};
const MAX_DELAY_MS$2 = 5 * 60 * 1e3;
function jitteredBackoff$3(maxDelayMs = MAX_DELAY_MS$2) {
  const BASE_TIME_MS = 100;
  const JITTER_FACTOR = 100;
  return (attempt) => {
    const delay = 2 ** attempt * BASE_TIME_MS + JITTER_FACTOR * Math.random();
    return delay > maxDelayMs ? false : delay;
  };
}
const DEFAULT_RETRY_ATTEMPTS$1 = 3;
const DEFAULT_MAX_DELAY_MS$1 = 5 * 60 * 1e3;
const jitteredBackoff$2 = (attempt) => {
  const delayFunction = jitteredBackoff$3(DEFAULT_MAX_DELAY_MS$1);
  const delay = delayFunction(attempt);
  return delay === false ? DEFAULT_MAX_DELAY_MS$1 : delay;
};
const CLOCK_SKEW_ERROR_CODES$1 = [
  "AuthFailure",
  "InvalidSignatureException",
  "RequestExpired",
  "RequestInTheFuture",
  "RequestTimeTooSkewed",
  "SignatureDoesNotMatch",
  "BadRequestException"
  // API Gateway
];
const isClockSkewError$1 = (errorCode) => !!errorCode && CLOCK_SKEW_ERROR_CODES$1.includes(errorCode);
const getRetryDecider$1 = (errorParser) => async (response, error2) => {
  const parsedError = error2 ?? await errorParser(response) ?? void 0;
  const errorCode = parsedError?.code || parsedError?.name;
  const statusCode = response?.statusCode;
  const isRetryable = isConnectionError$1(error2) || isThrottlingError$1(statusCode, errorCode) || isClockSkewError$1(errorCode) || isServerSideError$1(statusCode, errorCode);
  return {
    retryable: isRetryable
  };
};
const THROTTLING_ERROR_CODES$1 = [
  "BandwidthLimitExceeded",
  "EC2ThrottledException",
  "LimitExceededException",
  "PriorRequestNotComplete",
  "ProvisionedThroughputExceededException",
  "RequestLimitExceeded",
  "RequestThrottled",
  "RequestThrottledException",
  "SlowDown",
  "ThrottledException",
  "Throttling",
  "ThrottlingException",
  "TooManyRequestsException"
];
const TIMEOUT_ERROR_CODES$1 = [
  "TimeoutError",
  "RequestTimeout",
  "RequestTimeoutException"
];
const isThrottlingError$1 = (statusCode, errorCode) => statusCode === 429 || !!errorCode && THROTTLING_ERROR_CODES$1.includes(errorCode);
const isConnectionError$1 = (error2) => [
  AmplifyErrorCode$1.NetworkError,
  // TODO(vNext): unify the error code `ERR_NETWORK` used by the Storage XHR handler
  "ERR_NETWORK"
].includes(error2?.name);
const isServerSideError$1 = (statusCode, errorCode) => !!statusCode && [500, 502, 503, 504].includes(statusCode) || !!errorCode && TIMEOUT_ERROR_CODES$1.includes(errorCode);
const retryMiddlewareFactory$1 = ({ maxAttempts = DEFAULT_RETRY_ATTEMPTS$1, retryDecider, computeDelay, abortSignal }) => {
  if (maxAttempts < 1) {
    throw new Error("maxAttempts must be greater than 0");
  }
  return (next, context) => async function retryMiddleware(request) {
    let error2;
    let attemptsCount = context.attemptsCount ?? 0;
    let response;
    const handleTerminalErrorOrResponse = () => {
      if (response) {
        addOrIncrementMetadataAttempts$1(response, attemptsCount);
        return response;
      } else {
        addOrIncrementMetadataAttempts$1(error2, attemptsCount);
        throw error2;
      }
    };
    while (!abortSignal?.aborted && attemptsCount < maxAttempts) {
      try {
        response = await next(request);
        error2 = void 0;
      } catch (e) {
        error2 = e;
        response = void 0;
      }
      attemptsCount = (context.attemptsCount ?? 0) > attemptsCount ? context.attemptsCount ?? 0 : attemptsCount + 1;
      context.attemptsCount = attemptsCount;
      const { isCredentialsExpiredError, retryable } = await retryDecider(response, error2, context);
      if (retryable) {
        context.isCredentialsExpired = !!isCredentialsExpiredError;
        if (!abortSignal?.aborted && attemptsCount < maxAttempts) {
          const delay = computeDelay(attemptsCount);
          await cancellableSleep$1(delay, abortSignal);
        }
        continue;
      } else {
        return handleTerminalErrorOrResponse();
      }
    }
    if (abortSignal?.aborted) {
      throw new Error("Request aborted.");
    } else {
      return handleTerminalErrorOrResponse();
    }
  };
};
const cancellableSleep$1 = (timeoutMs, abortSignal) => {
  if (abortSignal?.aborted) {
    return Promise.resolve();
  }
  let timeoutId;
  let sleepPromiseResolveFn;
  const sleepPromise = new Promise((resolve) => {
    sleepPromiseResolveFn = resolve;
    timeoutId = setTimeout(resolve, timeoutMs);
  });
  abortSignal?.addEventListener("abort", function cancelSleep(_) {
    clearTimeout(timeoutId);
    abortSignal?.removeEventListener("abort", cancelSleep);
    sleepPromiseResolveFn();
  });
  return sleepPromise;
};
const addOrIncrementMetadataAttempts$1 = (nextHandlerOutput, attempts) => {
  if (Object.prototype.toString.call(nextHandlerOutput) !== "[object Object]") {
    return;
  }
  nextHandlerOutput.$metadata = {
    ...nextHandlerOutput.$metadata ?? {},
    attempts
  };
};
const amplifyUuid$1 = v4$1;
const userAgentMiddlewareFactory$1 = ({ userAgentHeader = "x-amz-user-agent", userAgentValue = "" }) => (next) => {
  return async function userAgentMiddleware(request) {
    if (userAgentValue.trim().length === 0) {
      const result = await next(request);
      return result;
    } else {
      const headerName = userAgentHeader.toLowerCase();
      request.headers[headerName] = request.headers[headerName] ? `${request.headers[headerName]} ${userAgentValue}` : userAgentValue;
      const response = await next(request);
      return response;
    }
  };
};
const composeTransferHandler$1 = (coreHandler, middleware) => (request, options) => {
  const context = {};
  let composedHandler = (composeHandlerRequest) => coreHandler(composeHandlerRequest, options);
  for (let i = middleware.length - 1; i >= 0; i--) {
    const m = middleware[i];
    const resolvedMiddleware = m(options);
    composedHandler = resolvedMiddleware(composedHandler, context);
  }
  return composedHandler(request);
};
const withMemoization$1 = (payloadAccessor) => {
  let cached;
  return () => {
    if (!cached) {
      cached = payloadAccessor();
    }
    return cached;
  };
};
const shouldSendBody$1 = (method) => !["HEAD", "GET"].includes(method.toUpperCase());
const fetchTransferHandler$1 = async ({ url, method, headers, body }, { abortSignal, cache, withCrossDomainCredentials }) => {
  let resp;
  try {
    resp = await fetch(url, {
      method,
      headers,
      body: shouldSendBody$1(method) ? body : void 0,
      signal: abortSignal,
      cache,
      credentials: withCrossDomainCredentials ? "include" : "same-origin"
    });
  } catch (e) {
    if (e instanceof TypeError) {
      throw new AmplifyError$1({
        name: AmplifyErrorCode$1.NetworkError,
        message: "A network error has occurred.",
        underlyingError: e
      });
    }
    throw e;
  }
  const responseHeaders = {};
  resp.headers?.forEach((value, key) => {
    responseHeaders[key.toLowerCase()] = value;
  });
  const httpResponse = {
    statusCode: resp.status,
    headers: responseHeaders,
    body: null
  };
  const bodyWithMixin = Object.assign(resp.body ?? {}, {
    text: withMemoization$1(() => resp.text()),
    blob: withMemoization$1(() => resp.blob()),
    json: withMemoization$1(() => resp.json())
  });
  return {
    ...httpResponse,
    body: bodyWithMixin
  };
};
const AmplifyUrl$1 = URL;
const AmplifyUrlSearchParams = URLSearchParams;
let PlatformNotSupportedError$1 = class PlatformNotSupportedError extends AmplifyError$1 {
  constructor() {
    super({
      name: AmplifyErrorCode$1.PlatformNotSupported,
      message: "Function not supported on current platform"
    });
  }
};
let KeyValueStorage$1 = class KeyValueStorage {
  constructor(storage) {
    this.storage = storage;
  }
  /**
   * This is used to set a specific item in storage
   * @param {string} key - the key for the item
   * @param {object} value - the value
   * @returns {string} value that was set
   */
  async setItem(key, value) {
    if (!this.storage)
      throw new PlatformNotSupportedError$1();
    this.storage.setItem(key, value);
  }
  /**
   * This is used to get a specific key from storage
   * @param {string} key - the key for the item
   * This is used to clear the storage
   * @returns {string} the data item
   */
  async getItem(key) {
    if (!this.storage)
      throw new PlatformNotSupportedError$1();
    return this.storage.getItem(key);
  }
  /**
   * This is used to remove an item from storage
   * @param {string} key - the key being set
   * @returns {string} value - value that was deleted
   */
  async removeItem(key) {
    if (!this.storage)
      throw new PlatformNotSupportedError$1();
    this.storage.removeItem(key);
  }
  /**
   * This is used to clear the storage
   * @returns {string} nothing
   */
  async clear() {
    if (!this.storage)
      throw new PlatformNotSupportedError$1();
    this.storage.clear();
  }
};
let InMemoryStorage$1 = class InMemoryStorage {
  constructor() {
    this.storage = /* @__PURE__ */ new Map();
  }
  get length() {
    return this.storage.size;
  }
  key(index) {
    if (index > this.length - 1) {
      return null;
    }
    return Array.from(this.storage.keys())[index];
  }
  setItem(key, value) {
    this.storage.set(key, value);
  }
  getItem(key) {
    return this.storage.get(key) ?? null;
  }
  removeItem(key) {
    this.storage.delete(key);
  }
  clear() {
    this.storage.clear();
  }
};
const logger$7 = new ConsoleLogger$1("CoreStorageUtils");
const getLocalStorageWithFallback$1 = () => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage;
    }
  } catch (e) {
    logger$7.info("localStorage not found. InMemoryStorage is used as a fallback.");
  }
  return new InMemoryStorage$1();
};
const getSessionStorageWithFallback$1 = () => {
  try {
    if (typeof window !== "undefined" && window.sessionStorage) {
      window.sessionStorage.getItem("test");
      return window.sessionStorage;
    }
    throw new Error("sessionStorage is not defined");
  } catch (e) {
    logger$7.info("sessionStorage not found. InMemoryStorage is used as a fallback.");
    return new InMemoryStorage$1();
  }
};
let DefaultStorage$1 = class DefaultStorage extends KeyValueStorage$1 {
  constructor() {
    super(getLocalStorageWithFallback$1());
  }
};
let SessionStorage$1 = class SessionStorage extends KeyValueStorage$1 {
  constructor() {
    super(getSessionStorageWithFallback$1());
  }
};
let SyncKeyValueStorage$1 = class SyncKeyValueStorage {
  constructor(storage) {
    this._storage = storage;
  }
  get storage() {
    if (!this._storage)
      throw new PlatformNotSupportedError$1();
    return this._storage;
  }
  /**
   * This is used to set a specific item in storage
   * @param {string} key - the key for the item
   * @param {object} value - the value
   * @returns {string} value that was set
   */
  setItem(key, value) {
    this.storage.setItem(key, value);
  }
  /**
   * This is used to get a specific key from storage
   * @param {string} key - the key for the item
   * This is used to clear the storage
   * @returns {string} the data item
   */
  getItem(key) {
    return this.storage.getItem(key);
  }
  /**
   * This is used to remove an item from storage
   * @param {string} key - the key being set
   * @returns {string} value - value that was deleted
   */
  removeItem(key) {
    this.storage.removeItem(key);
  }
  /**
   * This is used to clear the storage
   * @returns {string} nothing
   */
  clear() {
    this.storage.clear();
  }
};
let SyncSessionStorage$1 = class SyncSessionStorage extends SyncKeyValueStorage$1 {
  constructor() {
    super(getSessionStorageWithFallback$1());
  }
};
/*! js-cookie v3.0.5 | MIT */
function assign(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target;
}
var defaultConverter = {
  read: function(value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function(value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    );
  }
};
function init(converter, defaultAttributes) {
  function set(name2, value, attributes) {
    if (typeof document === "undefined") {
      return;
    }
    attributes = assign({}, defaultAttributes, attributes);
    if (typeof attributes.expires === "number") {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }
    name2 = encodeURIComponent(name2).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
    var stringifiedAttributes = "";
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue;
      }
      stringifiedAttributes += "; " + attributeName;
      if (attributes[attributeName] === true) {
        continue;
      }
      stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
    }
    return document.cookie = name2 + "=" + converter.write(value, name2) + stringifiedAttributes;
  }
  function get(name2) {
    if (typeof document === "undefined" || arguments.length && !name2) {
      return;
    }
    var cookies = document.cookie ? document.cookie.split("; ") : [];
    var jar = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split("=");
      var value = parts.slice(1).join("=");
      try {
        var found = decodeURIComponent(parts[0]);
        jar[found] = converter.read(value, found);
        if (name2 === found) {
          break;
        }
      } catch (e) {
      }
    }
    return name2 ? jar[name2] : jar;
  }
  return Object.create(
    {
      set,
      get,
      remove: function(name2, attributes) {
        set(
          name2,
          "",
          assign({}, attributes, {
            expires: -1
          })
        );
      },
      withAttributes: function(attributes) {
        return init(this.converter, assign({}, this.attributes, attributes));
      },
      withConverter: function(converter2) {
        return init(assign({}, this.converter, converter2), this.attributes);
      }
    },
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) }
    }
  );
}
var api = init(defaultConverter, { path: "/" });
class CookieStorage {
  constructor(data = {}) {
    const { path, domain, expires, sameSite, secure } = data;
    this.domain = domain;
    this.path = path || "/";
    this.expires = Object.prototype.hasOwnProperty.call(data, "expires") ? expires : 365;
    this.secure = Object.prototype.hasOwnProperty.call(data, "secure") ? secure : true;
    if (Object.prototype.hasOwnProperty.call(data, "sameSite")) {
      if (!sameSite || !["strict", "lax", "none"].includes(sameSite)) {
        throw new Error('The sameSite value of cookieStorage must be "lax", "strict" or "none".');
      }
      if (sameSite === "none" && !this.secure) {
        throw new Error("sameSite = None requires the Secure attribute in latest browser versions.");
      }
      this.sameSite = sameSite;
    }
  }
  async setItem(key, value) {
    api.set(key, value, this.getData());
  }
  async getItem(key) {
    const item = api.get(key);
    return item ?? null;
  }
  async removeItem(key) {
    api.remove(key, this.getData());
  }
  async clear() {
    const cookie = api.get();
    const promises = Object.keys(cookie).map((key) => this.removeItem(key));
    await Promise.all(promises);
  }
  getData() {
    return {
      path: this.path,
      expires: this.expires,
      domain: this.domain,
      secure: this.secure,
      ...this.sameSite && { sameSite: this.sameSite }
    };
  }
}
const defaultStorage$1 = new DefaultStorage$1();
new SessionStorage$1();
new SyncSessionStorage$1();
const getSignedHeaders = (headers) => Object.keys(headers).map((key) => key.toLowerCase()).sort().join(";");
const AMZ_DATE_QUERY_PARAM = "X-Amz-Date";
const TOKEN_QUERY_PARAM = "X-Amz-Security-Token";
const AUTH_HEADER = "authorization";
const HOST_HEADER = "host";
const AMZ_DATE_HEADER = AMZ_DATE_QUERY_PARAM.toLowerCase();
const TOKEN_HEADER = TOKEN_QUERY_PARAM.toLowerCase();
const KEY_TYPE_IDENTIFIER = "aws4_request";
const SHA256_ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256";
const SIGNATURE_IDENTIFIER = "AWS4";
const EMPTY_HASH = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
const UNSIGNED_PAYLOAD = "UNSIGNED-PAYLOAD";
const getCredentialScope = (date, region, service) => `${date}/${region}/${service}/${KEY_TYPE_IDENTIFIER}`;
const getFormattedDates = (date) => {
  const longDate = date.toISOString().replace(/[:-]|\.\d{3}/g, "");
  return {
    longDate,
    shortDate: longDate.slice(0, 8)
  };
};
const getSigningValues = ({ credentials, signingDate = /* @__PURE__ */ new Date(), signingRegion, signingService, uriEscapePath = true }) => {
  const { accessKeyId, secretAccessKey, sessionToken } = credentials;
  const { longDate, shortDate } = getFormattedDates(signingDate);
  const credentialScope = getCredentialScope(shortDate, signingRegion, signingService);
  return {
    accessKeyId,
    credentialScope,
    longDate,
    secretAccessKey,
    sessionToken,
    shortDate,
    signingRegion,
    signingService,
    uriEscapePath
  };
};
const getHashedData = (key, data) => {
  const sha256 = new Sha256(key ?? void 0);
  sha256.update(data);
  const hashedData = sha256.digestSync();
  return hashedData;
};
const getHashedDataAsHex = (key, data) => {
  const hashedData = getHashedData(key, data);
  return toHex(hashedData);
};
const getCanonicalHeaders = (headers) => Object.entries(headers).map(([key, value]) => ({
  key: key.toLowerCase(),
  value: value?.trim().replace(/\s+/g, " ") ?? ""
})).sort((a, b) => a.key < b.key ? -1 : 1).map((entry) => `${entry.key}:${entry.value}
`).join("");
const getCanonicalQueryString = (searchParams) => Array.from(searchParams).sort(([keyA, valA], [keyB, valB]) => {
  if (keyA === keyB) {
    return valA < valB ? -1 : 1;
  }
  return keyA < keyB ? -1 : 1;
}).map(([key, val]) => `${escapeUri(key)}=${escapeUri(val)}`).join("&");
const escapeUri = (uri) => encodeURIComponent(uri).replace(/[!'()*]/g, hexEncode);
const hexEncode = (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`;
const getCanonicalUri = (pathname, uriEscapePath = true) => pathname ? uriEscapePath ? encodeURIComponent(pathname).replace(/%2F/g, "/") : pathname : "/";
const getHashedPayload = (body) => {
  if (body == null) {
    return EMPTY_HASH;
  }
  if (isSourceData(body)) {
    const hashedData = getHashedDataAsHex(null, body);
    return hashedData;
  }
  return UNSIGNED_PAYLOAD;
};
const isSourceData = (body) => typeof body === "string" || ArrayBuffer.isView(body) || isArrayBuffer(body);
const isArrayBuffer = (arg) => typeof ArrayBuffer === "function" && arg instanceof ArrayBuffer || Object.prototype.toString.call(arg) === "[object ArrayBuffer]";
const getCanonicalRequest = ({ body, headers, method, url }, uriEscapePath = true) => [
  method,
  getCanonicalUri(url.pathname, uriEscapePath),
  getCanonicalQueryString(url.searchParams),
  getCanonicalHeaders(headers),
  getSignedHeaders(headers),
  getHashedPayload(body)
].join("\n");
const getSigningKey = (secretAccessKey, date, region, service) => {
  const key = `${SIGNATURE_IDENTIFIER}${secretAccessKey}`;
  const dateKey = getHashedData(key, date);
  const regionKey = getHashedData(dateKey, region);
  const serviceKey = getHashedData(regionKey, service);
  const signingKey = getHashedData(serviceKey, KEY_TYPE_IDENTIFIER);
  return signingKey;
};
const getStringToSign = (date, credentialScope, hashedRequest) => [SHA256_ALGORITHM_IDENTIFIER, date, credentialScope, hashedRequest].join("\n");
const getSignature = (request, { credentialScope, longDate, secretAccessKey, shortDate, signingRegion, signingService, uriEscapePath }) => {
  const canonicalRequest = getCanonicalRequest(request, uriEscapePath);
  const hashedRequest = getHashedDataAsHex(null, canonicalRequest);
  const stringToSign = getStringToSign(longDate, credentialScope, hashedRequest);
  const signature = getHashedDataAsHex(getSigningKey(secretAccessKey, shortDate, signingRegion, signingService), stringToSign);
  return signature;
};
const signRequest = (request, options) => {
  const signingValues = getSigningValues(options);
  const { accessKeyId, credentialScope, longDate, sessionToken } = signingValues;
  const headers = { ...request.headers };
  headers[HOST_HEADER] = request.url.host;
  headers[AMZ_DATE_HEADER] = longDate;
  if (sessionToken) {
    headers[TOKEN_HEADER] = sessionToken;
  }
  const requestToSign = { ...request, headers };
  const signature = getSignature(requestToSign, signingValues);
  const credentialEntry = `Credential=${accessKeyId}/${credentialScope}`;
  const signedHeadersEntry = `SignedHeaders=${getSignedHeaders(headers)}`;
  const signatureEntry = `Signature=${signature}`;
  headers[AUTH_HEADER] = `${SHA256_ALGORITHM_IDENTIFIER} ${credentialEntry}, ${signedHeadersEntry}, ${signatureEntry}`;
  return requestToSign;
};
const getSkewCorrectedDate = (systemClockOffset) => new Date(Date.now() + systemClockOffset);
const SKEW_WINDOW = 5 * 60 * 1e3;
const isClockSkewed = (clockTimeInMilliseconds, clockOffsetInMilliseconds) => Math.abs(getSkewCorrectedDate(clockOffsetInMilliseconds).getTime() - clockTimeInMilliseconds) >= SKEW_WINDOW;
const getUpdatedSystemClockOffset = (clockTimeInMilliseconds, currentSystemClockOffset) => {
  if (isClockSkewed(clockTimeInMilliseconds, currentSystemClockOffset)) {
    return clockTimeInMilliseconds - Date.now();
  }
  return currentSystemClockOffset;
};
const signingMiddlewareFactory = ({ credentials, region, service, uriEscapePath = true }) => {
  let currentSystemClockOffset;
  return (next, context) => async function signingMiddleware(request) {
    currentSystemClockOffset = currentSystemClockOffset ?? 0;
    const signRequestOptions = {
      credentials: typeof credentials === "function" ? await credentials({
        forceRefresh: !!context?.isCredentialsExpired
      }) : credentials,
      signingDate: getSkewCorrectedDate(currentSystemClockOffset),
      signingRegion: region,
      signingService: service,
      uriEscapePath
    };
    const signedRequest = await signRequest(request, signRequestOptions);
    const response = await next(signedRequest);
    const dateString = getDateHeader(response);
    if (dateString) {
      currentSystemClockOffset = getUpdatedSystemClockOffset(Date.parse(dateString), currentSystemClockOffset);
    }
    return response;
  };
};
const getDateHeader = ({ headers } = {}) => headers?.date ?? headers?.Date ?? headers?.["x-amz-date"];
class NonRetryableError extends Error {
  constructor() {
    super(...arguments);
    this.nonRetryable = true;
  }
}
const jitteredExponentialRetry = (functionToRetry, args, maxDelayMs = MAX_DELAY_MS$2, onTerminate) => retry(functionToRetry, args, jitteredBackoff$3(maxDelayMs));
class ApiError extends AmplifyError$1 {
  /**
   * The unwrapped HTTP response causing the given API error.
   */
  get response() {
    return this._response ? replicateApiErrorResponse(this._response) : void 0;
  }
  constructor(params) {
    super(params);
    this.constructor = ApiError;
    Object.setPrototypeOf(this, ApiError.prototype);
    if (params.response) {
      this._response = params.response;
    }
  }
}
const replicateApiErrorResponse = (response) => ({
  ...response,
  headers: { ...response.headers }
});
function bytesToString(input) {
  return Array.from(input, (byte) => String.fromCodePoint(byte)).join("");
}
const base64Encoder = {
  /**
   * Convert input to base64-encoded string
   * @param input - string to convert to base64
   * @param options - encoding options that can optionally produce a base64url string
   * @returns base64-encoded string
   */
  convert(input, options = {
    urlSafe: false,
    skipPadding: false
  }) {
    const inputStr = typeof input === "string" ? input : bytesToString(input);
    let encodedStr = getBtoa()(inputStr);
    if (options.urlSafe) {
      encodedStr = encodedStr.replace(/\+/g, "-").replace(/\//g, "_");
    }
    if (options.skipPadding) {
      encodedStr = encodedStr.replace(/=/g, "");
    }
    return encodedStr;
  }
};
const AWS_CLOUDWATCH_CATEGORY = "Logging";
const NO_HUBCALLBACK_PROVIDED_EXCEPTION = "NoHubcallbackProvidedException";
var LogType;
(function(LogType2) {
  LogType2["DEBUG"] = "DEBUG";
  LogType2["ERROR"] = "ERROR";
  LogType2["INFO"] = "INFO";
  LogType2["WARN"] = "WARN";
  LogType2["VERBOSE"] = "VERBOSE";
  LogType2["NONE"] = "NONE";
})(LogType || (LogType = {}));
const LOG_LEVELS = {
  VERBOSE: 1,
  DEBUG: 2,
  INFO: 3,
  WARN: 4,
  ERROR: 5,
  NONE: 6
};
class ConsoleLogger2 {
  /**
   * @constructor
   * @param {string} name - Name of the logger
   */
  constructor(name2, level = LogType.WARN) {
    this.name = name2;
    this.level = level;
    this._pluggables = [];
  }
  _padding(n) {
    return n < 10 ? "0" + n : "" + n;
  }
  _ts() {
    const dt = /* @__PURE__ */ new Date();
    return [this._padding(dt.getMinutes()), this._padding(dt.getSeconds())].join(":") + "." + dt.getMilliseconds();
  }
  configure(config2) {
    if (!config2)
      return this._config;
    this._config = config2;
    return this._config;
  }
  /**
   * Write log
   * @method
   * @memeberof Logger
   * @param {LogType|string} type - log type, default INFO
   * @param {string|object} msg - Logging message or object
   */
  _log(type, ...msg) {
    let loggerLevelName = this.level;
    if (ConsoleLogger2.LOG_LEVEL) {
      loggerLevelName = ConsoleLogger2.LOG_LEVEL;
    }
    if (typeof window !== "undefined" && window.LOG_LEVEL) {
      loggerLevelName = window.LOG_LEVEL;
    }
    const loggerLevel = LOG_LEVELS[loggerLevelName];
    const typeLevel = LOG_LEVELS[type];
    if (!(typeLevel >= loggerLevel)) {
      return;
    }
    let log = console.log.bind(console);
    if (type === LogType.ERROR && console.error) {
      log = console.error.bind(console);
    }
    if (type === LogType.WARN && console.warn) {
      log = console.warn.bind(console);
    }
    if (ConsoleLogger2.BIND_ALL_LOG_LEVELS) {
      if (type === LogType.INFO && console.info) {
        log = console.info.bind(console);
      }
      if (type === LogType.DEBUG && console.debug) {
        log = console.debug.bind(console);
      }
    }
    const prefix = `[${type}] ${this._ts()} ${this.name}`;
    let message = "";
    if (msg.length === 1 && typeof msg[0] === "string") {
      message = `${prefix} - ${msg[0]}`;
      log(message);
    } else if (msg.length === 1) {
      message = `${prefix} ${msg[0]}`;
      log(prefix, msg[0]);
    } else if (typeof msg[0] === "string") {
      let obj = msg.slice(1);
      if (obj.length === 1) {
        obj = obj[0];
      }
      message = `${prefix} - ${msg[0]} ${obj}`;
      log(`${prefix} - ${msg[0]}`, obj);
    } else {
      message = `${prefix} ${msg}`;
      log(prefix, msg);
    }
    for (const plugin of this._pluggables) {
      const logEvent = { message, timestamp: Date.now() };
      plugin.pushLogs([logEvent]);
    }
  }
  /**
   * Write General log. Default to INFO
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  log(...msg) {
    this._log(LogType.INFO, ...msg);
  }
  /**
   * Write INFO log
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  info(...msg) {
    this._log(LogType.INFO, ...msg);
  }
  /**
   * Write WARN log
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  warn(...msg) {
    this._log(LogType.WARN, ...msg);
  }
  /**
   * Write ERROR log
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  error(...msg) {
    this._log(LogType.ERROR, ...msg);
  }
  /**
   * Write DEBUG log
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  debug(...msg) {
    this._log(LogType.DEBUG, ...msg);
  }
  /**
   * Write VERBOSE log
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  verbose(...msg) {
    this._log(LogType.VERBOSE, ...msg);
  }
  addPluggable(pluggable) {
    if (pluggable && pluggable.getCategoryName() === AWS_CLOUDWATCH_CATEGORY) {
      this._pluggables.push(pluggable);
      pluggable.configure(this._config);
    }
  }
  listPluggables() {
    return this._pluggables;
  }
}
ConsoleLogger2.LOG_LEVEL = null;
ConsoleLogger2.BIND_ALL_LOG_LEVELS = false;
class AmplifyError2 extends Error {
  /**
   *  Constructs an AmplifyError.
   *
   * @param message text that describes the main problem.
   * @param underlyingError the underlying cause of the error.
   * @param recoverySuggestion suggestion to recover from the error.
   *
   */
  constructor({ message, name: name2, recoverySuggestion, underlyingError, metadata }) {
    super(message);
    this.name = name2;
    this.underlyingError = underlyingError;
    this.recoverySuggestion = recoverySuggestion;
    if (metadata) {
      const { extendedRequestId, httpStatusCode, requestId } = metadata;
      this.metadata = { extendedRequestId, httpStatusCode, requestId };
    }
    this.constructor = AmplifyError2;
    Object.setPrototypeOf(this, AmplifyError2.prototype);
  }
}
var AmplifyErrorCode;
(function(AmplifyErrorCode2) {
  AmplifyErrorCode2["NoEndpointId"] = "NoEndpointId";
  AmplifyErrorCode2["PlatformNotSupported"] = "PlatformNotSupported";
  AmplifyErrorCode2["Unknown"] = "Unknown";
  AmplifyErrorCode2["NetworkError"] = "NetworkError";
})(AmplifyErrorCode || (AmplifyErrorCode = {}));
const createAssertionFunction = (errorMap, AssertionError = AmplifyError2) => (assertion, name2, additionalContext) => {
  const { message, recoverySuggestion } = errorMap[name2];
  if (!assertion) {
    throw new AssertionError({
      name: name2,
      message: additionalContext ? `${message} ${additionalContext}` : message,
      recoverySuggestion
    });
  }
};
const AMPLIFY_SYMBOL = typeof Symbol !== "undefined" ? Symbol("amplify_default") : "@@amplify_default";
const logger$6 = new ConsoleLogger2("Hub");
class HubClass2 {
  constructor(name2) {
    this.listeners = /* @__PURE__ */ new Map();
    this.protectedChannels = [
      "core",
      "auth",
      "api",
      "analytics",
      "interactions",
      "pubsub",
      "storage",
      "ui",
      "xr"
    ];
    this.name = name2;
  }
  /**
   * Used internally to remove a Hub listener.
   *
   * @remarks
   * This private method is for internal use only. Instead of calling Hub.remove, call the result of Hub.listen.
   */
  _remove(channel, listener) {
    const holder = this.listeners.get(channel);
    if (!holder) {
      logger$6.warn(`No listeners for ${channel}`);
      return;
    }
    this.listeners.set(channel, [
      ...holder.filter(({ callback }) => callback !== listener)
    ]);
  }
  dispatch(channel, payload, source, ampSymbol) {
    if (typeof channel === "string" && this.protectedChannels.indexOf(channel) > -1) {
      const hasAccess = ampSymbol === AMPLIFY_SYMBOL;
      if (!hasAccess) {
        logger$6.warn(`WARNING: ${channel} is protected and dispatching on it can have unintended consequences`);
      }
    }
    const capsule = {
      channel,
      payload: { ...payload },
      source,
      patternInfo: []
    };
    try {
      this._toListeners(capsule);
    } catch (e) {
      logger$6.error(e);
    }
  }
  listen(channel, callback, listenerName = "noname") {
    let cb;
    if (typeof callback !== "function") {
      throw new AmplifyError2({
        name: NO_HUBCALLBACK_PROVIDED_EXCEPTION,
        message: "No callback supplied to Hub"
      });
    } else {
      cb = callback;
    }
    let holder = this.listeners.get(channel);
    if (!holder) {
      holder = [];
      this.listeners.set(channel, holder);
    }
    holder.push({
      name: listenerName,
      callback: cb
    });
    return () => {
      this._remove(channel, cb);
    };
  }
  _toListeners(capsule) {
    const { channel, payload } = capsule;
    const holder = this.listeners.get(channel);
    if (holder) {
      holder.forEach((listener) => {
        logger$6.debug(`Dispatching to ${channel} with `, payload);
        try {
          listener.callback(capsule);
        } catch (e) {
          logger$6.error(e);
        }
      });
    }
  }
}
const Hub = new HubClass2("__default__");
const getAtob = () => {
  if (typeof window !== "undefined" && typeof window.atob === "function") {
    return window.atob;
  }
  if (typeof atob === "function") {
    return atob;
  }
  throw new AmplifyError2({
    name: "Base64EncoderError",
    message: "Cannot resolve the `atob` function from the environment."
  });
};
const base64Decoder = {
  convert(input, options) {
    let inputStr = input;
    if (options?.urlSafe) {
      inputStr = inputStr.replace(/-/g, "+").replace(/_/g, "/");
    }
    return getAtob()(inputStr);
  }
};
var AuthConfigurationErrorCode;
(function(AuthConfigurationErrorCode2) {
  AuthConfigurationErrorCode2["AuthTokenConfigException"] = "AuthTokenConfigException";
  AuthConfigurationErrorCode2["AuthUserPoolAndIdentityPoolException"] = "AuthUserPoolAndIdentityPoolException";
  AuthConfigurationErrorCode2["AuthUserPoolException"] = "AuthUserPoolException";
  AuthConfigurationErrorCode2["InvalidIdentityPoolIdException"] = "InvalidIdentityPoolIdException";
  AuthConfigurationErrorCode2["OAuthNotConfigureException"] = "OAuthNotConfigureException";
})(AuthConfigurationErrorCode || (AuthConfigurationErrorCode = {}));
const authConfigurationErrorMap = {
  [AuthConfigurationErrorCode.AuthTokenConfigException]: {
    message: "Auth Token Provider not configured.",
    recoverySuggestion: "Make sure to call Amplify.configure in your app."
  },
  [AuthConfigurationErrorCode.AuthUserPoolAndIdentityPoolException]: {
    message: "Auth UserPool or IdentityPool not configured.",
    recoverySuggestion: "Make sure to call Amplify.configure in your app with UserPoolId and IdentityPoolId."
  },
  [AuthConfigurationErrorCode.AuthUserPoolException]: {
    message: "Auth UserPool not configured.",
    recoverySuggestion: "Make sure to call Amplify.configure in your app with userPoolId and userPoolClientId."
  },
  [AuthConfigurationErrorCode.InvalidIdentityPoolIdException]: {
    message: "Invalid identity pool id provided.",
    recoverySuggestion: "Make sure a valid identityPoolId is given in the config."
  },
  [AuthConfigurationErrorCode.OAuthNotConfigureException]: {
    message: "oauth param not configured.",
    recoverySuggestion: "Make sure to call Amplify.configure with oauth parameter in your app."
  }
};
const assert$1 = createAssertionFunction(authConfigurationErrorMap);
function assertTokenProviderConfig(cognitoConfig) {
  let assertionValid = true;
  if (!cognitoConfig) {
    assertionValid = false;
  } else {
    assertionValid = !!cognitoConfig.userPoolId && !!cognitoConfig.userPoolClientId;
  }
  assert$1(assertionValid, AuthConfigurationErrorCode.AuthUserPoolException);
}
function assertIdentityPoolIdConfig(cognitoConfig) {
  const validConfig = !!cognitoConfig?.identityPoolId;
  assert$1(validConfig, AuthConfigurationErrorCode.InvalidIdentityPoolIdException);
}
function decodeJWT(token) {
  const tokenParts = token.split(".");
  if (tokenParts.length !== 3) {
    throw new Error("Invalid token");
  }
  try {
    const base64WithUrlSafe = tokenParts[1];
    const base64 = base64WithUrlSafe.replace(/-/g, "+").replace(/_/g, "/");
    const jsonStr = decodeURIComponent(base64Decoder.convert(base64).split("").map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`).join(""));
    const payload = JSON.parse(jsonStr);
    return {
      toString: () => token,
      payload
    };
  } catch (err) {
    throw new Error("Invalid token payload");
  }
}
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = {
  randomUUID
};
function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var Framework;
(function(Framework2) {
  Framework2["WebUnknown"] = "0";
  Framework2["React"] = "1";
  Framework2["NextJs"] = "2";
  Framework2["Angular"] = "3";
  Framework2["VueJs"] = "4";
  Framework2["Nuxt"] = "5";
  Framework2["Svelte"] = "6";
  Framework2["ServerSideUnknown"] = "100";
  Framework2["ReactSSR"] = "101";
  Framework2["NextJsSSR"] = "102";
  Framework2["AngularSSR"] = "103";
  Framework2["VueJsSSR"] = "104";
  Framework2["NuxtSSR"] = "105";
  Framework2["SvelteSSR"] = "106";
  Framework2["ReactNative"] = "201";
  Framework2["Expo"] = "202";
})(Framework || (Framework = {}));
var Category;
(function(Category2) {
  Category2["AI"] = "ai";
  Category2["API"] = "api";
  Category2["Auth"] = "auth";
  Category2["Analytics"] = "analytics";
  Category2["DataStore"] = "datastore";
  Category2["Geo"] = "geo";
  Category2["InAppMessaging"] = "inappmessaging";
  Category2["Interactions"] = "interactions";
  Category2["Predictions"] = "predictions";
  Category2["PubSub"] = "pubsub";
  Category2["PushNotification"] = "pushnotification";
  Category2["Storage"] = "storage";
})(Category || (Category = {}));
var AiAction$1;
(function(AiAction2) {
  AiAction2["CreateConversation"] = "1";
  AiAction2["GetConversation"] = "2";
  AiAction2["ListConversations"] = "3";
  AiAction2["DeleteConversation"] = "4";
  AiAction2["SendMessage"] = "5";
  AiAction2["ListMessages"] = "6";
  AiAction2["OnMessage"] = "7";
  AiAction2["Generation"] = "8";
  AiAction2["UpdateConversation"] = "9";
})(AiAction$1 || (AiAction$1 = {}));
var AnalyticsAction;
(function(AnalyticsAction2) {
  AnalyticsAction2["Record"] = "1";
  AnalyticsAction2["IdentifyUser"] = "2";
})(AnalyticsAction || (AnalyticsAction = {}));
var ApiAction;
(function(ApiAction2) {
  ApiAction2["GraphQl"] = "1";
  ApiAction2["Get"] = "2";
  ApiAction2["Post"] = "3";
  ApiAction2["Put"] = "4";
  ApiAction2["Patch"] = "5";
  ApiAction2["Del"] = "6";
  ApiAction2["Head"] = "7";
})(ApiAction || (ApiAction = {}));
var AuthAction;
(function(AuthAction2) {
  AuthAction2["SignUp"] = "1";
  AuthAction2["ConfirmSignUp"] = "2";
  AuthAction2["ResendSignUpCode"] = "3";
  AuthAction2["SignIn"] = "4";
  AuthAction2["FetchMFAPreference"] = "6";
  AuthAction2["UpdateMFAPreference"] = "7";
  AuthAction2["SetUpTOTP"] = "10";
  AuthAction2["VerifyTOTPSetup"] = "11";
  AuthAction2["ConfirmSignIn"] = "12";
  AuthAction2["DeleteUserAttributes"] = "15";
  AuthAction2["DeleteUser"] = "16";
  AuthAction2["UpdateUserAttributes"] = "17";
  AuthAction2["FetchUserAttributes"] = "18";
  AuthAction2["ConfirmUserAttribute"] = "22";
  AuthAction2["SignOut"] = "26";
  AuthAction2["UpdatePassword"] = "27";
  AuthAction2["ResetPassword"] = "28";
  AuthAction2["ConfirmResetPassword"] = "29";
  AuthAction2["FederatedSignIn"] = "30";
  AuthAction2["RememberDevice"] = "32";
  AuthAction2["ForgetDevice"] = "33";
  AuthAction2["FetchDevices"] = "34";
  AuthAction2["SendUserAttributeVerificationCode"] = "35";
  AuthAction2["SignInWithRedirect"] = "36";
  AuthAction2["StartWebAuthnRegistration"] = "37";
  AuthAction2["CompleteWebAuthnRegistration"] = "38";
  AuthAction2["ListWebAuthnCredentials"] = "39";
  AuthAction2["DeleteWebAuthnCredential"] = "40";
})(AuthAction || (AuthAction = {}));
var DataStoreAction;
(function(DataStoreAction2) {
  DataStoreAction2["Subscribe"] = "1";
  DataStoreAction2["GraphQl"] = "2";
})(DataStoreAction || (DataStoreAction = {}));
var GeoAction;
(function(GeoAction2) {
  GeoAction2["SearchByText"] = "0";
  GeoAction2["SearchByCoordinates"] = "1";
  GeoAction2["SearchForSuggestions"] = "2";
  GeoAction2["SearchByPlaceId"] = "3";
  GeoAction2["SaveGeofences"] = "4";
  GeoAction2["GetGeofence"] = "5";
  GeoAction2["ListGeofences"] = "6";
  GeoAction2["DeleteGeofences"] = "7";
})(GeoAction || (GeoAction = {}));
var InAppMessagingAction;
(function(InAppMessagingAction2) {
  InAppMessagingAction2["SyncMessages"] = "1";
  InAppMessagingAction2["IdentifyUser"] = "2";
  InAppMessagingAction2["NotifyMessageInteraction"] = "3";
})(InAppMessagingAction || (InAppMessagingAction = {}));
var InteractionsAction;
(function(InteractionsAction2) {
  InteractionsAction2["None"] = "0";
})(InteractionsAction || (InteractionsAction = {}));
var PredictionsAction;
(function(PredictionsAction2) {
  PredictionsAction2["Convert"] = "1";
  PredictionsAction2["Identify"] = "2";
  PredictionsAction2["Interpret"] = "3";
})(PredictionsAction || (PredictionsAction = {}));
var PubSubAction;
(function(PubSubAction2) {
  PubSubAction2["Subscribe"] = "1";
})(PubSubAction || (PubSubAction = {}));
var PushNotificationAction;
(function(PushNotificationAction2) {
  PushNotificationAction2["InitializePushNotifications"] = "1";
  PushNotificationAction2["IdentifyUser"] = "2";
})(PushNotificationAction || (PushNotificationAction = {}));
var StorageAction;
(function(StorageAction2) {
  StorageAction2["UploadData"] = "1";
  StorageAction2["DownloadData"] = "2";
  StorageAction2["List"] = "3";
  StorageAction2["Copy"] = "4";
  StorageAction2["Remove"] = "5";
  StorageAction2["GetProperties"] = "6";
  StorageAction2["GetUrl"] = "7";
  StorageAction2["GetDataAccess"] = "8";
  StorageAction2["ListCallerAccessGrants"] = "9";
})(StorageAction || (StorageAction = {}));
const version = "6.15.0";
const globalExists = () => {
  return typeof globalThis !== "undefined";
};
const windowExists = () => {
  return typeof window !== "undefined";
};
const documentExists = () => {
  return typeof document !== "undefined";
};
const processExists = () => {
  return typeof process !== "undefined";
};
const keyPrefixMatch = (object, prefix) => {
  return !!Object.keys(object).find((key) => key.startsWith(prefix));
};
var define_process_env_default$2 = {};
function reactWebDetect() {
  const elementKeyPrefixedWithReact = (key) => {
    return key.startsWith("_react") || key.startsWith("__react");
  };
  const elementIsReactEnabled = (element) => {
    return Object.keys(element).find(elementKeyPrefixedWithReact);
  };
  const allElementsWithId = () => Array.from(document.querySelectorAll("[id]"));
  return documentExists() && allElementsWithId().some(elementIsReactEnabled);
}
function reactSSRDetect() {
  return processExists() && typeof define_process_env_default$2 !== "undefined" && !!Object.keys(define_process_env_default$2).find((key) => key.includes("react"));
}
function vueWebDetect() {
  return windowExists() && keyPrefixMatch(window, "__VUE");
}
function vueSSRDetect() {
  return globalExists() && keyPrefixMatch(globalThis, "__VUE");
}
var define_process_env_default$1 = {};
function svelteWebDetect() {
  return windowExists() && keyPrefixMatch(window, "__SVELTE");
}
function svelteSSRDetect() {
  return processExists() && typeof define_process_env_default$1 !== "undefined" && !!Object.keys(define_process_env_default$1).find((key) => key.includes("svelte"));
}
function nextWebDetect() {
  return windowExists() && window.next && typeof window.next === "object";
}
function nextSSRDetect() {
  return globalExists() && (keyPrefixMatch(globalThis, "__next") || keyPrefixMatch(globalThis, "__NEXT"));
}
function nuxtWebDetect() {
  return windowExists() && (window.__NUXT__ !== void 0 || window.$nuxt !== void 0);
}
function nuxtSSRDetect() {
  return globalExists() && typeof globalThis.__NUXT_PATHS__ !== "undefined";
}
var define_process_env_default = {};
function angularWebDetect() {
  const angularVersionSetInDocument = Boolean(documentExists() && document.querySelector("[ng-version]"));
  const angularContentSetInWindow = Boolean(windowExists() && typeof window.ng !== "undefined");
  return angularVersionSetInDocument || angularContentSetInWindow;
}
function angularSSRDetect() {
  return processExists() && typeof define_process_env_default === "object" && define_process_env_default.npm_lifecycle_script?.startsWith("ng ") || false;
}
function reactNativeDetect() {
  return typeof navigator !== "undefined" && typeof navigator.product !== "undefined" && navigator.product === "ReactNative";
}
function expoDetect() {
  return globalExists() && typeof globalThis.expo !== "undefined";
}
function webDetect() {
  return windowExists();
}
const detectionMap = [
  // First, detect mobile
  { platform: Framework.Expo, detectionMethod: expoDetect },
  { platform: Framework.ReactNative, detectionMethod: reactNativeDetect },
  // Next, detect web frameworks
  { platform: Framework.NextJs, detectionMethod: nextWebDetect },
  { platform: Framework.Nuxt, detectionMethod: nuxtWebDetect },
  { platform: Framework.Angular, detectionMethod: angularWebDetect },
  { platform: Framework.React, detectionMethod: reactWebDetect },
  { platform: Framework.VueJs, detectionMethod: vueWebDetect },
  { platform: Framework.Svelte, detectionMethod: svelteWebDetect },
  { platform: Framework.WebUnknown, detectionMethod: webDetect },
  // Last, detect ssr frameworks
  { platform: Framework.NextJsSSR, detectionMethod: nextSSRDetect },
  { platform: Framework.NuxtSSR, detectionMethod: nuxtSSRDetect },
  { platform: Framework.ReactSSR, detectionMethod: reactSSRDetect },
  { platform: Framework.VueJsSSR, detectionMethod: vueSSRDetect },
  { platform: Framework.AngularSSR, detectionMethod: angularSSRDetect },
  { platform: Framework.SvelteSSR, detectionMethod: svelteSSRDetect }
];
function detect() {
  return detectionMap.find((detectionEntry) => detectionEntry.detectionMethod())?.platform || Framework.ServerSideUnknown;
}
let frameworkCache;
const frameworkChangeObservers = [];
let resetTriggered = false;
const SSR_RESET_TIMEOUT = 10;
const WEB_RESET_TIMEOUT = 10;
const PRIME_FRAMEWORK_DELAY = 1e3;
const detectFramework = () => {
  if (!frameworkCache) {
    frameworkCache = detect();
    if (resetTriggered) {
      while (frameworkChangeObservers.length) {
        frameworkChangeObservers.pop()?.();
      }
    } else {
      frameworkChangeObservers.forEach((fcn) => {
        fcn();
      });
    }
    resetTimeout(Framework.ServerSideUnknown, SSR_RESET_TIMEOUT);
    resetTimeout(Framework.WebUnknown, WEB_RESET_TIMEOUT);
  }
  return frameworkCache;
};
function clearCache() {
  frameworkCache = void 0;
}
function resetTimeout(framework, delay) {
  if (frameworkCache === framework && !resetTriggered) {
    setTimeout(() => {
      clearCache();
      resetTriggered = true;
      setTimeout(detectFramework, PRIME_FRAMEWORK_DELAY);
    }, delay);
  }
}
const customUserAgentState = {};
const getCustomUserAgent = (category, api2) => customUserAgentState[category]?.[api2]?.additionalDetails;
const BASE_USER_AGENT = `aws-amplify`;
const sanitizeAmplifyVersion = (amplifyVersion) => amplifyVersion.replace(/\+.*/, "");
const getAmplifyUserAgentObject = ({ category, action } = {}) => {
  const userAgent = [
    [BASE_USER_AGENT, sanitizeAmplifyVersion(version)]
  ];
  if (category) {
    userAgent.push([category, action]);
  }
  userAgent.push(["framework", detectFramework()]);
  if (category && action) {
    const customState = getCustomUserAgent(category, action);
    if (customState) {
      customState.forEach((state) => {
        userAgent.push(state);
      });
    }
  }
  return userAgent;
};
const getAmplifyUserAgent = (customUserAgentDetails) => {
  const userAgent = getAmplifyUserAgentObject(customUserAgentDetails);
  const userAgentString = userAgent.map(([agentKey, agentValue]) => agentKey && agentValue ? `${agentKey}/${agentValue}` : agentKey).join(" ");
  return userAgentString;
};
const isBrowser = () => typeof window !== "undefined" && typeof window.document !== "undefined";
const parseMetadata = (response) => {
  const { headers, statusCode } = response;
  return {
    ...isMetadataBearer(response) ? response.$metadata : {},
    httpStatusCode: statusCode,
    requestId: headers["x-amzn-requestid"] ?? headers["x-amzn-request-id"] ?? headers["x-amz-request-id"],
    extendedRequestId: headers["x-amz-id-2"],
    cfId: headers["x-amz-cf-id"]
  };
};
const isMetadataBearer = (response) => typeof response?.$metadata === "object";
const parseJsonError = async (response) => {
  if (!response || response.statusCode < 300) {
    return;
  }
  const body = await parseJsonBody(response);
  const sanitizeErrorCode = (rawValue) => {
    const [cleanValue] = rawValue.toString().split(/[,:]+/);
    if (cleanValue.includes("#")) {
      return cleanValue.split("#")[1];
    }
    return cleanValue;
  };
  const code = sanitizeErrorCode(response.headers["x-amzn-errortype"] ?? body.code ?? body.__type ?? "UnknownError");
  const message = body.message ?? body.Message ?? "Unknown error";
  const error2 = new Error(message);
  return Object.assign(error2, {
    name: code,
    $metadata: parseMetadata(response)
  });
};
const parseJsonBody = async (response) => {
  if (!response.body) {
    throw new Error("Missing response payload");
  }
  const output = await response.body.json();
  return Object.assign(output, {
    $metadata: parseMetadata(response)
  });
};
const composeServiceApi = (transferHandler2, serializer, deserializer, defaultConfig) => {
  return async (config2, input) => {
    const resolvedConfig = {
      ...defaultConfig,
      ...config2
    };
    const endpoint = await resolvedConfig.endpointResolver(resolvedConfig, input);
    const request = await serializer(input, endpoint);
    const response = await transferHandler2(request, {
      ...resolvedConfig
    });
    return deserializer(response);
  };
};
const MAX_DELAY_MS$1 = 5 * 60 * 1e3;
function jitteredBackoff$1(maxDelayMs = MAX_DELAY_MS$1) {
  const BASE_TIME_MS = 100;
  const JITTER_FACTOR = 100;
  return (attempt) => {
    const delay = 2 ** attempt * BASE_TIME_MS + JITTER_FACTOR * Math.random();
    return delay > maxDelayMs ? false : delay;
  };
}
const DEFAULT_RETRY_ATTEMPTS = 3;
const AMZ_SDK_INVOCATION_ID_HEADER = "amz-sdk-invocation-id";
const AMZ_SDK_REQUEST_HEADER = "amz-sdk-request";
const DEFAULT_MAX_DELAY_MS = 5 * 60 * 1e3;
const jitteredBackoff = (attempt) => {
  const delayFunction = jitteredBackoff$1(DEFAULT_MAX_DELAY_MS);
  const delay = delayFunction(attempt);
  return delay === false ? DEFAULT_MAX_DELAY_MS : delay;
};
const CLOCK_SKEW_ERROR_CODES = [
  "AuthFailure",
  "InvalidSignatureException",
  "RequestExpired",
  "RequestInTheFuture",
  "RequestTimeTooSkewed",
  "SignatureDoesNotMatch",
  "BadRequestException"
  // API Gateway
];
const isClockSkewError = (errorCode) => !!errorCode && CLOCK_SKEW_ERROR_CODES.includes(errorCode);
const getRetryDecider = (errorParser) => async (response, error2) => {
  const parsedError = error2 ?? await errorParser(response) ?? void 0;
  const errorCode = parsedError?.code || parsedError?.name;
  const statusCode = response?.statusCode;
  const isRetryable = isConnectionError(error2) || isThrottlingError(statusCode, errorCode) || isClockSkewError(errorCode) || isServerSideError(statusCode, errorCode);
  return {
    retryable: isRetryable
  };
};
const THROTTLING_ERROR_CODES = [
  "BandwidthLimitExceeded",
  "EC2ThrottledException",
  "LimitExceededException",
  "PriorRequestNotComplete",
  "ProvisionedThroughputExceededException",
  "RequestLimitExceeded",
  "RequestThrottled",
  "RequestThrottledException",
  "SlowDown",
  "ThrottledException",
  "Throttling",
  "ThrottlingException",
  "TooManyRequestsException"
];
const TIMEOUT_ERROR_CODES = [
  "TimeoutError",
  "RequestTimeout",
  "RequestTimeoutException"
];
const isThrottlingError = (statusCode, errorCode) => statusCode === 429 || !!errorCode && THROTTLING_ERROR_CODES.includes(errorCode);
const isConnectionError = (error2) => [
  AmplifyErrorCode.NetworkError,
  // TODO(vNext): unify the error code `ERR_NETWORK` used by the Storage XHR handler
  "ERR_NETWORK"
].includes(error2?.name);
const isServerSideError = (statusCode, errorCode) => !!statusCode && [500, 502, 503, 504].includes(statusCode) || !!errorCode && TIMEOUT_ERROR_CODES.includes(errorCode);
const COGNITO_IDENTITY_SERVICE_NAME = "cognito-identity";
const DEFAULT_SERVICE_CLIENT_API_CONFIG$1 = {
  service: COGNITO_IDENTITY_SERVICE_NAME,
  retryDecider: getRetryDecider(parseJsonError),
  computeDelay: jitteredBackoff,
  cache: "no-store"
};
const retryMiddlewareFactory = ({ maxAttempts = DEFAULT_RETRY_ATTEMPTS, retryDecider, computeDelay, abortSignal }) => {
  if (maxAttempts < 1) {
    throw new Error("maxAttempts must be greater than 0");
  }
  return (next, context) => async function retryMiddleware(request) {
    let error2;
    let attemptsCount = context.attemptsCount ?? 0;
    let response;
    const handleTerminalErrorOrResponse = () => {
      if (response) {
        addOrIncrementMetadataAttempts(response, attemptsCount);
        return response;
      } else {
        addOrIncrementMetadataAttempts(error2, attemptsCount);
        throw error2;
      }
    };
    while (!abortSignal?.aborted && attemptsCount < maxAttempts) {
      try {
        response = await next(request);
        error2 = void 0;
      } catch (e) {
        error2 = e;
        response = void 0;
      }
      attemptsCount = (context.attemptsCount ?? 0) > attemptsCount ? context.attemptsCount ?? 0 : attemptsCount + 1;
      context.attemptsCount = attemptsCount;
      const { isCredentialsExpiredError, retryable } = await retryDecider(response, error2, context);
      if (retryable) {
        context.isCredentialsExpired = !!isCredentialsExpiredError;
        if (!abortSignal?.aborted && attemptsCount < maxAttempts) {
          const delay = computeDelay(attemptsCount);
          await cancellableSleep(delay, abortSignal);
        }
        continue;
      } else {
        return handleTerminalErrorOrResponse();
      }
    }
    if (abortSignal?.aborted) {
      throw new Error("Request aborted.");
    } else {
      return handleTerminalErrorOrResponse();
    }
  };
};
const cancellableSleep = (timeoutMs, abortSignal) => {
  if (abortSignal?.aborted) {
    return Promise.resolve();
  }
  let timeoutId;
  let sleepPromiseResolveFn;
  const sleepPromise = new Promise((resolve) => {
    sleepPromiseResolveFn = resolve;
    timeoutId = setTimeout(resolve, timeoutMs);
  });
  abortSignal?.addEventListener("abort", function cancelSleep(_) {
    clearTimeout(timeoutId);
    abortSignal?.removeEventListener("abort", cancelSleep);
    sleepPromiseResolveFn();
  });
  return sleepPromise;
};
const addOrIncrementMetadataAttempts = (nextHandlerOutput, attempts) => {
  if (Object.prototype.toString.call(nextHandlerOutput) !== "[object Object]") {
    return;
  }
  nextHandlerOutput.$metadata = {
    ...nextHandlerOutput.$metadata ?? {},
    attempts
  };
};
const amplifyUuid = v4;
const amzSdkInvocationIdHeaderMiddlewareFactory = () => (next) => {
  return async function amzSdkInvocationIdHeaderMiddleware(request) {
    if (!request.headers[AMZ_SDK_INVOCATION_ID_HEADER]) {
      request.headers[AMZ_SDK_INVOCATION_ID_HEADER] = amplifyUuid();
    }
    return next(request);
  };
};
const amzSdkRequestHeaderMiddlewareFactory = ({ maxAttempts = DEFAULT_RETRY_ATTEMPTS }) => (next, context) => {
  return async function amzSdkRequestHeaderMiddleware(request) {
    const attemptsCount = context.attemptsCount ?? 0;
    request.headers[AMZ_SDK_REQUEST_HEADER] = `attempt=${attemptsCount + 1}; max=${maxAttempts}`;
    return next(request);
  };
};
const userAgentMiddlewareFactory = ({ userAgentHeader = "x-amz-user-agent", userAgentValue = "" }) => (next) => {
  return async function userAgentMiddleware(request) {
    if (userAgentValue.trim().length === 0) {
      const result = await next(request);
      return result;
    } else {
      const headerName = userAgentHeader.toLowerCase();
      request.headers[headerName] = request.headers[headerName] ? `${request.headers[headerName]} ${userAgentValue}` : userAgentValue;
      const response = await next(request);
      return response;
    }
  };
};
const composeTransferHandler = (coreHandler, middleware) => (request, options) => {
  const context = {};
  let composedHandler = (composeHandlerRequest) => coreHandler(composeHandlerRequest, options);
  for (let i = middleware.length - 1; i >= 0; i--) {
    const m = middleware[i];
    const resolvedMiddleware = m(options);
    composedHandler = resolvedMiddleware(composedHandler, context);
  }
  return composedHandler(request);
};
const withMemoization = (payloadAccessor) => {
  let cached;
  return () => {
    if (!cached) {
      cached = payloadAccessor();
    }
    return cached;
  };
};
const shouldSendBody = (method) => !["HEAD", "GET", "DELETE"].includes(method.toUpperCase());
const fetchTransferHandler = async ({ url, method, headers, body }, { abortSignal, cache, withCrossDomainCredentials }) => {
  let resp;
  try {
    resp = await fetch(url, {
      method,
      headers,
      body: shouldSendBody(method) ? body : void 0,
      signal: abortSignal,
      cache,
      credentials: withCrossDomainCredentials ? "include" : "same-origin"
    });
  } catch (e) {
    if (e instanceof TypeError) {
      throw new AmplifyError2({
        name: AmplifyErrorCode.NetworkError,
        message: "A network error has occurred.",
        underlyingError: e
      });
    }
    throw e;
  }
  const responseHeaders = {};
  resp.headers?.forEach((value, key) => {
    responseHeaders[key.toLowerCase()] = value;
  });
  const httpResponse = {
    statusCode: resp.status,
    headers: responseHeaders,
    body: null
  };
  const bodyWithMixin = Object.assign(resp.body ?? {}, {
    text: withMemoization(() => resp.text()),
    blob: withMemoization(() => resp.blob()),
    json: withMemoization(() => resp.json())
  });
  return {
    ...httpResponse,
    body: bodyWithMixin
  };
};
const unauthenticatedHandler$1 = composeTransferHandler(fetchTransferHandler, [
  userAgentMiddlewareFactory,
  amzSdkInvocationIdHeaderMiddlewareFactory,
  retryMiddlewareFactory,
  amzSdkRequestHeaderMiddlewareFactory
]);
const createDisableCacheMiddleware = () => (next) => async function disableCacheMiddleware(request) {
  request.headers["cache-control"] = "no-store";
  return next(request);
};
const cognitoIdentityTransferHandler = composeTransferHandler(unauthenticatedHandler$1, [createDisableCacheMiddleware]);
const createClientSerializer = (operation) => (input, endpoint) => {
  const headers = getSharedHeaders$1(operation);
  const body = JSON.stringify(input);
  return buildHttpRpcRequest$1(endpoint, headers, body);
};
const getSharedHeaders$1 = (operation) => ({
  "content-type": "application/x-amz-json-1.1",
  "x-amz-target": `AWSCognitoIdentityService.${operation}`
});
const buildHttpRpcRequest$1 = ({ url }, headers, body) => ({
  headers,
  url,
  body,
  method: "POST"
});
const createGetCredentialsForIdentityClient = (config2) => composeServiceApi(cognitoIdentityTransferHandler, createClientSerializer("GetCredentialsForIdentity"), getCredentialsForIdentityDeserializer, {
  ...DEFAULT_SERVICE_CLIENT_API_CONFIG$1,
  ...config2,
  userAgentValue: getAmplifyUserAgent()
});
const getCredentialsForIdentityDeserializer = async (response) => {
  if (response.statusCode >= 300) {
    const error2 = await parseJsonError(response);
    throw error2;
  }
  const body = await parseJsonBody(response);
  return {
    IdentityId: body.IdentityId,
    Credentials: deserializeCredentials(body.Credentials),
    $metadata: parseMetadata(response)
  };
};
const deserializeCredentials = ({ Expiration, ...rest } = {}) => ({
  ...rest,
  Expiration: Expiration && new Date(Expiration * 1e3)
});
const createGetIdClient = (config2) => composeServiceApi(cognitoIdentityTransferHandler, createClientSerializer("GetId"), getIdDeserializer, {
  ...DEFAULT_SERVICE_CLIENT_API_CONFIG$1,
  ...config2,
  userAgentValue: getAmplifyUserAgent()
});
const getIdDeserializer = async (response) => {
  if (response.statusCode >= 300) {
    const error2 = await parseJsonError(response);
    throw error2;
  }
  const body = await parseJsonBody(response);
  return {
    IdentityId: body.IdentityId,
    $metadata: parseMetadata(response)
  };
};
const defaultPartition = {
  id: "aws",
  outputs: {
    dnsSuffix: "amazonaws.com"
  },
  regionRegex: "^(us|eu|ap|sa|ca|me|af)\\-\\w+\\-\\d+$",
  regions: ["aws-global"]
};
const partitionsInfo = {
  partitions: [
    defaultPartition,
    {
      id: "aws-cn",
      outputs: {
        dnsSuffix: "amazonaws.com.cn"
      },
      regionRegex: "^cn\\-\\w+\\-\\d+$",
      regions: ["aws-cn-global"]
    }
  ]
};
const getDnsSuffix = (region) => {
  const { partitions } = partitionsInfo;
  for (const { regions, outputs, regionRegex } of partitions) {
    const regex = new RegExp(regionRegex);
    if (regions.includes(region) || regex.test(region)) {
      return outputs.dnsSuffix;
    }
  }
  return defaultPartition.outputs.dnsSuffix;
};
const AmplifyUrl = URL;
const cognitoIdentityPoolEndpointResolver = ({ region }) => ({
  url: new AmplifyUrl(`https://${COGNITO_IDENTITY_SERVICE_NAME}.${region}.${getDnsSuffix(region)}`)
});
class PlatformNotSupportedError2 extends AmplifyError2 {
  constructor() {
    super({
      name: AmplifyErrorCode.PlatformNotSupported,
      message: "Function not supported on current platform"
    });
  }
}
class KeyValueStorage2 {
  constructor(storage) {
    this.storage = storage;
  }
  /**
   * This is used to set a specific item in storage
   * @param {string} key - the key for the item
   * @param {object} value - the value
   * @returns {string} value that was set
   */
  async setItem(key, value) {
    if (!this.storage)
      throw new PlatformNotSupportedError2();
    this.storage.setItem(key, value);
  }
  /**
   * This is used to get a specific key from storage
   * @param {string} key - the key for the item
   * This is used to clear the storage
   * @returns {string} the data item
   */
  async getItem(key) {
    if (!this.storage)
      throw new PlatformNotSupportedError2();
    return this.storage.getItem(key);
  }
  /**
   * This is used to remove an item from storage
   * @param {string} key - the key being set
   * @returns {string} value - value that was deleted
   */
  async removeItem(key) {
    if (!this.storage)
      throw new PlatformNotSupportedError2();
    this.storage.removeItem(key);
  }
  /**
   * This is used to clear the storage
   * @returns {string} nothing
   */
  async clear() {
    if (!this.storage)
      throw new PlatformNotSupportedError2();
    this.storage.clear();
  }
}
class InMemoryStorage2 {
  constructor() {
    this.storage = /* @__PURE__ */ new Map();
  }
  get length() {
    return this.storage.size;
  }
  key(index) {
    if (index > this.length - 1) {
      return null;
    }
    return Array.from(this.storage.keys())[index];
  }
  setItem(key, value) {
    this.storage.set(key, value);
  }
  getItem(key) {
    return this.storage.get(key) ?? null;
  }
  removeItem(key) {
    this.storage.delete(key);
  }
  clear() {
    this.storage.clear();
  }
}
const logger$5 = new ConsoleLogger2("CoreStorageUtils");
const getLocalStorageWithFallback = () => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage;
    }
  } catch (e) {
    logger$5.info("localStorage not found. InMemoryStorage is used as a fallback.");
  }
  return new InMemoryStorage2();
};
const getSessionStorageWithFallback = () => {
  try {
    if (typeof window !== "undefined" && window.sessionStorage) {
      window.sessionStorage.getItem("test");
      return window.sessionStorage;
    }
    throw new Error("sessionStorage is not defined");
  } catch (e) {
    logger$5.info("sessionStorage not found. InMemoryStorage is used as a fallback.");
    return new InMemoryStorage2();
  }
};
class DefaultStorage2 extends KeyValueStorage2 {
  constructor() {
    super(getLocalStorageWithFallback());
  }
}
class SessionStorage2 extends KeyValueStorage2 {
  constructor() {
    super(getSessionStorageWithFallback());
  }
}
class SyncKeyValueStorage2 {
  constructor(storage) {
    this._storage = storage;
  }
  get storage() {
    if (!this._storage)
      throw new PlatformNotSupportedError2();
    return this._storage;
  }
  /**
   * This is used to set a specific item in storage
   * @param {string} key - the key for the item
   * @param {object} value - the value
   * @returns {string} value that was set
   */
  setItem(key, value) {
    this.storage.setItem(key, value);
  }
  /**
   * This is used to get a specific key from storage
   * @param {string} key - the key for the item
   * This is used to clear the storage
   * @returns {string} the data item
   */
  getItem(key) {
    return this.storage.getItem(key);
  }
  /**
   * This is used to remove an item from storage
   * @param {string} key - the key being set
   * @returns {string} value - value that was deleted
   */
  removeItem(key) {
    this.storage.removeItem(key);
  }
  /**
   * This is used to clear the storage
   * @returns {string} nothing
   */
  clear() {
    this.storage.clear();
  }
}
class SyncSessionStorage2 extends SyncKeyValueStorage2 {
  constructor() {
    super(getSessionStorageWithFallback());
  }
}
const defaultStorage = new DefaultStorage2();
new SessionStorage2();
new SyncSessionStorage2();
const deDupeAsyncFunction = (asyncFunction) => {
  let inflightPromise;
  return async (...args) => {
    if (inflightPromise)
      return inflightPromise;
    inflightPromise = new Promise((resolve, reject) => {
      asyncFunction(...args).then((result) => {
        resolve(result);
      }).catch((error2) => {
        reject(error2);
      }).finally(() => {
        inflightPromise = void 0;
      });
    });
    return inflightPromise;
  };
};
function isTokenExpired({ expiresAt, clockDrift, tolerance = 5e3 }) {
  const currentTime = Date.now();
  return currentTime + clockDrift + tolerance > expiresAt;
}
class AuthError extends AmplifyError2 {
  constructor(params) {
    super(params);
    this.constructor = AuthError;
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}
function getRegionFromUserPoolId(userPoolId) {
  const region = userPoolId?.split("_")[0];
  if (!userPoolId || userPoolId.indexOf("_") < 0 || !region || typeof region !== "string")
    throw new AuthError({
      name: "InvalidUserPoolId",
      message: "Invalid user pool id provided."
    });
  return region;
}
function getRegionFromIdentityPoolId(identityPoolId) {
  if (!identityPoolId || !identityPoolId.includes(":")) {
    throw new AuthError({
      name: "InvalidIdentityPoolIdException",
      message: "Invalid identity pool id provided.",
      recoverySuggestion: "Make sure a valid identityPoolId is given in the config."
    });
  }
  return identityPoolId.split(":")[0];
}
const USER_UNAUTHENTICATED_EXCEPTION = "UserUnAuthenticatedException";
const INVALID_REDIRECT_EXCEPTION = "InvalidRedirectException";
const INVALID_APP_SCHEME_EXCEPTION = "InvalidAppSchemeException";
const INVALID_PREFERRED_REDIRECT_EXCEPTION = "InvalidPreferredRedirectUrlException";
new AuthError({
  name: INVALID_REDIRECT_EXCEPTION,
  message: "signInRedirect or signOutRedirect had an invalid format or was not found.",
  recoverySuggestion: "Please make sure the signIn/Out redirect in your oauth config is valid."
});
new AuthError({
  name: INVALID_APP_SCHEME_EXCEPTION,
  message: "A valid non-http app scheme was not found in the config.",
  recoverySuggestion: "Please make sure a valid custom app scheme is present in the config."
});
new AuthError({
  name: INVALID_PREFERRED_REDIRECT_EXCEPTION,
  message: "The given preferredRedirectUrl does not match any items in the redirectSignOutUrls array from the config.",
  recoverySuggestion: "Please make sure a matching preferredRedirectUrl is provided."
});
const INVALID_ORIGIN_EXCEPTION = "InvalidOriginException";
new AuthError({
  name: INVALID_ORIGIN_EXCEPTION,
  message: "redirect is coming from a different origin. The oauth flow needs to be initiated from the same origin",
  recoverySuggestion: "Please call signInWithRedirect from the same origin."
});
const TOKEN_REFRESH_EXCEPTION = "TokenRefreshException";
function assertIdTokenInAuthTokens(tokens) {
  if (!tokens || !tokens.idToken) {
    throw new AuthError({
      name: USER_UNAUTHENTICATED_EXCEPTION,
      message: "User needs to be authenticated to call this API.",
      recoverySuggestion: "Sign in before calling this API again."
    });
  }
}
const oAuthTokenRefreshException = new AuthError({
  name: TOKEN_REFRESH_EXCEPTION,
  message: `Token refresh is not supported when authenticated with the 'implicit grant' (token) oauth flow. 
	Please change your oauth configuration to use 'code grant' flow.`,
  recoverySuggestion: `Please logout and change your Amplify configuration to use "code grant" flow. 
	E.g { responseType: 'code' }`
});
const tokenRefreshException = new AuthError({
  name: USER_UNAUTHENTICATED_EXCEPTION,
  message: "User needs to be authenticated to call this API.",
  recoverySuggestion: "Sign in before calling this API again."
});
function assertAuthTokensWithRefreshToken(tokens) {
  if (isAuthenticatedWithImplicitOauthFlow(tokens)) {
    throw oAuthTokenRefreshException;
  }
  if (!isAuthenticatedWithRefreshToken(tokens)) {
    throw tokenRefreshException;
  }
}
const OAuthStorageKeys = {
  inflightOAuth: "inflightOAuth",
  oauthSignIn: "oauthSignIn",
  oauthPKCE: "oauthPKCE",
  oauthState: "oauthState"
};
function isAuthenticated(tokens) {
  return tokens?.accessToken || tokens?.idToken;
}
function isAuthenticatedWithRefreshToken(tokens) {
  return isAuthenticated(tokens) && tokens?.refreshToken;
}
function isAuthenticatedWithImplicitOauthFlow(tokens) {
  return isAuthenticated(tokens) && !tokens?.refreshToken;
}
const createUserPoolSerializer = (operation) => (input, endpoint) => {
  const headers = getSharedHeaders(operation);
  const body = JSON.stringify(input);
  return buildHttpRpcRequest(endpoint, headers, body);
};
const getSharedHeaders = (operation) => ({
  "content-type": "application/x-amz-json-1.1",
  "x-amz-target": `AWSCognitoIdentityProviderService.${operation}`
});
const buildHttpRpcRequest = ({ url }, headers, body) => ({
  headers,
  url,
  body,
  method: "POST"
});
function assertServiceError(error2) {
  if (!error2 || error2.name === "Error" || error2 instanceof TypeError) {
    throw new AuthError({
      name: AmplifyErrorCode.Unknown,
      message: "An unknown error has occurred.",
      underlyingError: error2
    });
  }
}
const createUserPoolDeserializer = () => async (response) => {
  if (response.statusCode >= 300) {
    const error2 = await parseJsonError(response);
    assertServiceError(error2);
    throw new AuthError({
      name: error2.name,
      message: error2.message,
      metadata: error2.$metadata
    });
  }
  return parseJsonBody(response);
};
const disableCacheMiddlewareFactory = () => (next, _) => async function disableCacheMiddleware(request) {
  request.headers["cache-control"] = "no-store";
  return next(request);
};
const cognitoUserPoolTransferHandler = composeTransferHandler(unauthenticatedHandler$1, [disableCacheMiddlewareFactory]);
const COGNITO_IDP_SERVICE_NAME = "cognito-idp";
const DEFAULT_SERVICE_CLIENT_API_CONFIG = {
  service: COGNITO_IDP_SERVICE_NAME,
  retryDecider: getRetryDecider(parseJsonError),
  computeDelay: jitteredBackoff,
  get userAgentValue() {
    return getAmplifyUserAgent();
  },
  cache: "no-store"
};
const cognitoUserPoolEndpointResolver = ({ region }) => ({
  url: new AmplifyUrl(`https://${COGNITO_IDP_SERVICE_NAME}.${region}.${getDnsSuffix(region)}`)
});
const createCognitoUserPoolEndpointResolver = ({ endpointOverride }) => (input) => {
  if (endpointOverride) {
    return { url: new AmplifyUrl(endpointOverride) };
  }
  return cognitoUserPoolEndpointResolver(input);
};
const createGetTokensFromRefreshTokenClient = (config2) => composeServiceApi(cognitoUserPoolTransferHandler, createUserPoolSerializer("GetTokensFromRefreshToken"), createUserPoolDeserializer(), {
  ...DEFAULT_SERVICE_CLIENT_API_CONFIG,
  ...config2
});
const refreshAuthTokensFunction = async ({ tokens, authConfig, username }) => {
  assertTokenProviderConfig(authConfig?.Cognito);
  const { userPoolId, userPoolClientId, userPoolEndpoint } = authConfig.Cognito;
  const region = getRegionFromUserPoolId(userPoolId);
  assertAuthTokensWithRefreshToken(tokens);
  const getTokensFromRefreshToken = createGetTokensFromRefreshTokenClient({
    endpointResolver: createCognitoUserPoolEndpointResolver({
      endpointOverride: userPoolEndpoint
    })
  });
  const { AuthenticationResult } = await getTokensFromRefreshToken({ region }, {
    ClientId: userPoolClientId,
    RefreshToken: tokens.refreshToken,
    DeviceKey: tokens.deviceMetadata?.deviceKey
  });
  const accessToken = decodeJWT(AuthenticationResult?.AccessToken ?? "");
  const idToken = AuthenticationResult?.IdToken ? decodeJWT(AuthenticationResult.IdToken) : void 0;
  const { iat } = accessToken.payload;
  if (!iat) {
    throw new AuthError({
      name: "iatNotFoundException",
      message: "iat not found in access token"
    });
  }
  const clockDrift = iat * 1e3 - (/* @__PURE__ */ new Date()).getTime();
  return {
    accessToken,
    idToken,
    clockDrift,
    refreshToken: AuthenticationResult?.RefreshToken ?? tokens.refreshToken,
    username
  };
};
const refreshAuthTokens = deDupeAsyncFunction(refreshAuthTokensFunction);
const AuthTokenStorageKeys = {
  accessToken: "accessToken",
  idToken: "idToken",
  oidcProvider: "oidcProvider",
  clockDrift: "clockDrift",
  refreshToken: "refreshToken",
  deviceKey: "deviceKey",
  randomPasswordKey: "randomPasswordKey",
  deviceGroupKey: "deviceGroupKey",
  signInDetails: "signInDetails",
  oauthMetadata: "oauthMetadata"
};
var TokenProviderErrorCode;
(function(TokenProviderErrorCode2) {
  TokenProviderErrorCode2["InvalidAuthTokens"] = "InvalidAuthTokens";
})(TokenProviderErrorCode || (TokenProviderErrorCode = {}));
const tokenValidationErrorMap = {
  [TokenProviderErrorCode.InvalidAuthTokens]: {
    message: "Invalid tokens.",
    recoverySuggestion: "Make sure the tokens are valid."
  }
};
const assert = createAssertionFunction(tokenValidationErrorMap);
const AUTH_KEY_PREFIX = "CognitoIdentityServiceProvider";
class DefaultTokenStore {
  getKeyValueStorage() {
    if (!this.keyValueStorage) {
      throw new AuthError({
        name: "KeyValueStorageNotFoundException",
        message: "KeyValueStorage was not found in TokenStore"
      });
    }
    return this.keyValueStorage;
  }
  setKeyValueStorage(keyValueStorage) {
    this.keyValueStorage = keyValueStorage;
  }
  setAuthConfig(authConfig) {
    this.authConfig = authConfig;
  }
  async loadTokens() {
    try {
      const authKeys = await this.getAuthKeys();
      const accessTokenString = await this.getKeyValueStorage().getItem(authKeys.accessToken);
      if (!accessTokenString) {
        throw new AuthError({
          name: "NoSessionFoundException",
          message: "Auth session was not found. Make sure to call signIn."
        });
      }
      const accessToken = decodeJWT(accessTokenString);
      const itString = await this.getKeyValueStorage().getItem(authKeys.idToken);
      const idToken = itString ? decodeJWT(itString) : void 0;
      const refreshToken = await this.getKeyValueStorage().getItem(authKeys.refreshToken) ?? void 0;
      const clockDriftString = await this.getKeyValueStorage().getItem(authKeys.clockDrift) ?? "0";
      const clockDrift = Number.parseInt(clockDriftString);
      const signInDetails = await this.getKeyValueStorage().getItem(authKeys.signInDetails);
      const tokens = {
        accessToken,
        idToken,
        refreshToken,
        deviceMetadata: await this.getDeviceMetadata() ?? void 0,
        clockDrift,
        username: await this.getLastAuthUser()
      };
      if (signInDetails) {
        tokens.signInDetails = JSON.parse(signInDetails);
      }
      return tokens;
    } catch (err) {
      return null;
    }
  }
  async storeTokens(tokens) {
    assert(tokens !== void 0, TokenProviderErrorCode.InvalidAuthTokens);
    const lastAuthUser = tokens.username;
    await this.getKeyValueStorage().setItem(this.getLastAuthUserKey(), lastAuthUser);
    const authKeys = await this.getAuthKeys();
    await this.getKeyValueStorage().setItem(authKeys.accessToken, tokens.accessToken.toString());
    if (tokens.idToken) {
      await this.getKeyValueStorage().setItem(authKeys.idToken, tokens.idToken.toString());
    } else {
      await this.getKeyValueStorage().removeItem(authKeys.idToken);
    }
    if (tokens.refreshToken) {
      await this.getKeyValueStorage().setItem(authKeys.refreshToken, tokens.refreshToken);
    } else {
      await this.getKeyValueStorage().removeItem(authKeys.refreshToken);
    }
    if (tokens.deviceMetadata) {
      if (tokens.deviceMetadata.deviceKey) {
        await this.getKeyValueStorage().setItem(authKeys.deviceKey, tokens.deviceMetadata.deviceKey);
      }
      if (tokens.deviceMetadata.deviceGroupKey) {
        await this.getKeyValueStorage().setItem(authKeys.deviceGroupKey, tokens.deviceMetadata.deviceGroupKey);
      }
      await this.getKeyValueStorage().setItem(authKeys.randomPasswordKey, tokens.deviceMetadata.randomPassword);
    }
    if (tokens.signInDetails) {
      await this.getKeyValueStorage().setItem(authKeys.signInDetails, JSON.stringify(tokens.signInDetails));
    } else {
      await this.getKeyValueStorage().removeItem(authKeys.signInDetails);
    }
    await this.getKeyValueStorage().setItem(authKeys.clockDrift, `${tokens.clockDrift}`);
  }
  async clearTokens() {
    const authKeys = await this.getAuthKeys();
    await Promise.all([
      this.getKeyValueStorage().removeItem(authKeys.accessToken),
      this.getKeyValueStorage().removeItem(authKeys.idToken),
      this.getKeyValueStorage().removeItem(authKeys.clockDrift),
      this.getKeyValueStorage().removeItem(authKeys.refreshToken),
      this.getKeyValueStorage().removeItem(authKeys.signInDetails),
      this.getKeyValueStorage().removeItem(this.getLastAuthUserKey()),
      this.getKeyValueStorage().removeItem(authKeys.oauthMetadata)
    ]);
  }
  async getDeviceMetadata(username) {
    const authKeys = await this.getAuthKeys(username);
    const deviceKey = await this.getKeyValueStorage().getItem(authKeys.deviceKey);
    const deviceGroupKey = await this.getKeyValueStorage().getItem(authKeys.deviceGroupKey);
    const randomPassword = await this.getKeyValueStorage().getItem(authKeys.randomPasswordKey);
    return randomPassword && deviceGroupKey && deviceKey ? {
      deviceKey,
      deviceGroupKey,
      randomPassword
    } : null;
  }
  async clearDeviceMetadata(username) {
    const authKeys = await this.getAuthKeys(username);
    await Promise.all([
      this.getKeyValueStorage().removeItem(authKeys.deviceKey),
      this.getKeyValueStorage().removeItem(authKeys.deviceGroupKey),
      this.getKeyValueStorage().removeItem(authKeys.randomPasswordKey)
    ]);
  }
  async getAuthKeys(username) {
    assertTokenProviderConfig(this.authConfig?.Cognito);
    const lastAuthUser = username ?? await this.getLastAuthUser();
    return createKeysForAuthStorage$2(AUTH_KEY_PREFIX, `${this.authConfig.Cognito.userPoolClientId}.${lastAuthUser}`);
  }
  getLastAuthUserKey() {
    assertTokenProviderConfig(this.authConfig?.Cognito);
    const identifier = this.authConfig.Cognito.userPoolClientId;
    return `${AUTH_KEY_PREFIX}.${identifier}.LastAuthUser`;
  }
  async getLastAuthUser() {
    const lastAuthUser = await this.getKeyValueStorage().getItem(this.getLastAuthUserKey()) ?? "username";
    return lastAuthUser;
  }
  async setOAuthMetadata(metadata) {
    const { oauthMetadata: oauthMetadataKey } = await this.getAuthKeys();
    await this.getKeyValueStorage().setItem(oauthMetadataKey, JSON.stringify(metadata));
  }
  async getOAuthMetadata() {
    const { oauthMetadata: oauthMetadataKey } = await this.getAuthKeys();
    const oauthMetadata = await this.getKeyValueStorage().getItem(oauthMetadataKey);
    return oauthMetadata && JSON.parse(oauthMetadata);
  }
}
const createKeysForAuthStorage$2 = (provider, identifier) => {
  return getAuthStorageKeys(AuthTokenStorageKeys)(`${provider}`, identifier);
};
function getAuthStorageKeys(authKeys) {
  const keys = Object.values({ ...authKeys });
  return (prefix, identifier) => keys.reduce((acc, authKey) => ({
    ...acc,
    [authKey]: `${prefix}.${identifier}.${authKey}`
  }), {});
}
const V5_HOSTED_UI_KEY = "amplify-signin-with-hostedUI";
const name = "CognitoIdentityServiceProvider";
class DefaultOAuthStore {
  constructor(keyValueStorage) {
    this.keyValueStorage = keyValueStorage;
  }
  async clearOAuthInflightData() {
    assertTokenProviderConfig(this.cognitoConfig);
    const authKeys = createKeysForAuthStorage$1(name, this.cognitoConfig.userPoolClientId);
    await Promise.all([
      this.keyValueStorage.removeItem(authKeys.inflightOAuth),
      this.keyValueStorage.removeItem(authKeys.oauthPKCE),
      this.keyValueStorage.removeItem(authKeys.oauthState)
    ]);
  }
  async clearOAuthData() {
    assertTokenProviderConfig(this.cognitoConfig);
    const authKeys = createKeysForAuthStorage$1(name, this.cognitoConfig.userPoolClientId);
    await this.clearOAuthInflightData();
    await this.keyValueStorage.removeItem(V5_HOSTED_UI_KEY);
    return this.keyValueStorage.removeItem(authKeys.oauthSignIn);
  }
  loadOAuthState() {
    assertTokenProviderConfig(this.cognitoConfig);
    const authKeys = createKeysForAuthStorage$1(name, this.cognitoConfig.userPoolClientId);
    return this.keyValueStorage.getItem(authKeys.oauthState);
  }
  storeOAuthState(state) {
    assertTokenProviderConfig(this.cognitoConfig);
    const authKeys = createKeysForAuthStorage$1(name, this.cognitoConfig.userPoolClientId);
    return this.keyValueStorage.setItem(authKeys.oauthState, state);
  }
  loadPKCE() {
    assertTokenProviderConfig(this.cognitoConfig);
    const authKeys = createKeysForAuthStorage$1(name, this.cognitoConfig.userPoolClientId);
    return this.keyValueStorage.getItem(authKeys.oauthPKCE);
  }
  storePKCE(pkce) {
    assertTokenProviderConfig(this.cognitoConfig);
    const authKeys = createKeysForAuthStorage$1(name, this.cognitoConfig.userPoolClientId);
    return this.keyValueStorage.setItem(authKeys.oauthPKCE, pkce);
  }
  setAuthConfig(authConfigParam) {
    this.cognitoConfig = authConfigParam;
  }
  async loadOAuthInFlight() {
    assertTokenProviderConfig(this.cognitoConfig);
    const authKeys = createKeysForAuthStorage$1(name, this.cognitoConfig.userPoolClientId);
    return await this.keyValueStorage.getItem(authKeys.inflightOAuth) === "true";
  }
  async storeOAuthInFlight(inflight) {
    assertTokenProviderConfig(this.cognitoConfig);
    const authKeys = createKeysForAuthStorage$1(name, this.cognitoConfig.userPoolClientId);
    await this.keyValueStorage.setItem(authKeys.inflightOAuth, `${inflight}`);
  }
  async loadOAuthSignIn() {
    assertTokenProviderConfig(this.cognitoConfig);
    const authKeys = createKeysForAuthStorage$1(name, this.cognitoConfig.userPoolClientId);
    const isLegacyHostedUISignIn = await this.keyValueStorage.getItem(V5_HOSTED_UI_KEY);
    const [isOAuthSignIn, preferPrivateSession] = (await this.keyValueStorage.getItem(authKeys.oauthSignIn))?.split(",") ?? [];
    return {
      isOAuthSignIn: isOAuthSignIn === "true" || isLegacyHostedUISignIn === "true",
      preferPrivateSession: preferPrivateSession === "true"
    };
  }
  async storeOAuthSignIn(oauthSignIn, preferPrivateSession = false) {
    assertTokenProviderConfig(this.cognitoConfig);
    const authKeys = createKeysForAuthStorage$1(name, this.cognitoConfig.userPoolClientId);
    await this.keyValueStorage.setItem(authKeys.oauthSignIn, `${oauthSignIn},${preferPrivateSession}`);
  }
}
const createKeysForAuthStorage$1 = (provider, identifier) => {
  return getAuthStorageKeys(OAuthStorageKeys)(provider, identifier);
};
const oAuthStore = new DefaultOAuthStore(defaultStorage);
class TokenOrchestrator {
  constructor() {
    this.waitForInflightOAuth = isBrowser() ? async () => {
      if (!await oAuthStore.loadOAuthInFlight()) {
        return;
      }
      if (this.inflightPromise) {
        return this.inflightPromise;
      }
      this.inflightPromise = new Promise((resolve, _reject) => {
      });
      return this.inflightPromise;
    } : async () => {
    };
  }
  setAuthConfig(authConfig) {
    oAuthStore.setAuthConfig(authConfig.Cognito);
    this.authConfig = authConfig;
  }
  setTokenRefresher(tokenRefresher) {
    this.tokenRefresher = tokenRefresher;
  }
  setAuthTokenStore(tokenStore) {
    this.tokenStore = tokenStore;
  }
  getTokenStore() {
    if (!this.tokenStore) {
      throw new AuthError({
        name: "EmptyTokenStoreException",
        message: "TokenStore not set"
      });
    }
    return this.tokenStore;
  }
  getTokenRefresher() {
    if (!this.tokenRefresher) {
      throw new AuthError({
        name: "EmptyTokenRefresherException",
        message: "TokenRefresher not set"
      });
    }
    return this.tokenRefresher;
  }
  async getTokens(options) {
    let tokens;
    try {
      assertTokenProviderConfig(this.authConfig?.Cognito);
    } catch (_err) {
      return null;
    }
    await this.waitForInflightOAuth();
    this.inflightPromise = void 0;
    tokens = await this.getTokenStore().loadTokens();
    const username = await this.getTokenStore().getLastAuthUser();
    if (tokens === null) {
      return null;
    }
    const idTokenExpired = !!tokens?.idToken && isTokenExpired({
      expiresAt: (tokens.idToken?.payload?.exp ?? 0) * 1e3,
      clockDrift: tokens.clockDrift ?? 0
    });
    const accessTokenExpired = isTokenExpired({
      expiresAt: (tokens.accessToken?.payload?.exp ?? 0) * 1e3,
      clockDrift: tokens.clockDrift ?? 0
    });
    if (options?.forceRefresh || idTokenExpired || accessTokenExpired) {
      tokens = await this.refreshTokens({
        tokens,
        username
      });
      if (tokens === null) {
        return null;
      }
    }
    return {
      accessToken: tokens?.accessToken,
      idToken: tokens?.idToken,
      signInDetails: tokens?.signInDetails
    };
  }
  async refreshTokens({ tokens, username }) {
    try {
      const { signInDetails } = tokens;
      const newTokens = await this.getTokenRefresher()({
        tokens,
        authConfig: this.authConfig,
        username
      });
      newTokens.signInDetails = signInDetails;
      await this.setTokens({ tokens: newTokens });
      Hub.dispatch("auth", { event: "tokenRefresh" }, "Auth", AMPLIFY_SYMBOL);
      return newTokens;
    } catch (err) {
      return this.handleErrors(err);
    }
  }
  handleErrors(err) {
    assertServiceError(err);
    if (err.name !== AmplifyErrorCode.NetworkError) {
      this.clearTokens();
    }
    Hub.dispatch("auth", {
      event: "tokenRefresh_failure",
      data: { error: err }
    }, "Auth", AMPLIFY_SYMBOL);
    if (err.name.startsWith("NotAuthorizedException")) {
      return null;
    }
    throw err;
  }
  async setTokens({ tokens }) {
    return this.getTokenStore().storeTokens(tokens);
  }
  async clearTokens() {
    return this.getTokenStore().clearTokens();
  }
  getDeviceMetadata(username) {
    return this.getTokenStore().getDeviceMetadata(username);
  }
  clearDeviceMetadata(username) {
    return this.getTokenStore().clearDeviceMetadata(username);
  }
  setOAuthMetadata(metadata) {
    return this.getTokenStore().setOAuthMetadata(metadata);
  }
  getOAuthMetadata() {
    return this.getTokenStore().getOAuthMetadata();
  }
}
class CognitoUserPoolsTokenProvider {
  constructor() {
    this.authTokenStore = new DefaultTokenStore();
    this.authTokenStore.setKeyValueStorage(defaultStorage);
    this.tokenOrchestrator = new TokenOrchestrator();
    this.tokenOrchestrator.setAuthTokenStore(this.authTokenStore);
    this.tokenOrchestrator.setTokenRefresher(refreshAuthTokens);
  }
  getTokens({ forceRefresh } = { forceRefresh: false }) {
    return this.tokenOrchestrator.getTokens({ forceRefresh });
  }
  setKeyValueStorage(keyValueStorage) {
    this.authTokenStore.setKeyValueStorage(keyValueStorage);
  }
  setAuthConfig(authConfig) {
    this.authTokenStore.setAuthConfig(authConfig);
    this.tokenOrchestrator.setAuthConfig(authConfig);
  }
}
const cognitoUserPoolsTokenProvider = new CognitoUserPoolsTokenProvider();
const { tokenOrchestrator } = cognitoUserPoolsTokenProvider;
const IdentityIdStorageKeys = {
  identityId: "identityId"
};
const logger$4 = new ConsoleLogger2("DefaultIdentityIdStore");
class DefaultIdentityIdStore {
  setAuthConfig(authConfigParam) {
    assertIdentityPoolIdConfig(authConfigParam.Cognito);
    this.authConfig = authConfigParam;
    this._authKeys = createKeysForAuthStorage("Cognito", authConfigParam.Cognito.identityPoolId);
  }
  constructor(keyValueStorage) {
    this._authKeys = {};
    this._hasGuestIdentityId = false;
    this.keyValueStorage = keyValueStorage;
  }
  async loadIdentityId() {
    assertIdentityPoolIdConfig(this.authConfig?.Cognito);
    try {
      if (this._primaryIdentityId) {
        return {
          id: this._primaryIdentityId,
          type: "primary"
        };
      } else {
        const storedIdentityId = await this.keyValueStorage.getItem(this._authKeys.identityId);
        if (storedIdentityId) {
          this._hasGuestIdentityId = true;
          return {
            id: storedIdentityId,
            type: "guest"
          };
        }
        return null;
      }
    } catch (err) {
      logger$4.log("Error getting stored IdentityId.", err);
      return null;
    }
  }
  async storeIdentityId(identity2) {
    assertIdentityPoolIdConfig(this.authConfig?.Cognito);
    if (identity2.type === "guest") {
      this.keyValueStorage.setItem(this._authKeys.identityId, identity2.id);
      this._primaryIdentityId = void 0;
      this._hasGuestIdentityId = true;
    } else {
      this._primaryIdentityId = identity2.id;
      if (this._hasGuestIdentityId) {
        this.keyValueStorage.removeItem(this._authKeys.identityId);
        this._hasGuestIdentityId = false;
      }
    }
  }
  async clearIdentityId() {
    this._primaryIdentityId = void 0;
    await this.keyValueStorage.removeItem(this._authKeys.identityId);
  }
}
const createKeysForAuthStorage = (provider, identifier) => {
  return getAuthStorageKeys(IdentityIdStorageKeys)(`com.amplify.${provider}`, identifier);
};
const createCognitoIdentityPoolEndpointResolver = ({ endpointOverride }) => (input) => {
  if (endpointOverride) {
    return { url: new AmplifyUrl(endpointOverride) };
  }
  return cognitoIdentityPoolEndpointResolver(input);
};
function formLoginsMap(idToken) {
  const issuer = decodeJWT(idToken).payload.iss;
  const res = {};
  if (!issuer) {
    throw new AuthError({
      name: "InvalidIdTokenException",
      message: "Invalid Idtoken."
    });
  }
  const domainName = issuer.replace(/(^\w+:|^)\/\//, "");
  res[domainName] = idToken;
  return res;
}
async function cognitoIdentityIdProvider({ tokens, authConfig, identityIdStore }) {
  identityIdStore.setAuthConfig({ Cognito: authConfig });
  const identityId = await identityIdStore.loadIdentityId();
  if (identityId) {
    return identityId.id;
  }
  const logins = tokens?.idToken ? formLoginsMap(tokens.idToken.toString()) : {};
  const generatedIdentityId = await generateIdentityId(logins, authConfig);
  identityIdStore.storeIdentityId({
    id: generatedIdentityId,
    type: tokens ? "primary" : "guest"
  });
  return generatedIdentityId;
}
async function generateIdentityId(logins, authConfig) {
  const identityPoolId = authConfig?.identityPoolId;
  const region = getRegionFromIdentityPoolId(identityPoolId);
  const getId = createGetIdClient({
    endpointResolver: createCognitoIdentityPoolEndpointResolver({
      endpointOverride: authConfig.identityPoolEndpoint
    })
  });
  let idResult;
  try {
    idResult = (await getId({
      region
    }, {
      IdentityPoolId: identityPoolId,
      Logins: logins
    })).IdentityId;
  } catch (e) {
    assertServiceError(e);
    throw new AuthError(e);
  }
  if (!idResult) {
    throw new AuthError({
      name: "GetIdResponseException",
      message: "Received undefined response from getId operation",
      recoverySuggestion: "Make sure to pass a valid identityPoolId in the configuration."
    });
  }
  return idResult;
}
const logger$3 = new ConsoleLogger2("CognitoCredentialsProvider");
const CREDENTIALS_TTL = 50 * 60 * 1e3;
class CognitoAWSCredentialsAndIdentityIdProvider {
  constructor(identityIdStore) {
    this._nextCredentialsRefresh = 0;
    this._identityIdStore = identityIdStore;
  }
  async clearCredentialsAndIdentityId() {
    logger$3.debug("Clearing out credentials and identityId");
    this._credentialsAndIdentityId = void 0;
    await this._identityIdStore.clearIdentityId();
  }
  async clearCredentials() {
    logger$3.debug("Clearing out in-memory credentials");
    this._credentialsAndIdentityId = void 0;
  }
  async getCredentialsAndIdentityId(getCredentialsOptions) {
    const isAuthenticated2 = getCredentialsOptions.authenticated;
    const { tokens } = getCredentialsOptions;
    const { authConfig } = getCredentialsOptions;
    try {
      assertIdentityPoolIdConfig(authConfig?.Cognito);
    } catch {
      return;
    }
    if (!isAuthenticated2 && !authConfig.Cognito.allowGuestAccess) {
      return;
    }
    const { forceRefresh } = getCredentialsOptions;
    const tokenHasChanged = this.hasTokenChanged(tokens);
    const identityId = await cognitoIdentityIdProvider({
      tokens,
      authConfig: authConfig.Cognito,
      identityIdStore: this._identityIdStore
    });
    if (forceRefresh || tokenHasChanged) {
      this.clearCredentials();
    }
    if (!isAuthenticated2) {
      return this.getGuestCredentials(identityId, authConfig.Cognito);
    } else {
      assertIdTokenInAuthTokens(tokens);
      return this.credsForOIDCTokens(authConfig.Cognito, tokens, identityId);
    }
  }
  async getGuestCredentials(identityId, authConfig) {
    if (this._credentialsAndIdentityId && !this.isPastTTL() && this._credentialsAndIdentityId.isAuthenticatedCreds === false) {
      logger$3.info("returning stored credentials as they neither past TTL nor expired.");
      return this._credentialsAndIdentityId;
    }
    this.clearCredentials();
    const region = getRegionFromIdentityPoolId(authConfig.identityPoolId);
    const getCredentialsForIdentity = createGetCredentialsForIdentityClient({
      endpointResolver: createCognitoIdentityPoolEndpointResolver({
        endpointOverride: authConfig.identityPoolEndpoint
      })
    });
    let clientResult;
    try {
      clientResult = await getCredentialsForIdentity({ region }, {
        IdentityId: identityId
      });
    } catch (e) {
      assertServiceError(e);
      throw new AuthError(e);
    }
    if (clientResult?.Credentials?.AccessKeyId && clientResult?.Credentials?.SecretKey) {
      this._nextCredentialsRefresh = (/* @__PURE__ */ new Date()).getTime() + CREDENTIALS_TTL;
      const res = {
        credentials: {
          accessKeyId: clientResult.Credentials.AccessKeyId,
          secretAccessKey: clientResult.Credentials.SecretKey,
          sessionToken: clientResult.Credentials.SessionToken,
          expiration: clientResult.Credentials.Expiration
        },
        identityId
      };
      if (clientResult.IdentityId) {
        res.identityId = clientResult.IdentityId;
        this._identityIdStore.storeIdentityId({
          id: clientResult.IdentityId,
          type: "guest"
        });
      }
      this._credentialsAndIdentityId = {
        ...res,
        isAuthenticatedCreds: false
      };
      return res;
    } else {
      throw new AuthError({
        name: "CredentialsNotFoundException",
        message: `Cognito did not respond with either Credentials, AccessKeyId or SecretKey.`
      });
    }
  }
  async credsForOIDCTokens(authConfig, authTokens, identityId) {
    if (this._credentialsAndIdentityId && !this.isPastTTL() && this._credentialsAndIdentityId.isAuthenticatedCreds === true) {
      logger$3.debug("returning stored credentials as they neither past TTL nor expired.");
      return this._credentialsAndIdentityId;
    }
    this.clearCredentials();
    const logins = authTokens.idToken ? formLoginsMap(authTokens.idToken.toString()) : {};
    const region = getRegionFromIdentityPoolId(authConfig.identityPoolId);
    const getCredentialsForIdentity = createGetCredentialsForIdentityClient({
      endpointResolver: createCognitoIdentityPoolEndpointResolver({
        endpointOverride: authConfig.identityPoolEndpoint
      })
    });
    let clientResult;
    try {
      clientResult = await getCredentialsForIdentity({ region }, {
        IdentityId: identityId,
        Logins: logins
      });
    } catch (e) {
      assertServiceError(e);
      throw new AuthError(e);
    }
    if (clientResult?.Credentials?.AccessKeyId && clientResult?.Credentials?.SecretKey) {
      this._nextCredentialsRefresh = (/* @__PURE__ */ new Date()).getTime() + CREDENTIALS_TTL;
      const res = {
        credentials: {
          accessKeyId: clientResult.Credentials.AccessKeyId,
          secretAccessKey: clientResult.Credentials.SecretKey,
          sessionToken: clientResult.Credentials.SessionToken,
          expiration: clientResult.Credentials.Expiration
        },
        identityId
      };
      if (clientResult.IdentityId) {
        res.identityId = clientResult.IdentityId;
        this._identityIdStore.storeIdentityId({
          id: clientResult.IdentityId,
          type: "primary"
        });
      }
      this._credentialsAndIdentityId = {
        ...res,
        isAuthenticatedCreds: true,
        associatedIdToken: authTokens.idToken?.toString()
      };
      return res;
    } else {
      throw new AuthError({
        name: "CredentialsException",
        message: `Cognito did not respond with either Credentials, AccessKeyId or SecretKey.`
      });
    }
  }
  isPastTTL() {
    return this._nextCredentialsRefresh === void 0 ? true : this._nextCredentialsRefresh <= Date.now();
  }
  hasTokenChanged(tokens) {
    return !!tokens && !!this._credentialsAndIdentityId?.associatedIdToken && tokens.idToken?.toString() !== this._credentialsAndIdentityId.associatedIdToken;
  }
}
const cognitoCredentialsProvider = new CognitoAWSCredentialsAndIdentityIdProvider(new DefaultIdentityIdStore(defaultStorage));
const DefaultAmplify = {
  /**
   * Configures Amplify with the {@link resourceConfig} and {@link libraryOptions}.
   *
   * @param resourceConfig The {@link ResourcesConfig} object that is typically imported from the
   * `amplifyconfiguration.json` file. It can also be an object literal created inline when calling `Amplify.configure`.
   * @param libraryOptions The {@link LibraryOptions} additional options for the library.
   *
   * @example
   * import config from './amplifyconfiguration.json';
   *
   * Amplify.configure(config);
   */
  configure(resourceConfig, libraryOptions) {
    const resolvedResourceConfig = parseAmplifyConfig(resourceConfig);
    const cookieBasedKeyValueStorage = new CookieStorage({ sameSite: "lax" });
    const resolvedKeyValueStorage = libraryOptions?.ssr ? cookieBasedKeyValueStorage : defaultStorage$1;
    const resolvedCredentialsProvider = libraryOptions?.ssr ? new CognitoAWSCredentialsAndIdentityIdProvider(new DefaultIdentityIdStore(cookieBasedKeyValueStorage)) : cognitoCredentialsProvider;
    if (!resolvedResourceConfig.Auth) {
      Amplify.configure(resolvedResourceConfig, libraryOptions);
      return;
    }
    if (libraryOptions?.Auth) {
      Amplify.configure(resolvedResourceConfig, libraryOptions);
      return;
    }
    if (!Amplify.libraryOptions.Auth) {
      cognitoUserPoolsTokenProvider.setAuthConfig(resolvedResourceConfig.Auth);
      cognitoUserPoolsTokenProvider.setKeyValueStorage(
        // TODO: allow configure with a public interface
        resolvedKeyValueStorage
      );
      Amplify.configure(resolvedResourceConfig, {
        ...libraryOptions,
        Auth: {
          tokenProvider: cognitoUserPoolsTokenProvider,
          credentialsProvider: resolvedCredentialsProvider
        }
      });
      return;
    }
    if (libraryOptions) {
      const authLibraryOptions = Amplify.libraryOptions.Auth;
      if (libraryOptions.ssr !== void 0) {
        cognitoUserPoolsTokenProvider.setKeyValueStorage(
          // TODO: allow configure with a public interface
          resolvedKeyValueStorage
        );
        authLibraryOptions.credentialsProvider = resolvedCredentialsProvider;
      }
      Amplify.configure(resolvedResourceConfig, {
        Auth: authLibraryOptions,
        ...libraryOptions
      });
      return;
    }
    Amplify.configure(resolvedResourceConfig);
  },
  /**
   * Returns the {@link ResourcesConfig} object passed in as the `resourceConfig` parameter when calling
   * `Amplify.configure`.
   *
   * @returns An {@link ResourcesConfig} object.
   */
  getConfig() {
    return Amplify.getConfig();
  }
};
function _typeof$2(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$2 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$2 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$2(obj);
}
function isObjectLike(value) {
  return _typeof$2(value) == "object" && value !== null;
}
var SYMBOL_TO_STRING_TAG = typeof Symbol === "function" && Symbol.toStringTag != null ? Symbol.toStringTag : "@@toStringTag";
function getLocation(source, position) {
  var lineRegexp = /\r\n|[\n\r]/g;
  var line = 1;
  var column = position + 1;
  var match;
  while ((match = lineRegexp.exec(source.body)) && match.index < position) {
    line += 1;
    column = position + 1 - (match.index + match[0].length);
  }
  return {
    line,
    column
  };
}
function printLocation(location2) {
  return printSourceLocation(location2.source, getLocation(location2.source, location2.start));
}
function printSourceLocation(source, sourceLocation) {
  var firstLineColumnOffset = source.locationOffset.column - 1;
  var body = whitespace(firstLineColumnOffset) + source.body;
  var lineIndex = sourceLocation.line - 1;
  var lineOffset = source.locationOffset.line - 1;
  var lineNum = sourceLocation.line + lineOffset;
  var columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  var columnNum = sourceLocation.column + columnOffset;
  var locationStr = "".concat(source.name, ":").concat(lineNum, ":").concat(columnNum, "\n");
  var lines = body.split(/\r\n|[\n\r]/g);
  var locationLine = lines[lineIndex];
  if (locationLine.length > 120) {
    var subLineIndex = Math.floor(columnNum / 80);
    var subLineColumnNum = columnNum % 80;
    var subLines = [];
    for (var i = 0; i < locationLine.length; i += 80) {
      subLines.push(locationLine.slice(i, i + 80));
    }
    return locationStr + printPrefixedLines([["".concat(lineNum), subLines[0]]].concat(subLines.slice(1, subLineIndex + 1).map(function(subLine) {
      return ["", subLine];
    }), [[" ", whitespace(subLineColumnNum - 1) + "^"], ["", subLines[subLineIndex + 1]]]));
  }
  return locationStr + printPrefixedLines([
    // Lines specified like this: ["prefix", "string"],
    ["".concat(lineNum - 1), lines[lineIndex - 1]],
    ["".concat(lineNum), locationLine],
    ["", whitespace(columnNum - 1) + "^"],
    ["".concat(lineNum + 1), lines[lineIndex + 1]]
  ]);
}
function printPrefixedLines(lines) {
  var existingLines = lines.filter(function(_ref) {
    _ref[0];
    var line = _ref[1];
    return line !== void 0;
  });
  var padLen = Math.max.apply(Math, existingLines.map(function(_ref2) {
    var prefix = _ref2[0];
    return prefix.length;
  }));
  return existingLines.map(function(_ref3) {
    var prefix = _ref3[0], line = _ref3[1];
    return leftPad(padLen, prefix) + (line ? " | " + line : " |");
  }).join("\n");
}
function whitespace(len) {
  return Array(len + 1).join(" ");
}
function leftPad(len, str) {
  return whitespace(len - str.length) + str;
}
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$1 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$1 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$1(obj);
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self2, call) {
  if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self2);
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2)) return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2)) return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
    return _setPrototypeOf(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance = new Constructor();
      if (Class2) _setPrototypeOf(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
var GraphQLError = /* @__PURE__ */ (function(_Error) {
  _inherits(GraphQLError2, _Error);
  var _super = _createSuper(GraphQLError2);
  function GraphQLError2(message, nodes, source, positions, path, originalError, extensions) {
    var _nodeLocations, _nodeLocations2, _nodeLocations3;
    var _this;
    _classCallCheck(this, GraphQLError2);
    _this = _super.call(this, message);
    _this.name = "GraphQLError";
    _this.originalError = originalError !== null && originalError !== void 0 ? originalError : void 0;
    _this.nodes = undefinedIfEmpty(Array.isArray(nodes) ? nodes : nodes ? [nodes] : void 0);
    var nodeLocations = [];
    for (var _i2 = 0, _ref3 = (_this$nodes = _this.nodes) !== null && _this$nodes !== void 0 ? _this$nodes : []; _i2 < _ref3.length; _i2++) {
      var _this$nodes;
      var _ref4 = _ref3[_i2];
      var loc = _ref4.loc;
      if (loc != null) {
        nodeLocations.push(loc);
      }
    }
    nodeLocations = undefinedIfEmpty(nodeLocations);
    _this.source = source !== null && source !== void 0 ? source : (_nodeLocations = nodeLocations) === null || _nodeLocations === void 0 ? void 0 : _nodeLocations[0].source;
    _this.positions = positions !== null && positions !== void 0 ? positions : (_nodeLocations2 = nodeLocations) === null || _nodeLocations2 === void 0 ? void 0 : _nodeLocations2.map(function(loc2) {
      return loc2.start;
    });
    _this.locations = positions && source ? positions.map(function(pos) {
      return getLocation(source, pos);
    }) : (_nodeLocations3 = nodeLocations) === null || _nodeLocations3 === void 0 ? void 0 : _nodeLocations3.map(function(loc2) {
      return getLocation(loc2.source, loc2.start);
    });
    _this.path = path !== null && path !== void 0 ? path : void 0;
    var originalExtensions = originalError === null || originalError === void 0 ? void 0 : originalError.extensions;
    if (extensions == null && isObjectLike(originalExtensions)) {
      _this.extensions = _objectSpread({}, originalExtensions);
    } else {
      _this.extensions = extensions !== null && extensions !== void 0 ? extensions : {};
    }
    Object.defineProperties(_assertThisInitialized(_this), {
      message: {
        enumerable: true
      },
      locations: {
        enumerable: _this.locations != null
      },
      path: {
        enumerable: _this.path != null
      },
      extensions: {
        enumerable: _this.extensions != null && Object.keys(_this.extensions).length > 0
      },
      name: {
        enumerable: false
      },
      nodes: {
        enumerable: false
      },
      source: {
        enumerable: false
      },
      positions: {
        enumerable: false
      },
      originalError: {
        enumerable: false
      }
    });
    if (originalError !== null && originalError !== void 0 && originalError.stack) {
      Object.defineProperty(_assertThisInitialized(_this), "stack", {
        value: originalError.stack,
        writable: true,
        configurable: true
      });
      return _possibleConstructorReturn(_this);
    }
    if (Error.captureStackTrace) {
      Error.captureStackTrace(_assertThisInitialized(_this), GraphQLError2);
    } else {
      Object.defineProperty(_assertThisInitialized(_this), "stack", {
        value: Error().stack,
        writable: true,
        configurable: true
      });
    }
    return _this;
  }
  _createClass$1(GraphQLError2, [{
    key: "toString",
    value: function toString() {
      return printError(this);
    }
    // FIXME: workaround to not break chai comparisons, should be remove in v16
    // $FlowFixMe[unsupported-syntax] Flow doesn't support computed properties yet
  }, {
    key: SYMBOL_TO_STRING_TAG,
    get: function get() {
      return "Object";
    }
  }]);
  return GraphQLError2;
})(/* @__PURE__ */ _wrapNativeSuper(Error));
function undefinedIfEmpty(array) {
  return array === void 0 || array.length === 0 ? void 0 : array;
}
function printError(error2) {
  var output = error2.message;
  if (error2.nodes) {
    for (var _i4 = 0, _error$nodes2 = error2.nodes; _i4 < _error$nodes2.length; _i4++) {
      var node = _error$nodes2[_i4];
      if (node.loc) {
        output += "\n\n" + printLocation(node.loc);
      }
    }
  } else if (error2.source && error2.locations) {
    for (var _i6 = 0, _error$locations2 = error2.locations; _i6 < _error$locations2.length; _i6++) {
      var location2 = _error$locations2[_i6];
      output += "\n\n" + printSourceLocation(error2.source, location2);
    }
  }
  return output;
}
function syntaxError(source, position, description) {
  return new GraphQLError("Syntax Error: ".concat(description), void 0, source, [position]);
}
var Kind = Object.freeze({
  // Name
  NAME: "Name",
  // Document
  DOCUMENT: "Document",
  OPERATION_DEFINITION: "OperationDefinition",
  VARIABLE_DEFINITION: "VariableDefinition",
  SELECTION_SET: "SelectionSet",
  FIELD: "Field",
  ARGUMENT: "Argument",
  // Fragments
  FRAGMENT_SPREAD: "FragmentSpread",
  INLINE_FRAGMENT: "InlineFragment",
  FRAGMENT_DEFINITION: "FragmentDefinition",
  // Values
  VARIABLE: "Variable",
  INT: "IntValue",
  FLOAT: "FloatValue",
  STRING: "StringValue",
  BOOLEAN: "BooleanValue",
  NULL: "NullValue",
  ENUM: "EnumValue",
  LIST: "ListValue",
  OBJECT: "ObjectValue",
  OBJECT_FIELD: "ObjectField",
  // Directives
  DIRECTIVE: "Directive",
  // Types
  NAMED_TYPE: "NamedType",
  LIST_TYPE: "ListType",
  NON_NULL_TYPE: "NonNullType",
  // Type System Definitions
  SCHEMA_DEFINITION: "SchemaDefinition",
  OPERATION_TYPE_DEFINITION: "OperationTypeDefinition",
  // Type Definitions
  SCALAR_TYPE_DEFINITION: "ScalarTypeDefinition",
  OBJECT_TYPE_DEFINITION: "ObjectTypeDefinition",
  FIELD_DEFINITION: "FieldDefinition",
  INPUT_VALUE_DEFINITION: "InputValueDefinition",
  INTERFACE_TYPE_DEFINITION: "InterfaceTypeDefinition",
  UNION_TYPE_DEFINITION: "UnionTypeDefinition",
  ENUM_TYPE_DEFINITION: "EnumTypeDefinition",
  ENUM_VALUE_DEFINITION: "EnumValueDefinition",
  INPUT_OBJECT_TYPE_DEFINITION: "InputObjectTypeDefinition",
  // Directive Definitions
  DIRECTIVE_DEFINITION: "DirectiveDefinition",
  // Type System Extensions
  SCHEMA_EXTENSION: "SchemaExtension",
  // Type Extensions
  SCALAR_TYPE_EXTENSION: "ScalarTypeExtension",
  OBJECT_TYPE_EXTENSION: "ObjectTypeExtension",
  INTERFACE_TYPE_EXTENSION: "InterfaceTypeExtension",
  UNION_TYPE_EXTENSION: "UnionTypeExtension",
  ENUM_TYPE_EXTENSION: "EnumTypeExtension",
  INPUT_OBJECT_TYPE_EXTENSION: "InputObjectTypeExtension"
});
function invariant(condition, message) {
  var booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error("Unexpected invariant triggered.");
  }
}
var nodejsCustomInspectSymbol = typeof Symbol === "function" && typeof Symbol.for === "function" ? Symbol.for("nodejs.util.inspect.custom") : void 0;
function defineInspect(classObject) {
  var fn = classObject.prototype.toJSON;
  typeof fn === "function" || invariant(0);
  classObject.prototype.inspect = fn;
  if (nodejsCustomInspectSymbol) {
    classObject.prototype[nodejsCustomInspectSymbol] = fn;
  }
}
var Location = /* @__PURE__ */ (function() {
  function Location2(startToken, endToken, source) {
    this.start = startToken.start;
    this.end = endToken.end;
    this.startToken = startToken;
    this.endToken = endToken;
    this.source = source;
  }
  var _proto = Location2.prototype;
  _proto.toJSON = function toJSON() {
    return {
      start: this.start,
      end: this.end
    };
  };
  return Location2;
})();
defineInspect(Location);
var Token = /* @__PURE__ */ (function() {
  function Token2(kind, start, end, line, column, prev, value) {
    this.kind = kind;
    this.start = start;
    this.end = end;
    this.line = line;
    this.column = column;
    this.value = value;
    this.prev = prev;
    this.next = null;
  }
  var _proto2 = Token2.prototype;
  _proto2.toJSON = function toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  };
  return Token2;
})();
defineInspect(Token);
function isNode(maybeNode) {
  return maybeNode != null && typeof maybeNode.kind === "string";
}
var TokenKind = Object.freeze({
  SOF: "<SOF>",
  EOF: "<EOF>",
  BANG: "!",
  DOLLAR: "$",
  AMP: "&",
  PAREN_L: "(",
  PAREN_R: ")",
  SPREAD: "...",
  COLON: ":",
  EQUALS: "=",
  AT: "@",
  BRACKET_L: "[",
  BRACKET_R: "]",
  BRACE_L: "{",
  PIPE: "|",
  BRACE_R: "}",
  NAME: "Name",
  INT: "Int",
  FLOAT: "Float",
  STRING: "String",
  BLOCK_STRING: "BlockString",
  COMMENT: "Comment"
});
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
var MAX_ARRAY_LENGTH = 10;
var MAX_RECURSIVE_DEPTH = 2;
function inspect(value) {
  return formatValue(value, []);
}
function formatValue(value, seenValues) {
  switch (_typeof(value)) {
    case "string":
      return JSON.stringify(value);
    case "function":
      return value.name ? "[function ".concat(value.name, "]") : "[function]";
    case "object":
      if (value === null) {
        return "null";
      }
      return formatObjectValue(value, seenValues);
    default:
      return String(value);
  }
}
function formatObjectValue(value, previouslySeenValues) {
  if (previouslySeenValues.indexOf(value) !== -1) {
    return "[Circular]";
  }
  var seenValues = [].concat(previouslySeenValues, [value]);
  var customInspectFn = getCustomFn(value);
  if (customInspectFn !== void 0) {
    var customValue = customInspectFn.call(value);
    if (customValue !== value) {
      return typeof customValue === "string" ? customValue : formatValue(customValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }
  return formatObject(value, seenValues);
}
function formatObject(object, seenValues) {
  var keys = Object.keys(object);
  if (keys.length === 0) {
    return "{}";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[" + getObjectTag(object) + "]";
  }
  var properties = keys.map(function(key) {
    var value = formatValue(object[key], seenValues);
    return key + ": " + value;
  });
  return "{ " + properties.join(", ") + " }";
}
function formatArray(array, seenValues) {
  if (array.length === 0) {
    return "[]";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[Array]";
  }
  var len = Math.min(MAX_ARRAY_LENGTH, array.length);
  var remaining = array.length - len;
  var items = [];
  for (var i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }
  if (remaining === 1) {
    items.push("... 1 more item");
  } else if (remaining > 1) {
    items.push("... ".concat(remaining, " more items"));
  }
  return "[" + items.join(", ") + "]";
}
function getCustomFn(object) {
  var customInspectFn = object[String(nodejsCustomInspectSymbol)];
  if (typeof customInspectFn === "function") {
    return customInspectFn;
  }
  if (typeof object.inspect === "function") {
    return object.inspect;
  }
}
function getObjectTag(object) {
  var tag = Object.prototype.toString.call(object).replace(/^\[object /, "").replace(/]$/, "");
  if (tag === "Object" && typeof object.constructor === "function") {
    var name2 = object.constructor.name;
    if (typeof name2 === "string" && name2 !== "") {
      return name2;
    }
  }
  return tag;
}
function devAssert(condition, message) {
  var booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(message);
  }
}
const instanceOf = (
  // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
  // eslint-disable-next-line no-shadow
  (function instanceOf2(value, constructor) {
    return value instanceof constructor;
  })
);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  return Constructor;
}
var Source = /* @__PURE__ */ (function() {
  function Source2(body) {
    var name2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "GraphQL request";
    var locationOffset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
      line: 1,
      column: 1
    };
    typeof body === "string" || devAssert(0, "Body must be a string. Received: ".concat(inspect(body), "."));
    this.body = body;
    this.name = name2;
    this.locationOffset = locationOffset;
    this.locationOffset.line > 0 || devAssert(0, "line in locationOffset is 1-indexed and must be positive.");
    this.locationOffset.column > 0 || devAssert(0, "column in locationOffset is 1-indexed and must be positive.");
  }
  _createClass(Source2, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get() {
      return "Source";
    }
  }]);
  return Source2;
})();
function isSource(source) {
  return instanceOf(source, Source);
}
var DirectiveLocation = Object.freeze({
  // Request Definitions
  QUERY: "QUERY",
  MUTATION: "MUTATION",
  SUBSCRIPTION: "SUBSCRIPTION",
  FIELD: "FIELD",
  FRAGMENT_DEFINITION: "FRAGMENT_DEFINITION",
  FRAGMENT_SPREAD: "FRAGMENT_SPREAD",
  INLINE_FRAGMENT: "INLINE_FRAGMENT",
  VARIABLE_DEFINITION: "VARIABLE_DEFINITION",
  // Type System Definitions
  SCHEMA: "SCHEMA",
  SCALAR: "SCALAR",
  OBJECT: "OBJECT",
  FIELD_DEFINITION: "FIELD_DEFINITION",
  ARGUMENT_DEFINITION: "ARGUMENT_DEFINITION",
  INTERFACE: "INTERFACE",
  UNION: "UNION",
  ENUM: "ENUM",
  ENUM_VALUE: "ENUM_VALUE",
  INPUT_OBJECT: "INPUT_OBJECT",
  INPUT_FIELD_DEFINITION: "INPUT_FIELD_DEFINITION"
});
function dedentBlockStringValue(rawString) {
  var lines = rawString.split(/\r\n|[\n\r]/g);
  var commonIndent = getBlockStringIndentation(rawString);
  if (commonIndent !== 0) {
    for (var i = 1; i < lines.length; i++) {
      lines[i] = lines[i].slice(commonIndent);
    }
  }
  var startLine = 0;
  while (startLine < lines.length && isBlank(lines[startLine])) {
    ++startLine;
  }
  var endLine = lines.length;
  while (endLine > startLine && isBlank(lines[endLine - 1])) {
    --endLine;
  }
  return lines.slice(startLine, endLine).join("\n");
}
function isBlank(str) {
  for (var i = 0; i < str.length; ++i) {
    if (str[i] !== " " && str[i] !== "	") {
      return false;
    }
  }
  return true;
}
function getBlockStringIndentation(value) {
  var _commonIndent;
  var isFirstLine = true;
  var isEmptyLine = true;
  var indent2 = 0;
  var commonIndent = null;
  for (var i = 0; i < value.length; ++i) {
    switch (value.charCodeAt(i)) {
      case 13:
        if (value.charCodeAt(i + 1) === 10) {
          ++i;
        }
      // falls through
      case 10:
        isFirstLine = false;
        isEmptyLine = true;
        indent2 = 0;
        break;
      case 9:
      //   \t
      case 32:
        ++indent2;
        break;
      default:
        if (isEmptyLine && !isFirstLine && (commonIndent === null || indent2 < commonIndent)) {
          commonIndent = indent2;
        }
        isEmptyLine = false;
    }
  }
  return (_commonIndent = commonIndent) !== null && _commonIndent !== void 0 ? _commonIndent : 0;
}
function printBlockString(value) {
  var indentation = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  var preferMultipleLines = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var isSingleLine = value.indexOf("\n") === -1;
  var hasLeadingSpace = value[0] === " " || value[0] === "	";
  var hasTrailingQuote = value[value.length - 1] === '"';
  var hasTrailingSlash = value[value.length - 1] === "\\";
  var printAsMultipleLines = !isSingleLine || hasTrailingQuote || hasTrailingSlash || preferMultipleLines;
  var result = "";
  if (printAsMultipleLines && !(isSingleLine && hasLeadingSpace)) {
    result += "\n" + indentation;
  }
  result += indentation ? value.replace(/\n/g, "\n" + indentation) : value;
  if (printAsMultipleLines) {
    result += "\n";
  }
  return '"""' + result.replace(/"""/g, '\\"""') + '"""';
}
var Lexer = /* @__PURE__ */ (function() {
  function Lexer2(source) {
    var startOfFileToken = new Token(TokenKind.SOF, 0, 0, 0, 0, null);
    this.source = source;
    this.lastToken = startOfFileToken;
    this.token = startOfFileToken;
    this.line = 1;
    this.lineStart = 0;
  }
  var _proto = Lexer2.prototype;
  _proto.advance = function advance() {
    this.lastToken = this.token;
    var token = this.token = this.lookahead();
    return token;
  };
  _proto.lookahead = function lookahead() {
    var token = this.token;
    if (token.kind !== TokenKind.EOF) {
      do {
        var _token$next;
        token = (_token$next = token.next) !== null && _token$next !== void 0 ? _token$next : token.next = readToken(this, token);
      } while (token.kind === TokenKind.COMMENT);
    }
    return token;
  };
  return Lexer2;
})();
function isPunctuatorTokenKind(kind) {
  return kind === TokenKind.BANG || kind === TokenKind.DOLLAR || kind === TokenKind.AMP || kind === TokenKind.PAREN_L || kind === TokenKind.PAREN_R || kind === TokenKind.SPREAD || kind === TokenKind.COLON || kind === TokenKind.EQUALS || kind === TokenKind.AT || kind === TokenKind.BRACKET_L || kind === TokenKind.BRACKET_R || kind === TokenKind.BRACE_L || kind === TokenKind.PIPE || kind === TokenKind.BRACE_R;
}
function printCharCode(code) {
  return (
    // NaN/undefined represents access beyond the end of the file.
    isNaN(code) ? TokenKind.EOF : (
      // Trust JSON for ASCII.
      code < 127 ? JSON.stringify(String.fromCharCode(code)) : (
        // Otherwise print the escaped form.
        '"\\u'.concat(("00" + code.toString(16).toUpperCase()).slice(-4), '"')
      )
    )
  );
}
function readToken(lexer, prev) {
  var source = lexer.source;
  var body = source.body;
  var bodyLength = body.length;
  var pos = prev.end;
  while (pos < bodyLength) {
    var code = body.charCodeAt(pos);
    var _line = lexer.line;
    var _col = 1 + pos - lexer.lineStart;
    switch (code) {
      case 65279:
      // <BOM>
      case 9:
      //   \t
      case 32:
      //  <space>
      case 44:
        ++pos;
        continue;
      case 10:
        ++pos;
        ++lexer.line;
        lexer.lineStart = pos;
        continue;
      case 13:
        if (body.charCodeAt(pos + 1) === 10) {
          pos += 2;
        } else {
          ++pos;
        }
        ++lexer.line;
        lexer.lineStart = pos;
        continue;
      case 33:
        return new Token(TokenKind.BANG, pos, pos + 1, _line, _col, prev);
      case 35:
        return readComment(source, pos, _line, _col, prev);
      case 36:
        return new Token(TokenKind.DOLLAR, pos, pos + 1, _line, _col, prev);
      case 38:
        return new Token(TokenKind.AMP, pos, pos + 1, _line, _col, prev);
      case 40:
        return new Token(TokenKind.PAREN_L, pos, pos + 1, _line, _col, prev);
      case 41:
        return new Token(TokenKind.PAREN_R, pos, pos + 1, _line, _col, prev);
      case 46:
        if (body.charCodeAt(pos + 1) === 46 && body.charCodeAt(pos + 2) === 46) {
          return new Token(TokenKind.SPREAD, pos, pos + 3, _line, _col, prev);
        }
        break;
      case 58:
        return new Token(TokenKind.COLON, pos, pos + 1, _line, _col, prev);
      case 61:
        return new Token(TokenKind.EQUALS, pos, pos + 1, _line, _col, prev);
      case 64:
        return new Token(TokenKind.AT, pos, pos + 1, _line, _col, prev);
      case 91:
        return new Token(TokenKind.BRACKET_L, pos, pos + 1, _line, _col, prev);
      case 93:
        return new Token(TokenKind.BRACKET_R, pos, pos + 1, _line, _col, prev);
      case 123:
        return new Token(TokenKind.BRACE_L, pos, pos + 1, _line, _col, prev);
      case 124:
        return new Token(TokenKind.PIPE, pos, pos + 1, _line, _col, prev);
      case 125:
        return new Token(TokenKind.BRACE_R, pos, pos + 1, _line, _col, prev);
      case 34:
        if (body.charCodeAt(pos + 1) === 34 && body.charCodeAt(pos + 2) === 34) {
          return readBlockString(source, pos, _line, _col, prev, lexer);
        }
        return readString(source, pos, _line, _col, prev);
      case 45:
      //  -
      case 48:
      //  0
      case 49:
      //  1
      case 50:
      //  2
      case 51:
      //  3
      case 52:
      //  4
      case 53:
      //  5
      case 54:
      //  6
      case 55:
      //  7
      case 56:
      //  8
      case 57:
        return readNumber(source, pos, code, _line, _col, prev);
      case 65:
      //  A
      case 66:
      //  B
      case 67:
      //  C
      case 68:
      //  D
      case 69:
      //  E
      case 70:
      //  F
      case 71:
      //  G
      case 72:
      //  H
      case 73:
      //  I
      case 74:
      //  J
      case 75:
      //  K
      case 76:
      //  L
      case 77:
      //  M
      case 78:
      //  N
      case 79:
      //  O
      case 80:
      //  P
      case 81:
      //  Q
      case 82:
      //  R
      case 83:
      //  S
      case 84:
      //  T
      case 85:
      //  U
      case 86:
      //  V
      case 87:
      //  W
      case 88:
      //  X
      case 89:
      //  Y
      case 90:
      //  Z
      case 95:
      //  _
      case 97:
      //  a
      case 98:
      //  b
      case 99:
      //  c
      case 100:
      // d
      case 101:
      // e
      case 102:
      // f
      case 103:
      // g
      case 104:
      // h
      case 105:
      // i
      case 106:
      // j
      case 107:
      // k
      case 108:
      // l
      case 109:
      // m
      case 110:
      // n
      case 111:
      // o
      case 112:
      // p
      case 113:
      // q
      case 114:
      // r
      case 115:
      // s
      case 116:
      // t
      case 117:
      // u
      case 118:
      // v
      case 119:
      // w
      case 120:
      // x
      case 121:
      // y
      case 122:
        return readName(source, pos, _line, _col, prev);
    }
    throw syntaxError(source, pos, unexpectedCharacterMessage(code));
  }
  var line = lexer.line;
  var col = 1 + pos - lexer.lineStart;
  return new Token(TokenKind.EOF, bodyLength, bodyLength, line, col, prev);
}
function unexpectedCharacterMessage(code) {
  if (code < 32 && code !== 9 && code !== 10 && code !== 13) {
    return "Cannot contain the invalid character ".concat(printCharCode(code), ".");
  }
  if (code === 39) {
    return `Unexpected single quote character ('), did you mean to use a double quote (")?`;
  }
  return "Cannot parse the unexpected character ".concat(printCharCode(code), ".");
}
function readComment(source, start, line, col, prev) {
  var body = source.body;
  var code;
  var position = start;
  do {
    code = body.charCodeAt(++position);
  } while (!isNaN(code) && // SourceCharacter but not LineTerminator
  (code > 31 || code === 9));
  return new Token(TokenKind.COMMENT, start, position, line, col, prev, body.slice(start + 1, position));
}
function readNumber(source, start, firstCode, line, col, prev) {
  var body = source.body;
  var code = firstCode;
  var position = start;
  var isFloat = false;
  if (code === 45) {
    code = body.charCodeAt(++position);
  }
  if (code === 48) {
    code = body.charCodeAt(++position);
    if (code >= 48 && code <= 57) {
      throw syntaxError(source, position, "Invalid number, unexpected digit after 0: ".concat(printCharCode(code), "."));
    }
  } else {
    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46) {
    isFloat = true;
    code = body.charCodeAt(++position);
    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 69 || code === 101) {
    isFloat = true;
    code = body.charCodeAt(++position);
    if (code === 43 || code === 45) {
      code = body.charCodeAt(++position);
    }
    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46 || isNameStart(code)) {
    throw syntaxError(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
  }
  return new Token(isFloat ? TokenKind.FLOAT : TokenKind.INT, start, position, line, col, prev, body.slice(start, position));
}
function readDigits(source, start, firstCode) {
  var body = source.body;
  var position = start;
  var code = firstCode;
  if (code >= 48 && code <= 57) {
    do {
      code = body.charCodeAt(++position);
    } while (code >= 48 && code <= 57);
    return position;
  }
  throw syntaxError(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
}
function readString(source, start, line, col, prev) {
  var body = source.body;
  var position = start + 1;
  var chunkStart = position;
  var code = 0;
  var value = "";
  while (position < body.length && !isNaN(code = body.charCodeAt(position)) && // not LineTerminator
  code !== 10 && code !== 13) {
    if (code === 34) {
      value += body.slice(chunkStart, position);
      return new Token(TokenKind.STRING, start, position + 1, line, col, prev, value);
    }
    if (code < 32 && code !== 9) {
      throw syntaxError(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
    }
    ++position;
    if (code === 92) {
      value += body.slice(chunkStart, position - 1);
      code = body.charCodeAt(position);
      switch (code) {
        case 34:
          value += '"';
          break;
        case 47:
          value += "/";
          break;
        case 92:
          value += "\\";
          break;
        case 98:
          value += "\b";
          break;
        case 102:
          value += "\f";
          break;
        case 110:
          value += "\n";
          break;
        case 114:
          value += "\r";
          break;
        case 116:
          value += "	";
          break;
        case 117: {
          var charCode = uniCharCode(body.charCodeAt(position + 1), body.charCodeAt(position + 2), body.charCodeAt(position + 3), body.charCodeAt(position + 4));
          if (charCode < 0) {
            var invalidSequence = body.slice(position + 1, position + 5);
            throw syntaxError(source, position, "Invalid character escape sequence: \\u".concat(invalidSequence, "."));
          }
          value += String.fromCharCode(charCode);
          position += 4;
          break;
        }
        default:
          throw syntaxError(source, position, "Invalid character escape sequence: \\".concat(String.fromCharCode(code), "."));
      }
      ++position;
      chunkStart = position;
    }
  }
  throw syntaxError(source, position, "Unterminated string.");
}
function readBlockString(source, start, line, col, prev, lexer) {
  var body = source.body;
  var position = start + 3;
  var chunkStart = position;
  var code = 0;
  var rawValue = "";
  while (position < body.length && !isNaN(code = body.charCodeAt(position))) {
    if (code === 34 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
      rawValue += body.slice(chunkStart, position);
      return new Token(TokenKind.BLOCK_STRING, start, position + 3, line, col, prev, dedentBlockStringValue(rawValue));
    }
    if (code < 32 && code !== 9 && code !== 10 && code !== 13) {
      throw syntaxError(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
    }
    if (code === 10) {
      ++position;
      ++lexer.line;
      lexer.lineStart = position;
    } else if (code === 13) {
      if (body.charCodeAt(position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }
      ++lexer.line;
      lexer.lineStart = position;
    } else if (
      // Escape Triple-Quote (\""")
      code === 92 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34 && body.charCodeAt(position + 3) === 34
    ) {
      rawValue += body.slice(chunkStart, position) + '"""';
      position += 4;
      chunkStart = position;
    } else {
      ++position;
    }
  }
  throw syntaxError(source, position, "Unterminated string.");
}
function uniCharCode(a, b, c, d) {
  return char2hex(a) << 12 | char2hex(b) << 8 | char2hex(c) << 4 | char2hex(d);
}
function char2hex(a) {
  return a >= 48 && a <= 57 ? a - 48 : a >= 65 && a <= 70 ? a - 55 : a >= 97 && a <= 102 ? a - 87 : -1;
}
function readName(source, start, line, col, prev) {
  var body = source.body;
  var bodyLength = body.length;
  var position = start + 1;
  var code = 0;
  while (position !== bodyLength && !isNaN(code = body.charCodeAt(position)) && (code === 95 || // _
  code >= 48 && code <= 57 || // 0-9
  code >= 65 && code <= 90 || // A-Z
  code >= 97 && code <= 122)) {
    ++position;
  }
  return new Token(TokenKind.NAME, start, position, line, col, prev, body.slice(start, position));
}
function isNameStart(code) {
  return code === 95 || code >= 65 && code <= 90 || code >= 97 && code <= 122;
}
function parse(source, options) {
  var parser = new Parser(source, options);
  return parser.parseDocument();
}
var Parser = /* @__PURE__ */ (function() {
  function Parser2(source, options) {
    var sourceObj = isSource(source) ? source : new Source(source);
    this._lexer = new Lexer(sourceObj);
    this._options = options;
  }
  var _proto = Parser2.prototype;
  _proto.parseName = function parseName() {
    var token = this.expectToken(TokenKind.NAME);
    return {
      kind: Kind.NAME,
      value: token.value,
      loc: this.loc(token)
    };
  };
  _proto.parseDocument = function parseDocument() {
    var start = this._lexer.token;
    return {
      kind: Kind.DOCUMENT,
      definitions: this.many(TokenKind.SOF, this.parseDefinition, TokenKind.EOF),
      loc: this.loc(start)
    };
  };
  _proto.parseDefinition = function parseDefinition() {
    if (this.peek(TokenKind.NAME)) {
      switch (this._lexer.token.value) {
        case "query":
        case "mutation":
        case "subscription":
          return this.parseOperationDefinition();
        case "fragment":
          return this.parseFragmentDefinition();
        case "schema":
        case "scalar":
        case "type":
        case "interface":
        case "union":
        case "enum":
        case "input":
        case "directive":
          return this.parseTypeSystemDefinition();
        case "extend":
          return this.parseTypeSystemExtension();
      }
    } else if (this.peek(TokenKind.BRACE_L)) {
      return this.parseOperationDefinition();
    } else if (this.peekDescription()) {
      return this.parseTypeSystemDefinition();
    }
    throw this.unexpected();
  };
  _proto.parseOperationDefinition = function parseOperationDefinition() {
    var start = this._lexer.token;
    if (this.peek(TokenKind.BRACE_L)) {
      return {
        kind: Kind.OPERATION_DEFINITION,
        operation: "query",
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet(),
        loc: this.loc(start)
      };
    }
    var operation = this.parseOperationType();
    var name2;
    if (this.peek(TokenKind.NAME)) {
      name2 = this.parseName();
    }
    return {
      kind: Kind.OPERATION_DEFINITION,
      operation,
      name: name2,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start)
    };
  };
  _proto.parseOperationType = function parseOperationType() {
    var operationToken = this.expectToken(TokenKind.NAME);
    switch (operationToken.value) {
      case "query":
        return "query";
      case "mutation":
        return "mutation";
      case "subscription":
        return "subscription";
    }
    throw this.unexpected(operationToken);
  };
  _proto.parseVariableDefinitions = function parseVariableDefinitions() {
    return this.optionalMany(TokenKind.PAREN_L, this.parseVariableDefinition, TokenKind.PAREN_R);
  };
  _proto.parseVariableDefinition = function parseVariableDefinition() {
    var start = this._lexer.token;
    return {
      kind: Kind.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(TokenKind.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(TokenKind.EQUALS) ? this.parseValueLiteral(true) : void 0,
      directives: this.parseDirectives(true),
      loc: this.loc(start)
    };
  };
  _proto.parseVariable = function parseVariable() {
    var start = this._lexer.token;
    this.expectToken(TokenKind.DOLLAR);
    return {
      kind: Kind.VARIABLE,
      name: this.parseName(),
      loc: this.loc(start)
    };
  };
  _proto.parseSelectionSet = function parseSelectionSet() {
    var start = this._lexer.token;
    return {
      kind: Kind.SELECTION_SET,
      selections: this.many(TokenKind.BRACE_L, this.parseSelection, TokenKind.BRACE_R),
      loc: this.loc(start)
    };
  };
  _proto.parseSelection = function parseSelection() {
    return this.peek(TokenKind.SPREAD) ? this.parseFragment() : this.parseField();
  };
  _proto.parseField = function parseField() {
    var start = this._lexer.token;
    var nameOrAlias = this.parseName();
    var alias;
    var name2;
    if (this.expectOptionalToken(TokenKind.COLON)) {
      alias = nameOrAlias;
      name2 = this.parseName();
    } else {
      name2 = nameOrAlias;
    }
    return {
      kind: Kind.FIELD,
      alias,
      name: name2,
      arguments: this.parseArguments(false),
      directives: this.parseDirectives(false),
      selectionSet: this.peek(TokenKind.BRACE_L) ? this.parseSelectionSet() : void 0,
      loc: this.loc(start)
    };
  };
  _proto.parseArguments = function parseArguments(isConst) {
    var item = isConst ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(TokenKind.PAREN_L, item, TokenKind.PAREN_R);
  };
  _proto.parseArgument = function parseArgument() {
    var start = this._lexer.token;
    var name2 = this.parseName();
    this.expectToken(TokenKind.COLON);
    return {
      kind: Kind.ARGUMENT,
      name: name2,
      value: this.parseValueLiteral(false),
      loc: this.loc(start)
    };
  };
  _proto.parseConstArgument = function parseConstArgument() {
    var start = this._lexer.token;
    return {
      kind: Kind.ARGUMENT,
      name: this.parseName(),
      value: (this.expectToken(TokenKind.COLON), this.parseValueLiteral(true)),
      loc: this.loc(start)
    };
  };
  _proto.parseFragment = function parseFragment() {
    var start = this._lexer.token;
    this.expectToken(TokenKind.SPREAD);
    var hasTypeCondition = this.expectOptionalKeyword("on");
    if (!hasTypeCondition && this.peek(TokenKind.NAME)) {
      return {
        kind: Kind.FRAGMENT_SPREAD,
        name: this.parseFragmentName(),
        directives: this.parseDirectives(false),
        loc: this.loc(start)
      };
    }
    return {
      kind: Kind.INLINE_FRAGMENT,
      typeCondition: hasTypeCondition ? this.parseNamedType() : void 0,
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start)
    };
  };
  _proto.parseFragmentDefinition = function parseFragmentDefinition() {
    var _this$_options;
    var start = this._lexer.token;
    this.expectKeyword("fragment");
    if (((_this$_options = this._options) === null || _this$_options === void 0 ? void 0 : _this$_options.experimentalFragmentVariables) === true) {
      return {
        kind: Kind.FRAGMENT_DEFINITION,
        name: this.parseFragmentName(),
        variableDefinitions: this.parseVariableDefinitions(),
        typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet(),
        loc: this.loc(start)
      };
    }
    return {
      kind: Kind.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start)
    };
  };
  _proto.parseFragmentName = function parseFragmentName() {
    if (this._lexer.token.value === "on") {
      throw this.unexpected();
    }
    return this.parseName();
  };
  _proto.parseValueLiteral = function parseValueLiteral(isConst) {
    var token = this._lexer.token;
    switch (token.kind) {
      case TokenKind.BRACKET_L:
        return this.parseList(isConst);
      case TokenKind.BRACE_L:
        return this.parseObject(isConst);
      case TokenKind.INT:
        this._lexer.advance();
        return {
          kind: Kind.INT,
          value: token.value,
          loc: this.loc(token)
        };
      case TokenKind.FLOAT:
        this._lexer.advance();
        return {
          kind: Kind.FLOAT,
          value: token.value,
          loc: this.loc(token)
        };
      case TokenKind.STRING:
      case TokenKind.BLOCK_STRING:
        return this.parseStringLiteral();
      case TokenKind.NAME:
        this._lexer.advance();
        switch (token.value) {
          case "true":
            return {
              kind: Kind.BOOLEAN,
              value: true,
              loc: this.loc(token)
            };
          case "false":
            return {
              kind: Kind.BOOLEAN,
              value: false,
              loc: this.loc(token)
            };
          case "null":
            return {
              kind: Kind.NULL,
              loc: this.loc(token)
            };
          default:
            return {
              kind: Kind.ENUM,
              value: token.value,
              loc: this.loc(token)
            };
        }
      case TokenKind.DOLLAR:
        if (!isConst) {
          return this.parseVariable();
        }
        break;
    }
    throw this.unexpected();
  };
  _proto.parseStringLiteral = function parseStringLiteral() {
    var token = this._lexer.token;
    this._lexer.advance();
    return {
      kind: Kind.STRING,
      value: token.value,
      block: token.kind === TokenKind.BLOCK_STRING,
      loc: this.loc(token)
    };
  };
  _proto.parseList = function parseList(isConst) {
    var _this = this;
    var start = this._lexer.token;
    var item = function item2() {
      return _this.parseValueLiteral(isConst);
    };
    return {
      kind: Kind.LIST,
      values: this.any(TokenKind.BRACKET_L, item, TokenKind.BRACKET_R),
      loc: this.loc(start)
    };
  };
  _proto.parseObject = function parseObject(isConst) {
    var _this2 = this;
    var start = this._lexer.token;
    var item = function item2() {
      return _this2.parseObjectField(isConst);
    };
    return {
      kind: Kind.OBJECT,
      fields: this.any(TokenKind.BRACE_L, item, TokenKind.BRACE_R),
      loc: this.loc(start)
    };
  };
  _proto.parseObjectField = function parseObjectField(isConst) {
    var start = this._lexer.token;
    var name2 = this.parseName();
    this.expectToken(TokenKind.COLON);
    return {
      kind: Kind.OBJECT_FIELD,
      name: name2,
      value: this.parseValueLiteral(isConst),
      loc: this.loc(start)
    };
  };
  _proto.parseDirectives = function parseDirectives(isConst) {
    var directives = [];
    while (this.peek(TokenKind.AT)) {
      directives.push(this.parseDirective(isConst));
    }
    return directives;
  };
  _proto.parseDirective = function parseDirective(isConst) {
    var start = this._lexer.token;
    this.expectToken(TokenKind.AT);
    return {
      kind: Kind.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(isConst),
      loc: this.loc(start)
    };
  };
  _proto.parseTypeReference = function parseTypeReference() {
    var start = this._lexer.token;
    var type;
    if (this.expectOptionalToken(TokenKind.BRACKET_L)) {
      type = this.parseTypeReference();
      this.expectToken(TokenKind.BRACKET_R);
      type = {
        kind: Kind.LIST_TYPE,
        type,
        loc: this.loc(start)
      };
    } else {
      type = this.parseNamedType();
    }
    if (this.expectOptionalToken(TokenKind.BANG)) {
      return {
        kind: Kind.NON_NULL_TYPE,
        type,
        loc: this.loc(start)
      };
    }
    return type;
  };
  _proto.parseNamedType = function parseNamedType() {
    var start = this._lexer.token;
    return {
      kind: Kind.NAMED_TYPE,
      name: this.parseName(),
      loc: this.loc(start)
    };
  };
  _proto.parseTypeSystemDefinition = function parseTypeSystemDefinition() {
    var keywordToken = this.peekDescription() ? this._lexer.lookahead() : this._lexer.token;
    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case "schema":
          return this.parseSchemaDefinition();
        case "scalar":
          return this.parseScalarTypeDefinition();
        case "type":
          return this.parseObjectTypeDefinition();
        case "interface":
          return this.parseInterfaceTypeDefinition();
        case "union":
          return this.parseUnionTypeDefinition();
        case "enum":
          return this.parseEnumTypeDefinition();
        case "input":
          return this.parseInputObjectTypeDefinition();
        case "directive":
          return this.parseDirectiveDefinition();
      }
    }
    throw this.unexpected(keywordToken);
  };
  _proto.peekDescription = function peekDescription() {
    return this.peek(TokenKind.STRING) || this.peek(TokenKind.BLOCK_STRING);
  };
  _proto.parseDescription = function parseDescription() {
    if (this.peekDescription()) {
      return this.parseStringLiteral();
    }
  };
  _proto.parseSchemaDefinition = function parseSchemaDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("schema");
    var directives = this.parseDirectives(true);
    var operationTypes = this.many(TokenKind.BRACE_L, this.parseOperationTypeDefinition, TokenKind.BRACE_R);
    return {
      kind: Kind.SCHEMA_DEFINITION,
      description,
      directives,
      operationTypes,
      loc: this.loc(start)
    };
  };
  _proto.parseOperationTypeDefinition = function parseOperationTypeDefinition() {
    var start = this._lexer.token;
    var operation = this.parseOperationType();
    this.expectToken(TokenKind.COLON);
    var type = this.parseNamedType();
    return {
      kind: Kind.OPERATION_TYPE_DEFINITION,
      operation,
      type,
      loc: this.loc(start)
    };
  };
  _proto.parseScalarTypeDefinition = function parseScalarTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("scalar");
    var name2 = this.parseName();
    var directives = this.parseDirectives(true);
    return {
      kind: Kind.SCALAR_TYPE_DEFINITION,
      description,
      name: name2,
      directives,
      loc: this.loc(start)
    };
  };
  _proto.parseObjectTypeDefinition = function parseObjectTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("type");
    var name2 = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();
    return {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      description,
      name: name2,
      interfaces,
      directives,
      fields,
      loc: this.loc(start)
    };
  };
  _proto.parseImplementsInterfaces = function parseImplementsInterfaces() {
    var _this$_options2;
    if (!this.expectOptionalKeyword("implements")) {
      return [];
    }
    if (((_this$_options2 = this._options) === null || _this$_options2 === void 0 ? void 0 : _this$_options2.allowLegacySDLImplementsInterfaces) === true) {
      var types = [];
      this.expectOptionalToken(TokenKind.AMP);
      do {
        types.push(this.parseNamedType());
      } while (this.expectOptionalToken(TokenKind.AMP) || this.peek(TokenKind.NAME));
      return types;
    }
    return this.delimitedMany(TokenKind.AMP, this.parseNamedType);
  };
  _proto.parseFieldsDefinition = function parseFieldsDefinition() {
    var _this$_options3;
    if (((_this$_options3 = this._options) === null || _this$_options3 === void 0 ? void 0 : _this$_options3.allowLegacySDLEmptyFields) === true && this.peek(TokenKind.BRACE_L) && this._lexer.lookahead().kind === TokenKind.BRACE_R) {
      this._lexer.advance();
      this._lexer.advance();
      return [];
    }
    return this.optionalMany(TokenKind.BRACE_L, this.parseFieldDefinition, TokenKind.BRACE_R);
  };
  _proto.parseFieldDefinition = function parseFieldDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    var name2 = this.parseName();
    var args = this.parseArgumentDefs();
    this.expectToken(TokenKind.COLON);
    var type = this.parseTypeReference();
    var directives = this.parseDirectives(true);
    return {
      kind: Kind.FIELD_DEFINITION,
      description,
      name: name2,
      arguments: args,
      type,
      directives,
      loc: this.loc(start)
    };
  };
  _proto.parseArgumentDefs = function parseArgumentDefs() {
    return this.optionalMany(TokenKind.PAREN_L, this.parseInputValueDef, TokenKind.PAREN_R);
  };
  _proto.parseInputValueDef = function parseInputValueDef() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    var name2 = this.parseName();
    this.expectToken(TokenKind.COLON);
    var type = this.parseTypeReference();
    var defaultValue;
    if (this.expectOptionalToken(TokenKind.EQUALS)) {
      defaultValue = this.parseValueLiteral(true);
    }
    var directives = this.parseDirectives(true);
    return {
      kind: Kind.INPUT_VALUE_DEFINITION,
      description,
      name: name2,
      type,
      defaultValue,
      directives,
      loc: this.loc(start)
    };
  };
  _proto.parseInterfaceTypeDefinition = function parseInterfaceTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("interface");
    var name2 = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();
    return {
      kind: Kind.INTERFACE_TYPE_DEFINITION,
      description,
      name: name2,
      interfaces,
      directives,
      fields,
      loc: this.loc(start)
    };
  };
  _proto.parseUnionTypeDefinition = function parseUnionTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("union");
    var name2 = this.parseName();
    var directives = this.parseDirectives(true);
    var types = this.parseUnionMemberTypes();
    return {
      kind: Kind.UNION_TYPE_DEFINITION,
      description,
      name: name2,
      directives,
      types,
      loc: this.loc(start)
    };
  };
  _proto.parseUnionMemberTypes = function parseUnionMemberTypes() {
    return this.expectOptionalToken(TokenKind.EQUALS) ? this.delimitedMany(TokenKind.PIPE, this.parseNamedType) : [];
  };
  _proto.parseEnumTypeDefinition = function parseEnumTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("enum");
    var name2 = this.parseName();
    var directives = this.parseDirectives(true);
    var values = this.parseEnumValuesDefinition();
    return {
      kind: Kind.ENUM_TYPE_DEFINITION,
      description,
      name: name2,
      directives,
      values,
      loc: this.loc(start)
    };
  };
  _proto.parseEnumValuesDefinition = function parseEnumValuesDefinition() {
    return this.optionalMany(TokenKind.BRACE_L, this.parseEnumValueDefinition, TokenKind.BRACE_R);
  };
  _proto.parseEnumValueDefinition = function parseEnumValueDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    var name2 = this.parseName();
    var directives = this.parseDirectives(true);
    return {
      kind: Kind.ENUM_VALUE_DEFINITION,
      description,
      name: name2,
      directives,
      loc: this.loc(start)
    };
  };
  _proto.parseInputObjectTypeDefinition = function parseInputObjectTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("input");
    var name2 = this.parseName();
    var directives = this.parseDirectives(true);
    var fields = this.parseInputFieldsDefinition();
    return {
      kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
      description,
      name: name2,
      directives,
      fields,
      loc: this.loc(start)
    };
  };
  _proto.parseInputFieldsDefinition = function parseInputFieldsDefinition() {
    return this.optionalMany(TokenKind.BRACE_L, this.parseInputValueDef, TokenKind.BRACE_R);
  };
  _proto.parseTypeSystemExtension = function parseTypeSystemExtension() {
    var keywordToken = this._lexer.lookahead();
    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case "schema":
          return this.parseSchemaExtension();
        case "scalar":
          return this.parseScalarTypeExtension();
        case "type":
          return this.parseObjectTypeExtension();
        case "interface":
          return this.parseInterfaceTypeExtension();
        case "union":
          return this.parseUnionTypeExtension();
        case "enum":
          return this.parseEnumTypeExtension();
        case "input":
          return this.parseInputObjectTypeExtension();
      }
    }
    throw this.unexpected(keywordToken);
  };
  _proto.parseSchemaExtension = function parseSchemaExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("schema");
    var directives = this.parseDirectives(true);
    var operationTypes = this.optionalMany(TokenKind.BRACE_L, this.parseOperationTypeDefinition, TokenKind.BRACE_R);
    if (directives.length === 0 && operationTypes.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.SCHEMA_EXTENSION,
      directives,
      operationTypes,
      loc: this.loc(start)
    };
  };
  _proto.parseScalarTypeExtension = function parseScalarTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("scalar");
    var name2 = this.parseName();
    var directives = this.parseDirectives(true);
    if (directives.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.SCALAR_TYPE_EXTENSION,
      name: name2,
      directives,
      loc: this.loc(start)
    };
  };
  _proto.parseObjectTypeExtension = function parseObjectTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("type");
    var name2 = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();
    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.OBJECT_TYPE_EXTENSION,
      name: name2,
      interfaces,
      directives,
      fields,
      loc: this.loc(start)
    };
  };
  _proto.parseInterfaceTypeExtension = function parseInterfaceTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("interface");
    var name2 = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();
    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.INTERFACE_TYPE_EXTENSION,
      name: name2,
      interfaces,
      directives,
      fields,
      loc: this.loc(start)
    };
  };
  _proto.parseUnionTypeExtension = function parseUnionTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("union");
    var name2 = this.parseName();
    var directives = this.parseDirectives(true);
    var types = this.parseUnionMemberTypes();
    if (directives.length === 0 && types.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.UNION_TYPE_EXTENSION,
      name: name2,
      directives,
      types,
      loc: this.loc(start)
    };
  };
  _proto.parseEnumTypeExtension = function parseEnumTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("enum");
    var name2 = this.parseName();
    var directives = this.parseDirectives(true);
    var values = this.parseEnumValuesDefinition();
    if (directives.length === 0 && values.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.ENUM_TYPE_EXTENSION,
      name: name2,
      directives,
      values,
      loc: this.loc(start)
    };
  };
  _proto.parseInputObjectTypeExtension = function parseInputObjectTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("input");
    var name2 = this.parseName();
    var directives = this.parseDirectives(true);
    var fields = this.parseInputFieldsDefinition();
    if (directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
      name: name2,
      directives,
      fields,
      loc: this.loc(start)
    };
  };
  _proto.parseDirectiveDefinition = function parseDirectiveDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("directive");
    this.expectToken(TokenKind.AT);
    var name2 = this.parseName();
    var args = this.parseArgumentDefs();
    var repeatable = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    var locations = this.parseDirectiveLocations();
    return {
      kind: Kind.DIRECTIVE_DEFINITION,
      description,
      name: name2,
      arguments: args,
      repeatable,
      locations,
      loc: this.loc(start)
    };
  };
  _proto.parseDirectiveLocations = function parseDirectiveLocations() {
    return this.delimitedMany(TokenKind.PIPE, this.parseDirectiveLocation);
  };
  _proto.parseDirectiveLocation = function parseDirectiveLocation() {
    var start = this._lexer.token;
    var name2 = this.parseName();
    if (DirectiveLocation[name2.value] !== void 0) {
      return name2;
    }
    throw this.unexpected(start);
  };
  _proto.loc = function loc(startToken) {
    var _this$_options4;
    if (((_this$_options4 = this._options) === null || _this$_options4 === void 0 ? void 0 : _this$_options4.noLocation) !== true) {
      return new Location(startToken, this._lexer.lastToken, this._lexer.source);
    }
  };
  _proto.peek = function peek(kind) {
    return this._lexer.token.kind === kind;
  };
  _proto.expectToken = function expectToken(kind) {
    var token = this._lexer.token;
    if (token.kind === kind) {
      this._lexer.advance();
      return token;
    }
    throw syntaxError(this._lexer.source, token.start, "Expected ".concat(getTokenKindDesc(kind), ", found ").concat(getTokenDesc(token), "."));
  };
  _proto.expectOptionalToken = function expectOptionalToken(kind) {
    var token = this._lexer.token;
    if (token.kind === kind) {
      this._lexer.advance();
      return token;
    }
    return void 0;
  };
  _proto.expectKeyword = function expectKeyword(value) {
    var token = this._lexer.token;
    if (token.kind === TokenKind.NAME && token.value === value) {
      this._lexer.advance();
    } else {
      throw syntaxError(this._lexer.source, token.start, 'Expected "'.concat(value, '", found ').concat(getTokenDesc(token), "."));
    }
  };
  _proto.expectOptionalKeyword = function expectOptionalKeyword(value) {
    var token = this._lexer.token;
    if (token.kind === TokenKind.NAME && token.value === value) {
      this._lexer.advance();
      return true;
    }
    return false;
  };
  _proto.unexpected = function unexpected(atToken) {
    var token = atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
    return syntaxError(this._lexer.source, token.start, "Unexpected ".concat(getTokenDesc(token), "."));
  };
  _proto.any = function any(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    var nodes = [];
    while (!this.expectOptionalToken(closeKind)) {
      nodes.push(parseFn.call(this));
    }
    return nodes;
  };
  _proto.optionalMany = function optionalMany(openKind, parseFn, closeKind) {
    if (this.expectOptionalToken(openKind)) {
      var nodes = [];
      do {
        nodes.push(parseFn.call(this));
      } while (!this.expectOptionalToken(closeKind));
      return nodes;
    }
    return [];
  };
  _proto.many = function many(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    var nodes = [];
    do {
      nodes.push(parseFn.call(this));
    } while (!this.expectOptionalToken(closeKind));
    return nodes;
  };
  _proto.delimitedMany = function delimitedMany(delimiterKind, parseFn) {
    this.expectOptionalToken(delimiterKind);
    var nodes = [];
    do {
      nodes.push(parseFn.call(this));
    } while (this.expectOptionalToken(delimiterKind));
    return nodes;
  };
  return Parser2;
})();
function getTokenDesc(token) {
  var value = token.value;
  return getTokenKindDesc(token.kind) + (value != null ? ' "'.concat(value, '"') : "");
}
function getTokenKindDesc(kind) {
  return isPunctuatorTokenKind(kind) ? '"'.concat(kind, '"') : kind;
}
var QueryDocumentKeys = {
  Name: [],
  Document: ["definitions"],
  OperationDefinition: ["name", "variableDefinitions", "directives", "selectionSet"],
  VariableDefinition: ["variable", "type", "defaultValue", "directives"],
  Variable: ["name"],
  SelectionSet: ["selections"],
  Field: ["alias", "name", "arguments", "directives", "selectionSet"],
  Argument: ["name", "value"],
  FragmentSpread: ["name", "directives"],
  InlineFragment: ["typeCondition", "directives", "selectionSet"],
  FragmentDefinition: [
    "name",
    // Note: fragment variable definitions are experimental and may be changed
    // or removed in the future.
    "variableDefinitions",
    "typeCondition",
    "directives",
    "selectionSet"
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ["values"],
  ObjectValue: ["fields"],
  ObjectField: ["name", "value"],
  Directive: ["name", "arguments"],
  NamedType: ["name"],
  ListType: ["type"],
  NonNullType: ["type"],
  SchemaDefinition: ["description", "directives", "operationTypes"],
  OperationTypeDefinition: ["type"],
  ScalarTypeDefinition: ["description", "name", "directives"],
  ObjectTypeDefinition: ["description", "name", "interfaces", "directives", "fields"],
  FieldDefinition: ["description", "name", "arguments", "type", "directives"],
  InputValueDefinition: ["description", "name", "type", "defaultValue", "directives"],
  InterfaceTypeDefinition: ["description", "name", "interfaces", "directives", "fields"],
  UnionTypeDefinition: ["description", "name", "directives", "types"],
  EnumTypeDefinition: ["description", "name", "directives", "values"],
  EnumValueDefinition: ["description", "name", "directives"],
  InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
  DirectiveDefinition: ["description", "name", "arguments", "locations"],
  SchemaExtension: ["directives", "operationTypes"],
  ScalarTypeExtension: ["name", "directives"],
  ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
  InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
  UnionTypeExtension: ["name", "directives", "types"],
  EnumTypeExtension: ["name", "directives", "values"],
  InputObjectTypeExtension: ["name", "directives", "fields"]
};
var BREAK = Object.freeze({});
function visit(root, visitor) {
  var visitorKeys = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : QueryDocumentKeys;
  var stack = void 0;
  var inArray = Array.isArray(root);
  var keys = [root];
  var index = -1;
  var edits = [];
  var node = void 0;
  var key = void 0;
  var parent = void 0;
  var path = [];
  var ancestors = [];
  var newRoot = root;
  do {
    index++;
    var isLeaving = index === keys.length;
    var isEdited = isLeaving && edits.length !== 0;
    if (isLeaving) {
      key = ancestors.length === 0 ? void 0 : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();
      if (isEdited) {
        if (inArray) {
          node = node.slice();
        } else {
          var clone = {};
          for (var _i2 = 0, _Object$keys2 = Object.keys(node); _i2 < _Object$keys2.length; _i2++) {
            var k = _Object$keys2[_i2];
            clone[k] = node[k];
          }
          node = clone;
        }
        var editOffset = 0;
        for (var ii = 0; ii < edits.length; ii++) {
          var editKey = edits[ii][0];
          var editValue = edits[ii][1];
          if (inArray) {
            editKey -= editOffset;
          }
          if (inArray && editValue === null) {
            node.splice(editKey, 1);
            editOffset++;
          } else {
            node[editKey] = editValue;
          }
        }
      }
      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else {
      key = parent ? inArray ? index : keys[index] : void 0;
      node = parent ? parent[key] : newRoot;
      if (node === null || node === void 0) {
        continue;
      }
      if (parent) {
        path.push(key);
      }
    }
    var result = void 0;
    if (!Array.isArray(node)) {
      if (!isNode(node)) {
        throw new Error("Invalid AST Node: ".concat(inspect(node), "."));
      }
      var visitFn = getVisitFn(visitor, node.kind, isLeaving);
      if (visitFn) {
        result = visitFn.call(visitor, node, key, parent, path, ancestors);
        if (result === BREAK) {
          break;
        }
        if (result === false) {
          if (!isLeaving) {
            path.pop();
            continue;
          }
        } else if (result !== void 0) {
          edits.push([key, result]);
          if (!isLeaving) {
            if (isNode(result)) {
              node = result;
            } else {
              path.pop();
              continue;
            }
          }
        }
      }
    }
    if (result === void 0 && isEdited) {
      edits.push([key, node]);
    }
    if (isLeaving) {
      path.pop();
    } else {
      var _visitorKeys$node$kin;
      stack = {
        inArray,
        index,
        keys,
        edits,
        prev: stack
      };
      inArray = Array.isArray(node);
      keys = inArray ? node : (_visitorKeys$node$kin = visitorKeys[node.kind]) !== null && _visitorKeys$node$kin !== void 0 ? _visitorKeys$node$kin : [];
      index = -1;
      edits = [];
      if (parent) {
        ancestors.push(parent);
      }
      parent = node;
    }
  } while (stack !== void 0);
  if (edits.length !== 0) {
    newRoot = edits[edits.length - 1][1];
  }
  return newRoot;
}
function getVisitFn(visitor, kind, isLeaving) {
  var kindVisitor = visitor[kind];
  if (kindVisitor) {
    if (!isLeaving && typeof kindVisitor === "function") {
      return kindVisitor;
    }
    var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;
    if (typeof kindSpecificVisitor === "function") {
      return kindSpecificVisitor;
    }
  } else {
    var specificVisitor = isLeaving ? visitor.leave : visitor.enter;
    if (specificVisitor) {
      if (typeof specificVisitor === "function") {
        return specificVisitor;
      }
      var specificKindVisitor = specificVisitor[kind];
      if (typeof specificKindVisitor === "function") {
        return specificKindVisitor;
      }
    }
  }
}
function print(ast) {
  return visit(ast, {
    leave: printDocASTReducer
  });
}
var MAX_LINE_LENGTH = 80;
var printDocASTReducer = {
  Name: function Name2(node) {
    return node.value;
  },
  Variable: function Variable(node) {
    return "$" + node.name;
  },
  // Document
  Document: function Document(node) {
    return join(node.definitions, "\n\n") + "\n";
  },
  OperationDefinition: function OperationDefinition(node) {
    var op = node.operation;
    var name2 = node.name;
    var varDefs = wrap("(", join(node.variableDefinitions, ", "), ")");
    var directives = join(node.directives, " ");
    var selectionSet = node.selectionSet;
    return !name2 && !directives && !varDefs && op === "query" ? selectionSet : join([op, join([name2, varDefs]), directives, selectionSet], " ");
  },
  VariableDefinition: function VariableDefinition(_ref) {
    var variable = _ref.variable, type = _ref.type, defaultValue = _ref.defaultValue, directives = _ref.directives;
    return variable + ": " + type + wrap(" = ", defaultValue) + wrap(" ", join(directives, " "));
  },
  SelectionSet: function SelectionSet(_ref2) {
    var selections = _ref2.selections;
    return block(selections);
  },
  Field: function Field(_ref3) {
    var alias = _ref3.alias, name2 = _ref3.name, args = _ref3.arguments, directives = _ref3.directives, selectionSet = _ref3.selectionSet;
    var prefix = wrap("", alias, ": ") + name2;
    var argsLine = prefix + wrap("(", join(args, ", "), ")");
    if (argsLine.length > MAX_LINE_LENGTH) {
      argsLine = prefix + wrap("(\n", indent(join(args, "\n")), "\n)");
    }
    return join([argsLine, join(directives, " "), selectionSet], " ");
  },
  Argument: function Argument(_ref4) {
    var name2 = _ref4.name, value = _ref4.value;
    return name2 + ": " + value;
  },
  // Fragments
  FragmentSpread: function FragmentSpread(_ref5) {
    var name2 = _ref5.name, directives = _ref5.directives;
    return "..." + name2 + wrap(" ", join(directives, " "));
  },
  InlineFragment: function InlineFragment(_ref6) {
    var typeCondition = _ref6.typeCondition, directives = _ref6.directives, selectionSet = _ref6.selectionSet;
    return join(["...", wrap("on ", typeCondition), join(directives, " "), selectionSet], " ");
  },
  FragmentDefinition: function FragmentDefinition(_ref7) {
    var name2 = _ref7.name, typeCondition = _ref7.typeCondition, variableDefinitions = _ref7.variableDefinitions, directives = _ref7.directives, selectionSet = _ref7.selectionSet;
    return (
      // Note: fragment variable definitions are experimental and may be changed
      // or removed in the future.
      "fragment ".concat(name2).concat(wrap("(", join(variableDefinitions, ", "), ")"), " ") + "on ".concat(typeCondition, " ").concat(wrap("", join(directives, " "), " ")) + selectionSet
    );
  },
  // Value
  IntValue: function IntValue(_ref8) {
    var value = _ref8.value;
    return value;
  },
  FloatValue: function FloatValue(_ref9) {
    var value = _ref9.value;
    return value;
  },
  StringValue: function StringValue(_ref10, key) {
    var value = _ref10.value, isBlockString = _ref10.block;
    return isBlockString ? printBlockString(value, key === "description" ? "" : "  ") : JSON.stringify(value);
  },
  BooleanValue: function BooleanValue(_ref11) {
    var value = _ref11.value;
    return value ? "true" : "false";
  },
  NullValue: function NullValue() {
    return "null";
  },
  EnumValue: function EnumValue(_ref12) {
    var value = _ref12.value;
    return value;
  },
  ListValue: function ListValue(_ref13) {
    var values = _ref13.values;
    return "[" + join(values, ", ") + "]";
  },
  ObjectValue: function ObjectValue(_ref14) {
    var fields = _ref14.fields;
    return "{" + join(fields, ", ") + "}";
  },
  ObjectField: function ObjectField(_ref15) {
    var name2 = _ref15.name, value = _ref15.value;
    return name2 + ": " + value;
  },
  // Directive
  Directive: function Directive(_ref16) {
    var name2 = _ref16.name, args = _ref16.arguments;
    return "@" + name2 + wrap("(", join(args, ", "), ")");
  },
  // Type
  NamedType: function NamedType(_ref17) {
    var name2 = _ref17.name;
    return name2;
  },
  ListType: function ListType(_ref18) {
    var type = _ref18.type;
    return "[" + type + "]";
  },
  NonNullType: function NonNullType(_ref19) {
    var type = _ref19.type;
    return type + "!";
  },
  // Type System Definitions
  SchemaDefinition: addDescription(function(_ref20) {
    var directives = _ref20.directives, operationTypes = _ref20.operationTypes;
    return join(["schema", join(directives, " "), block(operationTypes)], " ");
  }),
  OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
    var operation = _ref21.operation, type = _ref21.type;
    return operation + ": " + type;
  },
  ScalarTypeDefinition: addDescription(function(_ref22) {
    var name2 = _ref22.name, directives = _ref22.directives;
    return join(["scalar", name2, join(directives, " ")], " ");
  }),
  ObjectTypeDefinition: addDescription(function(_ref23) {
    var name2 = _ref23.name, interfaces = _ref23.interfaces, directives = _ref23.directives, fields = _ref23.fields;
    return join(["type", name2, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields)], " ");
  }),
  FieldDefinition: addDescription(function(_ref24) {
    var name2 = _ref24.name, args = _ref24.arguments, type = _ref24.type, directives = _ref24.directives;
    return name2 + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + ": " + type + wrap(" ", join(directives, " "));
  }),
  InputValueDefinition: addDescription(function(_ref25) {
    var name2 = _ref25.name, type = _ref25.type, defaultValue = _ref25.defaultValue, directives = _ref25.directives;
    return join([name2 + ": " + type, wrap("= ", defaultValue), join(directives, " ")], " ");
  }),
  InterfaceTypeDefinition: addDescription(function(_ref26) {
    var name2 = _ref26.name, interfaces = _ref26.interfaces, directives = _ref26.directives, fields = _ref26.fields;
    return join(["interface", name2, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields)], " ");
  }),
  UnionTypeDefinition: addDescription(function(_ref27) {
    var name2 = _ref27.name, directives = _ref27.directives, types = _ref27.types;
    return join(["union", name2, join(directives, " "), types && types.length !== 0 ? "= " + join(types, " | ") : ""], " ");
  }),
  EnumTypeDefinition: addDescription(function(_ref28) {
    var name2 = _ref28.name, directives = _ref28.directives, values = _ref28.values;
    return join(["enum", name2, join(directives, " "), block(values)], " ");
  }),
  EnumValueDefinition: addDescription(function(_ref29) {
    var name2 = _ref29.name, directives = _ref29.directives;
    return join([name2, join(directives, " ")], " ");
  }),
  InputObjectTypeDefinition: addDescription(function(_ref30) {
    var name2 = _ref30.name, directives = _ref30.directives, fields = _ref30.fields;
    return join(["input", name2, join(directives, " "), block(fields)], " ");
  }),
  DirectiveDefinition: addDescription(function(_ref31) {
    var name2 = _ref31.name, args = _ref31.arguments, repeatable = _ref31.repeatable, locations = _ref31.locations;
    return "directive @" + name2 + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + (repeatable ? " repeatable" : "") + " on " + join(locations, " | ");
  }),
  SchemaExtension: function SchemaExtension(_ref32) {
    var directives = _ref32.directives, operationTypes = _ref32.operationTypes;
    return join(["extend schema", join(directives, " "), block(operationTypes)], " ");
  },
  ScalarTypeExtension: function ScalarTypeExtension(_ref33) {
    var name2 = _ref33.name, directives = _ref33.directives;
    return join(["extend scalar", name2, join(directives, " ")], " ");
  },
  ObjectTypeExtension: function ObjectTypeExtension(_ref34) {
    var name2 = _ref34.name, interfaces = _ref34.interfaces, directives = _ref34.directives, fields = _ref34.fields;
    return join(["extend type", name2, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields)], " ");
  },
  InterfaceTypeExtension: function InterfaceTypeExtension(_ref35) {
    var name2 = _ref35.name, interfaces = _ref35.interfaces, directives = _ref35.directives, fields = _ref35.fields;
    return join(["extend interface", name2, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields)], " ");
  },
  UnionTypeExtension: function UnionTypeExtension(_ref36) {
    var name2 = _ref36.name, directives = _ref36.directives, types = _ref36.types;
    return join(["extend union", name2, join(directives, " "), types && types.length !== 0 ? "= " + join(types, " | ") : ""], " ");
  },
  EnumTypeExtension: function EnumTypeExtension(_ref37) {
    var name2 = _ref37.name, directives = _ref37.directives, values = _ref37.values;
    return join(["extend enum", name2, join(directives, " "), block(values)], " ");
  },
  InputObjectTypeExtension: function InputObjectTypeExtension(_ref38) {
    var name2 = _ref38.name, directives = _ref38.directives, fields = _ref38.fields;
    return join(["extend input", name2, join(directives, " "), block(fields)], " ");
  }
};
function addDescription(cb) {
  return function(node) {
    return join([node.description, cb(node)], "\n");
  };
}
function join(maybeArray) {
  var _maybeArray$filter$jo;
  var separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return (_maybeArray$filter$jo = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.filter(function(x) {
    return x;
  }).join(separator)) !== null && _maybeArray$filter$jo !== void 0 ? _maybeArray$filter$jo : "";
}
function block(array) {
  return wrap("{\n", indent(join(array, "\n")), "\n}");
}
function wrap(start, maybeString) {
  var end = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
  return maybeString != null && maybeString !== "" ? start + maybeString + end : "";
}
function indent(str) {
  return wrap("  ", str.replace(/\n/g, "\n  "));
}
function isMultiline(str) {
  return str.indexOf("\n") !== -1;
}
function hasMultilineItems(maybeArray) {
  return maybeArray != null && maybeArray.some(isMultiline);
}
class RestApiError extends ApiError {
  constructor(params) {
    super(params);
    this.constructor = RestApiError;
    Object.setPrototypeOf(this, RestApiError.prototype);
  }
}
class CanceledError extends RestApiError {
  constructor(params = {}) {
    super({
      name: "CanceledError",
      message: "Request is canceled by user",
      ...params
    });
    this.constructor = CanceledError;
    Object.setPrototypeOf(this, CanceledError.prototype);
  }
}
const isCancelError$1 = (error2) => !!error2 && error2 instanceof CanceledError;
var RestApiValidationErrorCode;
(function(RestApiValidationErrorCode2) {
  RestApiValidationErrorCode2["InvalidApiName"] = "InvalidApiName";
})(RestApiValidationErrorCode || (RestApiValidationErrorCode = {}));
({
  [RestApiValidationErrorCode.InvalidApiName]: {}
});
const parseRestApiServiceError = async (response) => {
  if (!response) {
    return;
  }
  const parsedAwsError = await parseJsonError$1(stubErrorResponse(response));
  if (!parsedAwsError) ;
  else {
    const bodyText = await response.body?.text();
    return buildRestApiError(parsedAwsError, {
      statusCode: response.statusCode,
      headers: response.headers,
      body: bodyText
    });
  }
};
const stubErrorResponse = (response) => {
  let bodyTextPromise;
  const bodyProxy = new Proxy(response.body, {
    get(target, prop, receiver) {
      if (prop === "json") {
        return async () => {
          if (!bodyTextPromise) {
            bodyTextPromise = target.text();
          }
          try {
            return JSON.parse(await bodyTextPromise);
          } catch (error2) {
            return {};
          }
        };
      } else if (prop === "text") {
        return async () => {
          if (!bodyTextPromise) {
            bodyTextPromise = target.text();
          }
          return bodyTextPromise;
        };
      } else {
        return Reflect.get(target, prop, receiver);
      }
    }
  });
  const responseProxy = new Proxy(response, {
    get(target, prop, receiver) {
      if (prop === "body") {
        return bodyProxy;
      } else {
        return Reflect.get(target, prop, receiver);
      }
    }
  });
  return responseProxy;
};
const buildRestApiError = (error2, response) => {
  const restApiError = new RestApiError({
    name: error2?.name,
    message: error2.message,
    underlyingError: error2,
    response
  });
  return Object.assign(restApiError, { $metadata: error2.$metadata });
};
const logger$2 = new ConsoleLogger$1("RestApis");
function createCancellableOperation(handler, abortController) {
  const isInternalPost = (targetHandler) => !!abortController;
  const publicApisAbortController = new AbortController();
  const publicApisAbortSignal = publicApisAbortController.signal;
  const internalPostAbortSignal = abortController?.signal;
  let abortReason;
  const job = async () => {
    try {
      const response = await (isInternalPost(handler) ? handler() : handler(publicApisAbortSignal));
      if (response.statusCode >= 300) {
        throw await parseRestApiServiceError(response);
      }
      return response;
    } catch (error2) {
      const abortSignal = internalPostAbortSignal ?? publicApisAbortSignal;
      const message = abortReason ?? abortSignal.reason;
      if (error2.name === "AbortError" || abortSignal?.aborted === true) {
        const canceledError = new CanceledError({
          ...message && { message },
          underlyingError: error2,
          recoverySuggestion: "The API request was explicitly canceled. If this is not intended, validate if you called the `cancel()` function on the API request erroneously."
        });
        logger$2.debug(error2);
        throw canceledError;
      }
      logger$2.debug(error2);
      throw error2;
    }
  };
  if (isInternalPost()) {
    return job();
  } else {
    const cancel2 = (abortMessage) => {
      if (publicApisAbortSignal.aborted === true) {
        return;
      }
      publicApisAbortController.abort(abortMessage);
      if (abortMessage && publicApisAbortSignal.reason !== abortMessage) {
        abortReason = abortMessage;
      }
    };
    return { response: job(), cancel: cancel2 };
  }
}
const DEFAULT_REST_IAM_SIGNING_SERVICE = "execute-api";
const DEFAULT_IAM_SIGNING_REGION = "us-east-1";
const APIG_HOSTNAME_PATTERN = /^.+\.([a-z0-9-]+)\.([a-z0-9-]+)\.amazonaws\.com/;
const parseSigningInfo = (url, restApiOptions) => {
  const { service: signingService = DEFAULT_REST_IAM_SIGNING_SERVICE, region: signingRegion = DEFAULT_IAM_SIGNING_REGION } = {};
  const { hostname } = url;
  const [, service, region] = APIG_HOSTNAME_PATTERN.exec(hostname) ?? [];
  if (service === DEFAULT_REST_IAM_SIGNING_SERVICE) {
    return {
      service,
      region: region ?? signingRegion
    };
  } else if (service === "appsync-api") {
    return {
      service: "appsync",
      region: region ?? signingRegion
    };
  } else {
    return {
      service: signingService,
      region: signingRegion
    };
  }
};
const isIamAuthApplicableForGraphQL = ({ headers }, signingServiceInfo) => !headers.authorization && !headers["x-api-key"] && !!signingServiceInfo;
const resolveHeaders = (headers, body) => {
  const normalizedHeaders = {};
  for (const key in headers) {
    normalizedHeaders[key.toLowerCase()] = headers[key];
  }
  if (body) {
    const contentType = normalizedHeaders["content-type"];
    const isJsonCompatible = contentType && (contentType.startsWith("application/json") || contentType.startsWith("application/") && contentType.includes("+json"));
    if (!isJsonCompatible) {
      normalizedHeaders["content-type"] = "application/json; charset=UTF-8";
    }
    if (body instanceof FormData) {
      delete normalizedHeaders["content-type"];
    }
  }
  return normalizedHeaders;
};
const authenticatedHandler = composeTransferHandler$1(fetchTransferHandler$1, [
  userAgentMiddlewareFactory$1,
  retryMiddlewareFactory$1,
  signingMiddlewareFactory
]);
const unauthenticatedHandler = composeTransferHandler$1(fetchTransferHandler$1, [userAgentMiddlewareFactory$1, retryMiddlewareFactory$1]);
const transferHandler = async (amplify, options, iamAuthApplicable, signingServiceInfo) => {
  const { url, method, headers, body, withCredentials, abortSignal, retryStrategy } = options;
  const resolvedBody = body ? body instanceof FormData ? body : JSON.stringify(body ?? "") : void 0;
  const resolvedHeaders = resolveHeaders(headers, body);
  const request = {
    url,
    headers: resolvedHeaders,
    method,
    body: resolvedBody
  };
  const baseOptions = {
    retryDecider: getRetryDeciderFromStrategy(retryStrategy ?? amplify?.libraryOptions?.API?.REST?.retryStrategy),
    computeDelay: jitteredBackoff$2,
    withCrossDomainCredentials: withCredentials,
    abortSignal
  };
  const isIamAuthApplicable = iamAuthApplicable(request, signingServiceInfo);
  let response;
  const credentials = await resolveCredentials(amplify);
  if (isIamAuthApplicable && credentials) {
    const signingInfoFromUrl = parseSigningInfo(url);
    const signingService = signingServiceInfo?.service ?? signingInfoFromUrl.service;
    const signingRegion = signingServiceInfo?.region ?? signingInfoFromUrl.region;
    response = await authenticatedHandler(request, {
      ...baseOptions,
      credentials,
      region: signingRegion,
      service: signingService
    });
  } else {
    response = await unauthenticatedHandler(request, {
      ...baseOptions
    });
  }
  return {
    statusCode: response.statusCode,
    headers: response.headers,
    body: response.body
  };
};
const getRetryDeciderFromStrategy = (retryStrategy) => {
  const strategy = retryStrategy?.strategy;
  if (strategy === "no-retry") {
    return () => Promise.resolve({ retryable: false });
  }
  return getRetryDecider$1(parseRestApiServiceError);
};
const resolveCredentials = async (amplify) => {
  try {
    const { credentials } = await amplify.Auth.fetchAuthSession();
    if (credentials) {
      return credentials;
    }
  } catch (e) {
    logger$2.debug("No credentials available, the request will be unsigned.");
  }
  return null;
};
const cancelTokenMap = /* @__PURE__ */ new WeakMap();
const post = (amplify, { url, options, abortController }) => {
  const controller = abortController ?? new AbortController();
  const responsePromise = createCancellableOperation(async () => {
    const response = transferHandler(amplify, {
      url,
      method: "POST",
      ...options,
      abortSignal: controller.signal,
      retryStrategy: {
        strategy: "jittered-exponential-backoff"
      }
    }, isIamAuthApplicableForGraphQL, options?.signingServiceInfo);
    return response;
  }, controller);
  const responseWithCleanUp = responsePromise.finally(() => {
    cancelTokenMap.delete(responseWithCleanUp);
  });
  return responseWithCleanUp;
};
const cancel$1 = (promise, message) => {
  const controller = cancelTokenMap.get(promise);
  if (controller) {
    controller.abort(message);
    if (message && controller.signal.reason !== message) {
      controller.signal.reason = message;
    }
    return true;
  }
  return false;
};
const updateRequestToBeCancellable = (promise, controller) => {
  cancelTokenMap.set(promise, controller);
};
const MAX_DELAY_MS = 5e3;
const NON_RETRYABLE_CODES = [400, 401, 403];
const NON_RETRYABLE_ERROR_TYPES = [
  "BadRequestException",
  "UnauthorizedException"
];
const CONNECTION_STATE_CHANGE = "ConnectionStateChange";
var MESSAGE_TYPES;
(function(MESSAGE_TYPES2) {
  MESSAGE_TYPES2["GQL_CONNECTION_INIT"] = "connection_init";
  MESSAGE_TYPES2["GQL_CONNECTION_ERROR"] = "connection_error";
  MESSAGE_TYPES2["GQL_CONNECTION_ACK"] = "connection_ack";
  MESSAGE_TYPES2["GQL_START"] = "start";
  MESSAGE_TYPES2["GQL_START_ACK"] = "start_ack";
  MESSAGE_TYPES2["DATA"] = "data";
  MESSAGE_TYPES2["GQL_CONNECTION_KEEP_ALIVE"] = "ka";
  MESSAGE_TYPES2["GQL_STOP"] = "stop";
  MESSAGE_TYPES2["GQL_COMPLETE"] = "complete";
  MESSAGE_TYPES2["GQL_ERROR"] = "error";
  MESSAGE_TYPES2["EVENT_SUBSCRIBE"] = "subscribe";
  MESSAGE_TYPES2["EVENT_PUBLISH"] = "publish";
  MESSAGE_TYPES2["EVENT_SUBSCRIBE_ACK"] = "subscribe_success";
  MESSAGE_TYPES2["EVENT_PUBLISH_ACK"] = "publish_success";
  MESSAGE_TYPES2["EVENT_STOP"] = "unsubscribe";
  MESSAGE_TYPES2["EVENT_COMPLETE"] = "unsubscribe_success";
  MESSAGE_TYPES2["EVENT_SUBSCRIBE_ERROR"] = "subscribe_error";
})(MESSAGE_TYPES || (MESSAGE_TYPES = {}));
var SUBSCRIPTION_STATUS;
(function(SUBSCRIPTION_STATUS2) {
  SUBSCRIPTION_STATUS2[SUBSCRIPTION_STATUS2["PENDING"] = 0] = "PENDING";
  SUBSCRIPTION_STATUS2[SUBSCRIPTION_STATUS2["CONNECTED"] = 1] = "CONNECTED";
  SUBSCRIPTION_STATUS2[SUBSCRIPTION_STATUS2["FAILED"] = 2] = "FAILED";
})(SUBSCRIPTION_STATUS || (SUBSCRIPTION_STATUS = {}));
var SOCKET_STATUS;
(function(SOCKET_STATUS2) {
  SOCKET_STATUS2[SOCKET_STATUS2["CLOSED"] = 0] = "CLOSED";
  SOCKET_STATUS2[SOCKET_STATUS2["READY"] = 1] = "READY";
  SOCKET_STATUS2[SOCKET_STATUS2["CONNECTING"] = 2] = "CONNECTING";
})(SOCKET_STATUS || (SOCKET_STATUS = {}));
const AWS_APPSYNC_REALTIME_HEADERS = {
  accept: "application/json, text/javascript",
  "content-encoding": "amz-1.0",
  "content-type": "application/json; charset=UTF-8"
};
const CONNECTION_INIT_TIMEOUT = 15e3;
const START_ACK_TIMEOUT = 15e3;
const DEFAULT_KEEP_ALIVE_TIMEOUT = 5 * 60 * 1e3;
const DEFAULT_KEEP_ALIVE_HEARTBEAT_TIMEOUT = 5 * 1e3;
const DEFAULT_KEEP_ALIVE_ALERT_TIMEOUT = 65 * 1e3;
const RECONNECT_DELAY = 5 * 1e3;
const RECONNECT_INTERVAL = 60 * 1e3;
var CONTROL_MSG;
(function(CONTROL_MSG2) {
  CONTROL_MSG2["CONNECTION_CLOSED"] = "Connection closed";
  CONTROL_MSG2["CONNECTION_FAILED"] = "Connection failed";
  CONTROL_MSG2["REALTIME_SUBSCRIPTION_INIT_ERROR"] = "AppSync Realtime subscription init error";
  CONTROL_MSG2["SUBSCRIPTION_ACK"] = "Subscription ack";
  CONTROL_MSG2["TIMEOUT_DISCONNECT"] = "Timeout disconnect";
})(CONTROL_MSG || (CONTROL_MSG = {}));
var ConnectionState;
(function(ConnectionState2) {
  ConnectionState2["Connected"] = "Connected";
  ConnectionState2["ConnectedPendingNetwork"] = "ConnectedPendingNetwork";
  ConnectionState2["ConnectionDisrupted"] = "ConnectionDisrupted";
  ConnectionState2["ConnectionDisruptedPendingNetwork"] = "ConnectionDisruptedPendingNetwork";
  ConnectionState2["Connecting"] = "Connecting";
  ConnectionState2["ConnectedPendingDisconnect"] = "ConnectedPendingDisconnect";
  ConnectionState2["Disconnected"] = "Disconnected";
  ConnectionState2["ConnectedPendingKeepAlive"] = "ConnectedPendingKeepAlive";
})(ConnectionState || (ConnectionState = {}));
const ReachabilityMonitor = () => new Reachability().networkMonitor();
const CONNECTION_CHANGE = {
  KEEP_ALIVE_MISSED: { keepAliveState: "unhealthy" },
  KEEP_ALIVE: { keepAliveState: "healthy" },
  CONNECTION_ESTABLISHED: { connectionState: "connected" },
  CONNECTION_FAILED: {
    intendedConnectionState: "disconnected",
    connectionState: "disconnected"
  },
  CLOSING_CONNECTION: { intendedConnectionState: "disconnected" },
  OPENING_CONNECTION: {
    intendedConnectionState: "connected",
    connectionState: "connecting"
  },
  CLOSED: { connectionState: "disconnected" },
  ONLINE: { networkState: "connected" },
  OFFLINE: { networkState: "disconnected" }
};
class ConnectionStateMonitor {
  constructor() {
    this._networkMonitoringSubscription = void 0;
    this._linkedConnectionState = {
      networkState: "connected",
      connectionState: "disconnected",
      intendedConnectionState: "disconnected",
      keepAliveState: "healthy"
    };
    this._initialNetworkStateSubscription = ReachabilityMonitor().subscribe(({ online }) => {
      this.record(online ? CONNECTION_CHANGE.ONLINE : CONNECTION_CHANGE.OFFLINE);
      this._initialNetworkStateSubscription?.unsubscribe();
    });
    this._linkedConnectionStateObservable = new Observable((connectionStateObserver) => {
      connectionStateObserver.next(this._linkedConnectionState);
      this._linkedConnectionStateObserver = connectionStateObserver;
    });
  }
  /**
   * Turn network state monitoring on if it isn't on already
   */
  enableNetworkMonitoring() {
    this._initialNetworkStateSubscription?.unsubscribe();
    if (this._networkMonitoringSubscription === void 0) {
      this._networkMonitoringSubscription = ReachabilityMonitor().subscribe(({ online }) => {
        this.record(online ? CONNECTION_CHANGE.ONLINE : CONNECTION_CHANGE.OFFLINE);
      });
    }
  }
  /**
   * Turn network state monitoring off if it isn't off already
   */
  disableNetworkMonitoring() {
    this._networkMonitoringSubscription?.unsubscribe();
    this._networkMonitoringSubscription = void 0;
  }
  /**
   * Get the observable that allows us to monitor the connection state
   *
   * @returns {Observable<ConnectionState>} - The observable that emits ConnectionState updates
   */
  get connectionStateObservable() {
    let previous;
    return this._linkedConnectionStateObservable.pipe(map((value) => {
      return this.connectionStatesTranslator(value);
    })).pipe(filter((current) => {
      const toInclude = current !== previous;
      previous = current;
      return toInclude;
    }));
  }
  /*
   * Updates local connection state and emits the full state to the observer.
   */
  record(statusUpdates) {
    if (statusUpdates.intendedConnectionState === "connected") {
      this.enableNetworkMonitoring();
    } else if (statusUpdates.intendedConnectionState === "disconnected") {
      this.disableNetworkMonitoring();
    }
    const newSocketStatus = {
      ...this._linkedConnectionState,
      ...statusUpdates
    };
    this._linkedConnectionState = { ...newSocketStatus };
    this._linkedConnectionStateObserver?.next(this._linkedConnectionState);
  }
  /*
   * Translate the ConnectionState structure into a specific ConnectionState string literal union
   */
  connectionStatesTranslator({ connectionState, networkState, intendedConnectionState, keepAliveState }) {
    if (connectionState === "connected" && networkState === "disconnected")
      return ConnectionState.ConnectedPendingNetwork;
    if (connectionState === "connected" && intendedConnectionState === "disconnected")
      return ConnectionState.ConnectedPendingDisconnect;
    if (connectionState === "disconnected" && intendedConnectionState === "connected" && networkState === "disconnected")
      return ConnectionState.ConnectionDisruptedPendingNetwork;
    if (connectionState === "disconnected" && intendedConnectionState === "connected")
      return ConnectionState.ConnectionDisrupted;
    if (connectionState === "connected" && keepAliveState === "unhealthy")
      return ConnectionState.ConnectedPendingKeepAlive;
    if (connectionState === "connecting")
      return ConnectionState.Connecting;
    if (connectionState === "disconnected")
      return ConnectionState.Disconnected;
    return ConnectionState.Connected;
  }
}
var ReconnectEvent;
(function(ReconnectEvent2) {
  ReconnectEvent2["START_RECONNECT"] = "START_RECONNECT";
  ReconnectEvent2["HALT_RECONNECT"] = "HALT_RECONNECT";
})(ReconnectEvent || (ReconnectEvent = {}));
class ReconnectionMonitor {
  constructor() {
    this.reconnectObservers = [];
  }
  /**
   * Add reconnect observer to the list of observers to alert on reconnect
   */
  addObserver(reconnectObserver) {
    this.reconnectObservers.push(reconnectObserver);
  }
  /**
   * Given a reconnect event, start the appropriate behavior
   */
  record(event) {
    if (event === ReconnectEvent.START_RECONNECT) {
      if (this.reconnectSetTimeoutId === void 0 && this.reconnectIntervalId === void 0) {
        this.reconnectSetTimeoutId = setTimeout(() => {
          this._triggerReconnect();
          this.reconnectIntervalId = setInterval(() => {
            this._triggerReconnect();
          }, RECONNECT_INTERVAL);
        }, RECONNECT_DELAY);
      }
    }
    if (event === ReconnectEvent.HALT_RECONNECT) {
      if (this.reconnectIntervalId) {
        clearInterval(this.reconnectIntervalId);
        this.reconnectIntervalId = void 0;
      }
      if (this.reconnectSetTimeoutId) {
        clearTimeout(this.reconnectSetTimeoutId);
        this.reconnectSetTimeoutId = void 0;
      }
    }
  }
  /**
   * Complete all reconnect observers
   */
  close() {
    this.reconnectObservers.forEach((reconnectObserver) => {
      reconnectObserver.complete?.();
    });
  }
  _triggerReconnect() {
    this.reconnectObservers.forEach((reconnectObserver) => {
      reconnectObserver.next?.();
    });
  }
}
const protocol = "wss://";
const standardDomainPattern = /^https:\/\/\w{26}\.appsync-api\.\w{2}(?:(?:-\w{2,})+)-\d\.amazonaws.com(?:\.cn)?\/graphql$/i;
const eventDomainPattern = /^https:\/\/\w{26}\.\w+-api\.\w{2}(?:(?:-\w{2,})+)-\d\.amazonaws.com(?:\.cn)?\/event$/i;
const customDomainPath = "/realtime";
const isCustomDomain = (url) => {
  return url.match(standardDomainPattern) === null;
};
const isEventDomain = (url) => url.match(eventDomainPattern) !== null;
const getRealtimeEndpointUrl = (appSyncGraphqlEndpoint) => {
  let realtimeEndpoint = appSyncGraphqlEndpoint ?? "";
  if (isEventDomain(realtimeEndpoint)) {
    realtimeEndpoint = realtimeEndpoint.concat(customDomainPath).replace("ddpg-api", "grt-gamma").replace("appsync-api", "appsync-realtime-api");
  } else if (isCustomDomain(realtimeEndpoint)) {
    realtimeEndpoint = realtimeEndpoint.concat(customDomainPath);
  } else {
    realtimeEndpoint = realtimeEndpoint.replace("appsync-api", "appsync-realtime-api").replace("gogi-beta", "grt-beta").replace("ddpg-api", "grt-gamma");
  }
  realtimeEndpoint = realtimeEndpoint.replace("https://", protocol).replace("http://", protocol);
  return new AmplifyUrl$1(realtimeEndpoint);
};
const extractNonAuthHeaders = (headers) => {
  if (!headers) {
    return {};
  }
  if ("Authorization" in headers) {
    const { Authorization: _, ...nonAuthHeaders } = headers;
    return nonAuthHeaders;
  }
  return headers;
};
const queryParamsFromCustomHeaders = (headers) => {
  const nonAuthHeaders = extractNonAuthHeaders(headers);
  const params = new AmplifyUrlSearchParams();
  Object.entries(nonAuthHeaders).forEach(([k, v]) => {
    params.append(k, v);
  });
  return params;
};
const realtimeUrlWithQueryString = (appSyncGraphqlEndpoint, urlParams) => {
  const realtimeEndpointUrl = getRealtimeEndpointUrl(appSyncGraphqlEndpoint);
  const existingParams = new AmplifyUrlSearchParams(realtimeEndpointUrl.search);
  for (const [k, v] of urlParams.entries()) {
    existingParams.append(k, v);
  }
  realtimeEndpointUrl.search = existingParams.toString();
  return realtimeEndpointUrl.toString();
};
const additionalHeadersFromOptions = async (options) => {
  const { appSyncGraphqlEndpoint, query, libraryConfigHeaders = () => ({}), additionalHeaders = {}, authToken } = options;
  let additionalCustomHeaders = {};
  const _libraryConfigHeaders = await libraryConfigHeaders();
  if (typeof additionalHeaders === "function") {
    const requestOptions = {
      url: appSyncGraphqlEndpoint || "",
      queryString: query || ""
    };
    additionalCustomHeaders = await additionalHeaders(requestOptions);
  } else {
    additionalCustomHeaders = additionalHeaders;
  }
  if (authToken) {
    additionalCustomHeaders = {
      ...additionalCustomHeaders,
      Authorization: authToken
    };
  }
  return {
    additionalCustomHeaders,
    libraryConfigHeaders: _libraryConfigHeaders
  };
};
const logger$1 = new ConsoleLogger$1("AWSAppSyncRealTimeProvider Auth");
const awsAuthTokenHeader = async ({ host }) => {
  const session = await fetchAuthSession();
  return {
    Authorization: session?.tokens?.accessToken?.toString(),
    host
  };
};
const awsRealTimeApiKeyHeader = async ({ apiKey, host }) => {
  const dt = /* @__PURE__ */ new Date();
  const dtStr = dt.toISOString().replace(/[:-]|\.\d{3}/g, "");
  return {
    host,
    "x-amz-date": dtStr,
    "x-api-key": apiKey
  };
};
const awsRealTimeIAMHeader = async ({ payload, canonicalUri, appSyncGraphqlEndpoint, region }) => {
  const endpointInfo = {
    region,
    service: "appsync"
  };
  const creds = (await fetchAuthSession()).credentials;
  const request = {
    url: `${appSyncGraphqlEndpoint}${canonicalUri}`,
    data: payload,
    method: "POST",
    headers: { ...AWS_APPSYNC_REALTIME_HEADERS }
  };
  const signedParams = signRequest({
    headers: request.headers,
    method: request.method,
    url: new AmplifyUrl$1(request.url),
    body: request.data
  }, {
    credentials: creds,
    signingRegion: endpointInfo.region,
    signingService: endpointInfo.service
  });
  return signedParams.headers;
};
const customAuthHeader = async ({ host, additionalCustomHeaders }) => {
  if (!additionalCustomHeaders?.Authorization) {
    throw new Error("No auth token specified");
  }
  return {
    Authorization: additionalCustomHeaders.Authorization,
    host
  };
};
const awsRealTimeHeaderBasedAuth = async ({ apiKey, authenticationType, canonicalUri, appSyncGraphqlEndpoint, region, additionalCustomHeaders, payload }) => {
  const headerHandler = {
    apiKey: awsRealTimeApiKeyHeader,
    iam: awsRealTimeIAMHeader,
    oidc: awsAuthTokenHeader,
    userPool: awsAuthTokenHeader,
    lambda: customAuthHeader,
    none: customAuthHeader
  };
  if (!authenticationType || !headerHandler[authenticationType]) {
    logger$1.debug(`Authentication type ${authenticationType} not supported`);
    return void 0;
  } else {
    const handler = headerHandler[authenticationType];
    const host = appSyncGraphqlEndpoint ? new AmplifyUrl$1(appSyncGraphqlEndpoint).host : void 0;
    const resolvedApiKey = authenticationType === "apiKey" ? apiKey : void 0;
    logger$1.debug(`Authenticating with ${JSON.stringify(authenticationType)}`);
    const result = await handler({
      payload,
      canonicalUri,
      appSyncGraphqlEndpoint,
      apiKey: resolvedApiKey,
      region,
      host,
      additionalCustomHeaders
    });
    return result;
  }
};
const dispatchApiEvent = (payload) => {
  Hub$1.dispatch("api", payload, "PubSub", AMPLIFY_SYMBOL$1);
};
class AWSWebSocketProvider {
  constructor(args) {
    this.subscriptionObserverMap = /* @__PURE__ */ new Map();
    this.allowNoSubscriptions = false;
    this.socketStatus = SOCKET_STATUS.CLOSED;
    this.keepAliveTimestamp = Date.now();
    this.promiseArray = [];
    this.connectionStateMonitor = new ConnectionStateMonitor();
    this.reconnectionMonitor = new ReconnectionMonitor();
    this._establishConnection = async (awsRealTimeUrl, subprotocol) => {
      this.logger.debug(`Establishing WebSocket connection to ${awsRealTimeUrl}`);
      try {
        await this._openConnection(awsRealTimeUrl, subprotocol);
        await this._initiateHandshake();
      } catch (err) {
        const { errorType, errorCode } = err;
        if (NON_RETRYABLE_CODES.includes(errorCode) || // Event API does not currently return `errorCode`. This may change in the future.
        // For now fall back to also checking known non-retryable error types
        NON_RETRYABLE_ERROR_TYPES.includes(errorType)) {
          throw new NonRetryableError(errorType);
        } else if (errorType) {
          throw new Error(errorType);
        } else {
          throw err;
        }
      }
    };
    this.logger = new ConsoleLogger$1(args.providerName);
    this.wsProtocolName = args.wsProtocolName;
    this.wsConnectUri = args.connectUri;
    this.connectionStateMonitorSubscription = this._startConnectionStateMonitoring();
  }
  /**
   * Mark the socket closed and release all active listeners
   */
  close() {
    this.socketStatus = SOCKET_STATUS.CLOSED;
    this.connectionStateMonitor.record(CONNECTION_CHANGE.CONNECTION_FAILED);
    this.connectionStateMonitorSubscription.unsubscribe();
    this.reconnectionMonitor.close();
    return new Promise((resolve, reject) => {
      if (this.awsRealTimeSocket) {
        this.awsRealTimeSocket.onclose = (_) => {
          this._closeSocket();
          this.subscriptionObserverMap = /* @__PURE__ */ new Map();
          this.awsRealTimeSocket = void 0;
          resolve();
        };
        this.awsRealTimeSocket.onerror = (err) => {
          reject(err);
        };
        this.awsRealTimeSocket.close();
      } else {
        resolve();
      }
    });
  }
  subscribe(options, customUserAgentDetails) {
    return new Observable((observer) => {
      if (!options?.appSyncGraphqlEndpoint) {
        observer.error({
          errors: [
            {
              ...new GraphQLError(`Subscribe only available for AWS AppSync endpoint`)
            }
          ]
        });
        observer.complete();
        return;
      }
      let subscriptionStartInProgress = false;
      const subscriptionId = amplifyUuid$1();
      const startSubscription = () => {
        if (!subscriptionStartInProgress) {
          subscriptionStartInProgress = true;
          this._startSubscriptionWithAWSAppSyncRealTime({
            options,
            observer,
            subscriptionId,
            customUserAgentDetails
          }).catch((err) => {
            this.logger.debug(`${CONTROL_MSG.REALTIME_SUBSCRIPTION_INIT_ERROR}: ${err}`);
            this._closeSocket();
          }).finally(() => {
            subscriptionStartInProgress = false;
          });
        }
      };
      const reconnectSubscription = new Observable((reconnectSubscriptionObserver) => {
        this.reconnectionMonitor.addObserver(reconnectSubscriptionObserver);
      }).subscribe(() => {
        startSubscription();
      });
      startSubscription();
      return async () => {
        await this._cleanupSubscription(subscriptionId, reconnectSubscription);
      };
    });
  }
  async connect(options) {
    if (this.socketStatus === SOCKET_STATUS.READY) {
      return;
    }
    await this._connectWebSocket(options);
  }
  async publish(options, customUserAgentDetails) {
    if (this.socketStatus !== SOCKET_STATUS.READY) {
      throw new Error("Subscription has not been initialized");
    }
    return this._publishMessage(options, customUserAgentDetails);
  }
  async _connectWebSocket(options) {
    const { apiKey, appSyncGraphqlEndpoint, authenticationType, region } = options;
    const { additionalCustomHeaders } = await additionalHeadersFromOptions(options);
    this.connectionStateMonitor.record(CONNECTION_CHANGE.OPENING_CONNECTION);
    await this._initializeWebSocketConnection({
      apiKey,
      appSyncGraphqlEndpoint,
      authenticationType,
      region,
      additionalCustomHeaders
    });
  }
  async _publishMessage(options, customUserAgentDetails) {
    const subscriptionId = amplifyUuid$1();
    const { additionalCustomHeaders, libraryConfigHeaders } = await additionalHeadersFromOptions(options);
    const serializedSubscriptionMessage = await this._prepareSubscriptionPayload({
      options,
      subscriptionId,
      customUserAgentDetails,
      additionalCustomHeaders,
      libraryConfigHeaders,
      publish: true
    });
    return new Promise((resolve, reject) => {
      if (this.awsRealTimeSocket) {
        const publishListener = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === subscriptionId && data.type === "publish_success") {
            this.awsRealTimeSocket && this.awsRealTimeSocket.removeEventListener("message", publishListener);
            cleanup();
            resolve();
          }
          if (data.errors && data.errors.length > 0) {
            const errorTypes = data.errors.map((error2) => error2.errorType);
            cleanup();
            reject(new Error(`Publish errors: ${errorTypes.join(", ")}`));
          }
        };
        const errorListener = (error2) => {
          cleanup();
          reject(new Error(`WebSocket error: ${error2}`));
        };
        const closeListener = () => {
          cleanup();
          reject(new Error("WebSocket is closed"));
        };
        const cleanup = () => {
          this.awsRealTimeSocket?.removeEventListener("message", publishListener);
          this.awsRealTimeSocket?.removeEventListener("error", errorListener);
          this.awsRealTimeSocket?.removeEventListener("close", closeListener);
        };
        this.awsRealTimeSocket.addEventListener("message", publishListener);
        this.awsRealTimeSocket.addEventListener("error", errorListener);
        this.awsRealTimeSocket.addEventListener("close", closeListener);
        this.awsRealTimeSocket.send(serializedSubscriptionMessage);
      } else {
        reject(new Error("WebSocket is not connected"));
      }
    });
  }
  async _cleanupSubscription(subscriptionId, reconnectSubscription) {
    reconnectSubscription?.unsubscribe();
    try {
      await this._waitForSubscriptionToBeConnected(subscriptionId);
      const { subscriptionState } = this.subscriptionObserverMap.get(subscriptionId) || {};
      if (!subscriptionState) {
        return;
      }
      if (subscriptionState === SUBSCRIPTION_STATUS.CONNECTED) {
        this._sendUnsubscriptionMessage(subscriptionId);
      } else {
        throw new Error("Subscription never connected");
      }
    } catch (err) {
      this.logger.debug(`Error while unsubscribing ${err}`);
    } finally {
      this._removeSubscriptionObserver(subscriptionId);
    }
  }
  // Monitor the connection state and pass changes along to Hub
  _startConnectionStateMonitoring() {
    return this.connectionStateMonitor.connectionStateObservable.subscribe((connectionState) => {
      dispatchApiEvent({
        event: CONNECTION_STATE_CHANGE,
        data: {
          provider: this,
          connectionState
        },
        message: `Connection state is ${connectionState}`
      });
      this.connectionState = connectionState;
      if (connectionState === ConnectionState.ConnectionDisrupted) {
        this.reconnectionMonitor.record(ReconnectEvent.START_RECONNECT);
      }
      if ([
        ConnectionState.Connected,
        ConnectionState.ConnectedPendingDisconnect,
        ConnectionState.ConnectedPendingKeepAlive,
        ConnectionState.ConnectedPendingNetwork,
        ConnectionState.ConnectionDisruptedPendingNetwork,
        ConnectionState.Disconnected
      ].includes(connectionState)) {
        this.reconnectionMonitor.record(ReconnectEvent.HALT_RECONNECT);
      }
    });
  }
  async _startSubscriptionWithAWSAppSyncRealTime({ options, observer, subscriptionId, customUserAgentDetails }) {
    const { query, variables } = options;
    this.subscriptionObserverMap.set(subscriptionId, {
      observer,
      query: query ?? "",
      variables: variables ?? {},
      subscriptionState: SUBSCRIPTION_STATUS.PENDING,
      startAckTimeoutId: void 0
    });
    const { additionalCustomHeaders, libraryConfigHeaders } = await additionalHeadersFromOptions(options);
    const serializedSubscriptionMessage = await this._prepareSubscriptionPayload({
      options,
      subscriptionId,
      customUserAgentDetails,
      additionalCustomHeaders,
      libraryConfigHeaders
    });
    try {
      await this._connectWebSocket(options);
    } catch (err) {
      this._logStartSubscriptionError(subscriptionId, observer, err);
      return;
    }
    const { subscriptionFailedCallback, subscriptionReadyCallback } = this.subscriptionObserverMap.get(subscriptionId) ?? {};
    this.subscriptionObserverMap.set(subscriptionId, {
      observer,
      subscriptionState: SUBSCRIPTION_STATUS.PENDING,
      query: query ?? "",
      variables: variables ?? {},
      subscriptionReadyCallback,
      subscriptionFailedCallback,
      startAckTimeoutId: setTimeout(() => {
        this._timeoutStartSubscriptionAck(subscriptionId);
      }, START_ACK_TIMEOUT)
    });
    if (this.awsRealTimeSocket) {
      this.awsRealTimeSocket.send(serializedSubscriptionMessage);
    }
  }
  // Log logic for start subscription failures
  _logStartSubscriptionError(subscriptionId, observer, err) {
    this.logger.debug({ err });
    const message = String(err.message ?? "");
    this._closeSocket();
    if (this.connectionState !== ConnectionState.ConnectionDisruptedPendingNetwork) {
      if (isNonRetryableError(err)) {
        observer.error({
          errors: [
            {
              ...new GraphQLError(`${CONTROL_MSG.CONNECTION_FAILED}: ${message}`)
            }
          ]
        });
      } else {
        this.logger.debug(`${CONTROL_MSG.CONNECTION_FAILED}: ${message}`);
      }
      const { subscriptionFailedCallback } = this.subscriptionObserverMap.get(subscriptionId) || {};
      if (typeof subscriptionFailedCallback === "function") {
        subscriptionFailedCallback();
      }
    }
  }
  // Waiting that subscription has been connected before trying to unsubscribe
  async _waitForSubscriptionToBeConnected(subscriptionId) {
    const subscriptionObserver = this.subscriptionObserverMap.get(subscriptionId);
    if (subscriptionObserver) {
      const { subscriptionState } = subscriptionObserver;
      if (subscriptionState === SUBSCRIPTION_STATUS.PENDING) {
        return new Promise((resolve, reject) => {
          const { observer, subscriptionState: observedSubscriptionState, variables, query } = subscriptionObserver;
          this.subscriptionObserverMap.set(subscriptionId, {
            observer,
            subscriptionState: observedSubscriptionState,
            variables,
            query,
            subscriptionReadyCallback: resolve,
            subscriptionFailedCallback: reject
          });
        });
      }
    }
  }
  _sendUnsubscriptionMessage(subscriptionId) {
    try {
      if (this.awsRealTimeSocket && this.awsRealTimeSocket.readyState === WebSocket.OPEN && this.socketStatus === SOCKET_STATUS.READY) {
        const unsubscribeMessage = this._unsubscribeMessage(subscriptionId);
        const stringToAWSRealTime = JSON.stringify(unsubscribeMessage);
        this.awsRealTimeSocket.send(stringToAWSRealTime);
      }
    } catch (err) {
      this.logger.debug({ err });
    }
  }
  _removeSubscriptionObserver(subscriptionId) {
    this.subscriptionObserverMap.delete(subscriptionId);
    if (!this.allowNoSubscriptions) {
      setTimeout(this._closeSocketIfRequired.bind(this), 1e3);
    }
  }
  _closeSocketIfRequired() {
    if (this.subscriptionObserverMap.size > 0) {
      return;
    }
    if (!this.awsRealTimeSocket) {
      this.socketStatus = SOCKET_STATUS.CLOSED;
      return;
    }
    this.connectionStateMonitor.record(CONNECTION_CHANGE.CLOSING_CONNECTION);
    if (this.awsRealTimeSocket.bufferedAmount > 0) {
      setTimeout(this._closeSocketIfRequired.bind(this), 1e3);
    } else {
      this.logger.debug("closing WebSocket...");
      const tempSocket = this.awsRealTimeSocket;
      tempSocket.onclose = null;
      tempSocket.onerror = null;
      tempSocket.close(1e3);
      this.awsRealTimeSocket = void 0;
      this.socketStatus = SOCKET_STATUS.CLOSED;
      this._closeSocket();
    }
  }
  maintainKeepAlive() {
    this.keepAliveTimestamp = Date.now();
  }
  keepAliveHeartbeat(connectionTimeoutMs) {
    const currentTime = Date.now();
    if (currentTime - this.keepAliveTimestamp > DEFAULT_KEEP_ALIVE_ALERT_TIMEOUT) {
      this.connectionStateMonitor.record(CONNECTION_CHANGE.KEEP_ALIVE_MISSED);
    } else {
      this.connectionStateMonitor.record(CONNECTION_CHANGE.KEEP_ALIVE);
    }
    if (currentTime - this.keepAliveTimestamp > connectionTimeoutMs) {
      this._errorDisconnect(CONTROL_MSG.TIMEOUT_DISCONNECT);
    }
  }
  _handleIncomingSubscriptionMessage(message) {
    if (typeof message.data !== "string") {
      return;
    }
    const [isData, data] = this._handleSubscriptionData(message);
    if (isData) {
      this.maintainKeepAlive();
      return;
    }
    const { type, id, payload } = data;
    const { observer = null, query = "", variables = {}, startAckTimeoutId, subscriptionReadyCallback, subscriptionFailedCallback } = this.subscriptionObserverMap.get(id) || {};
    if (type === MESSAGE_TYPES.GQL_START_ACK || type === MESSAGE_TYPES.EVENT_SUBSCRIBE_ACK) {
      this.logger.debug(`subscription ready for ${JSON.stringify({ query, variables })}`);
      if (typeof subscriptionReadyCallback === "function") {
        subscriptionReadyCallback();
      }
      if (startAckTimeoutId)
        clearTimeout(startAckTimeoutId);
      dispatchApiEvent({
        event: CONTROL_MSG.SUBSCRIPTION_ACK,
        data: { query, variables },
        message: "Connection established for subscription"
      });
      const subscriptionState = SUBSCRIPTION_STATUS.CONNECTED;
      if (observer) {
        this.subscriptionObserverMap.set(id, {
          observer,
          query,
          variables,
          startAckTimeoutId: void 0,
          subscriptionState,
          subscriptionReadyCallback,
          subscriptionFailedCallback
        });
      }
      this.connectionStateMonitor.record(CONNECTION_CHANGE.CONNECTION_ESTABLISHED);
      return;
    }
    if (type === MESSAGE_TYPES.GQL_CONNECTION_KEEP_ALIVE) {
      this.maintainKeepAlive();
      return;
    }
    if (type === MESSAGE_TYPES.GQL_ERROR || type === MESSAGE_TYPES.EVENT_SUBSCRIBE_ERROR) {
      const subscriptionState = SUBSCRIPTION_STATUS.FAILED;
      if (observer) {
        this.subscriptionObserverMap.set(id, {
          observer,
          query,
          variables,
          startAckTimeoutId,
          subscriptionReadyCallback,
          subscriptionFailedCallback,
          subscriptionState
        });
        let errorMessage = JSON.stringify(payload ?? data);
        if (type === MESSAGE_TYPES.EVENT_SUBSCRIBE_ERROR) {
          const { errors } = JSON.parse(String(message.data));
          if (Array.isArray(errors) && errors.length > 0) {
            const error2 = errors[0];
            errorMessage = `${error2.errorType}: ${error2.message}`;
          }
        }
        this.logger.debug(`${CONTROL_MSG.CONNECTION_FAILED}: ${errorMessage}`);
        observer.error({
          errors: [
            {
              ...new GraphQLError(`${CONTROL_MSG.CONNECTION_FAILED}: ${errorMessage}`)
            }
          ]
        });
        if (startAckTimeoutId)
          clearTimeout(startAckTimeoutId);
        if (typeof subscriptionFailedCallback === "function") {
          subscriptionFailedCallback();
        }
      }
    }
  }
  _errorDisconnect(msg) {
    this.logger.debug(`Disconnect error: ${msg}`);
    if (this.awsRealTimeSocket) {
      this._closeSocket();
      this.awsRealTimeSocket.close();
    }
    this.socketStatus = SOCKET_STATUS.CLOSED;
  }
  _closeSocket() {
    if (this.keepAliveHeartbeatIntervalId) {
      clearInterval(this.keepAliveHeartbeatIntervalId);
      this.keepAliveHeartbeatIntervalId = void 0;
    }
    this.connectionStateMonitor.record(CONNECTION_CHANGE.CLOSED);
  }
  _timeoutStartSubscriptionAck(subscriptionId) {
    const subscriptionObserver = this.subscriptionObserverMap.get(subscriptionId);
    if (subscriptionObserver) {
      const { observer, query, variables } = subscriptionObserver;
      if (!observer) {
        return;
      }
      this.subscriptionObserverMap.set(subscriptionId, {
        observer,
        query,
        variables,
        subscriptionState: SUBSCRIPTION_STATUS.FAILED
      });
      this._closeSocket();
      this.logger.debug("timeoutStartSubscription", JSON.stringify({ query, variables }));
    }
  }
  _initializeWebSocketConnection({ appSyncGraphqlEndpoint, authenticationType, apiKey, region, additionalCustomHeaders }) {
    if (this.socketStatus === SOCKET_STATUS.READY) {
      return;
    }
    return new Promise(async (resolve, reject) => {
      this.promiseArray.push({ res: resolve, rej: reject });
      if (this.socketStatus === SOCKET_STATUS.CLOSED) {
        try {
          this.socketStatus = SOCKET_STATUS.CONNECTING;
          const payloadString = "{}";
          const authHeader = await awsRealTimeHeaderBasedAuth({
            authenticationType,
            payload: payloadString,
            canonicalUri: this.wsConnectUri,
            apiKey,
            appSyncGraphqlEndpoint,
            region,
            additionalCustomHeaders
          });
          const headerString = authHeader ? JSON.stringify(authHeader) : "";
          const encodedHeader = base64Encoder.convert(headerString, {
            urlSafe: true,
            skipPadding: true
          });
          const authTokenSubprotocol = `header-${encodedHeader}`;
          const queryParams = queryParamsFromCustomHeaders(additionalCustomHeaders);
          const awsRealTimeUrl = realtimeUrlWithQueryString(appSyncGraphqlEndpoint, queryParams);
          await this._establishRetryableConnection(awsRealTimeUrl, authTokenSubprotocol);
          this.promiseArray.forEach(({ res }) => {
            this.logger.debug("Notifying connection successful");
            res();
          });
          this.socketStatus = SOCKET_STATUS.READY;
          this.promiseArray = [];
        } catch (err) {
          this.logger.debug("Connection exited with", err);
          this.promiseArray.forEach(({ rej }) => {
            rej(err);
          });
          this.promiseArray = [];
          if (this.awsRealTimeSocket && this.awsRealTimeSocket.readyState === WebSocket.OPEN) {
            this.awsRealTimeSocket.close(3001);
          }
          this.awsRealTimeSocket = void 0;
          this.socketStatus = SOCKET_STATUS.CLOSED;
        }
      }
    });
  }
  async _establishRetryableConnection(awsRealTimeUrl, subprotocol) {
    this.logger.debug(`Establishing retryable connection`);
    await jitteredExponentialRetry(this._establishConnection.bind(this), [awsRealTimeUrl, subprotocol], MAX_DELAY_MS);
  }
  async _openConnection(awsRealTimeUrl, subprotocol) {
    return new Promise((resolve, reject) => {
      const newSocket = this._getNewWebSocket(awsRealTimeUrl, [
        this.wsProtocolName,
        subprotocol
      ]);
      newSocket.onerror = () => {
        this.logger.debug(`WebSocket connection error`);
      };
      newSocket.onclose = () => {
        this._closeSocket();
        reject(new Error("Connection handshake error"));
      };
      newSocket.onopen = () => {
        this.awsRealTimeSocket = newSocket;
        resolve();
      };
    });
  }
  _getNewWebSocket(url, protocol2) {
    return new WebSocket(url, protocol2);
  }
  async _initiateHandshake() {
    return new Promise((resolve, reject) => {
      if (!this.awsRealTimeSocket) {
        reject(new Error("awsRealTimeSocket undefined"));
        return;
      }
      let ackOk = false;
      this.awsRealTimeSocket.onerror = (error2) => {
        this.logger.debug(`WebSocket error ${JSON.stringify(error2)}`);
      };
      this.awsRealTimeSocket.onclose = (event) => {
        this.logger.debug(`WebSocket closed ${event.reason}`);
        this._closeSocket();
        reject(new Error(JSON.stringify(event)));
      };
      this.awsRealTimeSocket.onmessage = (message) => {
        if (typeof message.data !== "string") {
          return;
        }
        this.logger.debug(`subscription message from AWS AppSyncRealTime: ${message.data} `);
        const data = JSON.parse(message.data);
        const { type } = data;
        const connectionTimeoutMs = this._extractConnectionTimeout(data);
        if (type === MESSAGE_TYPES.GQL_CONNECTION_ACK) {
          ackOk = true;
          this._registerWebsocketHandlers(connectionTimeoutMs);
          resolve("Connected to AWS AppSyncRealTime");
          return;
        }
        if (type === MESSAGE_TYPES.GQL_CONNECTION_ERROR) {
          const { errorType, errorCode } = this._extractErrorCodeAndType(data);
          reject({ errorType, errorCode });
        }
      };
      const gqlInit = {
        type: MESSAGE_TYPES.GQL_CONNECTION_INIT
      };
      this.awsRealTimeSocket.send(JSON.stringify(gqlInit));
      const checkAckOk = (targetAckOk) => {
        if (!targetAckOk) {
          this.connectionStateMonitor.record(CONNECTION_CHANGE.CONNECTION_FAILED);
          reject(new Error(`Connection timeout: ack from AWSAppSyncRealTime was not received after ${CONNECTION_INIT_TIMEOUT} ms`));
        }
      };
      setTimeout(() => {
        checkAckOk(ackOk);
      }, CONNECTION_INIT_TIMEOUT);
    });
  }
  _registerWebsocketHandlers(connectionTimeoutMs) {
    if (!this.awsRealTimeSocket) {
      return;
    }
    this.keepAliveHeartbeatIntervalId = setInterval(() => {
      this.keepAliveHeartbeat(connectionTimeoutMs);
    }, DEFAULT_KEEP_ALIVE_HEARTBEAT_TIMEOUT);
    this.awsRealTimeSocket.onmessage = this._handleIncomingSubscriptionMessage.bind(this);
    this.awsRealTimeSocket.onerror = (err) => {
      this.logger.debug(err);
      this._errorDisconnect(CONTROL_MSG.CONNECTION_CLOSED);
    };
    this.awsRealTimeSocket.onclose = (event) => {
      this.logger.debug(`WebSocket closed ${event.reason}`);
      this._closeSocket();
      this._errorDisconnect(CONTROL_MSG.CONNECTION_CLOSED);
    };
  }
}
const PROVIDER_NAME$1 = "AWSAppSyncRealTimeProvider";
const WS_PROTOCOL_NAME$1 = "graphql-ws";
const CONNECT_URI$1 = "/connect";
class AWSAppSyncRealTimeProvider extends AWSWebSocketProvider {
  constructor() {
    super({
      providerName: PROVIDER_NAME$1,
      wsProtocolName: WS_PROTOCOL_NAME$1,
      connectUri: CONNECT_URI$1
    });
  }
  getProviderName() {
    return PROVIDER_NAME$1;
  }
  subscribe(options, customUserAgentDetails) {
    return super.subscribe(options, customUserAgentDetails);
  }
  async _prepareSubscriptionPayload({ options, subscriptionId, customUserAgentDetails, additionalCustomHeaders, libraryConfigHeaders }) {
    const { appSyncGraphqlEndpoint, authenticationType, query, variables, apiKey, region } = options;
    const data = {
      query,
      variables
    };
    const serializedData = JSON.stringify(data);
    const headers = {
      ...await awsRealTimeHeaderBasedAuth({
        apiKey,
        appSyncGraphqlEndpoint,
        authenticationType,
        payload: serializedData,
        canonicalUri: "",
        region,
        additionalCustomHeaders
      }),
      ...libraryConfigHeaders,
      ...additionalCustomHeaders,
      [USER_AGENT_HEADER$1]: getAmplifyUserAgent$1(customUserAgentDetails)
    };
    const subscriptionMessage = {
      id: subscriptionId,
      payload: {
        data: serializedData,
        extensions: {
          authorization: {
            ...headers
          }
        }
      },
      type: MESSAGE_TYPES.GQL_START
    };
    const serializedSubscriptionMessage = JSON.stringify(subscriptionMessage);
    return serializedSubscriptionMessage;
  }
  _handleSubscriptionData(message) {
    this.logger.debug(`subscription message from AWS AppSync RealTime: ${message.data}`);
    const { id = "", payload, type } = JSON.parse(String(message.data));
    const { observer = null, query = "", variables = {} } = this.subscriptionObserverMap.get(id) || {};
    this.logger.debug({ id, observer, query, variables });
    if (type === MESSAGE_TYPES.DATA && payload && payload.data) {
      if (observer) {
        observer.next(payload);
      } else {
        this.logger.debug(`observer not found for id: ${id}`);
      }
      return [true, { id, type, payload }];
    }
    return [false, { id, type, payload }];
  }
  _unsubscribeMessage(subscriptionId) {
    return {
      id: subscriptionId,
      type: MESSAGE_TYPES.GQL_STOP
    };
  }
  _extractConnectionTimeout(data) {
    const { payload: { connectionTimeoutMs = DEFAULT_KEEP_ALIVE_TIMEOUT } = {} } = data;
    return connectionTimeoutMs;
  }
  _extractErrorCodeAndType(data) {
    const { payload: { errors: [{ errorType = "", errorCode = 0 } = {}] = [] } = {} } = data;
    return { errorCode, errorType };
  }
}
class GraphQLApiError extends AmplifyError$1 {
  constructor(params) {
    super(params);
    this.constructor = GraphQLApiError;
    Object.setPrototypeOf(this, GraphQLApiError.prototype);
  }
}
var APIValidationErrorCode;
(function(APIValidationErrorCode2) {
  APIValidationErrorCode2["NoAuthSession"] = "NoAuthSession";
  APIValidationErrorCode2["NoRegion"] = "NoRegion";
  APIValidationErrorCode2["NoCustomEndpoint"] = "NoCustomEndpoint";
})(APIValidationErrorCode || (APIValidationErrorCode = {}));
const validationErrorMap = {
  [APIValidationErrorCode.NoAuthSession]: {
    message: "Auth session should not be empty."
  },
  // TODO: re-enable when working in all test environments:
  // [APIValidationErrorCode.NoEndpoint]: {
  // 	message: 'Missing endpoint',
  // },
  [APIValidationErrorCode.NoRegion]: {
    message: "Missing region."
  },
  [APIValidationErrorCode.NoCustomEndpoint]: {
    message: "Custom endpoint region is present without custom endpoint."
  }
};
function assertValidationError(assertion, name2) {
  const { message, recoverySuggestion } = validationErrorMap[name2];
  if (!assertion) {
    throw new GraphQLApiError({ name: name2, message, recoverySuggestion });
  }
}
const logger = new ConsoleLogger$1("GraphQLAPI resolveConfig");
const resolveConfig = (amplify) => {
  const config2 = amplify.getConfig();
  if (!config2.API?.GraphQL) {
    logger.warn("The API configuration is missing. This is likely due to Amplify.configure() not being called prior to generateClient().");
  }
  const { apiKey, customEndpoint, customEndpointRegion, defaultAuthMode, endpoint, region } = config2.API?.GraphQL ?? {};
  assertValidationError(!(!customEndpoint && customEndpointRegion), APIValidationErrorCode.NoCustomEndpoint);
  return {
    apiKey,
    customEndpoint,
    customEndpointRegion,
    defaultAuthMode,
    endpoint,
    region
  };
};
const resolveLibraryOptions = (amplify) => {
  const headers = amplify.libraryOptions?.API?.GraphQL?.headers;
  const withCredentials = amplify.libraryOptions?.API?.GraphQL?.withCredentials;
  return { headers, withCredentials };
};
function repackageUnauthorizedError(content) {
  if (content.errors && Array.isArray(content.errors)) {
    content.errors.forEach((e) => {
      if (isUnauthorizedError(e)) {
        e.message = "Unauthorized";
        e.recoverySuggestion = `If you're calling an Amplify-generated API, make sure to set the "authMode" in generateClient({ authMode: '...' }) to the backend authorization rule's auth provider ('apiKey', 'userPool', 'iam', 'oidc', 'lambda')`;
      }
    });
  }
  return content;
}
function isUnauthorizedError(error2) {
  if (error2?.originalError?.name?.startsWith("UnauthorizedException")) {
    return true;
  }
  if (error2.message?.startsWith("Connection failed:") && error2.message?.includes("Permission denied")) {
    return true;
  }
  return false;
}
var GraphQLAuthError;
(function(GraphQLAuthError2) {
  GraphQLAuthError2["NO_API_KEY"] = "No api-key configured";
  GraphQLAuthError2["NO_CURRENT_USER"] = "No current user";
  GraphQLAuthError2["NO_CREDENTIALS"] = "No credentials";
  GraphQLAuthError2["NO_FEDERATED_JWT"] = "No federated jwt";
  GraphQLAuthError2["NO_AUTH_TOKEN"] = "No auth token specified";
})(GraphQLAuthError || (GraphQLAuthError = {}));
const __amplify = Symbol("amplify");
const __authMode = Symbol("authMode");
const __authToken = Symbol("authToken");
const __apiKey = Symbol("apiKey");
const __headers = Symbol("headers");
const __endpoint = Symbol("endpoint");
function getInternals(client) {
  const c = client;
  return {
    amplify: c[__amplify],
    apiKey: c[__apiKey],
    authMode: c[__authMode],
    authToken: c[__authToken],
    endpoint: c[__endpoint],
    headers: c[__headers]
  };
}
const NO_API_KEY = {
  name: "NoApiKey",
  // ideal: No API key configured.
  message: GraphQLAuthError.NO_API_KEY,
  recoverySuggestion: 'The API request was made with `authMode: "apiKey"` but no API Key was passed into `Amplify.configure()`. Review if your API key is passed into the `Amplify.configure()` function.'
};
const NO_VALID_CREDENTIALS = {
  name: "NoCredentials",
  // ideal: No auth credentials available.
  message: GraphQLAuthError.NO_CREDENTIALS,
  recoverySuggestion: `The API request was made with \`authMode: "iam"\` but no authentication credentials are available.

If you intended to make a request using an authenticated role, review if your user is signed in before making the request.

If you intend to make a request using an unauthenticated role or also known as "guest access", verify if "Auth.Cognito.allowGuestAccess" is set to "true" in the \`Amplify.configure()\` function.`
};
const NO_VALID_AUTH_TOKEN = {
  name: "NoValidAuthTokens",
  // ideal: No valid JWT auth token provided to make the API request..
  message: GraphQLAuthError.NO_FEDERATED_JWT,
  recoverySuggestion: "If you intended to make an authenticated API request, review if the current user is signed in."
};
const NO_SIGNED_IN_USER = {
  name: "NoSignedUser",
  // ideal: Couldn't retrieve authentication credentials to make the API request.
  message: GraphQLAuthError.NO_CURRENT_USER,
  recoverySuggestion: "Review the underlying exception field for more details. If you intended to make an authenticated API request, review if the current user is signed in."
};
const NO_AUTH_TOKEN_HEADER = {
  name: "NoAuthorizationHeader",
  // ideal: Authorization header not specified.
  message: GraphQLAuthError.NO_AUTH_TOKEN,
  recoverySuggestion: 'The API request was made with `authMode: "lambda"` but no `authToken` is set. Review if a valid authToken is passed into the request options or in the `Amplify.configure()` function.'
};
const NO_ENDPOINT = {
  name: "NoEndpoint",
  message: "No GraphQL endpoint configured in `Amplify.configure()`.",
  recoverySuggestion: "Review if the GraphQL API endpoint is set in the `Amplify.configure()` function."
};
const createGraphQLResultWithError = (error2) => {
  return {
    data: {},
    errors: [new GraphQLError(error2.message, null, null, null, null, error2)]
  };
};
function isGraphQLResponseWithErrors(response) {
  if (!response) {
    return false;
  }
  const r = response;
  return Array.isArray(r.errors) && r.errors.length > 0;
}
async function headerBasedAuth(amplify, authMode, apiKey, additionalHeaders = {}) {
  let headers = {};
  switch (authMode) {
    case "apiKey":
      if (!apiKey) {
        throw new GraphQLApiError(NO_API_KEY);
      }
      headers = {
        "X-Api-Key": apiKey
      };
      break;
    case "iam": {
      const session = await amplify.Auth.fetchAuthSession();
      if (session.credentials === void 0) {
        throw new GraphQLApiError(NO_VALID_CREDENTIALS);
      }
      break;
    }
    case "oidc":
    case "userPool": {
      let token;
      try {
        token = (await amplify.Auth.fetchAuthSession()).tokens?.accessToken.toString();
      } catch (e) {
        throw new GraphQLApiError({
          ...NO_SIGNED_IN_USER,
          underlyingError: e
        });
      }
      if (!token) {
        throw new GraphQLApiError(NO_VALID_AUTH_TOKEN);
      }
      headers = {
        Authorization: token
      };
      break;
    }
    case "lambda":
      if (typeof additionalHeaders === "object" && !additionalHeaders.Authorization) {
        throw new GraphQLApiError(NO_AUTH_TOKEN_HEADER);
      }
      headers = {
        Authorization: additionalHeaders.Authorization
      };
      break;
  }
  return headers;
}
const USER_AGENT_HEADER = "x-amz-user-agent";
const isAmplifyInstance = (amplify) => {
  return typeof amplify !== "function";
};
class InternalGraphQLAPIClass {
  constructor() {
    this.appSyncRealTime = /* @__PURE__ */ new Map();
    this._api = {
      post,
      cancelREST: cancel$1,
      isCancelErrorREST: isCancelError$1,
      updateRequestToBeCancellable
    };
  }
  getModuleName() {
    return "InternalGraphQLAPI";
  }
  /**
   * to get the operation type
   * @param operation
   */
  getGraphqlOperationType(operation) {
    const doc = parse(operation);
    const definitions = doc.definitions;
    const [{ operation: operationType }] = definitions;
    return operationType;
  }
  /**
   * Executes a GraphQL operation
   *
   * @param options - GraphQL Options
   * @param [additionalHeaders] - headers to merge in after any `libraryConfigHeaders` set in the config
   * @returns An Observable if the query is a subscription query, else a promise of the graphql result.
   */
  graphql(amplify, { query: paramQuery, variables = {}, authMode, authToken, endpoint, apiKey }, additionalHeaders, customUserAgentDetails) {
    const query = typeof paramQuery === "string" ? parse(paramQuery) : parse(print(paramQuery));
    const [operationDef = {}] = query.definitions.filter((def) => def.kind === "OperationDefinition");
    const { operation: operationType } = operationDef;
    const headers = additionalHeaders || {};
    switch (operationType) {
      case "query":
      case "mutation": {
        const abortController = new AbortController();
        let responsePromise;
        if (isAmplifyInstance(amplify)) {
          responsePromise = this._graphql(amplify, { query, variables, authMode, apiKey, endpoint }, headers, abortController, customUserAgentDetails, authToken);
        } else {
          const wrapper = async (amplifyInstance) => {
            const result = await this._graphql(amplifyInstance, { query, variables, authMode, apiKey, endpoint }, headers, abortController, customUserAgentDetails, authToken);
            return result;
          };
          responsePromise = amplify(wrapper);
        }
        this._api.updateRequestToBeCancellable(responsePromise, abortController);
        return responsePromise;
      }
      case "subscription":
        return this._graphqlSubscribe(amplify, { query, variables, authMode, apiKey, endpoint }, headers, customUserAgentDetails, authToken);
      default:
        throw new Error(`invalid operation type: ${operationType}`);
    }
  }
  async _graphql(amplify, { query, variables, authMode: authModeOverride, endpoint: endpointOverride, apiKey: apiKeyOverride }, additionalHeaders = {}, abortController, customUserAgentDetails, authToken) {
    const { apiKey, region, endpoint: appSyncGraphqlEndpoint, customEndpoint, customEndpointRegion, defaultAuthMode } = resolveConfig(amplify);
    const initialAuthMode = authModeOverride || defaultAuthMode || "iam";
    const authMode = initialAuthMode === "identityPool" ? "iam" : initialAuthMode;
    const { headers: customHeaders, withCredentials } = resolveLibraryOptions(amplify);
    let additionalCustomHeaders;
    if (typeof additionalHeaders === "function") {
      const requestOptions = {
        method: "POST",
        url: new AmplifyUrl$1(endpointOverride || customEndpoint || appSyncGraphqlEndpoint || "").toString(),
        queryString: print(query)
      };
      additionalCustomHeaders = await additionalHeaders(requestOptions);
    } else {
      additionalCustomHeaders = additionalHeaders;
    }
    if (authToken) {
      additionalCustomHeaders = {
        ...additionalCustomHeaders,
        Authorization: authToken
      };
    }
    const authHeaders = await headerBasedAuth(amplify, authMode, apiKeyOverride ?? apiKey, additionalCustomHeaders);
    const headers = {
      ...!customEndpoint && authHeaders,
      /**
       * Custom endpoint headers.
       * If there is both a custom endpoint and custom region present, we get the headers.
       * If there is a custom endpoint but no region, we return an empty object.
       * If neither are present, we return an empty object.
       */
      ...customEndpoint && (customEndpointRegion ? authHeaders : {}) || {},
      // Custom headers included in Amplify configuration options:
      ...customHeaders && await customHeaders({
        query: print(query),
        variables
      }),
      // Custom headers from individual requests or API client configuration:
      ...additionalCustomHeaders,
      // User agent headers:
      ...!customEndpoint && {
        [USER_AGENT_HEADER]: getAmplifyUserAgent$1(customUserAgentDetails)
      }
    };
    const body = {
      query: print(query),
      variables: variables || null
    };
    let signingServiceInfo;
    if (customEndpoint && !customEndpointRegion || authMode !== "oidc" && authMode !== "userPool" && authMode !== "iam" && authMode !== "lambda") {
      signingServiceInfo = void 0;
    } else {
      signingServiceInfo = {
        service: !customEndpointRegion ? "appsync" : "execute-api",
        region: !customEndpointRegion ? region : customEndpointRegion
      };
    }
    const endpoint = endpointOverride || customEndpoint || appSyncGraphqlEndpoint;
    if (!endpoint) {
      throw createGraphQLResultWithError(new GraphQLApiError(NO_ENDPOINT));
    }
    let response;
    try {
      const { body: responseBody } = await this._api.post(amplify, {
        url: new AmplifyUrl$1(endpoint),
        options: {
          headers,
          body,
          signingServiceInfo,
          withCredentials
        },
        abortController
      });
      response = await responseBody.json();
    } catch (error2) {
      if (this.isCancelError(error2)) {
        throw error2;
      }
      response = createGraphQLResultWithError(error2);
    }
    if (isGraphQLResponseWithErrors(response)) {
      throw repackageUnauthorizedError(response);
    }
    return response;
  }
  /**
   * Checks to see if an error thrown is from an api request cancellation
   * @param {any} error - Any error
   * @return {boolean} - A boolean indicating if the error was from an api request cancellation
   */
  isCancelError(error2) {
    return this._api.isCancelErrorREST(error2);
  }
  /**
   * Cancels an inflight request. Only applicable for graphql queries and mutations
   * @param {any} request - request to cancel
   * @returns - A boolean indicating if the request was cancelled
   */
  cancel(request, message) {
    return this._api.cancelREST(request, message);
  }
  _graphqlSubscribe(amplify, { query, variables, authMode: authModeOverride, apiKey: apiKeyOverride, endpoint }, additionalHeaders = {}, customUserAgentDetails, authToken) {
    const config2 = resolveConfig(amplify);
    const initialAuthMode = authModeOverride || config2?.defaultAuthMode || "iam";
    const authMode = initialAuthMode === "identityPool" ? "iam" : initialAuthMode;
    const { headers: libraryConfigHeaders } = resolveLibraryOptions(amplify);
    const appSyncGraphqlEndpoint = endpoint ?? config2?.endpoint;
    const memoKey = appSyncGraphqlEndpoint ?? "none";
    const realtimeProvider = this.appSyncRealTime.get(memoKey) ?? new AWSAppSyncRealTimeProvider();
    this.appSyncRealTime.set(memoKey, realtimeProvider);
    return realtimeProvider.subscribe({
      query: print(query),
      variables,
      appSyncGraphqlEndpoint,
      region: config2?.region,
      authenticationType: authMode,
      apiKey: apiKeyOverride ?? config2?.apiKey,
      additionalHeaders,
      authToken,
      libraryConfigHeaders
    }, customUserAgentDetails).pipe(catchError((e) => {
      if (e.errors) {
        throw repackageUnauthorizedError(e);
      }
      throw e;
    }));
  }
}
function resolveOwnerFields(model) {
  const ownerFields = /* @__PURE__ */ new Set();
  for (const attr of model.attributes || []) {
    if (isAuthAttribute(attr)) {
      for (const rule of attr.properties.rules) {
        if (rule.allow === "owner") {
          ownerFields.add(rule.ownerField || "owner");
        } else if (rule.allow === "groups" && rule.groupsField !== void 0) {
          ownerFields.add(rule.groupsField);
        }
      }
    }
  }
  return Array.from(ownerFields);
}
function isAuthAttribute(attribute) {
  if (attribute?.type === "auth") {
    if (typeof attribute?.properties === "object") {
      if (Array.isArray(attribute?.properties?.rules)) {
        return (attribute?.properties?.rules).every((rule) => !!rule.allow);
      }
    }
  }
  return false;
}
function capitalize(s) {
  return `${s[0].toUpperCase()}${s.slice(1)}`;
}
function selfAwareAsync(resolver) {
  let resolve;
  let reject;
  const resultPromise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  resolver(resultPromise).then((result) => {
    resolve(result);
  }).catch((error2) => {
    reject(error2);
  });
  return resultPromise;
}
const promiseMap = /* @__PURE__ */ new WeakMap();
function extendCancellability(existingCancellablePromise, newPromiseToRegister) {
  promiseMap.set(newPromiseToRegister, existingCancellablePromise);
  return existingCancellablePromise.finally(() => {
    promiseMap.delete(newPromiseToRegister);
  });
}
function upgradeClientCancellation(client) {
  const innerCancel = client.cancel.bind(client);
  client.cancel = function(promise, message) {
    const visited = /* @__PURE__ */ new Set();
    let targetPromise = promise;
    while (targetPromise && promiseMap.has(targetPromise)) {
      if (visited.has(targetPromise))
        throw new Error("A cycle was detected in the modeled graphql cancellation chain. This is a bug. Please report it!");
      visited.add(targetPromise);
      targetPromise = promiseMap.get(targetPromise);
    }
    return innerCancel(targetPromise, message);
  };
}
const connectionType = {
  HAS_ONE: "HAS_ONE",
  HAS_MANY: "HAS_MANY",
  BELONGS_TO: "BELONGS_TO"
};
const skGraphQlFieldTypeMap = {
  ID: "ID",
  String: "String",
  AWSDate: "String",
  AWSTime: "String",
  AWSDateTime: "String",
  AWSTimestamp: "Int",
  AWSEmail: "String",
  AWSPhone: "String",
  AWSURL: "String",
  AWSIPAddress: "String",
  AWSJSON: "String",
  Boolean: "Boolean",
  Int: "Int",
  Float: "Float"
};
const resolvedSkName = (sk) => {
  if (sk.length === 1) {
    return sk[0];
  } else {
    return sk.reduce((acc, curr, idx) => {
      if (idx === 0) {
        return curr;
      } else {
        return acc + capitalize(curr);
      }
    }, "");
  }
};
const flattenItems = (modelIntrospection, modelName, modelRecord) => {
  if (!modelRecord)
    return null;
  const mapped = {};
  for (const [fieldName, value] of Object.entries(modelRecord)) {
    const fieldDef = modelName ? modelIntrospection.models[modelName]?.fields[fieldName] : void 0;
    const dvPair = { fieldDef, value };
    if (isRelatedModelItemsArrayPair(dvPair)) {
      mapped[fieldName] = dvPair.value.items.map((itemValue) => flattenItems(modelIntrospection, dvPair.fieldDef.type.model, itemValue));
    } else if (isRelatedModelProperty(fieldDef)) {
      mapped[fieldName] = flattenItems(modelIntrospection, fieldDef.type.model, value);
    } else {
      mapped[fieldName] = value;
    }
  }
  return mapped;
};
function isRelatedModelItemsArrayPair(dv) {
  return typeof dv.fieldDef?.type === "object" && "model" in dv.fieldDef.type && typeof dv.fieldDef.type.model === "string" && dv.fieldDef.isArray && Array.isArray(dv.value?.items);
}
function isRelatedModelProperty(fieldDef) {
  return typeof fieldDef?.type === "object" && "model" in fieldDef.type && typeof fieldDef.type.model === "string";
}
function initializeModel(client, modelName, result, modelIntrospection, authMode, authToken, context = false) {
  const introModel = modelIntrospection.models[modelName];
  const introModelFields = introModel.fields;
  const modelFields = Object.entries(introModelFields).filter(([_, field]) => field?.type?.model !== void 0).map(([fieldName]) => fieldName);
  return result.map((record) => {
    if (record === null || record === void 0) {
      return record;
    }
    const initializedRelationshipFields = {};
    for (const fieldName of modelFields) {
      const modelField = introModelFields[fieldName];
      const modelFieldType = modelField?.type;
      const relatedModelName = modelFieldType.model;
      const relatedModel = modelIntrospection.models[relatedModelName];
      const relatedModelPKFieldName = relatedModel.primaryKeyInfo.primaryKeyFieldName;
      const relatedModelSKFieldNames = relatedModel.primaryKeyInfo.sortKeyFieldNames;
      const relationType = modelField.association?.connectionType;
      let connectionFields = [];
      if (modelField.association && "associatedWith" in modelField.association) {
        connectionFields = modelField.association.associatedWith;
      }
      const targetNames = [];
      if (modelField.association && "targetNames" in modelField.association) {
        targetNames.push(...modelField.association.targetNames);
      }
      switch (relationType) {
        case connectionType.BELONGS_TO: {
          const sortKeyValues = relatedModelSKFieldNames.reduce(
            // TODO(Eslint): is this implementation correct?
            // eslint-disable-next-line array-callback-return
            (acc, curVal) => {
              if (record[curVal]) {
                acc[curVal] = record[curVal];
              }
              return acc;
            },
            {}
          );
          if (client.models[relatedModelName]?.get === void 0) {
            break;
          }
          if (context) {
            initializedRelationshipFields[fieldName] = (contextSpec, options) => {
              if (record[targetNames[0]]) {
                return client.models[relatedModelName].get(contextSpec, {
                  [relatedModelPKFieldName]: record[targetNames[0]],
                  ...sortKeyValues
                }, {
                  authMode: options?.authMode || authMode,
                  authToken: options?.authToken || authToken
                });
              }
              return { data: null };
            };
          } else {
            initializedRelationshipFields[fieldName] = (options) => {
              if (record[targetNames[0]]) {
                return client.models[relatedModelName].get({
                  [relatedModelPKFieldName]: record[targetNames[0]],
                  ...sortKeyValues
                }, {
                  authMode: options?.authMode || authMode,
                  authToken: options?.authToken || authToken
                });
              }
              return { data: null };
            };
          }
          break;
        }
        case connectionType.HAS_ONE:
        case connectionType.HAS_MANY: {
          const mapResult = relationType === connectionType.HAS_ONE ? (result2) => {
            return {
              data: result2?.data.shift() || null,
              errors: result2.errors,
              extensions: result2.extensions
            };
          } : (result2) => result2;
          const parentPk = introModel.primaryKeyInfo.primaryKeyFieldName;
          const parentSK = introModel.primaryKeyInfo.sortKeyFieldNames;
          const relatedModelField = relatedModel.fields[connectionFields[0]];
          const relatedModelFieldType = relatedModelField.type;
          if (relatedModelFieldType.model) {
            let relatedTargetNames = [];
            if (relatedModelField.association && "targetNames" in relatedModelField.association) {
              relatedTargetNames = relatedModelField.association?.targetNames;
            }
            const hasManyFilter2 = relatedTargetNames.map((field, idx) => {
              if (idx === 0) {
                return { [field]: { eq: record[parentPk] } };
              }
              return { [field]: { eq: record[parentSK[idx - 1]] } };
            });
            if (client.models[relatedModelName]?.list === void 0) {
              break;
            }
            if (context) {
              initializedRelationshipFields[fieldName] = (contextSpec, options) => {
                if (record[parentPk]) {
                  return selfAwareAsync(async (resultPromise) => {
                    const basePromise = client.models[relatedModelName].list(contextSpec, {
                      filter: { and: hasManyFilter2 },
                      limit: options?.limit,
                      nextToken: options?.nextToken,
                      authMode: options?.authMode || authMode,
                      authToken: options?.authToken || authToken
                    });
                    const extendedBase = extendCancellability(basePromise, resultPromise);
                    return mapResult(await extendedBase);
                  });
                }
                return [];
              };
            } else {
              initializedRelationshipFields[fieldName] = (options) => {
                if (record[parentPk]) {
                  return selfAwareAsync(async (resultPromise) => {
                    const basePromise = client.models[relatedModelName].list({
                      filter: { and: hasManyFilter2 },
                      limit: options?.limit,
                      nextToken: options?.nextToken,
                      authMode: options?.authMode || authMode,
                      authToken: options?.authToken || authToken
                    });
                    const extendedBase = extendCancellability(basePromise, resultPromise);
                    return mapResult(await extendedBase);
                  });
                }
                return [];
              };
            }
            break;
          }
          const hasManyFilter = connectionFields.map((field, idx) => {
            if (idx === 0) {
              return { [field]: { eq: record[parentPk] } };
            }
            return { [field]: { eq: record[parentSK[idx - 1]] } };
          });
          if (client.models[relatedModelName]?.list === void 0) {
            break;
          }
          if (context) {
            initializedRelationshipFields[fieldName] = (contextSpec, options) => {
              if (record[parentPk]) {
                return selfAwareAsync(async (resultPromise) => {
                  const basePromise = client.models[relatedModelName].list(contextSpec, {
                    filter: { and: hasManyFilter },
                    limit: options?.limit,
                    nextToken: options?.nextToken,
                    authMode: options?.authMode || authMode,
                    authToken: options?.authToken || authToken
                  });
                  const extendedBase = extendCancellability(basePromise, resultPromise);
                  return mapResult(await extendedBase);
                });
              }
              return [];
            };
          } else {
            initializedRelationshipFields[fieldName] = (options) => {
              if (record[parentPk]) {
                return selfAwareAsync(async (resultPromise) => {
                  const basePromise = client.models[relatedModelName].list({
                    filter: { and: hasManyFilter },
                    limit: options?.limit,
                    nextToken: options?.nextToken,
                    authMode: options?.authMode || authMode,
                    authToken: options?.authToken || authToken
                  });
                  const extendedBase = extendCancellability(basePromise, resultPromise);
                  return mapResult(await extendedBase);
                });
              }
              return [];
            };
          }
          break;
        }
      }
    }
    return { ...record, ...initializedRelationshipFields };
  });
}
const graphQLOperationsInfo = {
  CREATE: { operationPrefix: "create", usePlural: false },
  GET: { operationPrefix: "get", usePlural: false },
  UPDATE: { operationPrefix: "update", usePlural: false },
  DELETE: { operationPrefix: "delete", usePlural: false },
  LIST: { operationPrefix: "list", usePlural: true },
  INDEX_QUERY: { operationPrefix: "", usePlural: false },
  ONCREATE: { operationPrefix: "onCreate", usePlural: false },
  ONUPDATE: { operationPrefix: "onUpdate", usePlural: false },
  ONDELETE: { operationPrefix: "onDelete", usePlural: false },
  OBSERVEQUERY: { operationPrefix: "observeQuery", usePlural: false }
};
const SELECTION_SET_WILDCARD = "*";
const getDefaultSelectionSetForNonModelWithIR = (nonModelDefinition, modelIntrospection) => {
  const { fields } = nonModelDefinition;
  const mappedFields = Object.values(fields).map(({ type, name: name2 }) => {
    if (typeof type.enum === "string") {
      return [name2, FIELD_IR];
    }
    if (typeof type.nonModel === "string") {
      return [
        name2,
        getDefaultSelectionSetForNonModelWithIR(modelIntrospection.nonModels[type.nonModel], modelIntrospection)
      ];
    }
    if (typeof type === "string") {
      return [name2, FIELD_IR];
    }
    return void 0;
  }).filter((pair) => pair !== void 0);
  return Object.fromEntries(mappedFields);
};
const getDefaultSelectionSetForModelWithIR = (modelDefinition, modelIntrospection) => {
  const { fields } = modelDefinition;
  const mappedFields = Object.values(fields).map(({ type, name: name2 }) => {
    if (typeof type.enum === "string" || typeof type === "string") {
      return [name2, FIELD_IR];
    }
    if (typeof type.nonModel === "string") {
      return [
        name2,
        getDefaultSelectionSetForNonModelWithIR(modelIntrospection.nonModels[type.nonModel], modelIntrospection)
      ];
    }
    return void 0;
  }).filter((pair) => pair !== void 0);
  const ownerFields = resolveOwnerFields(modelDefinition).map((field) => [
    field,
    FIELD_IR
  ]);
  return Object.fromEntries(mappedFields.concat(ownerFields));
};
function defaultSelectionSetForModel(modelDefinition) {
  const { fields } = modelDefinition;
  const explicitFields = Object.values(fields).map(({ type, name: name2 }) => {
    if (typeof type === "string")
      return name2;
    if (typeof type === "object") {
      if (typeof type?.enum === "string") {
        return name2;
      } else if (typeof type?.nonModel === "string") {
        return `${name2}.${SELECTION_SET_WILDCARD}`;
      }
    }
    return void 0;
  }).filter(Boolean);
  const ownerFields = resolveOwnerFields(modelDefinition);
  return Array.from(new Set(explicitFields.concat(ownerFields)));
}
const FIELD_IR = "";
function customSelectionSetToIR(modelIntrospection, modelName, selectionSet) {
  const dotNotationToObject = (path, modelOrNonModelName) => {
    const [fieldName, ...rest] = path.split(".");
    const nested = rest[0];
    const modelOrNonModelDefinition = modelIntrospection.models[modelOrNonModelName] ?? modelIntrospection.nonModels[modelOrNonModelName];
    const modelOrNonModelFields = modelOrNonModelDefinition?.fields;
    const relatedModel = modelOrNonModelFields?.[fieldName]?.type?.model;
    const relatedModelDefinition = modelIntrospection.models[relatedModel];
    const relatedNonModel = modelOrNonModelFields?.[fieldName]?.type?.nonModel;
    const relatedNonModelDefinition = modelIntrospection.nonModels[relatedNonModel];
    const isModelOrNonModelOrFieldType = relatedModelDefinition ? "model" : relatedNonModelDefinition ? "nonModel" : "field";
    if (isModelOrNonModelOrFieldType === "nonModel") {
      let result = {};
      if (!nested) {
        throw Error(`${fieldName} must declare a wildcard (*) or a field of custom type ${relatedNonModel}`);
      }
      if (nested === SELECTION_SET_WILDCARD) {
        result = {
          [fieldName]: getDefaultSelectionSetForNonModelWithIR(relatedNonModelDefinition, modelIntrospection)
        };
      } else {
        result = {
          [fieldName]: dotNotationToObject(rest.join("."), relatedNonModel)
        };
      }
      return result;
    } else if (isModelOrNonModelOrFieldType === "model") {
      let result = {};
      if (!nested) {
        throw Error(`${fieldName} must declare a wildcard (*) or a field of model ${relatedModel}`);
      }
      if (nested === SELECTION_SET_WILDCARD) {
        const nestedRelatedModelDefinition = modelIntrospection.models[relatedModel];
        result = {
          [fieldName]: getDefaultSelectionSetForModelWithIR(nestedRelatedModelDefinition, modelIntrospection)
        };
      } else {
        result = {
          [fieldName]: dotNotationToObject(rest.join("."), relatedModel)
        };
      }
      if (modelOrNonModelFields[fieldName]?.isArray) {
        result = {
          [fieldName]: {
            items: result[fieldName]
          }
        };
      }
      return result;
    } else {
      const modelField = modelOrNonModelFields?.[fieldName];
      const nonModelDefinition = modelIntrospection.nonModels[modelOrNonModelName];
      const nonModelField = nonModelDefinition?.fields?.[fieldName];
      if (!nonModelDefinition) {
        const isOwnerField = resolveOwnerFields(modelOrNonModelDefinition).includes(fieldName);
        if (!modelField && !isOwnerField) {
          throw Error(`${fieldName} is not a field of model ${modelOrNonModelName}`);
        }
      } else {
        if (!nonModelField) {
          throw Error(`${fieldName} is not a field of custom type ${modelOrNonModelName}`);
        }
      }
      return { [fieldName]: FIELD_IR };
    }
  };
  return selectionSet.reduce((resultObj, path) => deepMergeSelectionSetObjects(dotNotationToObject(path, modelName), resultObj), {});
}
function selectionSetIRToString(obj) {
  const res = [];
  Object.entries(obj).forEach(([fieldName, value]) => {
    if (value === FIELD_IR) {
      res.push(fieldName);
    } else if (typeof value === "object" && value !== null) {
      if (value?.items) {
        res.push(fieldName, "{", "items", "{", selectionSetIRToString(value.items), "}", "}");
      } else {
        res.push(fieldName, "{", selectionSetIRToString(value), "}");
      }
    }
  });
  return res.join(" ");
}
function deepMergeSelectionSetObjects(source, target) {
  const isObject = (obj) => obj && typeof obj === "object";
  for (const key in source) {
    if (!Object.prototype.hasOwnProperty.call(source, key))
      continue;
    if (Object.prototype.hasOwnProperty.call(target, key) && isObject(target[key])) {
      deepMergeSelectionSetObjects(source[key], target[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}
function generateSelectionSet(modelIntrospection, modelName, selectionSet) {
  const modelDefinition = modelIntrospection.models[modelName];
  const selSetIr = customSelectionSetToIR(modelIntrospection, modelName, selectionSet ?? defaultSelectionSetForModel(modelDefinition));
  const selSetString = selectionSetIRToString(selSetIr);
  return selSetString;
}
function generateGraphQLDocument(modelIntrospection, modelDefinition, modelOperation, listArgs, indexMeta) {
  const { name: name2, pluralName, fields, primaryKeyInfo: { isCustomPrimaryKey, primaryKeyFieldName, sortKeyFieldNames }, attributes } = modelDefinition;
  const namePascalCase = name2.charAt(0).toUpperCase() + name2.slice(1);
  const pluralNamePascalCase = pluralName.charAt(0).toUpperCase() + pluralName.slice(1);
  const { operationPrefix, usePlural } = graphQLOperationsInfo[modelOperation];
  const { selectionSet } = listArgs || {};
  let graphQLFieldName;
  let indexQueryArgs;
  if (operationPrefix) {
    graphQLFieldName = `${operationPrefix}${usePlural ? pluralNamePascalCase : namePascalCase}`;
  } else if (indexMeta) {
    const { queryField, pk, sk = [] } = indexMeta;
    graphQLFieldName = queryField;
    let skQueryArgs = {};
    if (sk.length === 1) {
      const [skField] = sk;
      const type = typeof fields[skField].type === "string" ? fields[skField].type : "String";
      const normalizedType = skGraphQlFieldTypeMap[type];
      skQueryArgs = {
        [skField]: `Model${normalizedType}KeyConditionInput`
      };
    } else if (sk.length > 1) {
      const compositeSkArgName = resolvedSkName(sk);
      const keyName = attributes?.find((attr) => attr?.properties?.queryField === queryField)?.properties?.name;
      skQueryArgs = {
        [compositeSkArgName]: `Model${capitalize(name2)}${capitalize(keyName)}CompositeKeyConditionInput`
      };
    }
    indexQueryArgs = {
      [pk]: `${Object.prototype.hasOwnProperty.call(fields[pk].type, "enum") ? fields[pk].type.enum : fields[pk].type}!`,
      ...skQueryArgs
    };
  } else {
    throw new Error("Error generating GraphQL Document - invalid operation name");
  }
  let graphQLOperationType;
  let graphQLSelectionSet;
  let graphQLArguments;
  const selectionSetFields = generateSelectionSet(modelIntrospection, name2, selectionSet);
  const getPkArgs = {
    [primaryKeyFieldName]: `${fields[primaryKeyFieldName].type}!`
  };
  const listPkArgs = {};
  const generateSkArgs = (op) => {
    if (sortKeyFieldNames.length === 0)
      return {};
    if (op === "get") {
      return sortKeyFieldNames.reduce((acc, fieldName) => {
        const fieldType = fields[fieldName].type;
        if (op === "get") {
          acc[fieldName] = `${fieldType}!`;
        }
        return acc;
      }, {});
    } else {
      if (sortKeyFieldNames.length === 1) {
        const [sk] = sortKeyFieldNames;
        const type = typeof fields[sk].type === "string" ? fields[sk].type : "String";
        const normalizedType = skGraphQlFieldTypeMap[type];
        return {
          [sk]: `Model${normalizedType}KeyConditionInput`
        };
      } else {
        const compositeSkArgName = resolvedSkName(sortKeyFieldNames);
        return {
          [compositeSkArgName]: `Model${capitalize(name2)}PrimaryCompositeKeyConditionInput`
        };
      }
    }
  };
  if (isCustomPrimaryKey) {
    Object.assign(getPkArgs, generateSkArgs("get"));
    Object.assign(listPkArgs, {
      // PK is only included in list query field args in the generated GQL
      // when explicitly specifying PK with .identifier(['fieldName']) or @primaryKey in the schema definition
      [primaryKeyFieldName]: `${fields[primaryKeyFieldName].type}`,
      // PK is always a nullable arg for list (no `!` after the type)
      sortDirection: "ModelSortDirection"
    }, generateSkArgs("list"));
  }
  switch (modelOperation) {
    case "CREATE":
    case "UPDATE":
    case "DELETE":
      graphQLArguments ?? (graphQLArguments = {
        input: `${operationPrefix.charAt(0).toLocaleUpperCase() + operationPrefix.slice(1)}${namePascalCase}Input!`
      });
      graphQLOperationType ?? (graphQLOperationType = "mutation");
    // TODO(Eslint): this this case clause correct without the break statement?
    // eslint-disable-next-line no-fallthrough
    case "GET":
      graphQLArguments ?? (graphQLArguments = getPkArgs);
      graphQLSelectionSet ?? (graphQLSelectionSet = selectionSetFields);
    // TODO(Eslint): this this case clause correct without the break statement?
    // eslint-disable-next-line no-fallthrough
    case "LIST":
      graphQLArguments ?? (graphQLArguments = {
        ...listPkArgs,
        // eslint doesn't like the ts-ignore, because it thinks it's unnecessary.
        // But TS doesn't like the `filter: ...` because it think it will always be
        // overwritten. (it won't be.) so, we need to ignore the TS error and then
        // ignore the eslint error on the ts-ignore.
        // eslint-disable-next-line
        // @ts-ignore
        filter: `Model${namePascalCase}FilterInput`,
        limit: "Int",
        nextToken: "String"
      });
      graphQLOperationType ?? (graphQLOperationType = "query");
      graphQLSelectionSet ?? (graphQLSelectionSet = `items { ${selectionSetFields} } nextToken __typename`);
    // TODO(Eslint): this this case clause correct without the break statement?
    // eslint-disable-next-line no-fallthrough
    case "INDEX_QUERY":
      graphQLArguments ?? (graphQLArguments = {
        ...indexQueryArgs,
        filter: `Model${namePascalCase}FilterInput`,
        sortDirection: "ModelSortDirection",
        limit: "Int",
        nextToken: "String"
      });
      graphQLOperationType ?? (graphQLOperationType = "query");
      graphQLSelectionSet ?? (graphQLSelectionSet = `items { ${selectionSetFields} } nextToken __typename`);
    // TODO(Eslint): this this case clause correct without the break statement?
    // eslint-disable-next-line no-fallthrough
    case "ONCREATE":
    case "ONUPDATE":
    case "ONDELETE":
      graphQLArguments ?? (graphQLArguments = {
        filter: `ModelSubscription${namePascalCase}FilterInput`
      });
      graphQLOperationType ?? (graphQLOperationType = "subscription");
      graphQLSelectionSet ?? (graphQLSelectionSet = selectionSetFields);
      break;
    case "OBSERVEQUERY":
    default:
      throw new Error("Internal error: Attempted to generate graphql document for observeQuery. Please report this error.");
  }
  const graphQLDocument = `${graphQLOperationType}${graphQLArguments ? `(${Object.entries(graphQLArguments).map(([fieldName, type]) => `$${fieldName}: ${type}`)})` : ""} { ${graphQLFieldName}${graphQLArguments ? `(${Object.keys(graphQLArguments).map((fieldName) => `${fieldName}: $${fieldName}`)})` : ""} { ${graphQLSelectionSet} } }`;
  return graphQLDocument;
}
function buildGraphQLVariables(modelDefinition, operation, arg, modelIntrospection, indexMeta) {
  const { fields, primaryKeyInfo: { isCustomPrimaryKey, primaryKeyFieldName, sortKeyFieldNames } } = modelDefinition;
  const skName = sortKeyFieldNames?.length && resolvedSkName(sortKeyFieldNames);
  let variables = {};
  switch (operation) {
    case "CREATE":
      variables = {
        input: arg ? normalizeMutationInput(arg, modelDefinition, modelIntrospection) : {}
      };
      break;
    case "UPDATE":
      variables = {
        input: arg ? Object.fromEntries(Object.entries(normalizeMutationInput(arg, modelDefinition, modelIntrospection)).filter(([fieldName]) => {
          return fields[fieldName] ? !fields[fieldName].isReadOnly : !resolveOwnerFields(modelDefinition).includes(fieldName);
        })) : {}
      };
      break;
    case "GET":
    case "DELETE":
      if (arg) {
        variables = isCustomPrimaryKey ? [primaryKeyFieldName, ...sortKeyFieldNames].reduce((acc, fieldName) => {
          acc[fieldName] = arg[fieldName];
          return acc;
        }, {}) : { [primaryKeyFieldName]: arg[primaryKeyFieldName] };
      }
      if (operation === "DELETE") {
        variables = { input: variables };
      }
      break;
    case "LIST":
      if (arg?.filter) {
        variables.filter = arg.filter;
      }
      if (arg?.sortDirection) {
        variables.sortDirection = arg.sortDirection;
      }
      if (arg && arg[primaryKeyFieldName]) {
        variables[primaryKeyFieldName] = arg[primaryKeyFieldName];
      }
      if (skName && arg && arg[skName]) {
        variables[skName] = arg[skName];
      }
      if (arg?.nextToken) {
        variables.nextToken = arg.nextToken;
      }
      if (arg?.limit) {
        variables.limit = arg.limit;
      }
      break;
    case "INDEX_QUERY": {
      const { pk, sk = [] } = indexMeta;
      const indexQuerySkName = sk?.length && resolvedSkName(sk);
      variables[pk] = arg[pk];
      if (indexQuerySkName && arg && arg[indexQuerySkName]) {
        variables[indexQuerySkName] = arg[indexQuerySkName];
      }
      if (arg?.filter) {
        variables.filter = arg.filter;
      }
      if (arg?.sortDirection) {
        variables.sortDirection = arg.sortDirection;
      }
      if (arg?.nextToken) {
        variables.nextToken = arg.nextToken;
      }
      if (arg?.limit) {
        variables.limit = arg.limit;
      }
      break;
    }
    case "ONCREATE":
    case "ONUPDATE":
    case "ONDELETE":
      if (arg?.filter) {
        variables = { filter: arg.filter };
      }
      break;
    case "OBSERVEQUERY":
      throw new Error("Internal error: Attempted to build variables for observeQuery. Please report this error.");
    default: {
      const exhaustiveCheck = operation;
      throw new Error(`Unhandled operation case: ${exhaustiveCheck}`);
    }
  }
  return variables;
}
function normalizeMutationInput(mutationInput, model, modelIntrospection) {
  const { fields } = model;
  const normalized = {};
  Object.entries(mutationInput).forEach(([inputFieldName, inputValue]) => {
    const fieldType = fields[inputFieldName]?.type;
    const relatedModelName = fieldType?.model;
    if (relatedModelName) {
      const association = fields[inputFieldName]?.association;
      const relatedModelDef = modelIntrospection.models[relatedModelName];
      const relatedModelPkInfo = relatedModelDef.primaryKeyInfo;
      if (association?.connectionType === connectionType.HAS_ONE) {
        const associationHasOne = association;
        associationHasOne.targetNames.forEach((targetName, idx) => {
          const associatedFieldName = associationHasOne.associatedWith[idx];
          normalized[targetName] = inputValue[associatedFieldName];
        });
      }
      if (association?.connectionType === connectionType.BELONGS_TO) {
        const associationBelongsTo = association;
        associationBelongsTo.targetNames.forEach((targetName, idx) => {
          if (idx === 0) {
            const associatedFieldName = relatedModelPkInfo.primaryKeyFieldName;
            normalized[targetName] = inputValue[associatedFieldName];
          } else {
            const associatedFieldName = relatedModelPkInfo.sortKeyFieldNames[idx - 1];
            normalized[targetName] = inputValue[associatedFieldName];
          }
        });
      }
    } else {
      normalized[inputFieldName] = inputValue;
    }
  });
  return normalized;
}
function authModeParams(client, getInternals2, options = {}) {
  const internals = getInternals2(client);
  return {
    authMode: options.authMode || internals.authMode,
    authToken: options.authToken || internals.authToken
  };
}
function getCustomHeaders(client, getInternals2, requestHeaders) {
  let headers = getInternals2(client).headers || {};
  if (requestHeaders) {
    headers = requestHeaders;
  }
  return headers;
}
function handleListGraphQlError(error2) {
  if (error2?.errors) {
    return {
      ...error2,
      data: []
    };
  } else {
    throw error2;
  }
}
function handleSingularGraphQlError(error2) {
  if (error2.errors) {
    return {
      ...error2,
      data: null
    };
  } else {
    throw error2;
  }
}
const INTERNAL_USER_AGENT_OVERRIDE = Symbol("INTERNAL_USER_AGENT_OVERRIDE");
var AiAction;
(function(AiAction2) {
  AiAction2["CreateConversation"] = "1";
  AiAction2["GetConversation"] = "2";
  AiAction2["ListConversations"] = "3";
  AiAction2["DeleteConversation"] = "4";
  AiAction2["SendMessage"] = "5";
  AiAction2["ListMessages"] = "6";
  AiAction2["OnStreamEvent"] = "7";
  AiAction2["Generation"] = "8";
  AiAction2["UpdateConversation"] = "9";
})(AiAction || (AiAction = {}));
const getCustomUserAgentDetails = (action) => ({
  category: "ai",
  action
});
function createUserAgentOverride(customUserAgentDetails) {
  return customUserAgentDetails ? { [INTERNAL_USER_AGENT_OVERRIDE]: customUserAgentDetails } : void 0;
}
const argIsContextSpec = (arg) => {
  return typeof arg?.token?.value === "symbol";
};
function customOpFactory(client, modelIntrospection, operationType, operation, useContext, getInternals2, customUserAgentDetails) {
  const argsDefined = operation.arguments !== void 0;
  const op = (...args) => {
    const options = args[args.length - 1];
    let contextSpec;
    let arg;
    if (useContext) {
      if (argIsContextSpec(args[0])) {
        contextSpec = args[0];
      } else {
        throw new Error(`Invalid first argument passed to ${operation.name}. Expected contextSpec`);
      }
    }
    if (argsDefined) {
      if (useContext) {
        arg = args[1];
      } else {
        arg = args[0];
      }
    }
    if (operationType === "subscription") {
      return _opSubscription(
        // subscriptions are only enabled on the clientside
        client,
        modelIntrospection,
        operation,
        getInternals2,
        arg,
        options,
        customUserAgentDetails
      );
    }
    return _op(client, modelIntrospection, operationType, operation, getInternals2, arg, options, contextSpec, customUserAgentDetails);
  };
  return op;
}
function hasStringField(o, field) {
  return typeof o[field] === "string";
}
function isEnumType(type) {
  return type instanceof Object && "enum" in type;
}
function isInputType(type) {
  return type instanceof Object && "input" in type;
}
function argumentBaseTypeString({ type, isRequired }) {
  const requiredFlag = isRequired ? "!" : "";
  if (isEnumType(type)) {
    return `${type.enum}${requiredFlag}`;
  }
  if (isInputType(type)) {
    return `${type.input}${requiredFlag}`;
  }
  return `${type}${requiredFlag}`;
}
function outerArguments(operation) {
  if (operation.arguments === void 0) {
    return "";
  }
  const args = Object.entries(operation.arguments).map(([k, argument]) => {
    const baseType = argumentBaseTypeString(argument);
    const finalType = argument.isArray ? `[${baseType}]${argument.isArrayNullable ? "" : "!"}` : baseType;
    return `$${k}: ${finalType}`;
  }).join(", ");
  return args.length > 0 ? `(${args})` : "";
}
function innerArguments(operation) {
  if (operation.arguments === void 0) {
    return "";
  }
  const args = Object.keys(operation.arguments).map((k) => `${k}: $${k}`).join(", ");
  return args.length > 0 ? `(${args})` : "";
}
function operationSelectionSet(modelIntrospection, operation) {
  if (hasStringField(operation, "type") || hasStringField(operation.type, "enum")) {
    return "";
  } else if (hasStringField(operation.type, "nonModel")) {
    const nonModel = modelIntrospection.nonModels[operation.type.nonModel];
    return `{${selectionSetIRToString(getDefaultSelectionSetForNonModelWithIR(nonModel, modelIntrospection))}}`;
  } else if (hasStringField(operation.type, "model")) {
    return `{${generateSelectionSet(modelIntrospection, operation.type.model)}}`;
  } else {
    return "";
  }
}
function operationVariables(operation, args = {}) {
  const variables = {};
  if (operation.arguments === void 0) {
    return variables;
  }
  for (const argDef of Object.values(operation.arguments)) {
    if (typeof args[argDef.name] !== "undefined") {
      variables[argDef.name] = args[argDef.name];
    } else if (argDef.isRequired) {
      throw new Error(`${operation.name} requires arguments '${argDef.name}'`);
    }
  }
  return variables;
}
function _op(client, modelIntrospection, operationType, operation, getInternals2, args, options, context, customUserAgentDetails) {
  return selfAwareAsync(async (resultPromise) => {
    const { name: operationName } = operation;
    const auth = authModeParams(client, getInternals2, options);
    const headers = getCustomHeaders(client, getInternals2, options?.headers);
    const outerArgsString = outerArguments(operation);
    const innerArgsString = innerArguments(operation);
    const selectionSet = operationSelectionSet(modelIntrospection, operation);
    const returnTypeModelName = hasStringField(operation.type, "model") ? operation.type.model : void 0;
    const query = `
    ${operationType.toLocaleLowerCase()}${outerArgsString} {
      ${operationName}${innerArgsString} ${selectionSet}
    }
  `;
    const variables = operationVariables(operation, args);
    const userAgentOverride = createUserAgentOverride(customUserAgentDetails);
    try {
      const basePromise = context ? client.graphql(context, {
        ...auth,
        query,
        variables
      }, headers) : client.graphql({
        ...auth,
        query,
        variables,
        ...userAgentOverride
      }, headers);
      const extendedPromise = extendCancellability(basePromise, resultPromise);
      const { data, extensions } = await extendedPromise;
      if (data) {
        const [key] = Object.keys(data);
        const isArrayResult = Array.isArray(data[key]);
        const flattenedResult = isArrayResult ? data[key].filter((x) => x) : data[key];
        const initialized = returnTypeModelName ? initializeModel(client, returnTypeModelName, isArrayResult ? flattenedResult : [flattenedResult], modelIntrospection, auth.authMode, auth.authToken, !!context) : flattenedResult;
        return {
          data: !isArrayResult && Array.isArray(initialized) ? initialized.shift() : initialized,
          extensions
        };
      } else {
        return { data: null, extensions };
      }
    } catch (error2) {
      const { data, errors } = error2;
      if (data && Object.keys(data).length !== 0 && errors) {
        const [key] = Object.keys(data);
        const isArrayResult = Array.isArray(data[key]);
        const flattenedResult = isArrayResult ? data[key].filter((x) => x) : data[key];
        if (flattenedResult) {
          const initialized = returnTypeModelName ? initializeModel(client, returnTypeModelName, isArrayResult ? flattenedResult : [flattenedResult], modelIntrospection, auth.authMode, auth.authToken, !!context) : flattenedResult;
          return {
            data: !isArrayResult && Array.isArray(initialized) ? initialized.shift() : initialized,
            errors
          };
        } else {
          return handleSingularGraphQlError(error2);
        }
      } else {
        return handleSingularGraphQlError(error2);
      }
    }
  });
}
function _opSubscription(client, modelIntrospection, operation, getInternals2, args, options, customUserAgentDetails) {
  const operationType = "subscription";
  const { name: operationName } = operation;
  const auth = authModeParams(client, getInternals2, options);
  const headers = getCustomHeaders(client, getInternals2, options?.headers);
  const outerArgsString = outerArguments(operation);
  const innerArgsString = innerArguments(operation);
  const selectionSet = operationSelectionSet(modelIntrospection, operation);
  const returnTypeModelName = hasStringField(operation.type, "model") ? operation.type.model : void 0;
  const query = `
    ${operationType.toLocaleLowerCase()}${outerArgsString} {
      ${operationName}${innerArgsString} ${selectionSet}
    }
  `;
  const variables = operationVariables(operation, args);
  const userAgentOverride = createUserAgentOverride(customUserAgentDetails);
  const observable2 = client.graphql({
    ...auth,
    query,
    variables,
    ...userAgentOverride
  }, headers);
  return observable2.pipe(map((value) => {
    const [key] = Object.keys(value.data);
    const data = value.data[key];
    const [initialized] = returnTypeModelName ? initializeModel(client, returnTypeModelName, [data], modelIntrospection, auth.authMode, auth.authToken) : [data];
    return initialized;
  }));
}
const operationTypeMap = {
  queries: "query",
  mutations: "mutation",
  subscriptions: "subscription"
};
function generateCustomOperationsProperty(client, config2, operationsType, getInternals2) {
  if (!config2) {
    return {};
  }
  const modelIntrospection = config2.modelIntrospection;
  if (!modelIntrospection) {
    return {};
  }
  const operations = modelIntrospection[operationsType];
  if (!operations) {
    return {};
  }
  const ops = {};
  const useContext = getInternals2(client).amplify === null;
  for (const operation of Object.values(operations)) {
    ops[operation.name] = customOpFactory(client, modelIntrospection, operationTypeMap[operationsType], operation, useContext, getInternals2);
  }
  return ops;
}
function generateCustomMutationsProperty(client, config2, getInternals2) {
  return generateCustomOperationsProperty(client, config2, "mutations", getInternals2);
}
function generateCustomQueriesProperty(client, config2, getInternals2) {
  return generateCustomOperationsProperty(client, config2, "queries", getInternals2);
}
function generateCustomSubscriptionsProperty(client, config2, getInternals2) {
  return generateCustomOperationsProperty(client, config2, "subscriptions", getInternals2);
}
function getFactory(client, modelIntrospection, model, operation, getInternals2, useContext = false, customUserAgentDetails) {
  const getWithContext = (contextSpec, arg, options) => {
    return _get(client, modelIntrospection, model, arg, options, operation, getInternals2, contextSpec, customUserAgentDetails);
  };
  const get = (arg, options) => {
    return _get(client, modelIntrospection, model, arg, options, operation, getInternals2, void 0, customUserAgentDetails);
  };
  return useContext ? getWithContext : get;
}
function _get(client, modelIntrospection, model, arg, options, operation, getInternals2, context, customUserAgentDetails) {
  return selfAwareAsync(async (resultPromise) => {
    const { name: name2 } = model;
    const query = generateGraphQLDocument(modelIntrospection, model, operation, options);
    const variables = buildGraphQLVariables(model, operation, arg, modelIntrospection);
    const auth = authModeParams(client, getInternals2, options);
    const headers = getCustomHeaders(client, getInternals2, options?.headers);
    const userAgentOverride = createUserAgentOverride(customUserAgentDetails);
    try {
      const basePromise = context ? client.graphql(context, {
        ...auth,
        query,
        variables
      }, headers) : client.graphql({
        ...auth,
        query,
        variables,
        ...userAgentOverride
      }, headers);
      const extendedPromise = extendCancellability(basePromise, resultPromise);
      const { data, extensions } = await extendedPromise;
      if (data) {
        const [key] = Object.keys(data);
        const flattenedResult = flattenItems(modelIntrospection, name2, data[key]);
        if (flattenedResult === null) {
          return { data: null, extensions };
        } else if (options?.selectionSet) {
          return { data: flattenedResult, extensions };
        } else {
          const [initialized] = initializeModel(client, name2, [flattenedResult], modelIntrospection, auth.authMode, auth.authToken, !!context);
          return { data: initialized, extensions };
        }
      } else {
        return { data: null, extensions };
      }
    } catch (error2) {
      const { data, errors } = error2;
      if (data && Object.keys(data).length !== 0 && errors) {
        const [key] = Object.keys(data);
        const flattenedResult = flattenItems(modelIntrospection, name2, data[key]);
        if (flattenedResult) {
          if (options?.selectionSet) {
            return { data: flattenedResult, errors };
          } else {
            const [initialized] = initializeModel(client, name2, [flattenedResult], modelIntrospection, auth.authMode, auth.authToken, !!context);
            return { data: initialized, errors };
          }
        } else {
          return handleSingularGraphQlError(error2);
        }
      } else {
        return handleSingularGraphQlError(error2);
      }
    }
  });
}
function listFactory(client, modelIntrospection, model, getInternals2, context = false, customUserAgentDetails) {
  const listWithContext = (contextSpec, args) => {
    return _list(client, modelIntrospection, model, getInternals2, args, contextSpec, customUserAgentDetails);
  };
  const list = (args) => {
    return _list(client, modelIntrospection, model, getInternals2, args, void 0, customUserAgentDetails);
  };
  return context ? listWithContext : list;
}
function _list(client, modelIntrospection, model, getInternals2, args, contextSpec, customUserAgentDetails) {
  return selfAwareAsync(async (resultPromise) => {
    const { name: name2 } = model;
    const query = generateGraphQLDocument(modelIntrospection, model, "LIST", args);
    const variables = buildGraphQLVariables(model, "LIST", args, modelIntrospection);
    const auth = authModeParams(client, getInternals2, args);
    const headers = getCustomHeaders(client, getInternals2, args?.headers);
    const userAgentOverride = createUserAgentOverride(customUserAgentDetails);
    try {
      const basePromise = contextSpec ? client.graphql(contextSpec, {
        ...auth,
        query,
        variables
      }, headers) : client.graphql({
        ...auth,
        query,
        variables,
        ...userAgentOverride
      }, headers);
      const extendedPromise = extendCancellability(basePromise, resultPromise);
      const { data, extensions } = await extendedPromise;
      if (data !== void 0) {
        const [key] = Object.keys(data);
        if (data[key].items) {
          const flattenedResult = data[key].items.map((value) => flattenItems(modelIntrospection, name2, value));
          if (args?.selectionSet) {
            return {
              data: flattenedResult,
              nextToken: data[key].nextToken,
              extensions
            };
          } else {
            const initialized = initializeModel(client, name2, flattenedResult, modelIntrospection, auth.authMode, auth.authToken, !!contextSpec);
            return {
              data: initialized,
              nextToken: data[key].nextToken,
              extensions
            };
          }
        }
        return {
          data: data[key],
          nextToken: data[key].nextToken,
          extensions
        };
      }
    } catch (error2) {
      const { data, errors } = error2;
      if (data !== void 0 && data !== null && Object.keys(data).length !== 0 && errors) {
        const [key] = Object.keys(data);
        if (data[key]?.items) {
          const flattenedResult = data[key].items.map((value) => flattenItems(modelIntrospection, name2, value));
          if (flattenedResult) {
            if (args?.selectionSet) {
              return {
                data: flattenedResult,
                nextToken: data[key]?.nextToken,
                errors
              };
            } else {
              const initialized = initializeModel(client, name2, flattenedResult, modelIntrospection, auth.authMode, auth.authToken, !!contextSpec);
              return {
                data: initialized,
                nextToken: data[key]?.nextToken,
                errors
              };
            }
          }
          return {
            data: data[key],
            nextToken: data[key]?.nextToken,
            errors
          };
        } else {
          return handleListGraphQlError(error2);
        }
      } else {
        return handleListGraphQlError(error2);
      }
    }
  });
}
const alphabetByEncoding = {};
const alphabetByValue = new Array(64);
for (let i = 0, start = "A".charCodeAt(0), limit = "Z".charCodeAt(0); i + start <= limit; i++) {
  const char = String.fromCharCode(i + start);
  alphabetByEncoding[char] = i;
  alphabetByValue[i] = char;
}
for (let i = 0, start = "a".charCodeAt(0), limit = "z".charCodeAt(0); i + start <= limit; i++) {
  const char = String.fromCharCode(i + start);
  const index = i + 26;
  alphabetByEncoding[char] = index;
  alphabetByValue[index] = char;
}
for (let i = 0; i < 10; i++) {
  alphabetByEncoding[i.toString(10)] = i + 52;
  const char = i.toString(10);
  const index = i + 52;
  alphabetByEncoding[char] = index;
  alphabetByValue[index] = char;
}
alphabetByEncoding["+"] = 62;
alphabetByValue[62] = "+";
alphabetByEncoding["/"] = 63;
alphabetByValue[63] = "/";
const bitsPerLetter = 6;
const bitsPerByte = 8;
const maxLetterValue = 63;
const fromBase64 = (input) => {
  let totalByteLength = input.length / 4 * 3;
  if (input.slice(-2) === "==") {
    totalByteLength -= 2;
  } else if (input.slice(-1) === "=") {
    totalByteLength--;
  }
  const out = new ArrayBuffer(totalByteLength);
  const dataView = new DataView(out);
  for (let i = 0; i < input.length; i += 4) {
    let bits = 0;
    let bitLength = 0;
    for (let j = i, limit = i + 3; j <= limit; j++) {
      if (input[j] !== "=") {
        if (!(input[j] in alphabetByEncoding)) {
          throw new TypeError(`Invalid character ${input[j]} in base64 string.`);
        }
        bits |= alphabetByEncoding[input[j]] << (limit - j) * bitsPerLetter;
        bitLength += bitsPerLetter;
      } else {
        bits >>= bitsPerLetter;
      }
    }
    const chunkOffset = i / 4 * 3;
    bits >>= bitLength % bitsPerByte;
    const byteLength = Math.floor(bitLength / bitsPerByte);
    for (let k = 0; k < byteLength; k++) {
      const offset = (byteLength - k - 1) * bitsPerByte;
      dataView.setUint8(chunkOffset + k, (bits & 255 << offset) >> offset);
    }
  }
  return new Uint8Array(out);
};
const fromUtf8 = (input) => new TextEncoder().encode(input);
function toBase64(_input) {
  let input;
  if (typeof _input === "string") {
    input = fromUtf8(_input);
  } else {
    input = _input;
  }
  const isArrayLike2 = typeof input === "object" && typeof input.length === "number";
  const isUint8Array = typeof input === "object" && typeof input.byteOffset === "number" && typeof input.byteLength === "number";
  if (!isArrayLike2 && !isUint8Array) {
    throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
  }
  let str = "";
  for (let i = 0; i < input.length; i += 3) {
    let bits = 0;
    let bitLength = 0;
    for (let j = i, limit = Math.min(i + 3, input.length); j < limit; j++) {
      bits |= input[j] << (limit - j - 1) * bitsPerByte;
      bitLength += bitsPerByte;
    }
    const bitClusterCount = Math.ceil(bitLength / bitsPerLetter);
    bits <<= bitClusterCount * bitsPerLetter - bitLength;
    for (let k = 1; k <= bitClusterCount; k++) {
      const offset = (bitClusterCount - k) * bitsPerLetter;
      str += alphabetByValue[(bits & maxLetterValue << offset) >> offset];
    }
    str += "==".slice(0, 4 - bitClusterCount);
  }
  return str;
}
const deserializeContent = (content) => content.map((block2) => {
  if (block2.image) {
    return deserializeImageBlock(block2);
  }
  if (block2.document) {
    return deserializeDocumentBlock(block2);
  }
  if (block2.toolUse) {
    return deserializeToolUseBlock$1(block2);
  }
  if (block2.toolResult) {
    return deserializeToolResultBlock(block2);
  }
  return removeNullsFromBlock(block2);
});
const deserializeImageBlock = ({ image }) => ({
  image: {
    ...image,
    source: {
      ...image.source,
      bytes: fromBase64(image.source.bytes)
    }
  }
});
const deserializeDocumentBlock = ({ document: document2 }) => ({
  document: {
    ...document2,
    source: {
      ...document2.source,
      bytes: fromBase64(document2.source.bytes)
    }
  }
});
const deserializeJsonBlock = ({ json }) => ({
  json: JSON.parse(json)
});
const deserializeToolUseBlock$1 = ({ toolUse }) => ({
  toolUse: {
    ...toolUse,
    input: JSON.parse(toolUse.input)
  }
});
const deserializeToolResultBlock = ({ toolResult }) => ({
  toolResult: {
    toolUseId: toolResult.toolUseId,
    content: toolResult.content.map((toolResultBlock) => {
      if (toolResultBlock.image) {
        return deserializeImageBlock(toolResultBlock);
      }
      if (toolResultBlock.json) {
        return deserializeJsonBlock(toolResultBlock);
      }
      return removeNullsFromBlock(toolResultBlock);
    })
  }
});
const removeNullsFromBlock = (block2) => Object.fromEntries(Object.entries(block2).filter(([_, v]) => v !== null));
const convertItemToConversationMessage = ({ content, createdAt, id, conversationId, role }) => ({
  content: deserializeContent(content ?? []),
  conversationId,
  createdAt,
  id,
  role
});
const createListMessagesFunction = (client, modelIntrospection, conversationId, conversationMessageModel, getInternals2) => async (input) => {
  const list = listFactory(client, modelIntrospection, conversationMessageModel, getInternals2, false, getCustomUserAgentDetails(AiAction.ListMessages));
  const { data, nextToken, errors } = await list({
    ...input,
    filter: { conversationId: { eq: conversationId } }
  });
  return {
    data: data.map((item) => convertItemToConversationMessage(item)),
    nextToken,
    errors
  };
};
const convertItemToConversationStreamEvent = ({ id, conversationId, associatedUserMessageId, contentBlockIndex, contentBlockDoneAtIndex, contentBlockDeltaIndex, contentBlockText, contentBlockToolUse, stopReason, errors }) => {
  if (errors) {
    const error2 = {
      id,
      conversationId,
      associatedUserMessageId,
      errors
    };
    return { error: error2 };
  }
  const next = removeNullsFromConversationStreamEvent({
    id,
    conversationId,
    associatedUserMessageId,
    contentBlockIndex,
    contentBlockDoneAtIndex,
    contentBlockDeltaIndex,
    text: contentBlockText,
    toolUse: deserializeToolUseBlock(contentBlockToolUse),
    stopReason
  });
  return { next };
};
const deserializeToolUseBlock = (contentBlockToolUse) => {
  if (contentBlockToolUse) {
    const toolUseBlock = {
      ...contentBlockToolUse,
      input: JSON.parse(contentBlockToolUse.input)
    };
    return toolUseBlock;
  }
};
const removeNullsFromConversationStreamEvent = (block2) => Object.fromEntries(Object.entries(block2).filter(([_, v]) => v !== null));
const createOnStreamEventFunction = (client, modelIntrospection, conversationId, conversationRouteName, getInternals2) => (handler) => {
  const { conversations } = modelIntrospection;
  if (!conversations) {
    return {};
  }
  const subscribeSchema = conversations[conversationRouteName].message.subscribe;
  const subscribeOperation = customOpFactory(client, modelIntrospection, "subscription", subscribeSchema, false, getInternals2, getCustomUserAgentDetails(AiAction.OnStreamEvent));
  return subscribeOperation({ conversationId }).subscribe((data) => {
    const { next, error: error2 } = convertItemToConversationStreamEvent(data);
    if (error2)
      handler.error(error2);
    if (next)
      handler.next(next);
  });
};
const serializeAiContext = (aiContext) => JSON.stringify(aiContext);
const serializeContent = (content) => content.map((block2) => {
  if (block2.image) {
    return serializeImageBlock(block2);
  }
  if (block2.document) {
    return serializeDocumentBlock(block2);
  }
  if (block2.toolResult) {
    return serializeToolResultBlock(block2);
  }
  return block2;
});
const serializeToolConfiguration = ({ tools }) => ({
  tools: Object.entries(tools).map(([name2, tool]) => ({
    toolSpec: {
      name: name2,
      description: tool.description,
      inputSchema: {
        json: JSON.stringify(tool.inputSchema.json)
      }
    }
  }))
});
const serializeImageBlock = ({ image }) => ({
  image: {
    ...image,
    source: {
      ...image.source,
      bytes: toBase64(image.source.bytes)
    }
  }
});
const serializeDocumentBlock = ({ document: document2 }) => ({
  document: {
    ...document2,
    source: {
      ...document2.source,
      bytes: toBase64(document2.source.bytes)
    }
  }
});
const serializeJsonBlock = ({ json }) => ({
  json: JSON.stringify(json)
});
const serializeToolResultBlock = ({ toolResult }) => ({
  toolResult: {
    ...toolResult,
    content: toolResult.content.map((toolResultBlock) => {
      if (toolResultBlock.image) {
        return serializeImageBlock(toolResultBlock);
      }
      if (toolResultBlock.json) {
        return serializeJsonBlock(toolResultBlock);
      }
      return toolResultBlock;
    })
  }
});
const createSendMessageFunction = (client, modelIntrospection, conversationId, conversationRouteName, getInternals2) => async (input) => {
  const { conversations } = modelIntrospection;
  if (!conversations) {
    return {};
  }
  const processedInput = typeof input === "string" ? { content: [{ text: input }] } : input;
  const { content, aiContext, toolConfiguration } = processedInput;
  const sendSchema = conversations[conversationRouteName].message.send;
  const sendOperation = customOpFactory(client, modelIntrospection, "mutation", sendSchema, false, getInternals2, getCustomUserAgentDetails(AiAction.SendMessage));
  const { data, errors } = await sendOperation({
    conversationId,
    content: serializeContent(content),
    ...aiContext && { aiContext: serializeAiContext(aiContext) },
    ...toolConfiguration && {
      toolConfiguration: serializeToolConfiguration(toolConfiguration)
    }
  });
  return {
    data: data ? convertItemToConversationMessage(data) : data,
    errors
  };
};
const convertItemToConversation = (client, modelIntrospection, conversationId, conversationCreatedAt, conversationUpdatedAt, conversationRouteName, conversationMessageModel, getInternals2, conversationMetadata, conversationName) => {
  if (!conversationId) {
    throw new Error(`An error occurred converting a ${conversationRouteName} conversation: Missing ID`);
  }
  return {
    id: conversationId,
    createdAt: conversationCreatedAt,
    updatedAt: conversationUpdatedAt,
    metadata: conversationMetadata,
    name: conversationName,
    onStreamEvent: createOnStreamEventFunction(client, modelIntrospection, conversationId, conversationRouteName, getInternals2),
    sendMessage: createSendMessageFunction(client, modelIntrospection, conversationId, conversationRouteName, getInternals2),
    listMessages: createListMessagesFunction(client, modelIntrospection, conversationId, conversationMessageModel, getInternals2)
  };
};
const createCreateConversationFunction = (client, modelIntrospection, conversationRouteName, conversationModel, conversationMessageModel, getInternals2) => async (input) => {
  const { name: name2, metadata: metadataObject } = input ?? {};
  const metadata = JSON.stringify(metadataObject);
  const createOperation = getFactory(client, modelIntrospection, conversationModel, "CREATE", getInternals2, false, getCustomUserAgentDetails(AiAction.CreateConversation));
  const { data, errors } = await createOperation({ name: name2, metadata });
  return {
    data: convertItemToConversation(client, modelIntrospection, data?.id, data?.createdAt, data?.updatedAt, conversationRouteName, conversationMessageModel, getInternals2, data?.metadata, data?.name),
    errors
  };
};
const createGetConversationFunction = (client, modelIntrospection, conversationRouteName, conversationModel, conversationMessageModel, getInternals2) => async ({ id }) => {
  const get = getFactory(client, modelIntrospection, conversationModel, "GET", getInternals2, false, getCustomUserAgentDetails(AiAction.GetConversation));
  const { data, errors } = await get({ id });
  return {
    data: data ? convertItemToConversation(client, modelIntrospection, data.id, data.createdAt, data.updatedAt, conversationRouteName, conversationMessageModel, getInternals2, data?.metadata, data?.name) : data,
    errors
  };
};
const createListConversationsFunction = (client, modelIntrospection, conversationRouteName, conversationModel, conversationMessageModel, getInternals2) => async (input) => {
  const list = listFactory(client, modelIntrospection, conversationModel, getInternals2, false, getCustomUserAgentDetails(AiAction.ListConversations));
  const { data, nextToken, errors } = await list(input);
  return {
    data: data.map((datum) => {
      return convertItemToConversation(client, modelIntrospection, datum.id, datum.createdAt, datum.updatedAt, conversationRouteName, conversationMessageModel, getInternals2, datum?.metadata, datum?.name);
    }),
    nextToken,
    errors
  };
};
const createDeleteConversationFunction = (client, modelIntrospection, conversationRouteName, conversationModel, conversationMessageModel, getInternals2) => async ({ id }) => {
  const deleteOperation = getFactory(client, modelIntrospection, conversationModel, "DELETE", getInternals2, false, getCustomUserAgentDetails(AiAction.DeleteConversation));
  const { data, errors } = await deleteOperation({ id });
  return {
    data: data ? convertItemToConversation(client, modelIntrospection, data?.id, data?.createdAt, data?.updatedAt, conversationRouteName, conversationMessageModel, getInternals2, data?.metadata, data?.name) : data,
    errors
  };
};
const createUpdateConversationFunction = (client, modelIntrospection, conversationRouteName, conversationModel, conversationMessageModel, getInternals2) => async ({ id, metadata: metadataObject, name: name2 }) => {
  const metadata = JSON.stringify(metadataObject);
  const updateOperation = getFactory(client, modelIntrospection, conversationModel, "UPDATE", getInternals2, false, getCustomUserAgentDetails(AiAction.UpdateConversation));
  const { data, errors } = await updateOperation({ id, metadata, name: name2 });
  return {
    data: data ? convertItemToConversation(client, modelIntrospection, data?.id, data?.createdAt, data?.updatedAt, conversationRouteName, conversationMessageModel, getInternals2, data?.metadata, data?.name) : data,
    errors
  };
};
function generateConversationsProperty(client, apiGraphQLConfig, getInternals2) {
  const modelIntrospection = apiGraphQLConfig?.modelIntrospection;
  if (!modelIntrospection?.conversations) {
    return {};
  }
  const conversations = {};
  for (const { name: name2, conversation, message, models, nonModels, enums } of Object.values(modelIntrospection.conversations)) {
    const conversationModel = models[conversation.modelName];
    const conversationMessageModel = models[message.modelName];
    if (!conversationModel || !conversationMessageModel) {
      return {};
    }
    const conversationModelIntrospection = {
      ...modelIntrospection,
      models: {
        ...modelIntrospection.models,
        ...models
      },
      nonModels: {
        ...modelIntrospection.nonModels,
        ...nonModels
      },
      enums: {
        ...modelIntrospection.enums,
        ...enums
      }
    };
    conversations[name2] = {
      update: createUpdateConversationFunction(client, conversationModelIntrospection, name2, conversationModel, conversationMessageModel, getInternals2),
      create: createCreateConversationFunction(client, conversationModelIntrospection, name2, conversationModel, conversationMessageModel, getInternals2),
      get: createGetConversationFunction(client, conversationModelIntrospection, name2, conversationModel, conversationMessageModel, getInternals2),
      delete: createDeleteConversationFunction(client, conversationModelIntrospection, name2, conversationModel, conversationMessageModel, getInternals2),
      list: createListConversationsFunction(client, conversationModelIntrospection, name2, conversationModel, conversationMessageModel, getInternals2)
    };
  }
  return conversations;
}
function generateGenerationsProperty(client, apiGraphQLConfig, getInternals2) {
  const modelIntrospection = apiGraphQLConfig?.modelIntrospection;
  if (!modelIntrospection?.generations) {
    return {};
  }
  const generations = {};
  for (const generation of Object.values(modelIntrospection.generations)) {
    generations[generation.name] = customOpFactory(client, modelIntrospection, "query", generation, false, getInternals2, getCustomUserAgentDetails(AiAction.Generation));
  }
  return generations;
}
const generateEnumsProperty = (graphqlConfig) => {
  const modelIntrospection = graphqlConfig.modelIntrospection;
  if (!modelIntrospection) {
    return {};
  }
  const enums = {};
  for (const [_, enumData] of Object.entries(modelIntrospection.enums)) {
    enums[enumData.name] = {
      values: () => enumData.values
    };
  }
  return enums;
};
function indexQueryFactory(client, modelIntrospection, model, indexMeta, getInternals2, context = false) {
  const indexQueryWithContext = (contextSpec, args, options) => {
    return _indexQuery(client, modelIntrospection, model, indexMeta, getInternals2, {
      ...args,
      ...options
    }, contextSpec);
  };
  const indexQuery = (args, options) => {
    return _indexQuery(client, modelIntrospection, model, indexMeta, getInternals2, {
      ...args,
      ...options
    });
  };
  return context ? indexQueryWithContext : indexQuery;
}
function processGraphQlResponse(modelIntroSchema, modelName, result, selectionSet, modelInitializer) {
  const { data, extensions } = result;
  const [key] = Object.keys(data);
  if (data[key].items) {
    const flattenedResult = data[key].items.map((value) => flattenItems(modelIntroSchema, modelName, value));
    return {
      data: selectionSet ? flattenedResult : modelInitializer(flattenedResult),
      nextToken: data[key].nextToken,
      extensions
    };
  }
  return {
    data: data[key],
    nextToken: data[key].nextToken,
    extensions
  };
}
function _indexQuery(client, modelIntrospection, model, indexMeta, getInternals2, args, contextSpec) {
  return selfAwareAsync(async (resultPromise) => {
    const { name: name2 } = model;
    const query = generateGraphQLDocument(modelIntrospection, model, "INDEX_QUERY", args, indexMeta);
    const variables = buildGraphQLVariables(model, "INDEX_QUERY", args, modelIntrospection, indexMeta);
    const auth = authModeParams(client, getInternals2, args);
    const modelInitializer = (flattenedResult) => initializeModel(client, name2, flattenedResult, modelIntrospection, auth.authMode, auth.authToken, !!contextSpec);
    try {
      const headers = getCustomHeaders(client, getInternals2, args?.headers);
      const graphQlParams = {
        ...auth,
        query,
        variables
      };
      const requestArgs = [graphQlParams, headers];
      if (contextSpec !== void 0) {
        requestArgs.unshift(contextSpec);
      }
      const basePromise = client.graphql(...requestArgs);
      const extendedPromise = extendCancellability(basePromise, resultPromise);
      const response = await extendedPromise;
      if (response.data !== void 0) {
        return processGraphQlResponse(modelIntrospection, name2, response, args?.selectionSet, modelInitializer);
      }
    } catch (error2) {
      const { data, errors } = error2;
      if (data !== void 0 && data !== null && Object.keys(data).length !== 0 && errors) {
        const [key] = Object.keys(data);
        if (data[key]?.items) {
          const flattenedResult = data[key]?.items.map((value) => flattenItems(modelIntrospection, name2, value));
          if (flattenedResult) {
            return {
              data: args?.selectionSet ? flattenedResult : modelInitializer(flattenedResult),
              nextToken: data[key]?.nextToken
            };
          }
        }
        return {
          data: data[key],
          nextToken: data[key]?.nextToken
        };
      } else {
        return handleListGraphQlError(error2);
      }
    }
  });
}
function subscriptionFactory(client, modelIntrospection, model, operation, getInternals2) {
  const { name: name2 } = model;
  const subscription = (args) => {
    const query = generateGraphQLDocument(modelIntrospection, model, operation, args);
    const variables = buildGraphQLVariables(model, operation, args, modelIntrospection);
    const auth = authModeParams(client, getInternals2, args);
    const headers = getCustomHeaders(client, getInternals2, args?.headers);
    const observable2 = client.graphql({
      ...auth,
      query,
      variables
    }, headers);
    return observable2.pipe(map((value) => {
      const [key] = Object.keys(value.data);
      const data = value.data[key];
      const flattenedResult = flattenItems(modelIntrospection, name2, data);
      if (flattenedResult === null) {
        return null;
      } else if (args?.selectionSet) {
        return flattenedResult;
      } else {
        const [initialized] = initializeModel(client, name2, [flattenedResult], modelIntrospection, auth.authMode, auth.authToken);
        return initialized;
      }
    }));
  };
  return subscription;
}
function resolvePKFields(model) {
  const { primaryKeyFieldName, sortKeyFieldNames } = model.primaryKeyInfo;
  return [primaryKeyFieldName, ...sortKeyFieldNames];
}
function findIndexByFields(needle, haystack, keyFields) {
  const searchObject = Object.fromEntries(keyFields.map((fieldName) => [fieldName, needle[fieldName]]));
  for (let i = 0; i < haystack.length; i++) {
    if (Object.keys(searchObject).every((k) => searchObject[k] === haystack[i][k])) {
      return i;
    }
  }
  return -1;
}
function observeQueryFactory(models, model) {
  const { name: name2 } = model;
  const observeQuery = (arg) => new Observable((subscriber) => {
    const items = [];
    const messageQueue = [];
    let receiveMessages = (...messages) => {
      return messageQueue.push(...messages);
    };
    const onCreateSub = models[name2].onCreate(arg).subscribe({
      next(item) {
        receiveMessages({ item, type: "create" });
      },
      error(error2) {
        subscriber.error({ type: "onCreate", error: error2 });
      }
    });
    const onUpdateSub = models[name2].onUpdate(arg).subscribe({
      next(item) {
        receiveMessages({ item, type: "update" });
      },
      error(error2) {
        subscriber.error({ type: "onUpdate", error: error2 });
      }
    });
    const onDeleteSub = models[name2].onDelete(arg).subscribe({
      next(item) {
        receiveMessages({ item, type: "delete" });
      },
      error(error2) {
        subscriber.error({ type: "onDelete", error: error2 });
      }
    });
    function ingestMessages(messages) {
      for (const message of messages) {
        const idx = findIndexByFields(message.item, items, pkFields);
        switch (message.type) {
          case "create":
            if (idx < 0)
              items.push(message.item);
            break;
          case "update":
            if (idx >= 0)
              items[idx] = message.item;
            break;
          case "delete":
            if (idx >= 0)
              items.splice(idx, 1);
            break;
          default:
            console.error("Unrecognized message in observeQuery.", message);
        }
      }
      subscriber.next({
        items,
        isSynced: true
      });
    }
    const pkFields = resolvePKFields(model);
    (async () => {
      let firstPage = true;
      let nextToken = null;
      while (!subscriber.closed && (firstPage || nextToken)) {
        firstPage = false;
        const { data: page, errors, nextToken: _nextToken } = await models[name2].list({ ...arg, nextToken });
        nextToken = _nextToken;
        items.push(...page);
        const isSynced = messageQueue.length === 0 && (nextToken === null || nextToken === void 0);
        subscriber.next({
          items,
          isSynced
        });
        if (Array.isArray(errors)) {
          for (const error2 of errors) {
            subscriber.error(error2);
          }
        }
      }
      if (messageQueue.length > 0) {
        ingestMessages(messageQueue);
      }
      receiveMessages = (...messages) => {
        ingestMessages(messages);
        return items.length;
      };
    })();
    return () => {
      onCreateSub.unsubscribe();
      onUpdateSub.unsubscribe();
      onDeleteSub.unsubscribe();
    };
  });
  return observeQuery;
}
const attributeIsSecondaryIndex = (attr) => {
  return attr.type === "key" && // presence of `name` property distinguishes GSI from primary index
  attr.properties?.name && attr.properties?.queryField && attr.properties?.fields.length > 0;
};
const getSecondaryIndexesFromSchemaModel = (model) => {
  const idxs = model.attributes?.filter(attributeIsSecondaryIndex).map((attr) => {
    const queryField = attr.properties.queryField;
    const [pk, ...sk] = attr.properties.fields;
    return {
      queryField,
      pk,
      sk
    };
  });
  return idxs || [];
};
const excludeDisabledOps = (mis, modelName) => {
  const modelAttrs = mis.models[modelName].attributes?.find((attr) => attr.type === "model");
  const coarseToFineDict = {
    queries: ["list", "get", "observeQuery"],
    mutations: ["create", "update", "delete"],
    subscriptions: ["onCreate", "onUpdate", "onDelete"]
  };
  const disabledOps = [];
  if (!modelAttrs) {
    return graphQLOperationsInfo;
  }
  if (modelAttrs.properties) {
    for (const [key, value] of Object.entries(modelAttrs.properties)) {
      if (!(key in coarseToFineDict)) {
        continue;
      }
      if (value === null) {
        disabledOps.push(...coarseToFineDict[key]);
      } else if (value instanceof Object) {
        disabledOps.push(...Object.keys(value));
      }
    }
  }
  if (disabledOps.includes("list")) {
    disabledOps.push("observeQuery");
  }
  const disabledOpsUpper = disabledOps.map((op) => op.toUpperCase());
  const filteredGraphQLOperations = Object.fromEntries(Object.entries(graphQLOperationsInfo).filter(([key]) => !disabledOpsUpper.includes(key)));
  return filteredGraphQLOperations;
};
function generateModelsProperty(client, apiGraphQLConfig, getInternals2) {
  const models = {};
  const modelIntrospection = apiGraphQLConfig.modelIntrospection;
  if (!modelIntrospection) {
    return {};
  }
  const SUBSCRIPTION_OPS = ["ONCREATE", "ONUPDATE", "ONDELETE"];
  for (const model of Object.values(modelIntrospection.models)) {
    const { name: name2 } = model;
    models[name2] = {};
    const enabledModelOps = excludeDisabledOps(modelIntrospection, name2);
    Object.entries(enabledModelOps).forEach(([key, { operationPrefix }]) => {
      const operation = key;
      if (operation === "LIST") {
        models[name2][operationPrefix] = listFactory(client, modelIntrospection, model, getInternals2);
      } else if (SUBSCRIPTION_OPS.includes(operation)) {
        models[name2][operationPrefix] = subscriptionFactory(client, modelIntrospection, model, operation, getInternals2);
      } else if (operation === "OBSERVEQUERY") {
        models[name2][operationPrefix] = observeQueryFactory(models, model);
      } else {
        models[name2][operationPrefix] = getFactory(client, modelIntrospection, model, operation, getInternals2);
      }
    });
    const secondaryIdxs = getSecondaryIndexesFromSchemaModel(model);
    for (const idx of secondaryIdxs) {
      models[name2][idx.queryField] = indexQueryFactory(client, modelIntrospection, model, idx, getInternals2);
    }
  }
  return models;
}
function addSchemaToClient(client, apiGraphqlConfig, getInternals2) {
  upgradeClientCancellation(client);
  client.models = generateModelsProperty(client, apiGraphqlConfig, getInternals2);
  client.enums = generateEnumsProperty(apiGraphqlConfig);
  client.queries = generateCustomQueriesProperty(client, apiGraphqlConfig, getInternals2);
  client.mutations = generateCustomMutationsProperty(client, apiGraphqlConfig, getInternals2);
  client.subscriptions = generateCustomSubscriptionsProperty(client, apiGraphqlConfig, getInternals2);
  client.conversations = generateConversationsProperty(client, apiGraphqlConfig, getInternals2);
  client.generations = generateGenerationsProperty(client, apiGraphqlConfig, getInternals2);
  return client;
}
function isGraphQLOptionsWithOverride(options) {
  return INTERNAL_USER_AGENT_OVERRIDE in options;
}
class GraphQLAPIClass extends InternalGraphQLAPIClass {
  getModuleName() {
    return "GraphQLAPI";
  }
  /**
   * Executes a GraphQL operation
   *
   * @param options - GraphQL Options
   * @param [additionalHeaders] - headers to merge in after any `libraryConfigHeaders` set in the config
   * @returns An Observable if the query is a subscription query, else a promise of the graphql result.
   */
  graphql(amplify, options, additionalHeaders) {
    const userAgentDetails = {
      category: Category$1.API,
      action: ApiAction$1.GraphQl
    };
    if (isGraphQLOptionsWithOverride(options)) {
      const { [INTERNAL_USER_AGENT_OVERRIDE]: internalUserAgentOverride, ...cleanOptions } = options;
      return super.graphql(amplify, cleanOptions, additionalHeaders, {
        ...userAgentDetails,
        ...internalUserAgentOverride
      });
    }
    return super.graphql(amplify, options, additionalHeaders, {
      ...userAgentDetails
    });
  }
  /**
   * Checks to see if an error thrown is from an api request cancellation
   * @param error - Any error
   * @returns A boolean indicating if the error was from an api request cancellation
   */
  isCancelError(error2) {
    return super.isCancelError(error2);
  }
  /**
   * Cancels an inflight request. Only applicable for graphql queries and mutations
   * @param {any} request - request to cancel
   * @returns A boolean indicating if the request was cancelled
   */
  cancel(request, message) {
    return super.cancel(request, message);
  }
}
const GraphQLAPI = new GraphQLAPIClass();
function graphql(options, additionalHeaders) {
  const internals = getInternals(this);
  const clientEndpoint = internals.endpoint;
  const clientAuthMode = internals.authMode;
  const clientApiKey = internals.apiKey;
  options.authMode = options.authMode || clientAuthMode;
  options.apiKey = options.apiKey ?? clientApiKey;
  options.authToken = options.authToken || internals.authToken;
  if (clientEndpoint && options.authMode === "apiKey" && !options.apiKey) {
    throw new Error("graphql() requires an explicit `apiKey` for a custom `endpoint` when `authMode = 'apiKey'`.");
  }
  const headers = additionalHeaders || internals.headers;
  const result = GraphQLAPI.graphql(
    // TODO: move V6Client back into this package?
    internals.amplify,
    {
      ...options,
      endpoint: clientEndpoint
    },
    headers
  );
  return result;
}
function cancel(promise, message) {
  return GraphQLAPI.cancel(promise, message);
}
function isCancelError(error2) {
  return GraphQLAPI.isCancelError(error2);
}
function isApiGraphQLConfig(apiGraphQLConfig) {
  return apiGraphQLConfig !== void 0;
}
function isConfigureEventWithResourceConfig(payload) {
  return payload.event === "configure";
}
function generateClient$1(params) {
  const client = {
    [__amplify]: params.amplify,
    [__authMode]: params.authMode,
    [__authToken]: params.authToken,
    [__apiKey]: "apiKey" in params ? params.apiKey : void 0,
    [__endpoint]: "endpoint" in params ? params.endpoint : void 0,
    [__headers]: params.headers,
    graphql,
    cancel,
    isCancelError,
    models: emptyProperty,
    enums: emptyProperty,
    queries: emptyProperty,
    mutations: emptyProperty,
    subscriptions: emptyProperty
  };
  const apiGraphqlConfig = params.amplify.getConfig().API?.GraphQL;
  if (client[__endpoint]) {
    if (!client[__authMode]) {
      throw new Error("generateClient() requires an explicit `authMode` when `endpoint` is provided.");
    }
    if (client[__authMode] === "apiKey" && !client[__apiKey]) {
      throw new Error("generateClient() requires an explicit `apiKey` when `endpoint` is provided and `authMode = 'apiKey'`.");
    }
  }
  if (!client[__endpoint]) {
    if (isApiGraphQLConfig(apiGraphqlConfig)) {
      addSchemaToClient(client, apiGraphqlConfig, getInternals);
    } else {
      generateModelsPropertyOnAmplifyConfigure(client);
    }
  }
  return client;
}
const generateModelsPropertyOnAmplifyConfigure = (clientRef) => {
  Hub$1.listen("core", (coreEvent) => {
    if (!isConfigureEventWithResourceConfig(coreEvent.payload)) {
      return;
    }
    const apiGraphQLConfig = coreEvent.payload.data.API?.GraphQL;
    if (isApiGraphQLConfig(apiGraphQLConfig)) {
      addSchemaToClient(clientRef, apiGraphQLConfig, getInternals);
    }
  });
};
const emptyProperty = new Proxy({}, {
  get() {
    throw new Error("Client could not be generated. This is likely due to `Amplify.configure()` not being called prior to `generateClient()` or because the configuration passed to `Amplify.configure()` is missing GraphQL provider configuration.");
  }
});
function generateClient(options) {
  return generateClient$1({
    ...{},
    amplify: Amplify
  });
}
const normalizeAuth = (explicitAuthMode, defaultAuthMode) => {
  if (!explicitAuthMode) {
    return defaultAuthMode;
  }
  if (explicitAuthMode === "identityPool") {
    return "iam";
  }
  return explicitAuthMode;
};
const configure = () => {
  const config2 = Amplify.getConfig();
  const eventsConfig = config2.API?.Events;
  if (!eventsConfig) {
    throw new Error("Amplify configuration is missing. Have you called Amplify.configure()?");
  }
  const configAuthMode = normalizeAuth(eventsConfig.defaultAuthMode, "apiKey");
  const options = {
    appSyncGraphqlEndpoint: eventsConfig.endpoint,
    region: eventsConfig.region,
    authenticationType: configAuthMode,
    apiKey: eventsConfig.apiKey
  };
  return options;
};
const serializeEvents = (events) => {
  if (Array.isArray(events)) {
    return events.map((ev, idx) => {
      const eventJson2 = JSON.stringify(ev);
      if (eventJson2 === void 0) {
        throw new Error(`Event must be a valid JSON value. Received ${ev} at index ${idx}`);
      }
      return eventJson2;
    });
  }
  const eventJson = JSON.stringify(events);
  if (eventJson === void 0) {
    throw new Error(`Event must be a valid JSON value. Received ${events}`);
  }
  return [eventJson];
};
const PROVIDER_NAME = "AWSAppSyncEventsProvider";
const WS_PROTOCOL_NAME = "aws-appsync-event-ws";
const CONNECT_URI = "";
class AWSAppSyncEventProvider extends AWSWebSocketProvider {
  constructor() {
    super({
      providerName: PROVIDER_NAME,
      wsProtocolName: WS_PROTOCOL_NAME,
      connectUri: CONNECT_URI
    });
    this.allowNoSubscriptions = true;
  }
  getProviderName() {
    return PROVIDER_NAME;
  }
  async connect(options) {
    return super.connect(options);
  }
  subscribe(options, customUserAgentDetails) {
    return super.subscribe(options, customUserAgentDetails).pipe();
  }
  async publish(options, customUserAgentDetails) {
    return super.publish(options, customUserAgentDetails);
  }
  closeIfNoActiveSubscription() {
    this._closeSocketIfRequired();
  }
  async _prepareSubscriptionPayload({ options, subscriptionId, customUserAgentDetails, additionalCustomHeaders, libraryConfigHeaders, publish }) {
    const { appSyncGraphqlEndpoint, authenticationType, query, apiKey, region, variables } = options;
    const data = {
      channel: query,
      events: variables !== void 0 ? serializeEvents(variables) : void 0
    };
    const serializedData = JSON.stringify(data);
    const headers = {
      ...await awsRealTimeHeaderBasedAuth({
        apiKey,
        appSyncGraphqlEndpoint,
        authenticationType,
        payload: serializedData,
        canonicalUri: "",
        region,
        additionalCustomHeaders
      }),
      ...libraryConfigHeaders,
      ...additionalCustomHeaders,
      [USER_AGENT_HEADER$1]: getAmplifyUserAgent$1(customUserAgentDetails)
    };
    const subscriptionMessage = {
      id: subscriptionId,
      channel: query,
      events: variables !== void 0 ? serializeEvents(variables) : void 0,
      authorization: {
        ...headers
      },
      payload: {
        events: variables !== void 0 ? serializeEvents(variables) : void 0,
        channel: query,
        extensions: {
          authorization: {
            ...headers
          }
        }
      },
      type: publish ? MESSAGE_TYPES.EVENT_PUBLISH : MESSAGE_TYPES.EVENT_SUBSCRIBE
    };
    const serializedSubscriptionMessage = JSON.stringify(subscriptionMessage);
    return serializedSubscriptionMessage;
  }
  _handleSubscriptionData(message) {
    this.logger.debug(`subscription message from AWS AppSync Events: ${message.data}`);
    const { id = "", event: payload, type } = JSON.parse(String(message.data));
    const { observer = null, query = "", variables = {} } = this.subscriptionObserverMap.get(id) || {};
    this.logger.debug({ id, observer, query, variables });
    if (type === MESSAGE_TYPES.DATA && payload) {
      const deserializedEvent = JSON.parse(payload);
      if (observer) {
        observer.next({ id, type, event: deserializedEvent });
      } else {
        this.logger.debug(`observer not found for id: ${id}`);
      }
      return [true, { id, type, payload: deserializedEvent }];
    }
    return [false, { id, type, payload }];
  }
  _unsubscribeMessage(subscriptionId) {
    return {
      id: subscriptionId,
      type: MESSAGE_TYPES.EVENT_STOP
    };
  }
  _extractConnectionTimeout(data) {
    const { connectionTimeoutMs = DEFAULT_KEEP_ALIVE_TIMEOUT } = data;
    return connectionTimeoutMs;
  }
  _extractErrorCodeAndType(data) {
    const { errors: [{ errorType = "", errorCode = 0 } = {}] = [] } = data;
    return { errorCode, errorType };
  }
}
const AppSyncEventProvider = new AWSAppSyncEventProvider();
const openChannels = /* @__PURE__ */ new Set();
async function connect(channel, options) {
  const providerOptions = configure();
  providerOptions.authenticationType = normalizeAuth(options?.authMode, providerOptions.authenticationType);
  providerOptions.apiKey = options?.apiKey || providerOptions.apiKey;
  providerOptions.authToken = options?.authToken || providerOptions.authToken;
  await AppSyncEventProvider.connect(providerOptions);
  const channelId = amplifyUuid$1();
  openChannels.add(channelId);
  let _subscription;
  const sub = (observer, subOptions) => {
    if (!openChannels.has(channelId)) {
      throw new Error("Channel is closed");
    }
    const subscribeOptions = { ...providerOptions, query: channel };
    subscribeOptions.authenticationType = normalizeAuth(subOptions?.authMode, subscribeOptions.authenticationType);
    subscribeOptions.apiKey = subOptions?.apiKey || subscribeOptions.apiKey;
    subscribeOptions.authToken = subOptions?.authToken || subscribeOptions.authToken;
    _subscription = AppSyncEventProvider.subscribe(subscribeOptions).subscribe(observer);
    return _subscription;
  };
  const pub = async (event, pubOptions) => {
    if (!openChannels.has(channelId)) {
      throw new Error("Channel is closed");
    }
    const publishOptions = {
      ...providerOptions,
      query: channel,
      variables: event
    };
    publishOptions.authenticationType = normalizeAuth(pubOptions?.authMode, publishOptions.authenticationType);
    publishOptions.apiKey = pubOptions?.apiKey || publishOptions.apiKey;
    publishOptions.authToken = pubOptions?.authToken || publishOptions.authToken;
    return AppSyncEventProvider.publish(publishOptions);
  };
  const close = async () => {
    _subscription && _subscription.unsubscribe();
    openChannels.delete(channelId);
    setTimeout(() => {
      if (openChannels.size === 0) {
        AppSyncEventProvider.closeIfNoActiveSubscription();
      }
    }, 1e3);
  };
  return {
    subscribe: sub,
    close,
    publish: pub
  };
}
async function closeAll() {
  await AppSyncEventProvider.close();
}
/**
 * @wharfkit/wallet-plugin-cloudwallet v1.5.0
 * https://github.com/wharfkit/wallet-plugin-cloudwallet
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
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
typeof SuppressedError === "function" ? SuppressedError : function(error2, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error2, e.suppressed = suppressed, e;
};
let Buyrambytes = class Buyrambytes2 extends Struct {
};
__decorate([
  Struct.field(Name)
], Buyrambytes.prototype, "payer", void 0);
__decorate([
  Struct.field(Name)
], Buyrambytes.prototype, "receiver", void 0);
__decorate([
  Struct.field(UInt32)
], Buyrambytes.prototype, "bytes", void 0);
Buyrambytes = __decorate([
  Struct.type("buyrambytes")
], Buyrambytes);
let Transfer = class Transfer2 extends Struct {
};
__decorate([
  Struct.field(Name)
], Transfer.prototype, "from", void 0);
__decorate([
  Struct.field(Name)
], Transfer.prototype, "to", void 0);
__decorate([
  Struct.field(Asset)
], Transfer.prototype, "quantity", void 0);
__decorate([
  Struct.field("string")
], Transfer.prototype, "memo", void 0);
Transfer = __decorate([
  Struct.type("transfer")
], Transfer);
function validateModifications(original, modified) {
  const originalsExist = original.actions.every((action) => modified.actions.some((modifiedAction) => action.equals(modifiedAction)));
  if (!originalsExist) {
    throw new Error("The modified transaction does not contain all the original actions.");
  }
  const newActions = modified.actions.filter((action) => {
    return !original.actions.some((originalAction) => action.equals(originalAction));
  });
  for (const newAction of newActions) {
    const authByUser = newAction.authorization.find((auth) => {
      return auth.actor === original.actions[0].authorization[0].actor;
    });
    if (authByUser) {
      const isTokenTransfer = newAction.account.equals("eosio.token") && newAction.name.equals("transfer");
      if (isTokenTransfer) {
        const data = Transfer.from(newAction.data);
        if (data.to.equals("txfee.wam") && data.memo.startsWith("WAX fee for")) {
          continue;
        }
      }
      const isRAMPurchase = newAction.account.equals("eosio") && newAction.name.equals("buyrambytes");
      if (isRAMPurchase) {
        const data = Buyrambytes.from(newAction.data);
        if (data.receiver.equals(original.actions[0].authorization[0].actor)) {
          continue;
        }
      }
      throw new Error("The modified transaction contains one or more actions that are not allowed.");
    }
  }
}
function registerCloseListener(t, popup, reject) {
  const closeListener = setInterval(() => {
    if (popup.closed) {
      clearInterval(closeListener);
      reject(t("error.closed", {
        default: "The Cloud Wallet was closed before the request was completed"
      }));
    }
  }, 500);
  return closeListener;
}
function getCurrentTime() {
  return Math.floor((/* @__PURE__ */ new Date()).getTime());
}
function isValidEvent(event, url, window2) {
  const eventOrigin = new URL(event.origin);
  const validOrigin = eventOrigin.origin === url.origin;
  const validSource = event.source === window2;
  const validObject = typeof event.data === "object";
  if (!validObject || !validOrigin || !validSource) {
    return false;
  }
  return true;
}
async function autoLogin(t, urlString) {
  const url = new URL(urlString);
  const response = await fetch(String(url), {
    credentials: "include",
    method: "get",
    headers: {
      "X-Referer-Url": location.origin
    }
  });
  if (!response.ok) {
    throw new Error(t("error.endpoint", {
      default: `Login Endpoint Error {{status}} - {{statusText}}`,
      status: response.status,
      statusText: response.statusText
    }));
  }
  const data = await response.json();
  return data;
}
async function popupLogin(t, urlString, timeout = 3e5) {
  const url = new URL(urlString);
  const popup = await window.open(url, "WalletPluginCloudWalletPopup", "height=800,width=600");
  if (!popup) {
    throw new Error(t("error.popup", {
      default: "Unable to open the popup window. Check your browser settings and try again."
    }));
  }
  return new Promise((resolve, reject) => {
    const closeListener = registerCloseListener(t, popup, reject);
    const handleEvent = (event) => {
      if (!isValidEvent(event, url, popup)) {
        return;
      }
      try {
        resolve(event.data);
      } catch (e) {
        reject(e);
      } finally {
        window.removeEventListener("message", handleEvent);
        clearTimeout(autoCancel);
        clearInterval(closeListener);
      }
    };
    const autoCancel = setTimeout(() => {
      popup.close();
      window.removeEventListener("message", handleEvent);
      reject(new Error(t("error.timeout", {
        default: "The request has timed out after {{timeout}} seconds. Please try again.",
        timeout: timeout / 1e3
      })));
    }, timeout);
    window.addEventListener("message", handleEvent);
  });
}
function allowAutosign(request, data) {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.search("chrome") === -1 && ua.search("safari") >= 0) {
    return false;
  }
  try {
    if (!data)
      return false;
    const whitelist = data.whitelist;
    const { actions } = request.resolvedTransaction;
    return actions.every((action) => {
      return whitelist.find((entry) => {
        if (action.account.equals(entry.contract)) {
          if (action.account.equals("eosio.token") && action.name && action.name.equals("transfer")) {
            return entry.recipients.includes(String(action.data.to));
          }
          return true;
        }
      });
    });
  } catch (e) {
  }
  return false;
}
async function autoSign(t, urlString, request) {
  const url = new URL(urlString);
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 5e3);
  const response = await fetch(url, {
    body: JSON.stringify({
      feeFallback: true,
      freeBandwidth: true,
      transaction: request.serializedTransaction
    }),
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    method: "POST",
    signal: controller.signal
  });
  if (!response.ok) {
    throw new Error(t("error.endpoint", {
      default: `Login Endpoint Error {{status}} - {{statusText}}`,
      status: response.status,
      statusText: response.statusText
    }));
  }
  const data = await response.json();
  if (data.processed && data.processed.except) {
    throw new Error(t("error.exception", {
      default: "Signing exception occurred: {{exception}}",
      exception: JSON.stringify(data)
    }));
  }
  return data;
}
async function popupTransact(t, urlString, request, timeout = 3e5) {
  const url = new URL(urlString);
  const popup = await window.open(url, "WalletPluginCloudWalletPopup", "height=800,width=600");
  if (!popup) {
    throw new Error(t("error.popup", {
      default: "Unable to open the popup window. Check your browser settings and try again."
    }));
  }
  return new Promise((resolve, reject) => {
    const closeListener = registerCloseListener(t, popup, reject);
    const handleEvent = (event) => {
      if (!isValidEvent(event, url, popup)) {
        return;
      }
      popup?.postMessage({
        feeFallback: true,
        freeBandwidth: true,
        startTime: getCurrentTime(),
        transaction: request.serializedTransaction,
        type: "TRANSACTION"
      }, String(urlString));
      const handleSigning = (signingEvent) => {
        if (!isValidEvent(signingEvent, url, popup)) {
          return;
        }
        try {
          resolve(signingEvent.data);
        } catch (e) {
          reject(e);
        } finally {
          window.removeEventListener("message", handleEvent);
          window.removeEventListener("message", handleSigning);
          clearTimeout(autoCancel);
          clearInterval(closeListener);
        }
      };
      window.addEventListener("message", handleSigning);
    };
    const autoCancel = setTimeout(() => {
      popup.close();
      window.removeEventListener("message", handleEvent);
      reject(new Error(t("error.timeout", {
        default: "The request has timed out after {{timeout}} seconds. Please try again.",
        timeout: timeout / 1e3
      })));
    }, timeout);
    window.addEventListener("message", handleEvent);
  });
}
var connecting$3 = "Connecting to Cloud Wallet";
var error$3 = {
  closed: "The Cloud Wallet was closed before the request was completed",
  endpoint: "Login Endpoint Error {{status}} - {{statusText}}",
  exception: "Signing exception occurred: {{exception}}",
  popup: "Unable to open the popup window. Check your browser settings and try again.",
  response: "The Cloud Wallet failed to respond.",
  timeout: "The request has timed out after {{timeout}} seconds. Please try again."
};
var login$3 = {
  popup: "Login with the Cloud Wallet popup window"
};
var transact$3 = {
  popup: "Sign with the Cloud Wallet popup window"
};
var en = {
  connecting: connecting$3,
  error: error$3,
  login: login$3,
  transact: transact$3
};
var connecting$2 = "클라우드 지갑에 연결";
var error$2 = {
  closed: "요청이 완료되기 전에 클라우드 지갑이 닫혔습니다.",
  endpoint: "로그인 엔드포인트 오류 {{status}} - {{statusText}}",
  exception: "서명 예외가 발생했습니다: {{exception}}",
  popup: "팝업 창을 열 수 없습니다. 브라우저 설정을 확인하고 다시 시도하십시오.",
  response: "클라우드 지갑이 응답하지 못했습니다.",
  timeout: "{{timeout}}초 후에 요청 시간이 초과되었습니다. 다시 시도하십시오."
};
var login$2 = {
  popup: "클라우드 지갑 팝업 창으로 로그인"
};
var transact$2 = {
  popup: "클라우드 지갑 팝업 창으로 서명"
};
var ko = {
  connecting: connecting$2,
  error: error$2,
  login: login$2,
  transact: transact$2
};
var connecting$1 = "正在连接到云钱包";
var error$1 = {
  closed: "云钱包在请求完成之前已关闭",
  endpoint: "登录端点错误 {{status}} - {{statusText}}",
  exception: "发生签名异常：{{exception}}",
  popup: "无法打开弹出窗口。请检查您的浏览器设置，然后重试。",
  response: "云钱包响应失败。",
  timeout: "请求在 {{timeout}} 秒后超时。请重试。"
};
var login$1 = {
  popup: "使用云钱包弹出窗口登录"
};
var transact$1 = {
  popup: "使用云钱包弹出窗口签名"
};
var zh_hans = {
  connecting: connecting$1,
  error: error$1,
  login: login$1,
  transact: transact$1
};
var connecting = "正在連接到雲錢包";
var error = {
  closed: "雲錢包在請求完成之前已關閉",
  endpoint: "登錄端點錯誤 {{status}} - {{statusText}}",
  exception: "發生簽名異常：{{exception}}",
  popup: "無法打開彈出窗口。 請檢查您的瀏覽器設置，然後重試。",
  response: "雲錢包響應失敗",
  timeout: "請求在 {{timeout}} 秒後超時。請重試。"
};
var login = {
  popup: "使用雲錢包彈出窗口登錄"
};
var transact = {
  popup: "使用雲錢包彈出窗口簽名"
};
var zh_hant = {
  connecting,
  error,
  login,
  transact
};
var defaultTranslations = {
  en,
  ko,
  "zh-Hans": zh_hans,
  "zh-Hant": zh_hant
};
const isIos = () => {
  return navigator.userAgent.includes("iPhone") || navigator.userAgent.includes("iPad");
};
function generateReturnUrl() {
  if (isAppleHandheld() && isReactNativeApp()) {
    return void 0;
  }
  if (isChromeiOS()) {
    return "googlechrome://";
  }
  if (isFirefoxiOS()) {
    return "firefox:://";
  }
  if (isAppleHandheld() && isBrave()) {
    return "brave://";
  }
  if (isAppleHandheld()) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let rv = window.location.href.split("#")[0] + "#";
    for (let i = 0; i < 8; i++) {
      rv += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return rv;
  }
  if (isAndroid() && isFirefox()) {
    return "android-app://org.mozilla.firefox";
  }
  if (isAndroid() && isEdge()) {
    return "android-app://com.microsoft.emmx";
  }
  if (isAndroid() && isOpera()) {
    return "android-app://com.opera.browser";
  }
  if (isAndroid() && isBrave()) {
    return "android-app://com.brave.browser";
  }
  if (isAndroid() && isAndroidWebView()) {
    return "android-app://webview";
  }
  if (isAndroid() && isChromeMobile()) {
    return "android-app://com.android.chrome";
  }
  return window.location.href;
}
function isAppleHandheld() {
  return /iP(ad|od|hone)/i.test(navigator.userAgent);
}
function isChromeiOS() {
  return /CriOS/.test(navigator.userAgent);
}
function isChromeMobile() {
  return /Chrome\/[.0-9]* Mobile/i.test(navigator.userAgent);
}
function isFirefox() {
  return /Firefox/i.test(navigator.userAgent);
}
function isFirefoxiOS() {
  return /FxiOS/.test(navigator.userAgent);
}
function isOpera() {
  return /OPR/.test(navigator.userAgent) || /Opera/.test(navigator.userAgent);
}
function isEdge() {
  return /Edg/.test(navigator.userAgent);
}
function isBrave() {
  return navigator["brave"] && typeof navigator["brave"].isBrave === "function";
}
function isAndroid() {
  return /Android/.test(navigator.userAgent);
}
function isReactNativeApp() {
  return !!window.ReactNativeWebView;
}
function isAndroidWebView() {
  return /wv/.test(navigator.userAgent) || /Android/.test(navigator.userAgent) && isReactNativeApp();
}
function decodeSignatureFromWallet(encoded) {
  let base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  try {
    const jsonStr = atob(base64);
    return JSON.parse(jsonStr);
  } catch (error2) {
    console.error("Failed to decode signature from wallet:", error2);
    throw new Error("Invalid signature format");
  }
}
class TransactionHandler {
  /**
   * Generates a unique transaction message
   * @param actions Array of transaction actions
   * @param namedParams Named parameters for the transaction
   * @param origin Origin of the dapp
   * @returns TransactionMessage object
   */
  static generateTransactionMessage(actions, namedParams, origin) {
    return {
      id: v4$1(),
      type: "requesting",
      actions,
      namedParams,
      dapp: origin
    };
  }
  /**
   * Validates if a transaction message is valid
   * @param message Transaction message to validate
   * @returns boolean indicating if the message is valid
   */
  static isValidTransactionMessage(message) {
    return message && typeof message === "object" && typeof message.id === "string" && typeof message.type === "string" && ["requesting", "approved", "rejected", "error", "ready", "not-ready"].includes(message.type);
  }
  /**
   * Checks if a transaction message matches a specific transaction ID
   * @param message Transaction message to check
   * @param transactionId Transaction ID to match against
   * @returns boolean indicating if the message matches the transaction ID
   */
  static isMatchingTransaction(message, transactionId) {
    return message.id === transactionId;
  }
  /**
   * Processes transaction result and extracts signatures
   * @param result Transaction result object
   * @returns Array of decoded signatures
   */
  static processTransactionResult(result) {
    if (!result?.signatures) {
      return [];
    }
    return result.signatures.map((sig) => {
      try {
        if (/^[A-Za-z0-9+/=]+$/.test(sig)) {
          return atob(sig);
        }
        return sig;
      } catch (e) {
        console.warn("Failed to decode signature:", e);
        return sig;
      }
    });
  }
}
const publish2channel = (
  /* GraphQL */
  `
    mutation Publish2channel($data: AWSJSON!, $name: String!) {
        publish2channel(data: $data, name: $name) {
            data
            name
            __typename
        }
    }
`
);
class SyncHandlerConfig {
  constructor(config2) {
    DefaultAmplify.configure({
      API: {
        GraphQL: {
          endpoint: config2.graphQLRelayEndpoint,
          region: config2.graphQLRelayRegion,
          defaultAuthMode: "lambda"
        },
        Events: {
          endpoint: config2.eventRelayEndpoint,
          region: config2.eventRelayRegion,
          defaultAuthMode: "lambda"
        }
      }
    });
  }
}
class GraphQLSyncHandler {
  constructor() {
    this.client = generateClient();
  }
  async publishToChannel(channelName, data, authHeaders) {
    await this.client.graphql({
      query: publish2channel,
      variables: {
        name: channelName,
        data: JSON.stringify(data)
      },
      authToken: authHeaders
    });
  }
  async subscribeToChannel(channelName, messageHandler, errorHandler, authHeaders, timeoutMs = 18e4) {
    try {
      const channel = await connect(channelName);
      const subscription = channel.subscribe({
        next: (data) => {
          this.handleMessage(data, messageHandler, errorHandler);
        },
        error: (error2) => {
          errorHandler(error2);
        }
      });
      const timeoutId = setTimeout(() => {
        subscription.unsubscribe();
        errorHandler(new Error("Subscription timeout after " + timeoutMs + "ms"));
      }, timeoutMs);
      return {
        unsubscribe: () => {
          clearTimeout(timeoutId);
          subscription.unsubscribe();
        }
      };
    } catch (error2) {
      errorHandler(error2);
      return {
        unsubscribe: () => {
        }
      };
    }
  }
}
class TransactionSyncHandler extends GraphQLSyncHandler {
  static parseAuthHeaders(account, token, svc) {
    if (typeof token === "string") {
      try {
        if (token.startsWith("{")) {
          token = JSON.parse(token);
        }
      } catch (e) {
        console.warn("Failed to parse token:", e);
      }
    }
    return JSON.stringify({
      account,
      token,
      svc,
      mode: "dapp"
    });
  }
  handleMessage(rawMessage, messageHandler, errorHandler) {
    if (TransactionHandler.isValidTransactionMessage(rawMessage)) {
      messageHandler(rawMessage);
      return;
    }
    errorHandler(new Error("Invalid transaction message received"));
  }
  generateChannelName(origin, account) {
    return `transact:${origin}:${account || ""}`;
  }
  generateTransactionMessage(actions, namedParams, origin) {
    return TransactionHandler.generateTransactionMessage(actions, namedParams, origin);
  }
  processTransactionResult(message) {
    if (message.type !== "approved") {
      throw new Error("Transaction not approved");
    }
    return {
      signatures: TransactionHandler.processTransactionResult(message.result)
    };
  }
}
class ActivationFetchError extends Error {
  constructor(message = "") {
    super(message);
    this.name = "ActivationFetchError";
  }
}
class ActivationExpiredError extends Error {
  constructor(message = "") {
    super(message);
    this.name = "ActivationExpiredError";
  }
}
class ActivationCancelledError extends Error {
  constructor(message = "") {
    super(message);
    this.name = "ActivationCancelledError";
  }
}
class ActivationDeepLinkError extends Error {
  constructor(message = "") {
    super(message);
    this.name = "ActivationDeepLinkError";
  }
}
class InvalidCodeError extends Error {
  constructor(message = "") {
    super(message);
    this.name = "InvalidCodeError";
  }
}
class MobileAppConnect {
  constructor(mobileAppConnectConfig) {
    this.mobileAppConnectConfig = mobileAppConnectConfig;
    this.isCanceled = false;
    this.connectedType = null;
    this.WAX_SCHEME_DEEPLINK = "mycloudwallet";
    this.activationEndpoint = "https://login-api.mycloudwallet.com";
    if (!mobileAppConnectConfig || !mobileAppConnectConfig.dappInfo) {
      throw new Error("MobileAppConnect is required");
    }
    this.mobileAppConnectConfig = mobileAppConnectConfig;
    this.dAppInfo = mobileAppConnectConfig.dappInfo;
    this.origin = location.origin;
    new SyncHandlerConfig({
      graphQLRelayEndpoint: "https://queue-relay.mycloudwallet.com/graphql",
      graphQLRelayRegion: "us-east-2",
      eventRelayEndpoint: "https://direct-connect-api.mycloudwallet.com/event",
      eventRelayRegion: "eu-east-2"
    });
    this.transactionSyncHandler = new TransactionSyncHandler();
    this.uuid = v4$1();
    const connectedType = localStorage.getItem("connectedType");
    if (connectedType === "direct" || connectedType === "remote" || connectedType === "web") {
      this.connectedType = connectedType;
    }
  }
  getConnectedType() {
    return this.connectedType;
  }
  async showAppConnectPrompt(context) {
    const elements = [];
    let requisitionInfo;
    let directConnectPromiseResolve;
    let directConnectPromiseReject;
    let checkActivationPromise = void 0;
    const directConnectPromise = new Promise((resolve, reject) => {
      directConnectPromiseResolve = resolve;
      directConnectPromiseReject = reject;
    });
    if (this.mobileAppConnectConfig.remote) {
      requisitionInfo = await this.fetchActivationInfo(this.getActivationPayload(context));
      elements.unshift({
        type: "qr",
        data: requisitionInfo.qrCodeContent
      });
    }
    if (this.mobileAppConnectConfig.direct) {
      elements.unshift({
        type: "button",
        data: {
          label: "Open in My Cloud Wallet",
          variant: "primary",
          onClick: async () => {
            try {
              const result = await this.directConnect(context);
              directConnectPromiseResolve(result);
            } catch (error2) {
              directConnectPromiseReject(error2);
            }
          }
        }
      });
    }
    const currentPromptResponse = context.ui.prompt({
      title: "Connect with My Cloud Wallet!!!",
      body: "Connect My Cloud Wallet on your mobile device",
      elements
    });
    currentPromptResponse.catch((error2) => {
      console.info("User cancelled modal::", error2.message);
      directConnectPromiseReject(error2);
      this.isCanceled = true;
    });
    if (requisitionInfo) {
      checkActivationPromise = this.checkActivation(context, requisitionInfo);
    }
    try {
      if (checkActivationPromise) {
        return await Promise.race([
          directConnectPromise,
          checkActivationPromise
        ]);
      } else {
        return await directConnectPromise;
      }
    } catch (error2) {
      console.log("showAppConnectPrompt::directConnectPromise::error", error2);
      if (error2 instanceof ActivationCancelledError) {
        console.log("currentPromptResponse", typeof currentPromptResponse);
        this.isCanceled = true;
        this.connectedType = null;
      }
      throw error2;
    }
  }
  remoteTransact(resolved, context, namedParams) {
    if (!this.user?.account || !this.user?.token) {
      throw new Error("User not authenticated");
    }
    const channelName = this.transactionSyncHandler.generateChannelName(this.origin, this.user.account);
    const txInfo = this.transactionSyncHandler.generateTransactionMessage(resolved.request.getRawActions(), namedParams, this.origin);
    const authHeaders = TransactionSyncHandler.parseAuthHeaders(this.user.account, this.user.token, this.origin);
    return new Promise((resolve, reject) => {
      let subscription;
      const currentTxInfo = txInfo;
      console.log(`start listening on ${channelName} with transaction ID = ${currentTxInfo.id}...`);
      this.transactionSyncHandler.publishToChannel(channelName, txInfo, authHeaders).catch((error2) => {
        console.error("Failed to publish to channel:", error2);
        reject(error2);
      });
      subscription = this.transactionSyncHandler.subscribeToChannel(channelName, (message) => {
        if (message.id !== currentTxInfo.id) {
          return;
        }
        switch (message.type) {
          case "requesting":
            console.log("tx requesting...");
            break;
          case "approved":
            try {
              const result = this.transactionSyncHandler.processTransactionResult(message);
              resolve(result);
            } catch (error2) {
              console.error("Failed to process transaction result:", error2);
              reject(error2);
            }
            break;
          case "rejected":
            reject(new Error("User rejected the transaction"));
            break;
          case "error":
            reject(new Error(message.result));
            break;
          default:
            console.log(`Unknown status: ${JSON.stringify(message)}`);
            break;
        }
      }, (error2) => {
        console.error("Subscription error:", error2);
        reject(error2);
      }, authHeaders);
      return {
        unsubscribe: () => {
          subscription?.unsubscribe();
        }
      };
    });
  }
  async signTransaction(resolved, context, namedParams) {
    if (!this.connectedType || this.connectedType === "web") {
      throw new Error("Activation_NotActivated!!!");
    }
    if (this.connectedType === "direct") {
      return await this.directTransact(resolved, context, namedParams);
    } else {
      return this.remoteTransact(resolved, context, namedParams);
    }
  }
  async checkActivation(context, requisitionInfo) {
    try {
      const activatedData = await this.checkIfActivated(requisitionInfo, this.origin);
      if (!!activatedData) {
        this.user = activatedData;
        this.connectedType = "remote";
        context.ui.onLoginComplete();
        return this.user;
      }
    } catch (error2) {
      throw error2;
    }
  }
  async fetchActivationInfo({ origin, dAppName, logourl, schema, description }) {
    try {
      if (!this.mobileAppConnectConfig.remote) {
        throw new Error("mobileAppConnectConfig remote is required");
      }
      const sut = await this.mobileAppConnectConfig.remote.getDappSingleUsedToken();
      const response = await fetch(`${this.activationEndpoint}/v1/wcw/dapp/code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-dapp-sdk-sut": sut.toString(),
          "X-dapp-sdk-client-id": this.mobileAppConnectConfig.remote.dappClientId.toString()
        },
        body: JSON.stringify({
          dapp: origin,
          dAppName,
          logourl,
          schema,
          description,
          origin
        })
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error2) {
      console.error("Fetch error:", error2);
      throw new ActivationFetchError();
    }
  }
  async checkIfActivated(requisitionInfo, origin) {
    return new Promise((resolve, reject) => {
      const intervalId = setInterval(async () => {
        const currentTimestamp = Math.floor(Date.now() / 1e3);
        if (this.user || this.isCanceled) {
          clearInterval(intervalId);
        }
        if (currentTimestamp > requisitionInfo.expire) {
          console.log("Current time is greater than expiration. Stopping pulling checkActivation.", currentTimestamp, requisitionInfo.expire);
          clearInterval(intervalId);
          reject(new ActivationExpiredError());
        }
        try {
          const response = await fetch(`${this.activationEndpoint}/v1/wcw/dapp/code/check?dapp=${origin}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              code: requisitionInfo.code
            })
          });
          if (response.status === 422) {
            reject(new InvalidCodeError());
            return;
          }
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          const data = await response.json();
          if (response.status === 202) {
            console.log("Continuing pulling checkActivation");
          } else if (response.status === 200) {
            console.log("Stopping pulling checkActivation");
            clearInterval(intervalId);
            resolve(data);
          }
        } catch (error2) {
          console.error("Error checking activation:", error2);
          clearInterval(intervalId);
          reject(error2);
        }
      }, 5e3);
    });
  }
  getActivationPayload(context) {
    return {
      origin: this.origin,
      dAppName: `${this.dAppInfo.name || context.appName}`,
      logourl: this.dAppInfo.logoUrl,
      schema: this.dAppInfo.schema,
      description: this.dAppInfo.description
    };
  }
  openDeepLinkWithFallback(link) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new ActivationDeepLinkError("App likely not installed, fallback triggered."));
      }, 4e3);
      const clear = () => {
        clearTimeout(timeoutId);
        resolve();
      };
      window.addEventListener("pagehide", clear, { once: true });
      window.addEventListener("blur", clear, { once: true });
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          clear();
        }
      }, { once: true });
      window.location.href = link;
    });
  }
  async directConnect(context) {
    const callbackUrl = btoa(generateReturnUrl() || "");
    const deviceHash = encodeURIComponent("1234567890");
    this.uuid = v4$1();
    const linkParams = new URLSearchParams({
      schema: this.dAppInfo.schema || "none",
      dapp: this.dAppInfo.name || context.appName || "",
      origin: this.origin,
      logourl: this.dAppInfo.logoUrl || "",
      description: this.dAppInfo.description || "",
      antelope: "antelope-1",
      callbackHttp: callbackUrl,
      uuid: this.uuid,
      deviceHash
    });
    const nonce = context.arbitrary["nonce"];
    if (nonce) {
      const base64Nonce = btoa(nonce);
      linkParams.set("n", base64Nonce);
    }
    const link = `${this.WAX_SCHEME_DEEPLINK}://connect?${linkParams.toString()}`;
    try {
      await this.openDeepLinkWithFallback(link);
    } catch (error2) {
      console.error("Failed to open deeplink:", error2);
      throw error2;
    }
    return new Promise(async (resolve, reject) => {
      const timeout = setTimeout(() => {
        this.isCanceled = true;
        cleanup();
        reject(new Error("Connection timeout"));
      }, 18e4);
      let subscription;
      let interval;
      const cleanup = () => {
        clearTimeout(timeout);
        clearInterval(interval);
        subscription?.unsubscribe?.();
      };
      const connectToDevice = async () => {
        try {
          const re = await connect(`/device-connect/${this.uuid}`, { authToken: this.uuid });
          subscription = re.subscribe({
            next: (data) => {
              if (data?.type === "data" && data?.event?.accountName) {
                this.user = {
                  account: data.event.accountName,
                  keys: [],
                  isTemp: false,
                  createData: {},
                  token: "",
                  proof: data.event.proof
                };
                this.connectedType = "direct";
                localStorage.setItem("connectedType", this.connectedType);
                cleanup();
                resolve(this.user);
                re.close();
                return;
              } else if (data?.event?.error) {
                const msg = data.event.error === "ConnectRejected" ? "User rejected the connection" : "Direct connection error";
                cleanup();
                reject(new ActivationCancelledError(msg));
                re.close();
                return;
              } else {
                cleanup();
                reject(new Error("Invalid account"));
                re.close();
                return;
              }
            },
            error: (err) => {
              console.error("Subscription error:", err);
              cleanup();
              reject(err);
              re.close();
              return;
            }
          });
        } catch (err) {
          cleanup();
          reject(err);
        }
      };
      interval = setInterval(() => {
        if (document.hasFocus()) {
          connectToDevice();
        }
      }, 500);
    });
  }
  async directTransact(resolved, context, namedParams) {
    if (!this.connectedType || this.connectedType === "remote") {
      throw new Error("Invalid connection type, expect direct connection");
    }
    const completeTransaction = Array.from(resolved.serializedTransaction);
    const encodeTransactions = btoa(JSON.stringify(completeTransaction));
    const callbackUrl = btoa(generateReturnUrl() || "");
    const deviceHash = encodeURIComponent("1234567890");
    const transactionUuid = v4$1();
    const linkParams = new URLSearchParams({
      transaction: encodeTransactions,
      schema: this.dAppInfo.schema || "none",
      callbackHttp: callbackUrl,
      redirect: "true",
      deviceHash,
      uuid: transactionUuid,
      broadcast: "false"
    });
    const link = `${this.WAX_SCHEME_DEEPLINK}://transact?${linkParams.toString()}`;
    try {
      await this.openDeepLinkWithFallback(link);
    } catch (error2) {
      console.error("Failed to open deeplink:", error2);
      throw error2;
    }
    return new Promise(async (resolve, reject) => {
      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error("Transaction timeout"));
      }, 18e4);
      let subscription;
      let interval;
      const cleanup = () => {
        clearTimeout(timeout);
        clearInterval(interval);
        subscription?.unsubscribe?.();
      };
      const transact2 = async () => {
        try {
          const re = await connect(`/device-transact/${transactionUuid}`, { authToken: transactionUuid });
          subscription = re.subscribe({
            next: (data) => {
              if (data?.type === "data" && data?.event?.signatures) {
                const signatures = decodeSignatureFromWallet(data.event.signatures);
                const result = {
                  signatures
                };
                if (data.event.serializedTransaction) {
                  const responseTransaction = Serializer.decode({
                    data: data.event.serializedTransaction,
                    type: Transaction
                  });
                  if (!responseTransaction.equals(resolved.transaction)) {
                    validateModifications(resolved.transaction, responseTransaction);
                  }
                }
                resolve(result);
                re.close();
                return;
              } else if (data?.event?.error) {
                const msg = data.event.error === "TransactionDeclined" ? "User rejected the transaction" : data.event.error;
                cleanup();
                reject(new Error(msg));
                re.close();
                return;
              } else {
                cleanup();
                reject(new Error("Transaction unknown error"));
                re.close();
                return;
              }
            },
            error: (err) => {
              alert("subscription error::" + err?.message);
              console.error("Subscription error:", err);
              cleanup();
              reject(err);
              re.close();
              return;
            }
          });
        } catch (err) {
          cleanup();
          reject(err);
          return;
        }
      };
      interval = setInterval(() => {
        if (document.hasFocus()) {
          transact2();
        }
      }, 350);
      return;
    });
  }
  async cleanup() {
    this.connectedType = null;
    this.user = void 0;
    this.isCanceled = false;
    localStorage.removeItem("connectedType");
    await closeAll();
  }
}
class WalletPluginCloudWallet extends AbstractWalletPlugin {
  /**
   * Constructor to allow overriding of plugin configuration.
   */
  constructor(options) {
    super();
    this.id = "cloudwallet";
    this.translations = defaultTranslations;
    this.config = {
      // Should the user interface display a chain selector?
      requiresChainSelect: false,
      // Should the user interface display a permission selector?
      requiresPermissionSelect: false,
      // The blockchains this WalletPlugin supports
      supportedChains: [
        "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4"
        // WAX (Mainnet)
        // 'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12', // NYI - WAX (Testnet)
      ]
    };
    this.metadata = WalletPluginMetadata.from({
      name: "Cloud Wallet",
      description: "",
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAIRlWElmTU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAGCgAwAEAAAAAQAAAGAAAAAAWgkyTQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KGV7hBwAAJUlJREFUeNrlfXmUZFWZ5++7977YM7MsgQZEWtm0CkcQEBFkyLLP6RlBUMGsKkXRnm7EXQsdzsw0DoFLnzmoxcy0fRy7VaTwYGUWiILgQe2TiY6jjRQNDmArAm0BUgJCZUZmbO/e75s/3nbfi4iCzMrCZRLixJqVEb/fty83CL8nP1Mi+lhAmkScPPY+kecHWDwuBB1PzMc5oiNBchgzXsiAciIQAAyARdgJHnaQR5yTB5zI3SB9Fyrq7hto/LfJv9kUUfcCtIPI/T58bvpdv4Hm7Kxpbthgk/sfks7hAnumgjqTRU4j0msNKhAAFg4WIRyHcBHoEABOBAxAjIHAQBDAAej3WwhD9xRDfsgitzijb/lede2u5G9Nzs6aOe9v/39FwJSI3gEwiAQAPixLZxHkAgGdVUKtLgBC9OAkBADLAARQDCEWEAOQGHgnEhHCIgyIFbATAbMY1hooV8EQdOdbSxZys2Xa9n/WHngzAECEpgD1u9KI55wAEaGN3ge+WNrnicglhqonKxD66ILhHCQCXCAkEfiRlEPAEpud5LYInAAuvu9YYCW+LSKOI0IcKS21Gmw/RNhu3+4cX3HHnxx6faoNk5MuEYg/SgKmRLQH/CkifEVA9dMBIJQ2C0QAKAAp6BKDPkhARkRighxLpA2C+BLf5+gxKyKOha2AUKkqB0J/cfEHInTJTw8++MexhGg8h9rwnBHQFDFNItsUKc3z0qdJ6Q8aVBBK2wEEAetUS7zrPPjRfZcjIJZ0CCwjkfqMCBZYloyQ5DbgLAukWtPh0hIcy5V14NKdhx7ahogBkf3jIMCzsR+W/gmQcFuFasd2pQ0ADoD2Yc+Djxh+T/qBAeAz0BOQo8dTyY9NkuM8CZYFLOKcQMv4BMKn99wHTW//5aGH3gkRDc9H/UESICIEAEQkH7CLFyiFfwioXrLStjHwlEHu39qL+YkJKGpCTuILZKQESKQlziMjIgHiGJYrlcC12/3QuQsfPeJPtyF+//uTBLX/TE5TEZEQkXzALV1a0rWriXQplCUnEAMI5SEvAo+hxOyVrDgsze5noaqkxCF13NE1wCLkIIFttx0rVaJa/epDHtx1KYgERIJmU/1BaUBTRCUJ1Qfc4mfLqn5xzy0JEQQEtbc/KjkzlAeUE22IJd8lEVCcE0SSnpmZRNpt/JxjxKYofh17ZinTIGYRwtgEhQvzW5888vCPRB+qqdBs8u+9Bvjgvzdc3Bqo+sVdXnKxvCuRQQkfJfnDJD4xP1KQ/ES6RbxLmiVnUi9x5CR+KIvMfLFAsQDh/LyT2tjFa37+r1tjAnh/aILan+CXTH1L17WdSBZaIv7wewNdhkh/5o6zf2OQiOx1SaImMegp4Fl+kBGSPJ+ZJmIW5VotJ2NjW8Z+tv9IUKtp8xPw3xUubDWmvqXnlpxAlPjg5wAcfsGIx32pTl5UfL0Pck76U2edSLrktSJmyfMbJCKKW4tOGmNbqvc9tF9IUKsHfmQfL+wvbC2ZsS09u+hERCV+ZhjgkFHgD+pELiqSzB+k5sez4yLZ43mHK6lTZgF4SH6QJ0ZIWJRbbDlpjG0p37P6JKjVBP8v+wtbgyAGH1CxFHlgDUqrj/Uw01OUfogf4fhRTfaPsK8J3t/OzEz+tmPfT/hmKoqQwKKk1XLSaGwJVpkEtVrg/0V/YasJxrb0wkXHgtTsZKBJKr0DpkYG7XzR3o/MksXTivg250xMQkQCaKYJnFZUJY2y2H9PmY9IzRHXG1vKdz2QktDcRxLUaoD/9m4CfstxbHZY8pKe2e/IMWZhZkLMKMkXjygZiPeziCYjwU/WWKJSqmNJIx5PuiNnzANOGM6LmOLfIYEovdByvYnxLfhpREJzH0nQ+wr+29rzW0uV8S1hr+UAKIptPhEgSZpBIzIP2kvISaMctYBjXgQkLBCv+EbOMx/Or5TGpsZ5ERBz9liqFbFvSAVGstuGhfoKCr2+vfA7vzrtnIUzJuYe+eatc3Nz0kRTzWFO9jsBPvib2/NbS9XxLf3ugosSrDhnpyLABCkAL8+ChIIPEAKcgABSiowh6IDEaBIicizkRJiFnBMhjrUwATwtT6fOFjkzxF7+wL7Gxa8NRNBTBAjJX9348/4Lv/owmRc/77RTj3j9xPfvv+HWOayMBL1S8Dcuzm8t1ca3hN0Fl5SQkYh+doVMCSi9LUOAJxpWZhAkgY7SWhnVUKIUOdcPnXOPW2d3udA+Ya1zVqSCSsWgWlNhGJJz7KwIWRFKnW2aNSPvE1CMlDIzx/DBh/zljT/vHX797kp4REm7fugqpnbqa446e+K2FZLw7EsRXip+3uL81nJ9bIvtLDgCKYrxoxjjyA5R4X4CNKV/mHwLRcMyX3FQSmvU0XMLewS40QLfdhY7G+WlR4FDQgB4DI8FsmBe0Aed2GN5XSg4R+qNNb2FRYTOOceiw7j8wHF52nqlCh7IDbJum2FBP3qjMfiPlcMXlYn6SXgBLpua7tulKz9+89svBoAmmqqJZ1e2oOWC/4aFp7eWxya2uHbLEUQRYgZiwFVKBMEnJb0ukOApRvFdWa2qxnKnx8yfcb3e577SOGj3s3m7r3z88YMF/H4r+KgtV8r9pbZ1LMZyvgrqV0X9zlqSQxgW9FPJ/0UMfikB35cVrpi67tn2lR+/+fxlkUDLAf/shae3lsfGt9jFliOCUjGWvtQrD1QVI6w8SU9v+8AT5X0zwQaqYfq8cCcr9Y4v0dg9SUftCczRJCa5OVjBoMm5OXXg5KQkXbeX7979spD5aldrnNBbaFlOSIiBZ8n6BCKSc9rBUPDLRP1hmJIQEVdMVXfD5ZFAz9RMSfzqmfO/3VoaX7PFtSLJVwQiygD3JX/wsYgpQl4bkDNNqa+wJd0wPdu6Tpmxt/49UdgUMcDlnPifZyM0k5ddpuaI7IkiwVO7Hr2Wx8ffHD69YK2w4bgqykPKEm6k5A+CT7kojyJNCGq6219KSRAIEUb3E2iv4MfNiH8///Rng/Gxi91CJPmJzVcxyIiJGDBB6fPZ44lG+MB7/tqWzJjpu8XpL5qxzQAwKWLmVtge9MdODn3oke0yNrYp3LNgmdk4eBERZ+1Nw4IeKUBkKPhEBJFhfotSc1Q1Nd213a2Xf2vzR2ICRrU1RidiU4ACkfz5009eqsfHL+7PLzgnoliEsoTIqzrCS1z87BTFEkA+G/Zu28CMmZ4H/pSIntuH3uzchg0WMzMaAH794sM22z3z0xgbMwyyfg0pQSeKdlTscCPwbQx+zndRPsROA8Dof9VzHVcp1S5uvv5rlxJIZqZm1LI0IJG6DU8/eUFQrV/NnbZEEk9ptJNJPOUcrYrf5KjnabiTtqUgkvyrYvD90vYq9EYV4n/reffv2s6NsU12z7xlEZOEoYYFXUUQhvzVN3/RO/zrQx3uUNh8+CMySRSAQJcptL13NL+1eVtzctY05waHwGjU6Mhr9+w5Qdj+iLQpkXMcm57UlisfdA9MVQA3fV1CBGVJQyxRtlIaM2G4OH1VaT+AP4SExs9/tZ0bY5t4zx7LIKM5ivM5BX932b6oRBjucAeBIxriG4QVacUifcf21E/cfP7OmakZvXHHRjeagNjpnvjrX9dq5dJPTK22XtptR0Q6F8EUpFuNIIZie5/8nu8vIjZhK6Vx0w8Xp7ftT/CHkFC976HtPDaxSe3ZY3uKDEsM/vVF8Gm4xBINJYf8VxLZki6b0PXulTJOaO7Y2C865Zxtmpyb0wBQKQefVBMT6227EzKgk9qJK9juYmEr69NmHatc+dcrpLHABqVx0+svPDfgR6AxomIhOutfvFktzE93nrfGsEiYgB+m4FMKaC5/SS4e5Nl/SJ+PBdKErmcrQeNYdOnTALBjaocaSmhiel61+7enKCM/gggUkSSWTRVDTS96UZRPulThNVHYFN+XKM4vVyeM7S5MX1udeG7AH6EJ+OmD0xd97+GNh335wbB/TCVIbD6NStELch5XHXMvy+sBiQCkSIEYr770pvN+PDU1o3fEpihlY0fSH1HuCqrVEDWJhNjrq2b1E0mzR0G+kiiFwSkujoEA1lQnTL87/7sBP9aEZqwJePkRmw755q4Z/dK1AfXFpiWSfKhTlPNM0nNBhfc8KMlSiQguMGWwkisAYMeOKc6ZoMnZWQMiOek3vzmP6o3T7eKiY0Cz33VCBnoSWrrksWIv1uvD5jtXYnVtwnQ789Pbq2t+N+AnuRoRN5sRCc3b3r6p212crpbq8UjiEKeayyJpmIFKQU8u3uM6tF1XNtXTP/nG684DSJqTTTOgX6/Y/Zt/MrX6yeh2XDyal3O2fjlhsNg2JBKKzVZsgmy5scbYpfnpbzR+t+Dnk2ZRzWb0Hppnf217Oahv6oZtC4gpZLqD7piKERGhaI8oLRKTM7qsQ9e7/WPfOPdVqQZMxUAf/9gTZ1GlenLYXmLHotmbqXGSl/6ciSk4Yb8NiMz5Wt0YN73Fp3+vwI8I8DThprds7oVL09WgbojIJhKVmhYiEKn4QvkUrGB6Ui2ILwLo0PW4pMsnf+rc688CgJmpGa12xCmyg1wgJoCAOBp4lSFjfZFJyTc0MjPkvBlNb2zcqrEJ01uYn75pbO0+gy8iNDMjenZWzB1fuCO44wt3BLOzYqQpCvm2z4pJ6IZL09WgYQjKpjDToA5kYGOU6fHoIRCItTaAqAsA4L5jp6I3fOyvnzqc0L8PWtfBLMrz/+QnUoVsVhHlml/Keyy+bYM1E4bn56e/s+b5+wR+s9lUl62/jGjj3mf3ZUb0M73m2Zijy98ws72amiOYYVXbvOQ/U55AIECIFAlkSWu1/j/tOHsXAcD6R37zbjXe+LwsthwATZ71GqznU6G2nz2uKPMZSpENxseNW1iYnl27b+D7oN47I42umT9Z2P0bAGsZcAQ8QpbvOmnzgXfGv0HSBFFzJURnJHziDddtLwe1TT2bJyHpqRKKNaERoWr+GVcJaroTtt9z6Q1v+F8EAC99dPeNqjF2Ni+2nIrblD6wGEIEMNiESes+RDYYaxhuLV73gwMOmFoN8O+ceexACcofFZa3am0Oq5ZqMMZABOj1umh3lwDBnWD87clvOeArADAzI3rjCrQhR8Kbduwo6/qbe7ZrQTA0rCRBw52vDCVEXDmo637Yvuk/f/2cc+iljyw8X7D4C+hgrTgrqbXzAIfkS8xF6VexjYwiHnKqVtXodO7sH3DAKTuJQn81aTk/CYD//I2nzhShL4/V1/xJu9OCtaGwgAHiyNGzBqDKQRVGG7SW5r/rQn7baRcc/Phsc9ZsaC5/EzJJlr7wrjuCJ57Y9eOSqZwQul68UELPUB8ir1k2oBlCpIiFn4JUj6EjH9n9WqXUP8K5aBFBhPyQ0wcdhVp/QoyXIYvSiuBcHwhOvOPgtfesdBU0kfyd1/92kwlK24kU+v1eCIiBxMUUv5wc6ZaDgMfqa4L51tP3sXMbIhLEbGguv6ydVDA/9aavvwxEO4lUCSICHyEZMmAASofJiHwqKJ62ESLSEMKfKWE+HvU6okWSaCPRr90wsjoQA2Bvxp69GlEcATFqdTDk03ccvPaeSZEVgT8Tg3/HN558ldJ6OzOj3+86QAIf/LTHIWmEpEUkWFjc069VGuuJ1NwPt+0+aEOT7GxTzLIJmNtgm5Oz5q9vOPceCH26EtRApJj8UDNqDUKRSi8ohqEgqLgGLJHI2oqpgViOVyI4josje8niczHOj/MB8fMCSZvc4pTSvfmFPT2lPgcAc5dfvoJQU2jjRnIzM6JJ9OfLpQocO5sboZFsZFG8YVxkt0vtzmJYqzTWQeCRMLtsEjB5GwNAYILP9W13j9JGEymJ+lVJ0a2QDfsEZSWJtI7nPXaccsCRrtdH1O0qjnhLru7jCiPfVrLdKwYc6g1Y8I33HnTQ7ikRvZKNktlmVJE9sjT/5lql/oqlzpKDiEkSkmy8XQbGrNOBx0hIgqX2Ylgtj61zVmISNiybhGazyTNTM/qSHWfthlI3VoI6iJSLwm0VXWKph58DUJ6MXDBPUI4tiOhIJSwvdGEIiQtvjrNp4cS0SDLOl+7hyuB4H4uy3R6cpW8DwBNzcytKim7DZFQUdO7N8ZsXeCVw+NKeAp6OcGWj6SwQSBBpwtg625e5H35+ZSTc98SBsZdV32axIAWVZsOUmKDoQoqgFMURIWWZNOXuE8MBwAsVEx3GoY2HT5O5e8mbo0zKc/3ddFcLIhakwqV2aEntBIC5225bfsgpQs0m8R03/boG4NRurwOIaPEk3e/hwtt+SW4nKpztCEjQbi+G1XJjXV/z3K0rISE2Q0rrnZbDUJFOFhAHbD15GuBnxrlqKRExMwjqMMUiSvzlt8KsvPNKD47z0u+vhrJSsMCTXW0fBQBcdtmyB1UvvzyOJ5b0IRAc4JzLzbKnGhDbwQx8b64z2bcXgXC6phS0O4thtdRYp8Utm4RmM/osE43eo0T0pFYmXxMqaEPO/ntkZJXs9DGl0ppP6nzzki/e/HxSfi6SwoCIUnAsTx1ySDQuuJKfy5IblaAm0Uy+NySbOVl4UxnwnktiP/FMkXC67RKbo/o65ezKNAGHhET6Ka0NSJFEEZBKo6CsSOc736IpUrkqUbq16CS/dTJgaljSbRJfE9L1T47W3vfl53JcDgAIO70WETEReaDml/B8s5NbxuOEkChiSO5HmsGxJtTXodebu/XTv1w2CSon4ZkGZEB7DpnypsfXmDQ8zbZEvGvOdm/9aqc/uu1HRU6EnHVwzGsfe+yxYMUaEJst0fY3IvIEkcrsuifR/vaK8JDHvNBU4iRNON6ccRIsdVphtdxY55RZJgmPBUqptQCgSZNKNMCT+MT5UiEcxdBQNdrb5YFZee9aClFQYqqSRCzJCay1cE4OCDvuBbFBX3YUREQiTVGnbnxhRwQ/rARVxDsXyJ0l4YWgObC9VZxEYxMNEN8ncEZCKHru689AQrMZfZawu+YwUuqAyKwr74JczF/sBSDnG5LPqkBErETkEdEBWCC5JYUhS20O+UW25CQSZiF2jqVSDayVEwEAZ5yxsrWd9fEcn5PpyAnHk3g8GO2It7nnb0bKwIeBD34kSIyg3WmF1VJ9nelj7yTMRZ+FDL2yUqoHIOJoSk3FJqngjItagLzZUqREKwOAHlECeVi0BouIyGD4yV7UI4VM2e+asRBzqQQHeV0Uuk2u6ICLuOxMr3rLATe0u4vfr1UaOs73YmnORztJkyhxXgkJiE0pZ044NlnINMRJsNhpheVSYx06PPf15nAS1h/4RLxTov480EEkuTHYWZdMJxOzkY0flSlHV6KVAYEeVo7lASmVEC+SeOfyDK50usJ1NukgYGFtWy0wcE793ocOBpFb6RpncsqKWPWepU6rrZUxAnGp9eF8lCNOUjufv2RSL55D9l8DRtDutsJqUF9n2Q2Q0Gw21cYdG93fvfP2g7XW5/RdDwpKDw0704saKEVQftKIjS5BCA8oAd3tj5MUz1rIH5RRDFNzO7XE1jmuNdYI0ftjr7oiAoiIZ5uz5pS3Pf8+dtgUyZXSYHC2bCwZoInP8kBPB4FzZEk+Yoq1RBjBUm8prAX1df1+f27bR+8+aENzg202Zw0QmZ9SRd5fLTfWiLCj2PzQiNDTv0YaIWUli+Q/BXU3Nf7lX19L2vyjsEO0Vy1+9OdJZaHMjfxGOyW5kYrK0UL6xP76w+/B7KzBCk8mTGr5P/rq45uUMtudc2DHLIAS5qQEHdn1XAiaABsTgkzi2deUlLT4OSdhyVSDdqf1M8tu8oLPHPc4AHzx3T95GUA7BSixdcKI/BJ8cuHlKX5tystNskEtISIFZv4zRWLuZuueEmX8scGBXEDgSQ+ygy4K5onEsZNKtQRxV+MOCeCNiC/3JzEFr37bQdNhaDfHWwhKnLDvC3zHGwOZNzupiYqlZAj4saYEne5iWAnq65So265+38+eH5cgrimXqiUAkfQXMtx8TuANqnstzET6BYBSBsL8VBBU7iYAqP3Lr25EfexsWWw5AnRua72wpU5eYSxpyvhnPFA042vRqBtZbF1nX3bE1MA44LI1IWqo/O+rH9+koDJNSCq4OdteMD0FE8RD/AMnpImAmSFObCVomKXOwk+csw9XTOPcdq/lWKCj3+Vctp1FZpFg+hKfRmnJ4jPEVYK67vbbN33o2tPPiWy0o1sEvmQXjnjBkEWL3OhK8egXNtxqWWmMv1n/34e2Fwdjl68JUUPlNe84aDp0mSYwC3vONMuUGUPBzyVtKDjjXFhLpt1dcEaXXlkJ6ud2wjYDpLOzF4rFtUJEBP/a66yTN0lBcks6migVcwu3FpeElPbqW5kGeHYuM0Xe8QOSHQ+WZNMAjCwsWBkb26TufnDVSDjjPxw87ZzbHH1AFZHg2XweFg257DlIzuRkOQVyDZ1onND1uRd2XNR19aeeC+MoUugOExXMTzo3Ikpp3bVLS9AqJkBEdY48dJcAN6NWhwg5lrxzSQ/FGBodJTu1mcp5M6VG5udXn4QLD552NtwcJzUpCb5zlWF1Iu+Qpux13nEEScEvTfqgANJSPEFkaHbr+QU/4PRIIJCrmBoI+uYPbXvNrmZTlMoUQ7ZJGELAKl9RHAQdXlImnPkKvzHiVc+MtOYtj41twl2rR8KGd79g2jq7mYSgQIqFeVSsz/EFkmmDeNkxCkneMMkeHL0q1HVy42tIHXNhdEg5cQBkGwCsv7cwvhXc8+A/oVo7WbrddDjXPzYgd2yMFN+j7P3ANxGL8QmDVmsaxx+xzyOKiWO+9b8/ukkp2u6cg3OOwaIkPQGlYG64YD6LzyX1LfZK4Gn9Kx/mZpol2XE8uZK4j5kAAheYiu7bzu0fuObUV+U3ZGajrI+hrmBS3vai5KqMOeH2wRd55lP4iAxa8xZjY5v0nb/cXhwRX5kmzJp/9+EXTDNHmkBCmTnyo55ipZQL4HtmqngGWnTlTcIVjnuhQv83PzHtmSdCNDEh6opk5CX/r8X7YfqeB7+Pav10WVpyoHgSYRi+IqOlfdQT0bGJltesMVjwNMGbRFtpsnbLFQ9tAunt7BwsOxYWJS4v7fD6xRhSRR2InFJt4MLkhQzcTwN3kYL0AxBxZVPTvbD9g/ddc8q/jYaIo153Jn07ot0lp+gS6XYAgvabTT7wQ8EfdeakpzJaBFopg6VW/23f/9Wm5uRXtxenk1earJ15yYunnXWbAQVwlKylvBf8wSDAku8f5LRBvKHreNxQ8rOh6f6w5PvCseMVEOm+64I0LonG0rM9seKWpAaRU3c/+D9kYvyDmJ+3IDLLk3gZ+rgWgVIKoSY+/3sPLbzkyw/XgmOeV+r0Fqc//q3zV00TvvHJX24iUbFPYIZXtkhNNOero7mZojiPSEocftuz2IXzcRli85PQNqyVxoJ2uLj1vV955UdmpkRv3JGNaRaljgGATec/YqF1L2o1IyJ2APyhB37mjOZewT/mmofH7VHlUqe3ZKtBY1Pz7K+tmia88dKjpm0Ybo6lVDnHnJakWcCO0zJ1Cr6vqP6hcX60MXAKlXctwyIlAhHZUlAN2v3WvfY3T/wXAJjagZyAqUIZUiCiceyxfYF7h7TbfShtEmL2bmaGPzcMfPenZYVQQIDp2iVbDuqrSsJ5H3/JtLVuM0AAQzEz52pEfgSD/KGBRcvpT2MMKna2sEfFoXQiVtCmb7t9gN/xwW+f2ZuZEl08uEMNqQU7zM4avPyonYBciFIpMX4y0r6P+BkNPvvv33TDJVsJ6puaZ29fNRI2fuol09bazfCjIxZvrAX52lDOGQsGJvFGCODgWUex3Rcho8sQwYXvvfqUnc3JWeObnpG/X/QHuOuXl2Js4hNYiM6FS3XuGfpdOfC/+9DCMV/1wfePNUtlx1ZKddPrd6Yvu2njZn9EfF98wjUfuectmtS1jh2ERYiI/BLEgP3OPVd4DH44Ll5wl2uNCgCulcb0Yn/hY++96qRPFu3+syUgOzv/rgc+i8bYxVhsOUBUdhziCPBZoLRCqCLJP/qaXeP8okom+f5WOfzz5MjWgobp2c70x7755s3+iPhKSLjlA/eXz/zbo3tf+fDdbwlUcK21oUiyOeGdGugV4QaTKf/A2KGg5+r+IhCuBg3dCVtb3/3lk+LjaqIYaXkEeLkBAOCuB7ai3tiCxcWIhIEIarjZOfqaXePuRWVFYWFfJC/9XgFL2Wqpbnp26bqDDnzxWy/6+5PC5uSsweRt3HyWw77NZlOdgTPUhuYGe9U7ZyvSmPhCoEsXWLYc1b+Qc6C5sntxCg8FbUC+6ZKrOEO4WmroTq915UVXnbiPBzZlnyY7N/+f79+KxnieBBlt84++Zldqdohor9LvF7KIyJaDmunbzp0Eesdf33DuPVH8PKPve+JAisjIjz42m5cT5s5Q6w98QpITSb747p+8jLS6ul4ZP6HdXZSsKlwEnryJa8pXVgaSqkIFIJZuEeFqqa474dKVF33pFRcngvBMQrPsQ/tSElp5TRgFvoScrjANJYCGVw4BsqWgYqzr90D0mUAFn7tkx1nP6tC+v3vn7QebkrxfafXRclAt98OuA5GmwQNN82do+jHFkLpXQeJ948PVYEx3wtaywH/2BAwjoZ5pghahUZKfgTwIflY1LJRx4wU0RcoRKV0J6ujbzh4AN5LW3zGQn7Ta/Ig3hxp0+0sv0KATSanXaaXOqZbH1/RdBxBx8cxIztwNxPAFIopLOANhaDYtxpVSQ3f6i8sGf3kEjCBBtVpOE3RoNJ//vQcHwd+b9OdsPxXNUHy2EAkpYkVGV4I6GA6Ww5CIniSipxRpkFJrlVIHlINqUDJl9GwHIuwUaZUc4TXQSElOORHfFyE/ZjAS/JQBrpYaur1C8JdPQIEEtfP+rTI+sUU6i+H5331w6eivFuL8nPQXqoO5JIa889gKh16AQEqBoAREjghKK6O0MtDaxENQUdOIFDERMUHpaHQka5YjV6/JxeyeraERNURvDVWyClM1lvx3rRD8lRFQ1IS7Hvzs+XMPXXzMl34V2iPLAULJFWuLi8w0zPn6bTtC2mPNzdmoXL9V4gU5IVKIFlYUiGLQSaXLc0l/1tt4HigZD/gEohEZP60q+MMz4WdHQPLlBYTjj/jI0dfu2mqOfl4gYdTuGUUvjeI/5xtH7Zj7u7OSiK6CxN83KUz+981gYJJavPkdGRzsHVV7QKEVuIrgr5yAmIRms0kQoebtf/GRTm/xyoqp6WysqNi4GCxkFSWQRlVZ/WVbycrBmR+kXE2qCKw/QZeRwR7ofkEuP/wr+ZPEVxV8YIXfH5AODc/NSZNIzc3Nyffvv+HW1xz1+omyqZ/q2DLlDOxenO8w8+M9PrDyM7Dqo9LVz6L++NYvH4cNeT9Dul2e+OxztLO6PqCoDN4Zyf/1rGu2VkxjS9e1XTQY6Y/E5D88YdDxZseAZRNlOVtOWcM77xe8wdiBqbU84fCdvg++fyRNli0LCHF5YWlVwd9nDUg1wTs3/7b7b7j1tKPOmaiUaqfGqT9RFv5g4PydgiYUxjhyszhE+ahp8AgdGpD4QgiQi8q8GtRQTYj7XnF5YenKi768uuDvmw8Y1AJuIhpH//jN51/c7bevrASRT8hqITTEJGDkkJOMUlEa0Y6QITXkYm3HHzAAcucn+wsflCZZ9SjDvWr1wV81DRiuCV+/9bQjz56olOqnOrEsqbVGfnOc/PxAefeL4akqmCgM1Zh8TjHsuwqGHDhDxbOtEoc7prt28cqLvnTifgF/1QkYRsJrjjpnvFJqnGbZRh+Mct+hMQRwDJqg1Px4R+EXnLH/ej+/QNERU9EMDuQoDIBqpXGVlJT3F/j7hYABEn5x/XdOP/KNrmTKr408mjiKnLOnCcVCHIb6AKQOdzBj9gHN+ZQh1dacQ845Z3FaaR2YMnXC9sfec9VJl+5P8FctCho9CSSJPEvz9dsvgKJ/KOlKyXIvhJBJ0Bk6WxmdaVEoVQwBf8BR01CHnjldVfg+G0pOt3XloGpC2+2z0IXvu/qV2/z3v78wUvuTAIpT1pmpGd381uZtztlTQ9e7t2IaQWwHHIaVA4aUxkY2lWjUZMLgYIMUphziRM4JhGqlMdO33XsVqVe/7+pXbosa6PsX/P1OQILDxh0bXXNy1nzi5vN3PhnuPrEbtrcSCCVT1RSR4FAoUw8tVQz7qqXCDvFAPV+K3ZX02yodIK5kqppIod1f+J8HLNVPuOiqk+7MGuj7F/z9boKKP/75+Z88+/pTWMkVZVM9XQBY1+Po+97iie1CWXrAIePZPK+8laFkSk2YoKhkqophX6//QPS6pL3fuWUH0fvcXQD/Q+egMQv7JjaoVIi3njdeQJ1SUmXT9baoG97ELCLI5X4SztG+wBgmLP2hsVJRYMoRFCkdTmogdkhdP3bodQVH7j6lOsT4Kd2+DnLHykByU80cjLFiZp/6tzrz4KoC0DqrLKp1okIoetDhAGQjR2pIiRbckOdtkRaFB/0ATJaGZRNBSBCN2wvEehmgLZ98Kun3ZzUmGc8gXiuf35nBKQZ9GTTNOea6djJf5u66XBr+UxNdKYQnaZIrY2OCSNYF0LAYHYYJIBglIFWBkaXQKC4MyZPkcIPIXQLtLrlQ9tesyv72ysfefmjIcD3D/cdOyX+cO7fvOl7zyfTP45YjgfhOCI6kkCHgfDC6Av8chrAROphEjwiRA8o4G5A3xUElbvfv+1Vv82q6KLW3wt6Lu383n7+H45sFZym2mugAAAAAElFTkSuQmCC",
      homepage: "https://www.mycloudwallet.com",
      download: "https://www.mycloudwallet.com"
    });
    this.url = "https://www.mycloudwallet.com";
    this.autoUrl = "https://idm-api.mycloudwallet.com/v1/accounts/auto-accept";
    this.loginTimeout = 3e5;
    this.allowTemp = false;
    this.mobileAppConnect = null;
    this.options = options;
    if (options?.supportedChains) {
      this.config.supportedChains = options.supportedChains;
    }
    if (options?.url) {
      this.url = options.url;
    }
    if (options?.autoUrl) {
      this.autoUrl = options.autoUrl;
    }
    if (options?.loginTimeout) {
      this.loginTimeout = options.loginTimeout;
    }
    if (options?.allowTemp) {
      this.allowTemp = options.allowTemp;
    }
    if (options?.mobileAppConnectConfig) {
      this.mobileAppConnect = new MobileAppConnect(options.mobileAppConnectConfig);
    }
  }
  /**
   * Performs the wallet logic required to login and return the chain and permission level to use.
   *
   * @param options WalletPluginLoginOptions
   * @returns Promise<WalletPluginLoginResponse>
   */
  login(context) {
    let promise;
    if (isAndroid() || isIos()) {
      promise = this.showLoginPrompt(context);
    } else {
      promise = this.waxLogin(context);
    }
    return cancelable(promise, (canceled) => {
      console.log("[login]canceled", canceled);
      throw canceled;
    });
  }
  async showLoginPrompt(context) {
    let directConnectPromiseResolve;
    let directConnectPromiseReject;
    const directConnectPromise = new Promise((resolve, reject) => {
      directConnectPromiseResolve = resolve;
      directConnectPromiseReject = reject;
    });
    let webLoginPromiseResolve;
    let webLoginPromiseReject;
    const webLoginPromise = new Promise((resolve, reject) => {
      webLoginPromiseResolve = resolve;
      webLoginPromiseReject = reject;
    });
    const elements = [];
    if (this.mobileAppConnect instanceof MobileAppConnect) {
      elements.push({
        type: "button",
        data: {
          label: "Open My Cloud Wallet app",
          variant: "primary",
          onClick: async () => {
            try {
              if (!(this.mobileAppConnect instanceof MobileAppConnect)) {
                throw new Error("Mobile App Connect is not initialized");
              }
              if (!context.chain) {
                throw new Error("A chain must be selected to login with.");
              }
              const user = await this.mobileAppConnect.directConnect(context);
              const signature = user?.proof?.data?.signature;
              const identityProof = signature && IdentityProof.from({
                chainId: ChainId.from(context?.chain?.id),
                scope: Name.from(context.appName || ""),
                expiration: TimePointSec.from((/* @__PURE__ */ new Date()).getTime() / 1e3 + 60 * 60),
                signer: PermissionLevel.from({
                  actor: `${user?.account}`,
                  permission: "active"
                }),
                signature: Signature.from(signature)
              });
              this.data.identityProof = identityProof;
              this.data.proof = user?.proof;
              this.data.isTempAccount = user?.isTemp;
              this.data.whitelist = user?.whitelistedContracts;
              directConnectPromiseResolve({
                chain: context.chain.id,
                permissionLevel: PermissionLevel.from({
                  actor: `${user?.account}`,
                  permission: "active"
                }),
                identityProof
              });
            } catch (error2) {
              directConnectPromiseReject(error2);
            }
          }
        }
      });
    }
    elements.push({
      type: "button",
      data: {
        label: "Login with web",
        variant: "primary",
        onClick: async () => {
          try {
            const result = await this.waxLogin(context);
            webLoginPromiseResolve(result);
          } catch (error2) {
            webLoginPromiseReject(error2);
          }
        }
      }
    });
    const currentPromptResponse = context.ui.prompt({
      title: "Connect to My Cloud Wallet",
      body: "Connect My Cloud Wallet on your mobile device",
      elements
    });
    currentPromptResponse.catch((error2) => {
      console.info("User cancelled modal::", error2.message);
      directConnectPromiseReject(error2);
    });
    return await Promise.race([directConnectPromise, webLoginPromise]);
  }
  async waxLogin(context) {
    if (!context.chain) {
      throw new Error("A chain must be selected to login with.");
    }
    const t = context.ui.getTranslate(this.id);
    let response;
    const searchParams = new URLSearchParams();
    const nonce = context.arbitrary["nonce"];
    if (nonce) {
      const base64Nonce = btoa(nonce);
      searchParams.set("n", base64Nonce);
    }
    searchParams.set("returnTemp", this.allowTemp.toString());
    try {
      const autoLoginUrl = new URL("/login", this.autoUrl);
      autoLoginUrl.search = searchParams.toString();
      response = await autoLogin(t, autoLoginUrl.toString());
    } catch (e) {
      const popupLoginUrl = new URL("/cloud-wallet/login", this.url);
      popupLoginUrl.search = searchParams.toString();
      response = await popupLogin(t, popupLoginUrl.toString());
    }
    if (!response) {
      throw new Error(t("login.error.response", { default: "Cloud Wallet failed to respond" }));
    }
    if (!response.verified) {
      throw new Error(t("error.closed", {
        default: "Cloud Wallet closed before the login was completed"
      }));
    }
    this.data.whitelist = response.whitelistedContracts;
    this.data.isTempAccount = response.isTemp;
    this.data.proof = response?.proof;
    console.log("waxLogin::response proof", response?.proof);
    const signature = response?.proof?.data?.signature;
    const identityProof = signature && IdentityProof.from({
      chainId: ChainId.from(context?.chain?.id),
      scope: Name.from(context.appName || ""),
      expiration: TimePointSec.from((/* @__PURE__ */ new Date()).getTime() / 1e3 + 60 * 60),
      signer: PermissionLevel.from({
        actor: response.userAccount,
        permission: "active"
      }),
      signature: Signature.from(response?.proof?.data?.signature)
    });
    this.data.identityProof = identityProof;
    return new Promise((resolve) => {
      if (!context.chain) {
        throw new Error("A chain must be selected to login with.");
      }
      localStorage.setItem("connectedType", "web");
      resolve({
        chain: context.chain.id,
        permissionLevel: PermissionLevel.from({
          actor: response.userAccount,
          permission: "active"
        }),
        identityProof
      });
    });
  }
  /**
   * Performs the wallet logic required to sign a transaction and return the signature.
   *
   * @param chain ChainDefinition
   * @param resolved ResolvedSigningRequest
   * @returns Promise<Signature>
   */
  sign(resolved, context) {
    let promise;
    const connectedType = localStorage.getItem("connectedType");
    if (this.mobileAppConnect instanceof MobileAppConnect && (connectedType === "direct" || connectedType === "remote")) {
      console.log("mobileSign");
      promise = this.mobileSign(resolved, context);
    } else {
      console.log("waxSign");
      promise = this.waxSign(resolved, context);
    }
    return cancelable(promise, (canceled) => {
      throw canceled;
    });
  }
  async mobileSign(resolved, context) {
    if (!context.ui) {
      throw new Error("A UserInterface must be defined to sign transactions.");
    }
    if (!(this.mobileAppConnect instanceof MobileAppConnect)) {
      throw new Error("MobileAppConnect is not initialized");
    }
    let mobileSignCancelReject;
    const mobileSignCancelPromise = new Promise((resolve, reject) => {
      mobileSignCancelReject = reject;
    });
    context.ui.getTranslate(this.id);
    const expiration = resolved.transaction.expiration.toDate();
    const now = /* @__PURE__ */ new Date();
    const timeout = Math.floor(expiration.getTime() - now.getTime());
    console.log("timeout", timeout);
    let promptPromise = cancelable(new Promise(() => {
    }));
    if (!allowAutosign(resolved, this.data)) {
      promptPromise = context.ui.prompt({
        title: "Sign",
        body: `Please complete the transaction using the Cloud Wallet app.`,
        optional: true,
        elements: [
          {
            type: "countdown",
            data: expiration.toISOString()
          }
        ]
      });
      promptPromise.catch((error2) => {
        clearTimeout(timer);
        mobileSignCancelReject(error2);
      });
    }
    const timer = setTimeout(() => {
      if (!context.ui) {
        throw new Error("No UI defined");
      }
      promptPromise.cancel("The request expired, please try again.");
    }, timeout);
    const signPromise = this.mobileAppConnect.signTransaction(resolved, context, {});
    return Promise.race([mobileSignCancelPromise, signPromise]);
  }
  async waxSign(resolved, context) {
    if (!context.ui) {
      throw new Error("A UserInterface must be defined to sign transactions.");
    }
    const t = context.ui.getTranslate(this.id);
    const expiration = resolved.transaction.expiration.toDate();
    const now = /* @__PURE__ */ new Date();
    const timeout = Math.floor(expiration.getTime() - now.getTime());
    const callbackPromise = this.getWalletResponse(resolved, context, t, timeout);
    let promptPromise = cancelable(new Promise(() => {
    }));
    if (!allowAutosign(resolved, this.data)) {
      promptPromise = context.ui.prompt({
        title: "Sign",
        body: `Please complete the transaction using the Cloud Wallet popup window.`,
        optional: true,
        elements: [
          {
            type: "countdown",
            data: expiration.toISOString()
          }
        ]
      });
      promptPromise.catch(() => clearTimeout(timer));
    }
    const timer = setTimeout(() => {
      if (!context.ui) {
        throw new Error("No UI defined");
      }
      promptPromise.cancel("The request expired, please try again.");
    }, timeout);
    const callbackResponse = await Promise.race([callbackPromise, promptPromise]).finally(() => {
      clearTimeout(timer);
      promptPromise.cancel();
    });
    if (isCallback(callbackResponse)) {
      const result = {
        signatures: callbackResponse.signatures
      };
      if (callbackResponse.serializedTransaction) {
        const responseTransaction = Serializer.decode({
          data: callbackResponse.serializedTransaction,
          type: Transaction
        });
        if (!responseTransaction.equals(resolved.transaction)) {
          validateModifications(resolved.transaction, responseTransaction);
          const request = await SigningRequest.create({
            transaction: responseTransaction
          }, context.esrOptions);
          result.resolved = new ResolvedSigningRequest(request, context.permissionLevel, Transaction.from(responseTransaction), Serializer.objectify(Transaction.from(responseTransaction)), ChainId.from(context.chain.id));
        }
      }
      return new Promise((resolve) => resolve(result));
    }
    throw new Error("The Cloud Wallet failed to respond");
  }
  async getWalletResponse(resolved, context, t, timeout = 3e5) {
    let response;
    if (!context.ui) {
      throw new Error("The Cloud Wallet requires a UI to sign transactions.");
    }
    if (allowAutosign(resolved, this.data)) {
      try {
        response = await autoSign(t, `${this.autoUrl}/signing`, resolved);
      } catch (e) {
        response = await popupTransact(t, `${this.url}/cloud-wallet/signing/`, resolved, timeout);
      }
    } else {
      response = await popupTransact(t, `${this.url}/cloud-wallet/signing/`, resolved, timeout);
    }
    if (!response) {
      throw new Error(t("login.error.response", { default: "Cloud Wallet failed to respond" }));
    }
    if (!response.verified) {
      throw new Error(t("error.closed", {
        default: "The Cloud Wallet was closed before the request was completed"
      }));
    }
    this.data.whitelist = response.whitelistedContracts;
    return response;
  }
  async logout(context) {
    if (this.mobileAppConnect) {
      await this.mobileAppConnect.cleanup();
    }
    return;
  }
}
function isCallback(object) {
  return "serializedTransaction" in object;
}
class WalletPluginWombat extends AbstractWalletPlugin {
  constructor() {
    super();
    this.id = "wombat";
    this.translations = {};
    this.config = {
      // Should the user interface display a chain selector?
      requiresChainSelect: true,
      // Should the user interface display a permission selector?
      requiresPermissionSelect: false
    };
    this.metadata = WalletPluginMetadata.from({
      name: "Wombat",
      description: "",
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5goFCggZ0IIdsgAACdVJREFUaN69mmuMXVUVgL+19zn33pnO2Gln2ukLmj5AoCIUNCiRh1Agom0FKSAKyqNRHoIhBJSoqGiMpJGHIAkqSSUkSjXQRmTEQGgREmxaaGMboNJCX9NOO++Z+zrn7OWPc+e2c+fO3HunU1Yyc5Nz9t5nfXuttfda+xxhgsUtW4ACIgKAFK7r0D8BRbFrP5jQ58qxDhAtnY+IQYZGEnBOrYjUA5OAROE5AUoaGBSRoICGFn7NMYKNGyS3bCG+xAOoqiciJwCLgTOBU4A5wBQgVegSAL1AO7ADeAfYrOhOQTIKOFW8deMDqhnELV+AFLopNANfFLgC+HxBeb/aoYAOYDOwVqFNjOzGKaqKqRGoJhBdvmCoSxNwJXAzcDaQHNc0Dod6F3hW4RmBPQqYtf+beBC3fCGoExFzAfAD4CKqn/1a5G1glYO/CeSoEshUBFAlvGspqDaKmHuBvwCXxRB6HDhYDPzewMPAbAGiZQuOHUQABvumizGPAA8C01EHngepetBqYBTU1QJTD9wq8CeFTxkRwgowY4JorORM8+nPPYHqjYCPczBnIdz5EPz4D3D+0goMDhJ1MHMueH6V4EW5SGA1cLYVIbd0/qgNvdFuOOcgXpUeltnzriIKQQRaZsKtPydadA4KeCcshN5O2LwBjC3MPkd+Z82Fb9wNp30G1q+DPz8GYVALzFnAUwo3JIzZNlqjssFegEiJyK+BO9j/oeGpn8HObXDld4iW3cThrk6iyNHSPJXEzm2w8VWomxTPeGYA+rqhtwsu/yaccW48cDYNq+6C/7xSgK5JXlHleoT2csFfFiQMQ6y1K4FHgToA0v3Q1QEtMxlw0NPXj2ctjQ2TmFRXV/7RUQi2xOhvvAS/uTu+V5so8ISi96DkSveZEa5VsMbpwA+LEAD1jfEfkIoiZkxLYo0p5lRlxZbx3FMWw/TZsG9nrVYR4EZBNiCypvRmuWBPisjdwLzRRvSsxbN2bIjRZMp0uGIlNE6pdSWDOHe7F3RW6ZI8DERVQeQLxCnH8RFj4JIVcMuPxgtzFnCdK+lXAkJC4CZg8nEDARADF34VvnVv7K61LckGuMEaMytcNm/YRQBy2Sygi4AlxxWiCCNw8dfg6tvBT9QKc6ogl1o5EoNFkI72/YjIZcC0jwUE4mD/8vVw6TW15uEesFxxxWS1CDLrxLn1wMVMQLFVkyRScM0dcOZ54KJaen4WZO4IkEJhdNrHCjEkk5vhhntgxlxwVQd/q8CZwdIFw0GAT/JxulWpzF8EV30XElWXNh5wRi7SIyBRGCAiCxilvnDOkclmiaKaTH9Eejvh4J7Ku/n5S2FxTS52cp0ntghSCIo55Vrmg4DOnh5UFWtrzo/gzTZ44Ntw/9dhzZMQ5Edvm6qH874SZ8nVySwpZB8GwIkRoLW0VS6f51BXN9ZY6kbLpyrJYB/sfh8O7oXnn4JtG8duf8pimHFitbHSgEjyCIhzhpK6OwxDOnt6cC6icVL9+JeyC5bBtXfCiSdB80zo7hi7/bTZcPFVcQZQWTwBC4WksZAzFXckVaWnf4BcLk9DfT2efwyleSIFK26N0xIx0Ng0dnsRuOjK2CV3bKmUWBZ1NgBWxAGZoYu5fJ50Jg0i+L5/7BuLmDhZbGopnxGXypRp8KXrwEtUahkqREUQMUaB/UN3B9MZIqcIYKsz8cTLOZfA/FMrxUoPqhkouFYUBljP3wsQOUcunz9yZltbDnTsEuQhPQB9XdDQRIWTmn0K2SKI5ydQ1R1ANoqiVFjYLxQIwporufFJFMJrL8Drf48r0b7u+G/sGHnX+MYVQQryPtDunJs3ZAUhjpfIuePvYgf2wLMPQ8e+WHkRGLtwywPvROl4oovaqep+YEupJwVhQCabPb4QEC+3YmIIYypBAOxV2Oq9tGs4SIHwZWPEHV3CqkJf/wBhOM70pFqZPjtOUaxX7Wb4hlP2Feeh5Oa/rDG7S90oHwR09fbWlGs554YOMqoT68HVt+Fu/wXBvNMqFVo54AURigFc1NgYg6rustau831/xFqRzmQ43N1NLp8f6wE450hnMnR0dXOws4uu3j4GM1mCMKy8AtY1EC1ZQfrCKyq51iZFX7NHnW+V7k6RiKxOJhIr0pnMzNLemWyOfL6TulSKVCqJ73kYEZwqURSRC0Ky+YB8Jo1mByGfJ4cino9J1ePX1eEnUyQSSTzP4lmDKQS1KuRzOXLbN1G/YV1skfIwAfBHMbbr6IvDQApW2ZJM+Kt9z7svCMMRI0XOMZBOM5BOY0QQEZT4BQeH2zGbN2B3bEU6D0B2EAP4iQS2cTIyeSquZRa5lllkpraijU1Iqh7jIkzXQbztG2nc9Cpe98E48MvLeuD50pgdoaiq4pw7oau39/mBwfTZVCMimO0bsc89juzeEQerQMoaGj2DJ4IMnQULYCzq+aifRL0EuBCTTSNBvtKy2wlcA7wiJcem3kidhGw2tyeVSD6QzeVXh2HYPCaEMcjuHdhnViEHPoqXT2vxRJicMNhRlJIwiBU/ajIqZLwh8IiqvlZuyLI9k8kEDZPq2xK+/ysRyY0JEkXY9WuR9o+G7cKeMCrEMOUrb3wAKDznlN8iEkmZN8Cm/PhCFEXRpLrU7zzPPkocYGUVkYEe5L23RyjjADcBaZoCgdO2UPU+gd7RXsONakvP8wjDKJNKJB80Rh4j3jBHzuhAHzLQMwIkcEquln2kjEQKmcj9oy90t/lG9pp1o79LHNMpmyZ/gsi5ASPmJ0bkp0DPiOmyFszIGkOB/lDJj8MsCmSdBv2hW90bupW+YdcH6bE344qZYGtLM6qaTvr+Q0bkFoH/Hv1I/cRUtGVG2cPoUJXuIGIwclW5mQI5p/QGUXtvEN0/ELrvWWT/oQAWvrxrzL5VF39797eTyeVIJhMLndPvq+q1QDNisG3PYtc8PuZwCSOkjJAwghWKHx04lEiHXFEzoeo/I2XVobx7szVpdGbbh1XpV1MVe+DQIfL5gIRnvVwYnauqNytcJn3drfbpX2K2vAFGxhxWiJsc+XpCcUq/wr+Bp61IW6Q6YEWY0barKr1qBilap72dMIxIJpN+EASnO2Mvl93vL7F/ffJUeXdTM/lcpQMwJf4u5QNgvcCLRuStSHXQEwGU1iotcUwgEGcA+w50EEUhmcjRcOKcBn3r9fl2zROLeO/tkzXIzxVo0viduUhckvYDu4k/qtkuIjs682HXFN9iBRIiTH2peiscLVUcaYwyA0ctt13dPaQPdw2Qy2x1PYe3avch5iw4id7Ow14ucjZyKglronrPRB3Z0PlGijM4LeHRWoMLTbhFxpKOlUuQ/bvwVMk7R+SUhDUYASNC04s7J/yZ/wfCGAz5/r8LngAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMi0xMC0wNVQxMDowODoyNSswMDowMKM3wHoAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjItMTAtMDVUMTA6MDg6MjUrMDA6MDDSanjGAAAAAElFTkSuQmCC",
      homepage: "https://www.wombat.app/",
      download: "https://www.wombat.app/the-app"
    });
  }
  async loadScatterProtocol() {
    let scatterProtocol;
    if (typeof window !== "undefined") {
      scatterProtocol = await __vitePreload(() => import("./protocol-scatter.m-Drgxap_P.js"), true ? __vite__mapDeps([0,1,2]) : void 0);
    }
    if (!scatterProtocol) {
      throw new Error("Scatter protocol is not available in this environment");
    }
    return scatterProtocol;
  }
  /**
   * Performs the wallet logic required to login and return the chain and permission level to use.
   *
   * @param context LoginContext
   * @returns Promise<WalletPluginLoginResponse>
   */
  async login(context) {
    const scatterProtocol = await this.loadScatterProtocol();
    return scatterProtocol.handleLogin(context);
  }
  /**
   * Performs the wallet logic required to logout.
   *
   * @param context: LogoutContext
   * @returns Promise<void>
   */
  async logout(context) {
    const scatterProtocol = await this.loadScatterProtocol();
    return scatterProtocol.handleLogout(context);
  }
  /**
   * Performs the wallet logic required to sign a transaction and return the signature.
   *
   * @param chain ChainDefinition
   * @param resolved ResolvedSigningRequest
   * @returns Promise<Signature>
   */
  async sign(resolved, context) {
    const scatterProtocol = await this.loadScatterProtocol();
    return scatterProtocol.handleSignatureRequest(resolved, context);
  }
}
export {
  WalletPluginAnchor as W,
  __vitePreload as _,
  WalletPluginCloudWallet as a,
  WalletPluginWombat as b
};
//# sourceMappingURL=wallets-BY4zLC3k.js.map

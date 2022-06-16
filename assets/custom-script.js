! function () {
	"use strict";
	var i = function (t, e) {
		return (i = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function (t, e) {
				t.__proto__ = e
			} || function (t, e) {
				for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
			})(t, e)
	};

	function o(t, e) {
		function n() {
			this.constructor = t
		}
		i(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
	}
	var a = function () {
		return (a = Object.assign || function (t) {
			for (var e, n = 1, i = arguments.length; n < i; n++)
				for (var r in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
			return t
		}).apply(this, arguments)
	};

	function m(t) {
		var e = "function" == typeof Symbol && t[Symbol.iterator],
			n = 0;
		return e ? e.call(t) : {
			next: function () {
				return t && n >= t.length && (t = void 0), {
					value: t && t[n++],
					done: !t
				}
			}
		}
	}

	function r(t, e) {
		var n = "function" == typeof Symbol && t[Symbol.iterator];
		if (!n) return t;
		var i, r, o = n.call(t),
			s = [];
		try {
			for (;
				(void 0 === e || 0 < e--) && !(i = o.next()).done;) s.push(i.value)
		} catch (t) {
			r = {
				error: t
			}
		} finally {
			try {
				i && !i.done && (n = o.return) && n.call(o)
			} finally {
				if (r) throw r.error
			}
		}
		return s
	}

	function s() {
		for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(r(arguments[e]));
		return t
	}
	var g = {},
		y = console.warn.bind(console);

	function e(t, e) {
		var n, i;
		void 0 === t && (t = document), void 0 === e && (e = y);
		var r, o, s, a, c = [],
			l = [].slice.call(t.querySelectorAll("[data-mdc-auto-init]"));
		try {
			for (var u = m(l), d = u.next(); !d.done; d = u.next()) {
				var h = d.value,
					p = h.getAttribute("data-mdc-auto-init");
				if (!p) throw new Error("(mdc-auto-init) Constructor name must be given.");
				var f = g[p];
				if ("function" != typeof f) throw new Error("(mdc-auto-init) Could not find constructor in registry for " + p);
				if (Object.getOwnPropertyDescriptor(h, p)) e("(mdc-auto-init) Component already initialized for " + h + ". Skipping...");
				else {
					var _ = f.attachTo(h);
					Object.defineProperty(h, p, {
						configurable: !0,
						enumerable: !1,
						value: _,
						writable: !1
					}), c.push(_)
				}
			}
		} catch (t) {
			n = {
				error: t
			}
		} finally {
			try {
				d && !d.done && (i = u.return) && i.call(u)
			} finally {
				if (n) throw n.error
			}
		}
		return r = "MDCAutoInit:End", o = {}, void 0 === s && (s = !1), "function" == typeof CustomEvent ? a = new CustomEvent(r, {
			bubbles: s,
			detail: o
		}) : (a = document.createEvent("CustomEvent")).initCustomEvent(r, s, !1, o), document.dispatchEvent(a), c
	}
	e.register = function (t, e, n) {
		if (void 0 === n && (n = y), "function" != typeof e) throw new Error("(mdc-auto-init) Invalid Constructor value: " + e + ". Expected function.");
		var i = g[t];
		i && n("(mdc-auto-init) Overriding registration for " + t + " with " + e + ". Was: " + i), g[t] = e
	}, e.deregister = function (t) {
		delete g[t]
	}, e.deregisterAll = function () {
		Object.keys(g).forEach(this.deregister, this)
	};
	var n = function () {
			function t(t) {
				void 0 === t && (t = {}), this.adapter_ = t
			}
			return Object.defineProperty(t, "cssClasses", {
				get: function () {
					return {}
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t, "strings", {
				get: function () {
					return {}
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t, "numbers", {
				get: function () {
					return {}
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t, "defaultAdapter", {
				get: function () {
					return {}
				},
				enumerable: !0,
				configurable: !0
			}), t.prototype.init = function () {}, t.prototype.destroy = function () {}, t
		}(),
		t = function () {
			function e(t, e) {
				for (var n = [], i = 2; i < arguments.length; i++) n[i - 2] = arguments[i];
				this.root_ = t, this.initialize.apply(this, s(n)), this.foundation_ = void 0 === e ? this.getDefaultFoundation() : e, this.foundation_.init(), this.initialSyncWithDOM()
			}
			return e.attachTo = function (t) {
				return new e(t, new n({}))
			}, e.prototype.initialize = function () {
				for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e]
			}, e.prototype.getDefaultFoundation = function () {
				throw new Error("Subclasses must override getDefaultFoundation to return a properly configured foundation class")
			}, e.prototype.initialSyncWithDOM = function () {}, e.prototype.destroy = function () {
				this.foundation_.destroy()
			}, e.prototype.listen = function (t, e) {
				this.root_.addEventListener(t, e)
			}, e.prototype.unlisten = function (t, e) {
				this.root_.removeEventListener(t, e)
			}, e.prototype.emit = function (t, e, n) {
				var i;
				void 0 === n && (n = !1), "function" == typeof CustomEvent ? i = new CustomEvent(t, {
					bubbles: n,
					detail: e
				}) : (i = document.createEvent("CustomEvent")).initCustomEvent(t, n, !1, e), this.root_.dispatchEvent(i)
			}, e
		}(),
		c = {
			animation: {
				prefixed: "-webkit-animation",
				standard: "animation"
			},
			transform: {
				prefixed: "-webkit-transform",
				standard: "transform"
			},
			transition: {
				prefixed: "-webkit-transition",
				standard: "transition"
			}
		},
		l = {
			animationend: {
				cssProperty: "animation",
				prefixed: "webkitAnimationEnd",
				standard: "animationend"
			},
			animationiteration: {
				cssProperty: "animation",
				prefixed: "webkitAnimationIteration",
				standard: "animationiteration"
			},
			animationstart: {
				cssProperty: "animation",
				prefixed: "webkitAnimationStart",
				standard: "animationstart"
			},
			transitionend: {
				cssProperty: "transition",
				prefixed: "webkitTransitionEnd",
				standard: "transitionend"
			}
		};

	function u(t) {
		return Boolean(t.document) && "function" == typeof t.document.createElement
	}

	function d(t, e) {
		if (u(t) && e in c) {
			var n = t.document.createElement("div"),
				i = c[e],
				r = i.standard,
				o = i.prefixed;
			return r in n.style ? r : o
		}
		return e
	}

	function h(t, e) {
		if (u(t) && e in l) {
			var n = t.document.createElement("div"),
				i = l[e],
				r = i.standard,
				o = i.prefixed;
			return i.cssProperty in n.style ? r : o
		}
		return e
	}

	function p(t, e) {
		if (t.closest) return t.closest(e);
		for (var n = t; n;) {
			if (f(n, e)) return n;
			n = n.parentElement
		}
		return null
	}

	function f(t, e) {
		return (t.matches || t.webkitMatchesSelector || t.msMatchesSelector).call(t, e)
	}
	var _, E, v = {
			BG_FOCUSED: "mdc-ripple-upgraded--background-focused",
			FG_ACTIVATION: "mdc-ripple-upgraded--foreground-activation",
			FG_DEACTIVATION: "mdc-ripple-upgraded--foreground-deactivation",
			ROOT: "mdc-ripple-upgraded",
			UNBOUNDED: "mdc-ripple-upgraded--unbounded"
		},
		C = {
			VAR_FG_SCALE: "--mdc-ripple-fg-scale",
			VAR_FG_SIZE: "--mdc-ripple-fg-size",
			VAR_FG_TRANSLATE_END: "--mdc-ripple-fg-translate-end",
			VAR_FG_TRANSLATE_START: "--mdc-ripple-fg-translate-start",
			VAR_LEFT: "--mdc-ripple-left",
			VAR_TOP: "--mdc-ripple-top"
		},
		b = {
			DEACTIVATION_TIMEOUT_MS: 225,
			FG_DEACTIVATION_MS: 150,
			INITIAL_ORIGIN_SCALE: .6,
			PADDING: 10,
			TAP_DELAY_MS: 300
		};

	function T(t, e) {
		if (void 0 === t && (t = window), void 0 === e && (e = !1), void 0 === E || e) {
			var n = !1;
			try {
				t.document.addEventListener("test", function () {}, {
					get passive() {
						return n = !0
					}
				})
			} catch (t) {}
			E = n
		}
		return !!E && {
			passive: !0
		}
	}
	var I = ["touchstart", "pointerdown", "mousedown", "keydown"],
		A = ["touchend", "pointerup", "mouseup", "contextmenu"],
		S = [],
		O = function (n) {
			function p(t) {
				var e = n.call(this, a({}, p.defaultAdapter, t)) || this;
				return e.activationAnimationHasEnded_ = !1, e.activationTimer_ = 0, e.fgDeactivationRemovalTimer_ = 0, e.fgScale_ = "0", e.frame_ = {
					width: 0,
					height: 0
				}, e.initialSize_ = 0, e.layoutFrame_ = 0, e.maxRadius_ = 0, e.unboundedCoords_ = {
					left: 0,
					top: 0
				}, e.activationState_ = e.defaultActivationState_(), e.activationTimerCallback_ = function () {
					e.activationAnimationHasEnded_ = !0, e.runDeactivationUXLogicIfReady_()
				}, e.activateHandler_ = function (t) {
					return e.activate_(t)
				}, e.deactivateHandler_ = function () {
					return e.deactivate_()
				}, e.focusHandler_ = function () {
					return e.handleFocus()
				}, e.blurHandler_ = function () {
					return e.handleBlur()
				}, e.resizeHandler_ = function () {
					return e.layout()
				}, e
			}
			return o(p, n), Object.defineProperty(p, "cssClasses", {
				get: function () {
					return v
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(p, "strings", {
				get: function () {
					return C
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(p, "numbers", {
				get: function () {
					return b
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(p, "defaultAdapter", {
				get: function () {
					return {
						addClass: function () {},
						browserSupportsCssVars: function () {
							return !0
						},
						computeBoundingRect: function () {
							return {
								top: 0,
								right: 0,
								bottom: 0,
								left: 0,
								width: 0,
								height: 0
							}
						},
						containsEventTarget: function () {
							return !0
						},
						deregisterDocumentInteractionHandler: function () {},
						deregisterInteractionHandler: function () {},
						deregisterResizeHandler: function () {},
						getWindowPageOffset: function () {
							return {
								x: 0,
								y: 0
							}
						},
						isSurfaceActive: function () {
							return !0
						},
						isSurfaceDisabled: function () {
							return !0
						},
						isUnbounded: function () {
							return !0
						},
						registerDocumentInteractionHandler: function () {},
						registerInteractionHandler: function () {},
						registerResizeHandler: function () {},
						removeClass: function () {},
						updateCssVariable: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), p.prototype.init = function () {
				var t = this,
					e = this.supportsPressRipple_();
				if (this.registerRootHandlers_(e), e) {
					var n = p.cssClasses,
						i = n.ROOT,
						r = n.UNBOUNDED;
					requestAnimationFrame(function () {
						t.adapter_.addClass(i), t.adapter_.isUnbounded() && (t.adapter_.addClass(r), t.layoutInternal_())
					})
				}
			}, p.prototype.destroy = function () {
				var t = this;
				if (this.supportsPressRipple_()) {
					this.activationTimer_ && (clearTimeout(this.activationTimer_), this.activationTimer_ = 0, this.adapter_.removeClass(p.cssClasses.FG_ACTIVATION)), this.fgDeactivationRemovalTimer_ && (clearTimeout(this.fgDeactivationRemovalTimer_), this.fgDeactivationRemovalTimer_ = 0, this.adapter_.removeClass(p.cssClasses.FG_DEACTIVATION));
					var e = p.cssClasses,
						n = e.ROOT,
						i = e.UNBOUNDED;
					requestAnimationFrame(function () {
						t.adapter_.removeClass(n), t.adapter_.removeClass(i), t.removeCssVars_()
					})
				}
				this.deregisterRootHandlers_(), this.deregisterDeactivationHandlers_()
			}, p.prototype.activate = function (t) {
				this.activate_(t)
			}, p.prototype.deactivate = function () {
				this.deactivate_()
			}, p.prototype.layout = function () {
				var t = this;
				this.layoutFrame_ && cancelAnimationFrame(this.layoutFrame_), this.layoutFrame_ = requestAnimationFrame(function () {
					t.layoutInternal_(), t.layoutFrame_ = 0
				})
			}, p.prototype.setUnbounded = function (t) {
				var e = p.cssClasses.UNBOUNDED;
				t ? this.adapter_.addClass(e) : this.adapter_.removeClass(e)
			}, p.prototype.handleFocus = function () {
				var t = this;
				requestAnimationFrame(function () {
					return t.adapter_.addClass(p.cssClasses.BG_FOCUSED)
				})
			}, p.prototype.handleBlur = function () {
				var t = this;
				requestAnimationFrame(function () {
					return t.adapter_.removeClass(p.cssClasses.BG_FOCUSED)
				})
			}, p.prototype.supportsPressRipple_ = function () {
				return this.adapter_.browserSupportsCssVars()
			}, p.prototype.defaultActivationState_ = function () {
				return {
					activationEvent: void 0,
					hasDeactivationUXRun: !1,
					isActivated: !1,
					isProgrammatic: !1,
					wasActivatedByPointer: !1,
					wasElementMadeActive: !1
				}
			}, p.prototype.registerRootHandlers_ = function (t) {
				var e = this;
				t && (I.forEach(function (t) {
					e.adapter_.registerInteractionHandler(t, e.activateHandler_)
				}), this.adapter_.isUnbounded() && this.adapter_.registerResizeHandler(this.resizeHandler_)), this.adapter_.registerInteractionHandler("focus", this.focusHandler_), this.adapter_.registerInteractionHandler("blur", this.blurHandler_)
			}, p.prototype.registerDeactivationHandlers_ = function (t) {
				var e = this;
				"keydown" === t.type ? this.adapter_.registerInteractionHandler("keyup", this.deactivateHandler_) : A.forEach(function (t) {
					e.adapter_.registerDocumentInteractionHandler(t, e.deactivateHandler_)
				})
			}, p.prototype.deregisterRootHandlers_ = function () {
				var e = this;
				I.forEach(function (t) {
					e.adapter_.deregisterInteractionHandler(t, e.activateHandler_)
				}), this.adapter_.deregisterInteractionHandler("focus", this.focusHandler_), this.adapter_.deregisterInteractionHandler("blur", this.blurHandler_), this.adapter_.isUnbounded() && this.adapter_.deregisterResizeHandler(this.resizeHandler_)
			}, p.prototype.deregisterDeactivationHandlers_ = function () {
				var e = this;
				this.adapter_.deregisterInteractionHandler("keyup", this.deactivateHandler_), A.forEach(function (t) {
					e.adapter_.deregisterDocumentInteractionHandler(t, e.deactivateHandler_)
				})
			}, p.prototype.removeCssVars_ = function () {
				var e = this,
					n = p.strings;
				Object.keys(n).forEach(function (t) {
					0 === t.indexOf("VAR_") && e.adapter_.updateCssVariable(n[t], null)
				})
			}, p.prototype.activate_ = function (t) {
				var e = this;
				if (!this.adapter_.isSurfaceDisabled()) {
					var n = this.activationState_;
					if (!n.isActivated) {
						var i = this.previousActivationEvent_;
						if (!(i && void 0 !== t && i.type !== t.type)) n.isActivated = !0, n.isProgrammatic = void 0 === t, n.activationEvent = t, n.wasActivatedByPointer = !n.isProgrammatic && (void 0 !== t && ("mousedown" === t.type || "touchstart" === t.type || "pointerdown" === t.type)), void 0 !== t && 0 < S.length && S.some(function (t) {
							return e.adapter_.containsEventTarget(t)
						}) ? this.resetActivationState_() : (void 0 !== t && (S.push(t.target), this.registerDeactivationHandlers_(t)), n.wasElementMadeActive = this.checkElementMadeActive_(t), n.wasElementMadeActive && this.animateActivation_(), requestAnimationFrame(function () {
							S = [], n.wasElementMadeActive || void 0 === t || " " !== t.key && 32 !== t.keyCode || (n.wasElementMadeActive = e.checkElementMadeActive_(t), n.wasElementMadeActive && e.animateActivation_()), n.wasElementMadeActive || (e.activationState_ = e.defaultActivationState_())
						}))
					}
				}
			}, p.prototype.checkElementMadeActive_ = function (t) {
				return void 0 === t || "keydown" !== t.type || this.adapter_.isSurfaceActive()
			}, p.prototype.animateActivation_ = function () {
				var t = this,
					e = p.strings,
					n = e.VAR_FG_TRANSLATE_START,
					i = e.VAR_FG_TRANSLATE_END,
					r = p.cssClasses,
					o = r.FG_DEACTIVATION,
					s = r.FG_ACTIVATION,
					a = p.numbers.DEACTIVATION_TIMEOUT_MS;
				this.layoutInternal_();
				var c = "",
					l = "";
				if (!this.adapter_.isUnbounded()) {
					var u = this.getFgTranslationCoordinates_(),
						d = u.startPoint,
						h = u.endPoint;
					c = d.x + "px, " + d.y + "px", l = h.x + "px, " + h.y + "px"
				}
				this.adapter_.updateCssVariable(n, c), this.adapter_.updateCssVariable(i, l), clearTimeout(this.activationTimer_), clearTimeout(this.fgDeactivationRemovalTimer_), this.rmBoundedActivationClasses_(), this.adapter_.removeClass(o), this.adapter_.computeBoundingRect(), this.adapter_.addClass(s), this.activationTimer_ = setTimeout(function () {
					return t.activationTimerCallback_()
				}, a)
			}, p.prototype.getFgTranslationCoordinates_ = function () {
				var t, e = this.activationState_,
					n = e.activationEvent;
				return {
					startPoint: t = {
						x: (t = e.wasActivatedByPointer ? function (t, e, n) {
							if (!t) return {
								x: 0,
								y: 0
							};
							var i, r, o = e.x,
								s = e.y,
								a = o + n.left,
								c = s + n.top;
							if ("touchstart" === t.type) {
								var l = t;
								i = l.changedTouches[0].pageX - a, r = l.changedTouches[0].pageY - c
							} else {
								var u = t;
								i = u.pageX - a, r = u.pageY - c
							}
							return {
								x: i,
								y: r
							}
						}(n, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect()) : {
							x: this.frame_.width / 2,
							y: this.frame_.height / 2
						}).x - this.initialSize_ / 2,
						y: t.y - this.initialSize_ / 2
					},
					endPoint: {
						x: this.frame_.width / 2 - this.initialSize_ / 2,
						y: this.frame_.height / 2 - this.initialSize_ / 2
					}
				}
			}, p.prototype.runDeactivationUXLogicIfReady_ = function () {
				var t = this,
					e = p.cssClasses.FG_DEACTIVATION,
					n = this.activationState_,
					i = n.hasDeactivationUXRun,
					r = n.isActivated;
				(i || !r) && this.activationAnimationHasEnded_ && (this.rmBoundedActivationClasses_(), this.adapter_.addClass(e), this.fgDeactivationRemovalTimer_ = setTimeout(function () {
					t.adapter_.removeClass(e)
				}, b.FG_DEACTIVATION_MS))
			}, p.prototype.rmBoundedActivationClasses_ = function () {
				var t = p.cssClasses.FG_ACTIVATION;
				this.adapter_.removeClass(t), this.activationAnimationHasEnded_ = !1, this.adapter_.computeBoundingRect()
			}, p.prototype.resetActivationState_ = function () {
				var t = this;
				this.previousActivationEvent_ = this.activationState_.activationEvent, this.activationState_ = this.defaultActivationState_(), setTimeout(function () {
					return t.previousActivationEvent_ = void 0
				}, p.numbers.TAP_DELAY_MS)
			}, p.prototype.deactivate_ = function () {
				var t = this,
					e = this.activationState_;
				if (e.isActivated) {
					var n = a({}, e);
					e.isProgrammatic ? (requestAnimationFrame(function () {
						return t.animateDeactivation_(n)
					}), this.resetActivationState_()) : (this.deregisterDeactivationHandlers_(), requestAnimationFrame(function () {
						t.activationState_.hasDeactivationUXRun = !0, t.animateDeactivation_(n), t.resetActivationState_()
					}))
				}
			}, p.prototype.animateDeactivation_ = function (t) {
				var e = t.wasActivatedByPointer,
					n = t.wasElementMadeActive;
				(e || n) && this.runDeactivationUXLogicIfReady_()
			}, p.prototype.layoutInternal_ = function () {
				var t = this;
				this.frame_ = this.adapter_.computeBoundingRect();
				var e = Math.max(this.frame_.height, this.frame_.width);
				this.maxRadius_ = this.adapter_.isUnbounded() ? e : Math.sqrt(Math.pow(t.frame_.width, 2) + Math.pow(t.frame_.height, 2)) + p.numbers.PADDING, this.initialSize_ = Math.floor(e * p.numbers.INITIAL_ORIGIN_SCALE), this.fgScale_ = "" + this.maxRadius_ / this.initialSize_, this.updateLayoutCssVars_()
			}, p.prototype.updateLayoutCssVars_ = function () {
				var t = p.strings,
					e = t.VAR_FG_SIZE,
					n = t.VAR_LEFT,
					i = t.VAR_TOP,
					r = t.VAR_FG_SCALE;
				this.adapter_.updateCssVariable(e, this.initialSize_ + "px"), this.adapter_.updateCssVariable(r, this.fgScale_), this.adapter_.isUnbounded() && (this.unboundedCoords_ = {
					left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
					top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
				}, this.adapter_.updateCssVariable(n, this.unboundedCoords_.left + "px"), this.adapter_.updateCssVariable(i, this.unboundedCoords_.top + "px"))
			}, p
		}(n),
		L = function (e) {
			function i() {
				var t = null !== e && e.apply(this, arguments) || this;
				return t.disabled = !1, t
			}
			return o(i, e), i.attachTo = function (t, e) {
				void 0 === e && (e = {
					isUnbounded: void 0
				});
				var n = new i(t);
				return void 0 !== e.isUnbounded && (n.unbounded = e.isUnbounded), n
			}, i.createAdapter = function (n) {
				return {
					addClass: function (t) {
						return n.root_.classList.add(t)
					},
					browserSupportsCssVars: function () {
						return function (t, e) {
							void 0 === e && (e = !1);
							var n = t.CSS,
								i = _;
							if ("boolean" == typeof _ && !e) return _;
							if (!n || "function" != typeof n.supports) return !1;
							var r = n.supports("--css-vars", "yes"),
								o = n.supports("(--css-vars: yes)") && n.supports("color", "#00000000");
							return i = !(!r && !o || function (t) {
								var e = t.document,
									n = e.createElement("div");
								n.className = "mdc-ripple-surface--test-edge-var-bug", e.body.appendChild(n);
								var i = t.getComputedStyle(n),
									r = null !== i && "solid" === i.borderTopStyle;
								return n.parentNode && n.parentNode.removeChild(n), r
							}(t)), e || (_ = i), i
						}(window)
					},
					computeBoundingRect: function () {
						return n.root_.getBoundingClientRect()
					},
					containsEventTarget: function (t) {
						return n.root_.contains(t)
					},
					deregisterDocumentInteractionHandler: function (t, e) {
						return document.documentElement.removeEventListener(t, e, T())
					},
					deregisterInteractionHandler: function (t, e) {
						return n.root_.removeEventListener(t, e, T())
					},
					deregisterResizeHandler: function (t) {
						return window.removeEventListener("resize", t)
					},
					getWindowPageOffset: function () {
						return {
							x: window.pageXOffset,
							y: window.pageYOffset
						}
					},
					isSurfaceActive: function () {
						return f(n.root_, ":active")
					},
					isSurfaceDisabled: function () {
						return Boolean(n.disabled)
					},
					isUnbounded: function () {
						return Boolean(n.unbounded)
					},
					registerDocumentInteractionHandler: function (t, e) {
						return document.documentElement.addEventListener(t, e, T())
					},
					registerInteractionHandler: function (t, e) {
						return n.root_.addEventListener(t, e, T())
					},
					registerResizeHandler: function (t) {
						return window.addEventListener("resize", t)
					},
					removeClass: function (t) {
						return n.root_.classList.remove(t)
					},
					updateCssVariable: function (t, e) {
						return n.root_.style.setProperty(t, e)
					}
				}
			}, Object.defineProperty(i.prototype, "unbounded", {
				get: function () {
					return Boolean(this.unbounded_)
				},
				set: function (t) {
					this.unbounded_ = Boolean(t), this.setUnbounded_()
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.activate = function () {
				this.foundation_.activate()
			}, i.prototype.deactivate = function () {
				this.foundation_.deactivate()
			}, i.prototype.layout = function () {
				this.foundation_.layout()
			}, i.prototype.getDefaultFoundation = function () {
				return new O(i.createAdapter(this))
			}, i.prototype.initialSyncWithDOM = function () {
				var t = this.root_;
				this.unbounded = "mdcRippleIsUnbounded" in t.dataset
			}, i.prototype.setUnbounded_ = function () {
				this.foundation_.setUnbounded(Boolean(this.unbounded_))
			}, i
		}(t),
		R = {
			ANIM_CHECKED_INDETERMINATE: "mdc-checkbox--anim-checked-indeterminate",
			ANIM_CHECKED_UNCHECKED: "mdc-checkbox--anim-checked-unchecked",
			ANIM_INDETERMINATE_CHECKED: "mdc-checkbox--anim-indeterminate-checked",
			ANIM_INDETERMINATE_UNCHECKED: "mdc-checkbox--anim-indeterminate-unchecked",
			ANIM_UNCHECKED_CHECKED: "mdc-checkbox--anim-unchecked-checked",
			ANIM_UNCHECKED_INDETERMINATE: "mdc-checkbox--anim-unchecked-indeterminate",
			BACKGROUND: "mdc-checkbox__background",
			CHECKED: "mdc-checkbox--checked",
			CHECKMARK: "mdc-checkbox__checkmark",
			CHECKMARK_PATH: "mdc-checkbox__checkmark-path",
			DISABLED: "mdc-checkbox--disabled",
			INDETERMINATE: "mdc-checkbox--indeterminate",
			MIXEDMARK: "mdc-checkbox__mixedmark",
			NATIVE_CONTROL: "mdc-checkbox__native-control",
			ROOT: "mdc-checkbox",
			SELECTED: "mdc-checkbox--selected",
			UPGRADED: "mdc-checkbox--upgraded"
		},
		w = {
			ARIA_CHECKED_ATTR: "aria-checked",
			ARIA_CHECKED_INDETERMINATE_VALUE: "mixed",
			NATIVE_CONTROL_SELECTOR: ".mdc-checkbox__native-control",
			TRANSITION_STATE_CHECKED: "checked",
			TRANSITION_STATE_INDETERMINATE: "indeterminate",
			TRANSITION_STATE_INIT: "init",
			TRANSITION_STATE_UNCHECKED: "unchecked"
		},
		x = {
			ANIM_END_LATCH_MS: 250
		},
		N = function (n) {
			function h(t) {
				var e = n.call(this, a({}, h.defaultAdapter, t)) || this;
				return e.currentCheckState_ = w.TRANSITION_STATE_INIT, e.currentAnimationClass_ = "", e.animEndLatchTimer_ = 0, e.enableAnimationEndHandler_ = !1, e
			}
			return o(h, n), Object.defineProperty(h, "cssClasses", {
				get: function () {
					return R
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(h, "strings", {
				get: function () {
					return w
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(h, "numbers", {
				get: function () {
					return x
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(h, "defaultAdapter", {
				get: function () {
					return {
						addClass: function () {},
						forceLayout: function () {},
						hasNativeControl: function () {
							return !1
						},
						isAttachedToDOM: function () {
							return !1
						},
						isChecked: function () {
							return !1
						},
						isIndeterminate: function () {
							return !1
						},
						removeClass: function () {},
						removeNativeControlAttr: function () {},
						setNativeControlAttr: function () {},
						setNativeControlDisabled: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), h.prototype.init = function () {
				this.currentCheckState_ = this.determineCheckState_(), this.updateAriaChecked_(), this.adapter_.addClass(R.UPGRADED)
			}, h.prototype.destroy = function () {
				clearTimeout(this.animEndLatchTimer_)
			}, h.prototype.setDisabled = function (t) {
				this.adapter_.setNativeControlDisabled(t), t ? this.adapter_.addClass(R.DISABLED) : this.adapter_.removeClass(R.DISABLED)
			}, h.prototype.handleAnimationEnd = function () {
				var t = this;
				this.enableAnimationEndHandler_ && (clearTimeout(this.animEndLatchTimer_), this.animEndLatchTimer_ = setTimeout(function () {
					t.adapter_.removeClass(t.currentAnimationClass_), t.enableAnimationEndHandler_ = !1
				}, x.ANIM_END_LATCH_MS))
			}, h.prototype.handleChange = function () {
				this.transitionCheckState_()
			}, h.prototype.transitionCheckState_ = function () {
				if (this.adapter_.hasNativeControl()) {
					var t = this.currentCheckState_,
						e = this.determineCheckState_();
					if (t !== e) {
						this.updateAriaChecked_();
						var n = R.SELECTED;
						e === w.TRANSITION_STATE_UNCHECKED ? this.adapter_.removeClass(n) : this.adapter_.addClass(n), 0 < this.currentAnimationClass_.length && (clearTimeout(this.animEndLatchTimer_), this.adapter_.forceLayout(), this.adapter_.removeClass(this.currentAnimationClass_)), this.currentAnimationClass_ = this.getTransitionAnimationClass_(t, e), this.currentCheckState_ = e, this.adapter_.isAttachedToDOM() && 0 < this.currentAnimationClass_.length && (this.adapter_.addClass(this.currentAnimationClass_), this.enableAnimationEndHandler_ = !0)
					}
				}
			}, h.prototype.determineCheckState_ = function () {
				var t = w.TRANSITION_STATE_INDETERMINATE,
					e = w.TRANSITION_STATE_CHECKED,
					n = w.TRANSITION_STATE_UNCHECKED;
				return this.adapter_.isIndeterminate() ? t : this.adapter_.isChecked() ? e : n
			}, h.prototype.getTransitionAnimationClass_ = function (t, e) {
				var n = w.TRANSITION_STATE_INIT,
					i = w.TRANSITION_STATE_CHECKED,
					r = w.TRANSITION_STATE_UNCHECKED,
					o = h.cssClasses,
					s = o.ANIM_UNCHECKED_CHECKED,
					a = o.ANIM_UNCHECKED_INDETERMINATE,
					c = o.ANIM_CHECKED_UNCHECKED,
					l = o.ANIM_CHECKED_INDETERMINATE,
					u = o.ANIM_INDETERMINATE_CHECKED,
					d = o.ANIM_INDETERMINATE_UNCHECKED;
				switch (t) {
					case n:
						return e === r ? "" : e === i ? u : d;
					case r:
						return e === i ? s : a;
					case i:
						return e === r ? c : l;
					default:
						return e === i ? u : d
				}
			}, h.prototype.updateAriaChecked_ = function () {
				this.adapter_.isIndeterminate() ? this.adapter_.setNativeControlAttr(w.ARIA_CHECKED_ATTR, w.ARIA_CHECKED_INDETERMINATE_VALUE) : this.adapter_.removeNativeControlAttr(w.ARIA_CHECKED_ATTR)
			}, h
		}(n),
		D = ["checked", "indeterminate"],
		k = function (e) {
			function n() {
				var t = null !== e && e.apply(this, arguments) || this;
				return t.ripple_ = t.createRipple_(), t
			}
			return o(n, e), n.attachTo = function (t) {
				return new n(t)
			}, Object.defineProperty(n.prototype, "ripple", {
				get: function () {
					return this.ripple_
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n.prototype, "checked", {
				get: function () {
					return this.nativeControl_.checked
				},
				set: function (t) {
					this.nativeControl_.checked = t
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n.prototype, "indeterminate", {
				get: function () {
					return this.nativeControl_.indeterminate
				},
				set: function (t) {
					this.nativeControl_.indeterminate = t
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n.prototype, "disabled", {
				get: function () {
					return this.nativeControl_.disabled
				},
				set: function (t) {
					this.foundation_.setDisabled(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n.prototype, "value", {
				get: function () {
					return this.nativeControl_.value
				},
				set: function (t) {
					this.nativeControl_.value = t
				},
				enumerable: !0,
				configurable: !0
			}), n.prototype.initialSyncWithDOM = function () {
				var t = this;
				this.handleChange_ = function () {
					return t.foundation_.handleChange()
				}, this.handleAnimationEnd_ = function () {
					return t.foundation_.handleAnimationEnd()
				}, this.nativeControl_.addEventListener("change", this.handleChange_), this.listen(h(window, "animationend"), this.handleAnimationEnd_), this.installPropertyChangeHooks_()
			}, n.prototype.destroy = function () {
				this.ripple_.destroy(), this.nativeControl_.removeEventListener("change", this.handleChange_), this.unlisten(h(window, "animationend"), this.handleAnimationEnd_), this.uninstallPropertyChangeHooks_(), e.prototype.destroy.call(this)
			}, n.prototype.getDefaultFoundation = function () {
				var n = this;
				return new N({
					addClass: function (t) {
						return n.root_.classList.add(t)
					},
					forceLayout: function () {
						return n.root_.offsetWidth
					},
					hasNativeControl: function () {
						return !!n.nativeControl_
					},
					isAttachedToDOM: function () {
						return Boolean(n.root_.parentNode)
					},
					isChecked: function () {
						return n.checked
					},
					isIndeterminate: function () {
						return n.indeterminate
					},
					removeClass: function (t) {
						return n.root_.classList.remove(t)
					},
					removeNativeControlAttr: function (t) {
						return n.nativeControl_.removeAttribute(t)
					},
					setNativeControlAttr: function (t, e) {
						return n.nativeControl_.setAttribute(t, e)
					},
					setNativeControlDisabled: function (t) {
						return n.nativeControl_.disabled = t
					}
				})
			}, n.prototype.createRipple_ = function () {
				var n = this,
					t = a({}, L.createAdapter(this), {
						deregisterInteractionHandler: function (t, e) {
							return n.nativeControl_.removeEventListener(t, e)
						},
						isSurfaceActive: function () {
							return f(n.nativeControl_, ":active")
						},
						isUnbounded: function () {
							return !0
						},
						registerInteractionHandler: function (t, e) {
							return n.nativeControl_.addEventListener(t, e)
						}
					});
				return new L(this.root_, new O(t))
			}, n.prototype.installPropertyChangeHooks_ = function () {
				var r = this,
					o = this.nativeControl_,
					s = Object.getPrototypeOf(o);
				D.forEach(function (t) {
					var e = Object.getOwnPropertyDescriptor(s, t);
					if (M(e)) {
						var n = e.get,
							i = {
								configurable: e.configurable,
								enumerable: e.enumerable,
								get: n,
								set: function (t) {
									e.set.call(o, t), r.foundation_.handleChange()
								}
							};
						Object.defineProperty(o, t, i)
					}
				})
			}, n.prototype.uninstallPropertyChangeHooks_ = function () {
				var n = this.nativeControl_,
					i = Object.getPrototypeOf(n);
				D.forEach(function (t) {
					var e = Object.getOwnPropertyDescriptor(i, t);
					M(e) && Object.defineProperty(n, t, e)
				})
			}, Object.defineProperty(n.prototype, "nativeControl_", {
				get: function () {
					var t = N.strings.NATIVE_CONTROL_SELECTOR,
						e = this.root_.querySelector(t);
					if (!e) throw new Error("Checkbox component requires a " + t + " element");
					return e
				},
				enumerable: !0,
				configurable: !0
			}), n
		}(t);

	function M(t) {
		return !!t && "function" == typeof t.set
	}
	var P = {
			CHECKMARK_SELECTOR: ".mdc-chip__checkmark",
			ENTRY_ANIMATION_NAME: "mdc-chip-entry",
			INTERACTION_EVENT: "MDCChip:interaction",
			LEADING_ICON_SELECTOR: ".mdc-chip__icon--leading",
			REMOVAL_EVENT: "MDCChip:removal",
			SELECTION_EVENT: "MDCChip:selection",
			TRAILING_ICON_INTERACTION_EVENT: "MDCChip:trailingIconInteraction",
			TRAILING_ICON_SELECTOR: ".mdc-chip__icon--trailing"
		},
		H = {
			CHECKMARK: "mdc-chip__checkmark",
			CHIP_EXIT: "mdc-chip--exit",
			HIDDEN_LEADING_ICON: "mdc-chip__icon--leading-hidden",
			LEADING_ICON: "mdc-chip__icon--leading",
			SELECTED: "mdc-chip--selected",
			TRAILING_ICON: "mdc-chip__icon--trailing"
		},
		F = {
			bottom: 0,
			height: 0,
			left: 0,
			right: 0,
			top: 0,
			width: 0
		},
		B = function (n) {
			function i(t) {
				var e = n.call(this, a({}, i.defaultAdapter, t)) || this;
				return e.shouldRemoveOnTrailingIconClick_ = !0, e
			}
			return o(i, n), Object.defineProperty(i, "strings", {
				get: function () {
					return P
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "cssClasses", {
				get: function () {
					return H
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "defaultAdapter", {
				get: function () {
					return {
						addClass: function () {},
						addClassToLeadingIcon: function () {},
						eventTargetHasClass: function () {
							return !1
						},
						getCheckmarkBoundingClientRect: function () {
							return F
						},
						getComputedStyleValue: function () {
							return ""
						},
						getRootBoundingClientRect: function () {
							return F
						},
						hasClass: function () {
							return !1
						},
						hasLeadingIcon: function () {
							return !1
						},
						notifyInteraction: function () {},
						notifyRemoval: function () {},
						notifySelection: function () {},
						notifyTrailingIconInteraction: function () {},
						removeClass: function () {},
						removeClassFromLeadingIcon: function () {},
						setStyleProperty: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.isSelected = function () {
				return this.adapter_.hasClass(H.SELECTED)
			}, i.prototype.setSelected = function (t) {
				t ? this.adapter_.addClass(H.SELECTED) : this.adapter_.removeClass(H.SELECTED), this.adapter_.notifySelection(t)
			}, i.prototype.getShouldRemoveOnTrailingIconClick = function () {
				return this.shouldRemoveOnTrailingIconClick_
			}, i.prototype.setShouldRemoveOnTrailingIconClick = function (t) {
				this.shouldRemoveOnTrailingIconClick_ = t
			}, i.prototype.getDimensions = function () {
				var t = this,
					e = function () {
						return t.adapter_.getRootBoundingClientRect()
					};
				if (!this.adapter_.hasLeadingIcon()) {
					var n = t.adapter_.getCheckmarkBoundingClientRect();
					if (n) {
						var i = e();
						return {
							bottom: i.bottom,
							height: i.height,
							left: i.left,
							right: i.right,
							top: i.top,
							width: i.width + n.height
						}
					}
				}
				return e()
			}, i.prototype.beginExit = function () {
				this.adapter_.addClass(H.CHIP_EXIT)
			}, i.prototype.handleInteraction = function (t) {
				var e = "Enter" === t.key || 13 === t.keyCode;
				("click" === t.type || e) && this.adapter_.notifyInteraction()
			}, i.prototype.handleTransitionEnd = function (t) {
				var e = this;
				if (this.adapter_.eventTargetHasClass(t.target, H.CHIP_EXIT)) {
					if ("width" === t.propertyName) this.adapter_.notifyRemoval();
					else if ("opacity" === t.propertyName) {
						var n = this.adapter_.getComputedStyleValue("width");
						requestAnimationFrame(function () {
							e.adapter_.setStyleProperty("width", n), e.adapter_.setStyleProperty("padding", "0"), e.adapter_.setStyleProperty("margin", "0"), requestAnimationFrame(function () {
								e.adapter_.setStyleProperty("width", "0")
							})
						})
					}
				} else "opacity" === t.propertyName && (this.adapter_.eventTargetHasClass(t.target, H.LEADING_ICON) && this.adapter_.hasClass(H.SELECTED) ? this.adapter_.addClassToLeadingIcon(H.HIDDEN_LEADING_ICON) : this.adapter_.eventTargetHasClass(t.target, H.CHECKMARK) && !this.adapter_.hasClass(H.SELECTED) && this.adapter_.removeClassFromLeadingIcon(H.HIDDEN_LEADING_ICON))
			}, i.prototype.handleTrailingIconInteraction = function (t) {
				var e = "Enter" === t.key || 13 === t.keyCode;
				t.stopPropagation(), ("click" === t.type || e) && (this.adapter_.notifyTrailingIconInteraction(), this.shouldRemoveOnTrailingIconClick_ && this.beginExit())
			}, i
		}(n),
		V = ["click", "keydown"],
		j = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), Object.defineProperty(e.prototype, "selected", {
				get: function () {
					return this.foundation_.isSelected()
				},
				set: function (t) {
					this.foundation_.setSelected(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "shouldRemoveOnTrailingIconClick", {
				get: function () {
					return this.foundation_.getShouldRemoveOnTrailingIconClick()
				},
				set: function (t) {
					this.foundation_.setShouldRemoveOnTrailingIconClick(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "ripple", {
				get: function () {
					return this.ripple_
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "id", {
				get: function () {
					return this.root_.id
				},
				enumerable: !0,
				configurable: !0
			}), e.attachTo = function (t) {
				return new e(t)
			}, e.prototype.initialize = function (t) {
				var e = this;
				void 0 === t && (t = function (t, e) {
					return new L(t, e)
				}), this.leadingIcon_ = this.root_.querySelector(P.LEADING_ICON_SELECTOR), this.trailingIcon_ = this.root_.querySelector(P.TRAILING_ICON_SELECTOR), this.checkmark_ = this.root_.querySelector(P.CHECKMARK_SELECTOR);
				var n = a({}, L.createAdapter(this), {
					computeBoundingRect: function () {
						return e.foundation_.getDimensions()
					}
				});
				this.ripple_ = t(this.root_, new O(n))
			}, e.prototype.initialSyncWithDOM = function () {
				var e = this;
				this.handleInteraction_ = function (t) {
					return e.foundation_.handleInteraction(t)
				}, this.handleTransitionEnd_ = function (t) {
					return e.foundation_.handleTransitionEnd(t)
				}, this.handleTrailingIconInteraction_ = function (t) {
					return e.foundation_.handleTrailingIconInteraction(t)
				}, V.forEach(function (t) {
					e.listen(t, e.handleInteraction_)
				}), this.listen("transitionend", this.handleTransitionEnd_), this.trailingIcon_ && V.forEach(function (t) {
					e.trailingIcon_.addEventListener(t, e.handleTrailingIconInteraction_)
				})
			}, e.prototype.destroy = function () {
				var e = this;
				this.ripple_.destroy(), V.forEach(function (t) {
					e.unlisten(t, e.handleInteraction_)
				}), this.unlisten("transitionend", this.handleTransitionEnd_), this.trailingIcon_ && V.forEach(function (t) {
					e.trailingIcon_.removeEventListener(t, e.handleTrailingIconInteraction_)
				}), t.prototype.destroy.call(this)
			}, e.prototype.beginExit = function () {
				this.foundation_.beginExit()
			}, e.prototype.getDefaultFoundation = function () {
				var n = this;
				return new B({
					addClass: function (t) {
						return n.root_.classList.add(t)
					},
					addClassToLeadingIcon: function (t) {
						n.leadingIcon_ && n.leadingIcon_.classList.add(t)
					},
					eventTargetHasClass: function (t, e) {
						return !!t && t.classList.contains(e)
					},
					getCheckmarkBoundingClientRect: function () {
						return n.checkmark_ ? n.checkmark_.getBoundingClientRect() : null
					},
					getComputedStyleValue: function (t) {
						return window.getComputedStyle(n.root_).getPropertyValue(t)
					},
					getRootBoundingClientRect: function () {
						return n.root_.getBoundingClientRect()
					},
					hasClass: function (t) {
						return n.root_.classList.contains(t)
					},
					hasLeadingIcon: function () {
						return !!n.leadingIcon_
					},
					notifyInteraction: function () {
						return n.emit(P.INTERACTION_EVENT, {
							chipId: n.id
						}, !0)
					},
					notifyRemoval: function () {
						return n.emit(P.REMOVAL_EVENT, {
							chipId: n.id,
							root: n.root_
						}, !0)
					},
					notifySelection: function (t) {
						return n.emit(P.SELECTION_EVENT, {
							chipId: n.id,
							selected: t
						}, !0)
					},
					notifyTrailingIconInteraction: function () {
						return n.emit(P.TRAILING_ICON_INTERACTION_EVENT, {
							chipId: n.id
						}, !0)
					},
					removeClass: function (t) {
						return n.root_.classList.remove(t)
					},
					removeClassFromLeadingIcon: function (t) {
						n.leadingIcon_ && n.leadingIcon_.classList.remove(t)
					},
					setStyleProperty: function (t, e) {
						return n.root_.style.setProperty(t, e)
					}
				})
			}, e
		}(t),
		z = {
			CHIP_SELECTOR: ".mdc-chip"
		},
		U = {
			CHOICE: "mdc-chip-set--choice",
			FILTER: "mdc-chip-set--filter"
		},
		K = function (n) {
			function i(t) {
				var e = n.call(this, a({}, i.defaultAdapter, t)) || this;
				return e.selectedChipIds_ = [], e
			}
			return o(i, n), Object.defineProperty(i, "strings", {
				get: function () {
					return z
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "cssClasses", {
				get: function () {
					return U
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "defaultAdapter", {
				get: function () {
					return {
						hasClass: function () {
							return !1
						},
						removeChip: function () {},
						setSelected: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.getSelectedChipIds = function () {
				return this.selectedChipIds_.slice()
			}, i.prototype.select = function (t) {
				if (!(0 <= this.selectedChipIds_.indexOf(t))) {
					if (this.adapter_.hasClass(U.CHOICE) && 0 < this.selectedChipIds_.length) {
						var e = this.selectedChipIds_[0];
						this.selectedChipIds_.length = 0, this.adapter_.setSelected(e, !1)
					}
					this.selectedChipIds_.push(t), this.adapter_.setSelected(t, !0)
				}
			}, i.prototype.handleChipInteraction = function (t) {
				(this.adapter_.hasClass(U.CHOICE) || this.adapter_.hasClass(U.FILTER)) && this.toggleSelect_(t)
			}, i.prototype.handleChipSelection = function (t, e) {
				var n = 0 <= this.selectedChipIds_.indexOf(t);
				e && !n ? this.select(t) : !e && n && this.deselect_(t)
			}, i.prototype.handleChipRemoval = function (t) {
				this.deselect_(t), this.adapter_.removeChip(t)
			}, i.prototype.deselect_ = function (t) {
				var e = this.selectedChipIds_.indexOf(t);
				0 <= e && (this.selectedChipIds_.splice(e, 1), this.adapter_.setSelected(t, !1))
			}, i.prototype.toggleSelect_ = function (t) {
				0 <= this.selectedChipIds_.indexOf(t) ? this.deselect_(t) : this.select(t)
			}, i
		}(n),
		q = B.strings,
		W = q.INTERACTION_EVENT,
		G = q.SELECTION_EVENT,
		X = q.REMOVAL_EVENT,
		Y = K.strings.CHIP_SELECTOR,
		Q = 0,
		Z = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, Object.defineProperty(e.prototype, "chips", {
				get: function () {
					return this.chips_.slice()
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "selectedChipIds", {
				get: function () {
					return this.foundation_.getSelectedChipIds()
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.initialize = function (t) {
				void 0 === t && (t = function (t) {
					return new j(t)
				}), this.chipFactory_ = t, this.chips_ = this.instantiateChips_(this.chipFactory_)
			}, e.prototype.initialSyncWithDOM = function () {
				var e = this;
				this.chips_.forEach(function (t) {
					t.id && t.selected && e.foundation_.select(t.id)
				}), this.handleChipInteraction_ = function (t) {
					return e.foundation_.handleChipInteraction(t.detail.chipId)
				}, this.handleChipSelection_ = function (t) {
					return e.foundation_.handleChipSelection(t.detail.chipId, t.detail.selected)
				}, this.handleChipRemoval_ = function (t) {
					return e.foundation_.handleChipRemoval(t.detail.chipId)
				}, this.listen(W, this.handleChipInteraction_), this.listen(G, this.handleChipSelection_), this.listen(X, this.handleChipRemoval_)
			}, e.prototype.destroy = function () {
				this.chips_.forEach(function (t) {
					t.destroy()
				}), this.unlisten(W, this.handleChipInteraction_), this.unlisten(G, this.handleChipSelection_), this.unlisten(X, this.handleChipRemoval_), t.prototype.destroy.call(this)
			}, e.prototype.addChip = function (t) {
				t.id = t.id || "mdc-chip-" + ++Q, this.chips_.push(this.chipFactory_(t))
			}, e.prototype.getDefaultFoundation = function () {
				var i = this;
				return new K({
					hasClass: function (t) {
						return i.root_.classList.contains(t)
					},
					removeChip: function (t) {
						var e = i.findChipIndex_(t);
						0 <= e && (i.chips_[e].destroy(), i.chips_.splice(e, 1))
					},
					setSelected: function (t, e) {
						var n = i.findChipIndex_(t);
						0 <= n && (i.chips_[n].selected = e)
					}
				})
			}, e.prototype.instantiateChips_ = function (e) {
				return [].slice.call(this.root_.querySelectorAll(Y)).map(function (t) {
					return t.id = t.id || "mdc-chip-" + ++Q, e(t)
				})
			}, e.prototype.findChipIndex_ = function (t) {
				for (var e = 0; e < this.chips_.length; e++)
					if (this.chips_[e].id === t) return e;
				return -1
			}, e
		}(t),
		J = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'],
		tt = J.join(","),
		et = "undefined" == typeof Element ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

	function nt(t, e) {
		e = e || {};
		var n, i, r, o = [],
			s = [],
			a = t.querySelectorAll(tt);
		for (e.includeContainer && et.call(t, tt) && (a = Array.prototype.slice.apply(a)).unshift(t), n = 0; n < a.length; n++) it(i = a[n]) && (0 === (r = st(i)) ? o.push(i) : s.push({
			documentOrder: n,
			tabIndex: r,
			node: i
		}));
		return s.sort(at).map(function (t) {
			return t.node
		}).concat(o)
	}

	function it(t) {
		return !(!rt(t) || ct(n = e = t) && "radio" === n.type && ! function (t) {
			if (!t.name) return !0;
			var e = function (t) {
				for (var e = 0; e < t.length; e++)
					if (t[e].checked) return t[e]
			}(t.ownerDocument.querySelectorAll('input[type="radio"][name="' + t.name + '"]'));
			return !e || e === t
		}(e) || st(t) < 0);
		var e, n
	}

	function rt(t) {
		return !t.disabled && (!ct(n = t) || "hidden" !== n.type) && (null !== (e = t).offsetParent && "hidden" !== getComputedStyle(e).visibility);
		var e, n
	}
	nt.isTabbable = function (t) {
		if (!t) throw new Error("No node provided");
		return !1 !== et.call(t, tt) && it(t)
	}, nt.isFocusable = function (t) {
		if (!t) throw new Error("No node provided");
		return !1 !== et.call(t, ot) && rt(t)
	};
	var ot = J.concat("iframe").join(",");

	function st(t) {
		var e = parseInt(t.getAttribute("tabindex"), 10);
		return isNaN(e) ? "true" === t.contentEditable ? 0 : t.tabIndex : e
	}

	function at(t, e) {
		return t.tabIndex === e.tabIndex ? t.documentOrder - e.documentOrder : t.tabIndex - e.tabIndex
	}

	function ct(t) {
		return "INPUT" === t.tagName
	}
	var lt, ut = nt,
		dt = function () {
			for (var t = {}, e = 0; e < arguments.length; e++) {
				var n = arguments[e];
				for (var i in n) ht.call(n, i) && (t[i] = n[i])
			}
			return t
		},
		ht = Object.prototype.hasOwnProperty;
	var pt, ft = (pt = [], {
		activateTrap: function (t) {
			if (0 < pt.length) {
				var e = pt[pt.length - 1];
				e !== t && e.pause()
			}
			var n = pt.indexOf(t); - 1 === n || pt.splice(n, 1), pt.push(t)
		},
		deactivateTrap: function (t) {
			var e = pt.indexOf(t); - 1 !== e && pt.splice(e, 1), 0 < pt.length && pt[pt.length - 1].unpause()
		}
	});

	function _t(t) {
		return setTimeout(t, 0)
	}
	var mt = function (t, e) {
		var i = document,
			n = "string" == typeof t ? i.querySelector(t) : t,
			r = dt({
				returnFocusOnDeactivate: !0,
				escapeDeactivates: !0
			}, e),
			o = {
				firstTabbableNode: null,
				lastTabbableNode: null,
				nodeFocusedBeforeActivation: null,
				mostRecentlyFocusedNode: null,
				active: !1,
				paused: !1
			},
			s = {
				activate: function (t) {
					if (!o.active) {
						m(), o.active = !0, o.paused = !1, o.nodeFocusedBeforeActivation = i.activeElement;
						var e = t && t.onActivate ? t.onActivate : r.onActivate;
						return e && e(), c(), s
					}
				},
				deactivate: a,
				pause: function () {
					!o.paused && o.active && (o.paused = !0, l())
				},
				unpause: function () {
					o.paused && o.active && (o.paused = !1, m(), c())
				}
			};
		return s;

		function a(t) {
			if (o.active) {
				clearTimeout(lt), l(), o.active = !1, o.paused = !1, ft.deactivateTrap(s);
				var e = t && void 0 !== t.onDeactivate ? t.onDeactivate : r.onDeactivate;
				return e && e(), (t && void 0 !== t.returnFocus ? t.returnFocus : r.returnFocusOnDeactivate) && _t(function () {
					g(o.nodeFocusedBeforeActivation)
				}), s
			}
		}

		function c() {
			if (o.active) return ft.activateTrap(s), lt = _t(function () {
				g(d())
			}), i.addEventListener("focusin", p, !0), i.addEventListener("mousedown", h, {
				capture: !0,
				passive: !1
			}), i.addEventListener("touchstart", h, {
				capture: !0,
				passive: !1
			}), i.addEventListener("click", _, {
				capture: !0,
				passive: !1
			}), i.addEventListener("keydown", f, {
				capture: !0,
				passive: !1
			}), s
		}

		function l() {
			if (o.active) return i.removeEventListener("focusin", p, !0), i.removeEventListener("mousedown", h, !0), i.removeEventListener("touchstart", h, !0), i.removeEventListener("click", _, !0), i.removeEventListener("keydown", f, !0), s
		}

		function u(t) {
			var e = r[t],
				n = e;
			if (!e) return null;
			if ("string" == typeof e && !(n = i.querySelector(e))) throw new Error("`" + t + "` refers to no known node");
			if ("function" == typeof e && !(n = e())) throw new Error("`" + t + "` did not return a node");
			return n
		}

		function d() {
			var t;
			if (!(t = null !== u("initialFocus") ? u("initialFocus") : n.contains(i.activeElement) ? i.activeElement : o.firstTabbableNode || u("fallbackFocus"))) throw new Error("You can't have a focus-trap without at least one focusable element");
			return t
		}

		function h(t) {
			n.contains(t.target) || (r.clickOutsideDeactivates ? a({
				returnFocus: !ut.isFocusable(t.target)
			}) : t.preventDefault())
		}

		function p(t) {
			n.contains(t.target) || t.target instanceof Document || (t.stopImmediatePropagation(), g(o.mostRecentlyFocusedNode || d()))
		}

		function f(t) {
			if (!1 !== r.escapeDeactivates && ("Escape" === (e = t).key || "Esc" === e.key || 27 === e.keyCode)) return t.preventDefault(), void a();
			var e;
			if ("Tab" !== (n = t).key && 9 !== n.keyCode) var n;
			else ! function (t) {
				if (m(), t.shiftKey && t.target === o.firstTabbableNode) return t.preventDefault(), g(o.lastTabbableNode);
				t.shiftKey || t.target !== o.lastTabbableNode || (t.preventDefault(), g(o.firstTabbableNode))
			}(t)
		}

		function _(t) {
			r.clickOutsideDeactivates || n.contains(t.target) || (t.preventDefault(), t.stopImmediatePropagation())
		}

		function m() {
			var t = ut(n);
			o.firstTabbableNode = t[0] || d(), o.lastTabbableNode = t[t.length - 1] || d()
		}

		function g(t) {
			var e;
			t !== i.activeElement && (t && t.focus ? (t.focus(), o.mostRecentlyFocusedNode = t, (e = t).tagName && "input" === e.tagName.toLowerCase() && "function" == typeof e.select && t.select()) : g(d()))
		}
	};
	var gt = {
			CLOSING: "mdc-dialog--closing",
			OPEN: "mdc-dialog--open",
			OPENING: "mdc-dialog--opening",
			SCROLLABLE: "mdc-dialog--scrollable",
			SCROLL_LOCK: "mdc-dialog-scroll-lock",
			STACKED: "mdc-dialog--stacked"
		},
		yt = {
			ACTION_ATTRIBUTE: "data-mdc-dialog-action",
			BUTTON_SELECTOR: ".mdc-dialog__button",
			CLOSED_EVENT: "MDCDialog:closed",
			CLOSE_ACTION: "close",
			CLOSING_EVENT: "MDCDialog:closing",
			CONTAINER_SELECTOR: ".mdc-dialog__container",
			CONTENT_SELECTOR: ".mdc-dialog__content",
			DEFAULT_BUTTON_SELECTOR: ".mdc-dialog__button--default",
			DESTROY_ACTION: "destroy",
			OPENED_EVENT: "MDCDialog:opened",
			OPENING_EVENT: "MDCDialog:opening",
			SCRIM_SELECTOR: ".mdc-dialog__scrim",
			SUPPRESS_DEFAULT_PRESS_SELECTOR: ["textarea", ".mdc-menu .mdc-list-item"].join(", "),
			SURFACE_SELECTOR: ".mdc-dialog__surface"
		},
		Et = {
			DIALOG_ANIMATION_CLOSE_TIME_MS: 75,
			DIALOG_ANIMATION_OPEN_TIME_MS: 150
		},
		vt = function (n) {
			function i(t) {
				var e = n.call(this, a({}, i.defaultAdapter, t)) || this;
				return e.isOpen_ = !1, e.animationFrame_ = 0, e.animationTimer_ = 0, e.layoutFrame_ = 0, e.escapeKeyAction_ = yt.CLOSE_ACTION, e.scrimClickAction_ = yt.CLOSE_ACTION, e.autoStackButtons_ = !0, e.areButtonsStacked_ = !1, e
			}
			return o(i, n), Object.defineProperty(i, "cssClasses", {
				get: function () {
					return gt
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "strings", {
				get: function () {
					return yt
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "numbers", {
				get: function () {
					return Et
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "defaultAdapter", {
				get: function () {
					return {
						addBodyClass: function () {},
						addClass: function () {},
						areButtonsStacked: function () {
							return !1
						},
						clickDefaultButton: function () {},
						eventTargetMatches: function () {
							return !1
						},
						getActionFromEvent: function () {
							return ""
						},
						hasClass: function () {
							return !1
						},
						isContentScrollable: function () {
							return !1
						},
						notifyClosed: function () {},
						notifyClosing: function () {},
						notifyOpened: function () {},
						notifyOpening: function () {},
						releaseFocus: function () {},
						removeBodyClass: function () {},
						removeClass: function () {},
						reverseButtons: function () {},
						trapFocus: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.init = function () {
				this.adapter_.hasClass(gt.STACKED) && this.setAutoStackButtons(!1)
			}, i.prototype.destroy = function () {
				this.isOpen_ && this.close(yt.DESTROY_ACTION), this.animationTimer_ && (clearTimeout(this.animationTimer_), this.handleAnimationTimerEnd_()), this.layoutFrame_ && (cancelAnimationFrame(this.layoutFrame_), this.layoutFrame_ = 0)
			}, i.prototype.open = function () {
				var t = this;
				this.isOpen_ = !0, this.adapter_.notifyOpening(), this.adapter_.addClass(gt.OPENING), this.runNextAnimationFrame_(function () {
					t.adapter_.addClass(gt.OPEN), t.adapter_.addBodyClass(gt.SCROLL_LOCK), t.layout(), t.animationTimer_ = setTimeout(function () {
						t.handleAnimationTimerEnd_(), t.adapter_.trapFocus(), t.adapter_.notifyOpened()
					}, Et.DIALOG_ANIMATION_OPEN_TIME_MS)
				})
			}, i.prototype.close = function (t) {
				var e = this;
				void 0 === t && (t = ""), this.isOpen_ && (this.isOpen_ = !1, this.adapter_.notifyClosing(t), this.adapter_.addClass(gt.CLOSING), this.adapter_.removeClass(gt.OPEN), this.adapter_.removeBodyClass(gt.SCROLL_LOCK), cancelAnimationFrame(this.animationFrame_), this.animationFrame_ = 0, clearTimeout(this.animationTimer_), this.animationTimer_ = setTimeout(function () {
					e.adapter_.releaseFocus(), e.handleAnimationTimerEnd_(), e.adapter_.notifyClosed(t)
				}, Et.DIALOG_ANIMATION_CLOSE_TIME_MS))
			}, i.prototype.isOpen = function () {
				return this.isOpen_
			}, i.prototype.getEscapeKeyAction = function () {
				return this.escapeKeyAction_
			}, i.prototype.setEscapeKeyAction = function (t) {
				this.escapeKeyAction_ = t
			}, i.prototype.getScrimClickAction = function () {
				return this.scrimClickAction_
			}, i.prototype.setScrimClickAction = function (t) {
				this.scrimClickAction_ = t
			}, i.prototype.getAutoStackButtons = function () {
				return this.autoStackButtons_
			}, i.prototype.setAutoStackButtons = function (t) {
				this.autoStackButtons_ = t
			}, i.prototype.layout = function () {
				var t = this;
				this.layoutFrame_ && cancelAnimationFrame(this.layoutFrame_), this.layoutFrame_ = requestAnimationFrame(function () {
					t.layoutInternal_(), t.layoutFrame_ = 0
				})
			}, i.prototype.handleInteraction = function (t) {
				var e = "click" === t.type,
					n = "Enter" === t.key || 13 === t.keyCode,
					i = "Space" === t.key || 32 === t.keyCode,
					r = this.adapter_.eventTargetMatches(t.target, yt.SCRIM_SELECTOR),
					o = !this.adapter_.eventTargetMatches(t.target, yt.SUPPRESS_DEFAULT_PRESS_SELECTOR);
				if (e && r && "" !== this.scrimClickAction_) this.close(this.scrimClickAction_);
				else if (e || i || n) {
					var s = this.adapter_.getActionFromEvent(t);
					s ? this.close(s) : n && o && this.adapter_.clickDefaultButton()
				}
			}, i.prototype.handleDocumentKeydown = function (t) {
				("Escape" === t.key || 27 === t.keyCode) && "" !== this.escapeKeyAction_ && this.close(this.escapeKeyAction_)
			}, i.prototype.layoutInternal_ = function () {
				this.autoStackButtons_ && this.detectStackedButtons_(), this.detectScrollableContent_()
			}, i.prototype.handleAnimationTimerEnd_ = function () {
				this.animationTimer_ = 0, this.adapter_.removeClass(gt.OPENING), this.adapter_.removeClass(gt.CLOSING)
			}, i.prototype.runNextAnimationFrame_ = function (t) {
				var e = this;
				cancelAnimationFrame(this.animationFrame_), this.animationFrame_ = requestAnimationFrame(function () {
					e.animationFrame_ = 0, clearTimeout(e.animationTimer_), e.animationTimer_ = setTimeout(t, 0)
				})
			}, i.prototype.detectStackedButtons_ = function () {
				this.adapter_.removeClass(gt.STACKED);
				var t = this.adapter_.areButtonsStacked();
				t && this.adapter_.addClass(gt.STACKED), t !== this.areButtonsStacked_ && (this.adapter_.reverseButtons(), this.areButtonsStacked_ = t)
			}, i.prototype.detectScrollableContent_ = function () {
				this.adapter_.removeClass(gt.SCROLLABLE), this.adapter_.isContentScrollable() && this.adapter_.addClass(gt.SCROLLABLE)
			}, i
		}(n),
		Ct = vt.strings,
		bt = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), Object.defineProperty(e.prototype, "isOpen", {
				get: function () {
					return this.foundation_.isOpen()
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "escapeKeyAction", {
				get: function () {
					return this.foundation_.getEscapeKeyAction()
				},
				set: function (t) {
					this.foundation_.setEscapeKeyAction(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "scrimClickAction", {
				get: function () {
					return this.foundation_.getScrimClickAction()
				},
				set: function (t) {
					this.foundation_.setScrimClickAction(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "autoStackButtons", {
				get: function () {
					return this.foundation_.getAutoStackButtons()
				},
				set: function (t) {
					this.foundation_.setAutoStackButtons(t)
				},
				enumerable: !0,
				configurable: !0
			}), e.attachTo = function (t) {
				return new e(t)
			}, e.prototype.initialize = function (t, e) {
				var n, i, r = this.root_.querySelector(Ct.CONTAINER_SELECTOR);
				if (!r) throw new Error("Dialog component requires a " + Ct.CONTAINER_SELECTOR + " container element");
				this.container_ = r, this.content_ = this.root_.querySelector(Ct.CONTENT_SELECTOR), this.buttons_ = [].slice.call(this.root_.querySelectorAll(Ct.BUTTON_SELECTOR)), this.defaultButton_ = this.root_.querySelector(Ct.DEFAULT_BUTTON_SELECTOR), this.focusTrapFactory_ = t, this.initialFocusEl_ = e, this.buttonRipples_ = [];
				try {
					for (var o = m(this.buttons_), s = o.next(); !s.done; s = o.next()) {
						var a = s.value;
						this.buttonRipples_.push(new L(a))
					}
				} catch (t) {
					n = {
						error: t
					}
				} finally {
					try {
						s && !s.done && (i = o.return) && i.call(o)
					} finally {
						if (n) throw n.error
					}
				}
			}, e.prototype.initialSyncWithDOM = function () {
				var t, e, n, i = this;
				this.focusTrap_ = (t = this.container_, e = this.focusTrapFactory_, n = this.initialFocusEl_, void 0 === e && (e = mt), e(t, {
					clickOutsideDeactivates: !0,
					escapeDeactivates: !1,
					initialFocus: n
				})), this.handleInteraction_ = this.foundation_.handleInteraction.bind(this.foundation_), this.handleDocumentKeydown_ = this.foundation_.handleDocumentKeydown.bind(this.foundation_), this.handleLayout_ = this.layout.bind(this);
				var r = ["resize", "orientationchange"];
				this.handleOpening_ = function () {
					r.forEach(function (t) {
						return window.addEventListener(t, i.handleLayout_)
					}), document.addEventListener("keydown", i.handleDocumentKeydown_)
				}, this.handleClosing_ = function () {
					r.forEach(function (t) {
						return window.removeEventListener(t, i.handleLayout_)
					}), document.removeEventListener("keydown", i.handleDocumentKeydown_)
				}, this.listen("click", this.handleInteraction_), this.listen("keydown", this.handleInteraction_), this.listen(Ct.OPENING_EVENT, this.handleOpening_), this.listen(Ct.CLOSING_EVENT, this.handleClosing_)
			}, e.prototype.destroy = function () {
				this.unlisten("click", this.handleInteraction_), this.unlisten("keydown", this.handleInteraction_), this.unlisten(Ct.OPENING_EVENT, this.handleOpening_), this.unlisten(Ct.CLOSING_EVENT, this.handleClosing_), this.handleClosing_(), this.buttonRipples_.forEach(function (t) {
					return t.destroy()
				}), t.prototype.destroy.call(this)
			}, e.prototype.layout = function () {
				this.foundation_.layout()
			}, e.prototype.open = function () {
				this.foundation_.open()
			}, e.prototype.close = function (t) {
				void 0 === t && (t = ""), this.foundation_.close(t)
			}, e.prototype.getDefaultFoundation = function () {
				var n = this;
				return new vt({
					addBodyClass: function (t) {
						return document.body.classList.add(t)
					},
					addClass: function (t) {
						return n.root_.classList.add(t)
					},
					areButtonsStacked: function () {
						return t = n.buttons_, e = new Set, [].forEach.call(t, function (t) {
							return e.add(t.offsetTop)
						}), 1 < e.size;
						var t, e
					},
					clickDefaultButton: function () {
						return n.defaultButton_ && n.defaultButton_.click()
					},
					eventTargetMatches: function (t, e) {
						return !!t && f(t, e)
					},
					getActionFromEvent: function (t) {
						if (!t.target) return "";
						var e = p(t.target, "[" + Ct.ACTION_ATTRIBUTE + "]");
						return e && e.getAttribute(Ct.ACTION_ATTRIBUTE)
					},
					hasClass: function (t) {
						return n.root_.classList.contains(t)
					},
					isContentScrollable: function () {
						return !!(t = n.content_) && t.scrollHeight > t.offsetHeight;
						var t
					},
					notifyClosed: function (t) {
						return n.emit(Ct.CLOSED_EVENT, t ? {
							action: t
						} : {})
					},
					notifyClosing: function (t) {
						return n.emit(Ct.CLOSING_EVENT, t ? {
							action: t
						} : {})
					},
					notifyOpened: function () {
						return n.emit(Ct.OPENED_EVENT, {})
					},
					notifyOpening: function () {
						return n.emit(Ct.OPENING_EVENT, {})
					},
					releaseFocus: function () {
						return n.focusTrap_.deactivate()
					},
					removeBodyClass: function (t) {
						return document.body.classList.remove(t)
					},
					removeClass: function (t) {
						return n.root_.classList.remove(t)
					},
					reverseButtons: function () {
						n.buttons_.reverse(), n.buttons_.forEach(function (t) {
							t.parentElement.appendChild(t)
						})
					},
					trapFocus: function () {
						return n.focusTrap_.activate()
					}
				})
			}, e
		}(t);
	var Tt = {
			LIST_ITEM_ACTIVATED_CLASS: "mdc-list-item--activated",
			LIST_ITEM_CLASS: "mdc-list-item",
			LIST_ITEM_DISABLED_CLASS: "mdc-list-item--disabled",
			LIST_ITEM_SELECTED_CLASS: "mdc-list-item--selected",
			ROOT: "mdc-list"
		},
		It = {
			ACTION_EVENT: "MDCList:action",
			ARIA_CHECKED: "aria-checked",
			ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
			ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
			ARIA_CURRENT: "aria-current",
			ARIA_ORIENTATION: "aria-orientation",
			ARIA_ORIENTATION_HORIZONTAL: "horizontal",
			ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
			ARIA_SELECTED: "aria-selected",
			CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"]:not(:disabled), input[type="radio"]:not(:disabled)',
			CHECKBOX_SELECTOR: 'input[type="checkbox"]:not(:disabled)',
			CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: "\n    ." + Tt.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + Tt.LIST_ITEM_CLASS + " a\n  ",
			FOCUSABLE_CHILD_ELEMENTS: "\n    ." + Tt.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + Tt.LIST_ITEM_CLASS + " a,\n    ." + Tt.LIST_ITEM_CLASS + ' input[type="radio"]:not(:disabled),\n    .' + Tt.LIST_ITEM_CLASS + ' input[type="checkbox"]:not(:disabled)\n  ',
			RADIO_SELECTOR: 'input[type="radio"]:not(:disabled)'
		},
		At = {
			UNSET_INDEX: -1
		},
		St = ["input", "button", "textarea", "select"];
	var Ot, Lt = function (n) {
			function i(t) {
				var e = n.call(this, a({}, i.defaultAdapter, t)) || this;
				return e.wrapFocus_ = !1, e.isVertical_ = !0, e.isSingleSelectionList_ = !1, e.selectedIndex_ = At.UNSET_INDEX, e.focusedItemIndex_ = At.UNSET_INDEX, e.useActivatedClass_ = !1, e.ariaCurrentAttrValue_ = null, e.isCheckboxList_ = !1, e.isRadioList_ = !1, e
			}
			return o(i, n), Object.defineProperty(i, "strings", {
				get: function () {
					return It
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "cssClasses", {
				get: function () {
					return Tt
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "numbers", {
				get: function () {
					return At
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "defaultAdapter", {
				get: function () {
					return {
						addClassForElementIndex: function () {},
						focusItemAtIndex: function () {},
						getAttributeForElementIndex: function () {
							return null
						},
						getFocusedElementIndex: function () {
							return 0
						},
						getListItemCount: function () {
							return 0
						},
						hasCheckboxAtIndex: function () {
							return !1
						},
						hasRadioAtIndex: function () {
							return !1
						},
						isCheckboxCheckedAtIndex: function () {
							return !1
						},
						isFocusInsideList: function () {
							return !1
						},
						isRootFocused: function () {
							return !1
						},
						notifyAction: function () {},
						removeClassForElementIndex: function () {},
						setAttributeForElementIndex: function () {},
						setCheckedCheckboxOrRadioAtIndex: function () {},
						setTabIndexForListItemChildren: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.layout = function () {
				0 !== this.adapter_.getListItemCount() && (this.adapter_.hasCheckboxAtIndex(0) ? this.isCheckboxList_ = !0 : this.adapter_.hasRadioAtIndex(0) && (this.isRadioList_ = !0))
			}, i.prototype.setWrapFocus = function (t) {
				this.wrapFocus_ = t
			}, i.prototype.setVerticalOrientation = function (t) {
				this.isVertical_ = t
			}, i.prototype.setSingleSelection = function (t) {
				this.isSingleSelectionList_ = t
			}, i.prototype.setUseActivatedClass = function (t) {
				this.useActivatedClass_ = t
			}, i.prototype.getSelectedIndex = function () {
				return this.selectedIndex_
			}, i.prototype.setSelectedIndex = function (t) {
				this.isIndexValid_(t) && (this.isCheckboxList_ ? this.setCheckboxAtIndex_(t) : this.isRadioList_ ? this.setRadioAtIndex_(t) : this.setSingleSelectionAtIndex_(t))
			}, i.prototype.handleFocusIn = function (t, e) {
				0 <= e && this.adapter_.setTabIndexForListItemChildren(e, "0")
			}, i.prototype.handleFocusOut = function (t, e) {
				var n = this;
				0 <= e && this.adapter_.setTabIndexForListItemChildren(e, "-1"), setTimeout(function () {
					n.adapter_.isFocusInsideList() || n.setTabindexToFirstSelectedItem_()
				}, 0)
			}, i.prototype.handleKeydown = function (t, e, n) {
				var i = "ArrowLeft" === t.key || 37 === t.keyCode,
					r = "ArrowUp" === t.key || 38 === t.keyCode,
					o = "ArrowRight" === t.key || 39 === t.keyCode,
					s = "ArrowDown" === t.key || 40 === t.keyCode,
					a = "Home" === t.key || 36 === t.keyCode,
					c = "End" === t.key || 35 === t.keyCode,
					l = "Enter" === t.key || 13 === t.keyCode,
					u = "Space" === t.key || 32 === t.keyCode;
				if (this.adapter_.isRootFocused()) r || c ? (t.preventDefault(), this.focusLastElement()) : (s || a) && (t.preventDefault(), this.focusFirstElement());
				else {
					var d = this.adapter_.getFocusedElementIndex();
					if (!(-1 === d && (d = n) < 0)) {
						var h;
						if (this.isVertical_ && s || !this.isVertical_ && o) this.preventDefaultEvent_(t), h = this.focusNextElement(d);
						else if (this.isVertical_ && r || !this.isVertical_ && i) this.preventDefaultEvent_(t), h = this.focusPrevElement(d);
						else if (a) this.preventDefaultEvent_(t), h = this.focusFirstElement();
						else if (c) this.preventDefaultEvent_(t), h = this.focusLastElement();
						else if ((l || u) && e) {
							var p = t.target;
							if (p && "A" === p.tagName && l) return;
							this.preventDefaultEvent_(t), this.isSelectableList_() && this.setSelectedIndexOnAction_(d), this.adapter_.notifyAction(d)
						}
						this.focusedItemIndex_ = d, void 0 !== h && (this.setTabindexAtIndex_(h), this.focusedItemIndex_ = h)
					}
				}
			}, i.prototype.handleClick = function (t, e) {
				t !== At.UNSET_INDEX && (this.isSelectableList_() && this.setSelectedIndexOnAction_(t, e), this.adapter_.notifyAction(t), this.setTabindexAtIndex_(t), this.focusedItemIndex_ = t)
			}, i.prototype.focusNextElement = function (t) {
				var e = t + 1;
				if (this.adapter_.getListItemCount() <= e) {
					if (!this.wrapFocus_) return t;
					e = 0
				}
				return this.adapter_.focusItemAtIndex(e), e
			}, i.prototype.focusPrevElement = function (t) {
				var e = t - 1;
				if (e < 0) {
					if (!this.wrapFocus_) return t;
					e = this.adapter_.getListItemCount() - 1
				}
				return this.adapter_.focusItemAtIndex(e), e
			}, i.prototype.focusFirstElement = function () {
				return this.adapter_.focusItemAtIndex(0), 0
			}, i.prototype.focusLastElement = function () {
				var t = this.adapter_.getListItemCount() - 1;
				return this.adapter_.focusItemAtIndex(t), t
			}, i.prototype.preventDefaultEvent_ = function (t) {
				var e = ("" + t.target.tagName).toLowerCase(); - 1 === St.indexOf(e) && t.preventDefault()
			}, i.prototype.setSingleSelectionAtIndex_ = function (t) {
				if (this.selectedIndex_ !== t) {
					var e = Tt.LIST_ITEM_SELECTED_CLASS;
					this.useActivatedClass_ && (e = Tt.LIST_ITEM_ACTIVATED_CLASS), this.selectedIndex_ !== At.UNSET_INDEX && this.adapter_.removeClassForElementIndex(this.selectedIndex_, e), this.adapter_.addClassForElementIndex(t, e), this.setAriaForSingleSelectionAtIndex_(t), this.selectedIndex_ = t
				}
			}, i.prototype.setAriaForSingleSelectionAtIndex_ = function (t) {
				this.selectedIndex_ === At.UNSET_INDEX && (this.ariaCurrentAttrValue_ = this.adapter_.getAttributeForElementIndex(t, It.ARIA_CURRENT));
				var e = null !== this.ariaCurrentAttrValue_,
					n = e ? It.ARIA_CURRENT : It.ARIA_SELECTED;
				this.selectedIndex_ !== At.UNSET_INDEX && this.adapter_.setAttributeForElementIndex(this.selectedIndex_, n, "false");
				var i = e ? this.ariaCurrentAttrValue_ : "true";
				this.adapter_.setAttributeForElementIndex(t, n, i)
			}, i.prototype.setRadioAtIndex_ = function (t) {
				this.adapter_.setCheckedCheckboxOrRadioAtIndex(t, !0), this.selectedIndex_ !== At.UNSET_INDEX && this.adapter_.setAttributeForElementIndex(this.selectedIndex_, It.ARIA_CHECKED, "false"), this.adapter_.setAttributeForElementIndex(t, It.ARIA_CHECKED, "true"), this.selectedIndex_ = t
			}, i.prototype.setCheckboxAtIndex_ = function (t) {
				for (var e = 0; e < this.adapter_.getListItemCount(); e++) {
					var n = !1;
					0 <= t.indexOf(e) && (n = !0), this.adapter_.setCheckedCheckboxOrRadioAtIndex(e, n), this.adapter_.setAttributeForElementIndex(e, It.ARIA_CHECKED, n ? "true" : "false")
				}
				this.selectedIndex_ = t
			}, i.prototype.setTabindexAtIndex_ = function (t) {
				this.focusedItemIndex_ === At.UNSET_INDEX && 0 !== t ? this.adapter_.setAttributeForElementIndex(0, "tabindex", "-1") : 0 <= this.focusedItemIndex_ && this.focusedItemIndex_ !== t && this.adapter_.setAttributeForElementIndex(this.focusedItemIndex_, "tabindex", "-1"), this.adapter_.setAttributeForElementIndex(t, "tabindex", "0")
			}, i.prototype.isSelectableList_ = function () {
				return this.isSingleSelectionList_ || this.isCheckboxList_ || this.isRadioList_
			}, i.prototype.setTabindexToFirstSelectedItem_ = function () {
				var t = 0;
				this.isSelectableList_() && ("number" == typeof this.selectedIndex_ && this.selectedIndex_ !== At.UNSET_INDEX ? t = this.selectedIndex_ : this.selectedIndex_ instanceof Array && 0 < this.selectedIndex_.length && (t = this.selectedIndex_.reduce(function (t, e) {
					return Math.min(t, e)
				}))), this.setTabindexAtIndex_(t)
			}, i.prototype.isIndexValid_ = function (t) {
				var e = this;
				if (t instanceof Array) {
					if (!this.isCheckboxList_) throw new Error("MDCListFoundation: Array of index is only supported for checkbox based list");
					return 0 === t.length || t.some(function (t) {
						return e.isIndexInRange_(t)
					})
				}
				if ("number" == typeof t) {
					if (this.isCheckboxList_) throw new Error("MDCListFoundation: Expected array of index for checkbox based list but got number: " + t);
					return this.isIndexInRange_(t)
				}
				return !1
			}, i.prototype.isIndexInRange_ = function (t) {
				var e = this.adapter_.getListItemCount();
				return 0 <= t && t < e
			}, i.prototype.setSelectedIndexOnAction_ = function (t, e) {
				void 0 === e && (e = !0), this.isCheckboxList_ ? this.toggleCheckboxAtIndex_(t, e) : this.setSelectedIndex(t)
			}, i.prototype.toggleCheckboxAtIndex_ = function (e, t) {
				var n = this.adapter_.isCheckboxCheckedAtIndex(e);
				t && (n = !n, this.adapter_.setCheckedCheckboxOrRadioAtIndex(e, n)), this.adapter_.setAttributeForElementIndex(e, It.ARIA_CHECKED, n ? "true" : "false");
				var i = this.selectedIndex_ === At.UNSET_INDEX ? [] : this.selectedIndex_.slice();
				n ? i.push(e) : i = i.filter(function (t) {
					return t !== e
				}), this.selectedIndex_ = i
			}, i
		}(n),
		Rt = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), Object.defineProperty(e.prototype, "vertical", {
				set: function (t) {
					this.foundation_.setVerticalOrientation(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "listElements", {
				get: function () {
					return [].slice.call(this.root_.querySelectorAll("." + Tt.LIST_ITEM_CLASS))
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "wrapFocus", {
				set: function (t) {
					this.foundation_.setWrapFocus(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "singleSelection", {
				set: function (t) {
					this.foundation_.setSingleSelection(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "selectedIndex", {
				get: function () {
					return this.foundation_.getSelectedIndex()
				},
				set: function (t) {
					this.foundation_.setSelectedIndex(t)
				},
				enumerable: !0,
				configurable: !0
			}), e.attachTo = function (t) {
				return new e(t)
			}, e.prototype.initialSyncWithDOM = function () {
				this.handleClick_ = this.handleClickEvent_.bind(this), this.handleKeydown_ = this.handleKeydownEvent_.bind(this), this.focusInEventListener_ = this.handleFocusInEvent_.bind(this), this.focusOutEventListener_ = this.handleFocusOutEvent_.bind(this), this.listen("keydown", this.handleKeydown_), this.listen("click", this.handleClick_), this.listen("focusin", this.focusInEventListener_), this.listen("focusout", this.focusOutEventListener_), this.layout(), this.initializeListType()
			}, e.prototype.destroy = function () {
				this.unlisten("keydown", this.handleKeydown_), this.unlisten("click", this.handleClick_), this.unlisten("focusin", this.focusInEventListener_), this.unlisten("focusout", this.focusOutEventListener_)
			}, e.prototype.layout = function () {
				var t = this.root_.getAttribute(It.ARIA_ORIENTATION);
				this.vertical = t !== It.ARIA_ORIENTATION_HORIZONTAL, [].slice.call(this.root_.querySelectorAll(".mdc-list-item:not([tabindex])")).forEach(function (t) {
					t.setAttribute("tabindex", "-1")
				}), [].slice.call(this.root_.querySelectorAll(It.FOCUSABLE_CHILD_ELEMENTS)).forEach(function (t) {
					return t.setAttribute("tabindex", "-1")
				}), this.foundation_.layout()
			}, e.prototype.initializeListType = function () {
				var e = this,
					t = this.root_.querySelectorAll(It.ARIA_ROLE_CHECKBOX_SELECTOR),
					n = this.root_.querySelector("\n      ." + Tt.LIST_ITEM_ACTIVATED_CLASS + ",\n      ." + Tt.LIST_ITEM_SELECTED_CLASS + "\n    "),
					i = this.root_.querySelector(It.ARIA_CHECKED_RADIO_SELECTOR);
				if (t.length) {
					var r = this.root_.querySelectorAll(It.ARIA_CHECKED_CHECKBOX_SELECTOR);
					this.selectedIndex = [].map.call(r, function (t) {
						return e.listElements.indexOf(t)
					})
				} else n ? (n.classList.contains(Tt.LIST_ITEM_ACTIVATED_CLASS) && this.foundation_.setUseActivatedClass(!0), this.singleSelection = !0, this.selectedIndex = this.listElements.indexOf(n)) : i && (this.selectedIndex = this.listElements.indexOf(i))
			}, e.prototype.getDefaultFoundation = function () {
				var r = this;
				return new Lt({
					addClassForElementIndex: function (t, e) {
						var n = r.listElements[t];
						n && n.classList.add(e)
					},
					focusItemAtIndex: function (t) {
						var e = r.listElements[t];
						e && e.focus()
					},
					getAttributeForElementIndex: function (t, e) {
						return r.listElements[t].getAttribute(e)
					},
					getFocusedElementIndex: function () {
						return r.listElements.indexOf(document.activeElement)
					},
					getListItemCount: function () {
						return r.listElements.length
					},
					hasCheckboxAtIndex: function (t) {
						return !!r.listElements[t].querySelector(It.CHECKBOX_SELECTOR)
					},
					hasRadioAtIndex: function (t) {
						return !!r.listElements[t].querySelector(It.RADIO_SELECTOR)
					},
					isCheckboxCheckedAtIndex: function (t) {
						return r.listElements[t].querySelector(It.CHECKBOX_SELECTOR).checked
					},
					isFocusInsideList: function () {
						return r.root_.contains(document.activeElement)
					},
					isRootFocused: function () {
						return document.activeElement === r.root_
					},
					notifyAction: function (t) {
						r.emit(It.ACTION_EVENT, {
							index: t
						}, !0)
					},
					removeClassForElementIndex: function (t, e) {
						var n = r.listElements[t];
						n && n.classList.remove(e)
					},
					setAttributeForElementIndex: function (t, e, n) {
						var i = r.listElements[t];
						i && i.setAttribute(e, n)
					},
					setCheckedCheckboxOrRadioAtIndex: function (t, e) {
						var n = r.listElements[t].querySelector(It.CHECKBOX_RADIO_SELECTOR);
						n.checked = e;
						var i = document.createEvent("Event");
						i.initEvent("change", !0, !0), n.dispatchEvent(i)
					},
					setTabIndexForListItemChildren: function (t, e) {
						var n = r.listElements[t];
						[].slice.call(n.querySelectorAll(It.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX)).forEach(function (t) {
							return t.setAttribute("tabindex", e)
						})
					}
				})
			}, e.prototype.getListItemIndex_ = function (t) {
				var e = p(t.target, "." + Tt.LIST_ITEM_CLASS + ", ." + Tt.ROOT);
				return e && f(e, "." + Tt.LIST_ITEM_CLASS) ? this.listElements.indexOf(e) : -1
			}, e.prototype.handleFocusInEvent_ = function (t) {
				var e = this.getListItemIndex_(t);
				this.foundation_.handleFocusIn(t, e)
			}, e.prototype.handleFocusOutEvent_ = function (t) {
				var e = this.getListItemIndex_(t);
				this.foundation_.handleFocusOut(t, e)
			}, e.prototype.handleKeydownEvent_ = function (t) {
				var e = this.getListItemIndex_(t),
					n = t.target;
				this.foundation_.handleKeydown(t, n.classList.contains(Tt.LIST_ITEM_CLASS), e)
			}, e.prototype.handleClickEvent_ = function (t) {
				var e = this.getListItemIndex_(t),
					n = !f(t.target, It.CHECKBOX_RADIO_SELECTOR);
				this.foundation_.handleClick(e, n)
			}, e
		}(t),
		wt = {
			ANIMATE: "mdc-drawer--animate",
			CLOSING: "mdc-drawer--closing",
			DISMISSIBLE: "mdc-drawer--dismissible",
			MODAL: "mdc-drawer--modal",
			OPEN: "mdc-drawer--open",
			OPENING: "mdc-drawer--opening",
			ROOT: "mdc-drawer"
		},
		xt = {
			APP_CONTENT_SELECTOR: ".mdc-drawer-app-content",
			CLOSE_EVENT: "MDCDrawer:closed",
			OPEN_EVENT: "MDCDrawer:opened",
			SCRIM_SELECTOR: ".mdc-drawer-scrim"
		},
		Nt = function (n) {
			function i(t) {
				var e = n.call(this, a({}, i.defaultAdapter, t)) || this;
				return e.animationFrame_ = 0, e.animationTimer_ = 0, e
			}
			return o(i, n), Object.defineProperty(i, "strings", {
				get: function () {
					return xt
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "cssClasses", {
				get: function () {
					return wt
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "defaultAdapter", {
				get: function () {
					return {
						addClass: function () {},
						removeClass: function () {},
						hasClass: function () {
							return !1
						},
						elementHasClass: function () {
							return !1
						},
						notifyClose: function () {},
						notifyOpen: function () {},
						saveFocus: function () {},
						restoreFocus: function () {},
						focusActiveNavigationItem: function () {},
						trapFocus: function () {},
						releaseFocus: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.destroy = function () {
				this.animationFrame_ && cancelAnimationFrame(this.animationFrame_), this.animationTimer_ && clearTimeout(this.animationTimer_)
			}, i.prototype.open = function () {
				var t = this;
				this.isOpen() || this.isOpening() || this.isClosing() || (this.adapter_.addClass(wt.OPEN), this.adapter_.addClass(wt.ANIMATE), this.runNextAnimationFrame_(function () {
					t.adapter_.addClass(wt.OPENING)
				}), this.adapter_.saveFocus())
			}, i.prototype.close = function () {
				!this.isOpen() || this.isOpening() || this.isClosing() || this.adapter_.addClass(wt.CLOSING)
			}, i.prototype.isOpen = function () {
				return this.adapter_.hasClass(wt.OPEN)
			}, i.prototype.isOpening = function () {
				return this.adapter_.hasClass(wt.OPENING) || this.adapter_.hasClass(wt.ANIMATE)
			}, i.prototype.isClosing = function () {
				return this.adapter_.hasClass(wt.CLOSING)
			}, i.prototype.handleKeydown = function (t) {
				var e = t.keyCode;
				("Escape" === t.key || 27 === e) && this.close()
			}, i.prototype.handleTransitionEnd = function (t) {
				var e = wt.OPENING,
					n = wt.CLOSING,
					i = wt.OPEN,
					r = wt.ANIMATE,
					o = wt.ROOT;
				this.isElement_(t.target) && this.adapter_.elementHasClass(t.target, o) && (this.isClosing() ? (this.adapter_.removeClass(i), this.closed_(), this.adapter_.restoreFocus(), this.adapter_.notifyClose()) : (this.adapter_.focusActiveNavigationItem(), this.opened_(), this.adapter_.notifyOpen()), this.adapter_.removeClass(r), this.adapter_.removeClass(e), this.adapter_.removeClass(n))
			}, i.prototype.opened_ = function () {}, i.prototype.closed_ = function () {}, i.prototype.runNextAnimationFrame_ = function (t) {
				var e = this;
				cancelAnimationFrame(this.animationFrame_), this.animationFrame_ = requestAnimationFrame(function () {
					e.animationFrame_ = 0, clearTimeout(e.animationTimer_), e.animationTimer_ = setTimeout(t, 0)
				})
			}, i.prototype.isElement_ = function (t) {
				return Boolean(t.classList)
			}, i
		}(n),
		Dt = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.prototype.handleScrimClick = function () {
				this.close()
			}, e.prototype.opened_ = function () {
				this.adapter_.trapFocus()
			}, e.prototype.closed_ = function () {
				this.adapter_.releaseFocus()
			}, e
		}(Nt),
		kt = Nt.cssClasses,
		Mt = Nt.strings,
		Pt = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, Object.defineProperty(e.prototype, "open", {
				get: function () {
					return this.foundation_.isOpen()
				},
				set: function (t) {
					t ? this.foundation_.open() : this.foundation_.close()
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "list", {
				get: function () {
					return this.list_
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.initialize = function (t, e) {
				void 0 === t && (t = mt), void 0 === e && (e = function (t) {
					return new Rt(t)
				});
				var n = this.root_.querySelector("." + Lt.cssClasses.ROOT);
				n && (this.list_ = e(n), this.list_.wrapFocus = !0), this.focusTrapFactory_ = t
			}, e.prototype.initialSyncWithDOM = function () {
				var t, e, n = this,
					i = kt.MODAL,
					r = Mt.SCRIM_SELECTOR;
				this.scrim_ = this.root_.parentNode.querySelector(r), this.scrim_ && this.root_.classList.contains(i) && (this.handleScrimClick_ = function () {
					return n.foundation_.handleScrimClick()
				}, this.scrim_.addEventListener("click", this.handleScrimClick_), this.focusTrap_ = (t = this.root_, void 0 === (e = this.focusTrapFactory_) && (e = mt), e(t, {
					clickOutsideDeactivates: !0,
					escapeDeactivates: !1,
					initialFocus: void 0,
					returnFocusOnDeactivate: !1
				}))), this.handleKeydown_ = function (t) {
					return n.foundation_.handleKeydown(t)
				}, this.handleTransitionEnd_ = function (t) {
					return n.foundation_.handleTransitionEnd(t)
				}, this.listen("keydown", this.handleKeydown_), this.listen("transitionend", this.handleTransitionEnd_)
			}, e.prototype.destroy = function () {
				this.unlisten("keydown", this.handleKeydown_), this.unlisten("transitionend", this.handleTransitionEnd_), this.list_ && this.list_.destroy();
				var t = kt.MODAL;
				this.scrim_ && this.handleScrimClick_ && this.root_.classList.contains(t) && (this.scrim_.removeEventListener("click", this.handleScrimClick_), this.open = !1)
			}, e.prototype.getDefaultFoundation = function () {
				var e = this,
					t = {
						addClass: function (t) {
							return e.root_.classList.add(t)
						},
						removeClass: function (t) {
							return e.root_.classList.remove(t)
						},
						hasClass: function (t) {
							return e.root_.classList.contains(t)
						},
						elementHasClass: function (t, e) {
							return t.classList.contains(e)
						},
						saveFocus: function () {
							return e.previousFocus_ = document.activeElement
						},
						restoreFocus: function () {
							var t = e.previousFocus_;
							t && t.focus && e.root_.contains(document.activeElement) && t.focus()
						},
						focusActiveNavigationItem: function () {
							var t = e.root_.querySelector("." + Lt.cssClasses.LIST_ITEM_ACTIVATED_CLASS);
							t && t.focus()
						},
						notifyClose: function () {
							return e.emit(Mt.CLOSE_EVENT, {}, !0)
						},
						notifyOpen: function () {
							return e.emit(Mt.OPEN_EVENT, {}, !0)
						},
						trapFocus: function () {
							return e.focusTrap_.activate()
						},
						releaseFocus: function () {
							return e.focusTrap_.deactivate()
						}
					},
					n = kt.DISMISSIBLE,
					i = kt.MODAL;
				if (this.root_.classList.contains(n)) return new Nt(t);
				if (this.root_.classList.contains(i)) return new Dt(t);
				throw new Error("MDCDrawer: Failed to instantiate component. Supported variants are " + n + " and " + i + ".")
			}, e
		}(t),
		Ht = {
			LABEL_FLOAT_ABOVE: "mdc-floating-label--float-above",
			LABEL_SHAKE: "mdc-floating-label--shake",
			ROOT: "mdc-floating-label"
		},
		Ft = function (n) {
			function r(t) {
				var e = n.call(this, a({}, r.defaultAdapter, t)) || this;
				return e.shakeAnimationEndHandler_ = function () {
					return e.handleShakeAnimationEnd_()
				}, e
			}
			return o(r, n), Object.defineProperty(r, "cssClasses", {
				get: function () {
					return Ht
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(r, "defaultAdapter", {
				get: function () {
					return {
						addClass: function () {},
						removeClass: function () {},
						getWidth: function () {
							return 0
						},
						registerInteractionHandler: function () {},
						deregisterInteractionHandler: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), r.prototype.init = function () {
				this.adapter_.registerInteractionHandler("animationend", this.shakeAnimationEndHandler_)
			}, r.prototype.destroy = function () {
				this.adapter_.deregisterInteractionHandler("animationend", this.shakeAnimationEndHandler_)
			}, r.prototype.getWidth = function () {
				return this.adapter_.getWidth()
			}, r.prototype.shake = function (t) {
				var e = r.cssClasses.LABEL_SHAKE;
				t ? this.adapter_.addClass(e) : this.adapter_.removeClass(e)
			}, r.prototype.float = function (t) {
				var e = r.cssClasses,
					n = e.LABEL_FLOAT_ABOVE,
					i = e.LABEL_SHAKE;
				t ? this.adapter_.addClass(n) : (this.adapter_.removeClass(n), this.adapter_.removeClass(i))
			}, r.prototype.handleShakeAnimationEnd_ = function () {
				var t = r.cssClasses.LABEL_SHAKE;
				this.adapter_.removeClass(t)
			}, r
		}(n),
		Bt = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, e.prototype.shake = function (t) {
				this.foundation_.shake(t)
			}, e.prototype.float = function (t) {
				this.foundation_.float(t)
			}, e.prototype.getWidth = function () {
				return this.foundation_.getWidth()
			}, e.prototype.getDefaultFoundation = function () {
				var n = this;
				return new Ft({
					addClass: function (t) {
						return n.root_.classList.add(t)
					},
					removeClass: function (t) {
						return n.root_.classList.remove(t)
					},
					getWidth: function () {
						return n.root_.scrollWidth
					},
					registerInteractionHandler: function (t, e) {
						return n.listen(t, e)
					},
					deregisterInteractionHandler: function (t, e) {
						return n.unlisten(t, e)
					}
				})
			}, e
		}(t),
		Vt = {
			ROOT: "mdc-form-field"
		},
		jt = {
			LABEL_SELECTOR: ".mdc-form-field > label"
		},
		zt = function (n) {
			function i(t) {
				var e = n.call(this, a({}, i.defaultAdapter, t)) || this;
				return e.clickHandler_ = function () {
					return e.handleClick_()
				}, e
			}
			return o(i, n), Object.defineProperty(i, "cssClasses", {
				get: function () {
					return Vt
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "strings", {
				get: function () {
					return jt
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "defaultAdapter", {
				get: function () {
					return {
						activateInputRipple: function () {},
						deactivateInputRipple: function () {},
						deregisterInteractionHandler: function () {},
						registerInteractionHandler: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.init = function () {
				this.adapter_.registerInteractionHandler("click", this.clickHandler_)
			}, i.prototype.destroy = function () {
				this.adapter_.deregisterInteractionHandler("click", this.clickHandler_)
			}, i.prototype.handleClick_ = function () {
				var t = this;
				this.adapter_.activateInputRipple(), requestAnimationFrame(function () {
					return t.adapter_.deactivateInputRipple()
				})
			}, i
		}(n),
		Ut = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, Object.defineProperty(e.prototype, "input", {
				get: function () {
					return this.input_
				},
				set: function (t) {
					this.input_ = t
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "label_", {
				get: function () {
					var t = zt.strings.LABEL_SELECTOR;
					return this.root_.querySelector(t)
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.getDefaultFoundation = function () {
				var n = this;
				return new zt({
					activateInputRipple: function () {
						n.input_ && n.input_.ripple && n.input_.ripple.activate()
					},
					deactivateInputRipple: function () {
						n.input_ && n.input_.ripple && n.input_.ripple.deactivate()
					},
					deregisterInteractionHandler: function (t, e) {
						n.label_ && n.label_.removeEventListener(t, e)
					},
					registerInteractionHandler: function (t, e) {
						n.label_ && n.label_.addEventListener(t, e)
					}
				})
			}, e
		}(t),
		Kt = {
			TILES_SELECTOR: ".mdc-grid-list__tiles",
			TILE_SELECTOR: ".mdc-grid-tile"
		},
		qt = function (n) {
			function i(t) {
				var e = n.call(this, a({}, i.defaultAdapter, t)) || this;
				return e.resizeFrame_ = 0, e.resizeHandler_ = e.alignCenter.bind(e), e
			}
			return o(i, n), Object.defineProperty(i, "strings", {
				get: function () {
					return Kt
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "defaultAdapter", {
				get: function () {
					return {
						deregisterResizeHandler: function () {},
						getNumberOfTiles: function () {
							return 0
						},
						getOffsetWidth: function () {
							return 0
						},
						getOffsetWidthForTileAtIndex: function () {
							return 0
						},
						registerResizeHandler: function () {},
						setStyleForTilesElement: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.init = function () {
				this.alignCenter(), this.adapter_.registerResizeHandler(this.resizeHandler_)
			}, i.prototype.destroy = function () {
				this.adapter_.deregisterResizeHandler(this.resizeHandler_)
			}, i.prototype.alignCenter = function () {
				var t = this;
				cancelAnimationFrame(this.resizeFrame_), this.resizeFrame_ = requestAnimationFrame(function () {
					t.alignCenter_(), t.resizeFrame_ = 0
				})
			}, i.prototype.alignCenter_ = function () {
				if (0 !== this.adapter_.getNumberOfTiles()) {
					var t = this.adapter_.getOffsetWidth(),
						e = this.adapter_.getOffsetWidthForTileAtIndex(0),
						n = e * Math.floor(t / e);
					this.adapter_.setStyleForTilesElement("width", n + "px")
				}
			}, i
		}(n),
		Wt = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, e.prototype.getDefaultFoundation = function () {
				var n = this;
				return new qt({
					deregisterResizeHandler: function (t) {
						return window.removeEventListener("resize", t)
					},
					getNumberOfTiles: function () {
						return n.root_.querySelectorAll(qt.strings.TILE_SELECTOR).length
					},
					getOffsetWidth: function () {
						return n.root_.offsetWidth
					},
					getOffsetWidthForTileAtIndex: function (t) {
						return n.root_.querySelectorAll(qt.strings.TILE_SELECTOR)[t].offsetWidth
					},
					registerResizeHandler: function (t) {
						return window.addEventListener("resize", t)
					},
					setStyleForTilesElement: function (t, e) {
						n.root_.querySelector(qt.strings.TILES_SELECTOR).style[t] = e
					}
				})
			}, e
		}(t),
		$t = {
			ICON_BUTTON_ON: "mdc-icon-button--on",
			ROOT: "mdc-icon-button"
		},
		Gt = {
			ARIA_PRESSED: "aria-pressed",
			CHANGE_EVENT: "MDCIconButtonToggle:change"
		},
		Xt = function (e) {
			function n(t) {
				return e.call(this, a({}, n.defaultAdapter, t)) || this
			}
			return o(n, e), Object.defineProperty(n, "cssClasses", {
				get: function () {
					return $t
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n, "strings", {
				get: function () {
					return Gt
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n, "defaultAdapter", {
				get: function () {
					return {
						addClass: function () {},
						hasClass: function () {
							return !1
						},
						notifyChange: function () {},
						removeClass: function () {},
						setAttr: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), n.prototype.init = function () {
				this.adapter_.setAttr(Gt.ARIA_PRESSED, "" + this.isOn())
			}, n.prototype.handleClick = function () {
				this.toggle(), this.adapter_.notifyChange({
					isOn: this.isOn()
				})
			}, n.prototype.isOn = function () {
				return this.adapter_.hasClass($t.ICON_BUTTON_ON)
			}, n.prototype.toggle = function (t) {
				void 0 === t && (t = !this.isOn()), t ? this.adapter_.addClass($t.ICON_BUTTON_ON) : this.adapter_.removeClass($t.ICON_BUTTON_ON), this.adapter_.setAttr(Gt.ARIA_PRESSED, "" + t)
			}, n
		}(n),
		Yt = Xt.strings,
		Qt = function (e) {
			function n() {
				var t = null !== e && e.apply(this, arguments) || this;
				return t.ripple_ = t.createRipple_(), t
			}
			return o(n, e), n.attachTo = function (t) {
				return new n(t)
			}, n.prototype.initialSyncWithDOM = function () {
				var t = this;
				this.handleClick_ = function () {
					return t.foundation_.handleClick()
				}, this.listen("click", this.handleClick_)
			}, n.prototype.destroy = function () {
				this.unlisten("click", this.handleClick_), this.ripple_.destroy(), e.prototype.destroy.call(this)
			}, n.prototype.getDefaultFoundation = function () {
				var n = this;
				return new Xt({
					addClass: function (t) {
						return n.root_.classList.add(t)
					},
					hasClass: function (t) {
						return n.root_.classList.contains(t)
					},
					notifyChange: function (t) {
						return n.emit(Yt.CHANGE_EVENT, t)
					},
					removeClass: function (t) {
						return n.root_.classList.remove(t)
					},
					setAttr: function (t, e) {
						return n.root_.setAttribute(t, e)
					}
				})
			}, Object.defineProperty(n.prototype, "ripple", {
				get: function () {
					return this.ripple_
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n.prototype, "on", {
				get: function () {
					return this.foundation_.isOn()
				},
				set: function (t) {
					this.foundation_.toggle(t)
				},
				enumerable: !0,
				configurable: !0
			}), n.prototype.createRipple_ = function () {
				var t = new L(this.root_);
				return t.unbounded = !0, t
			}, n
		}(t),
		Zt = {
			LINE_RIPPLE_ACTIVE: "mdc-line-ripple--active",
			LINE_RIPPLE_DEACTIVATING: "mdc-line-ripple--deactivating"
		},
		Jt = function (n) {
			function i(t) {
				var e = n.call(this, a({}, i.defaultAdapter, t)) || this;
				return e.transitionEndHandler_ = function (t) {
					return e.handleTransitionEnd(t)
				}, e
			}
			return o(i, n), Object.defineProperty(i, "cssClasses", {
				get: function () {
					return Zt
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "defaultAdapter", {
				get: function () {
					return {
						addClass: function () {},
						removeClass: function () {},
						hasClass: function () {
							return !1
						},
						setStyle: function () {},
						registerEventHandler: function () {},
						deregisterEventHandler: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.init = function () {
				this.adapter_.registerEventHandler("transitionend", this.transitionEndHandler_)
			}, i.prototype.destroy = function () {
				this.adapter_.deregisterEventHandler("transitionend", this.transitionEndHandler_)
			}, i.prototype.activate = function () {
				this.adapter_.removeClass(Zt.LINE_RIPPLE_DEACTIVATING), this.adapter_.addClass(Zt.LINE_RIPPLE_ACTIVE)
			}, i.prototype.setRippleCenter = function (t) {
				this.adapter_.setStyle("transform-origin", t + "px center")
			}, i.prototype.deactivate = function () {
				this.adapter_.addClass(Zt.LINE_RIPPLE_DEACTIVATING)
			}, i.prototype.handleTransitionEnd = function (t) {
				var e = this.adapter_.hasClass(Zt.LINE_RIPPLE_DEACTIVATING);
				"opacity" === t.propertyName && e && (this.adapter_.removeClass(Zt.LINE_RIPPLE_ACTIVE), this.adapter_.removeClass(Zt.LINE_RIPPLE_DEACTIVATING))
			}, i
		}(n),
		te = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, e.prototype.activate = function () {
				this.foundation_.activate()
			}, e.prototype.deactivate = function () {
				this.foundation_.deactivate()
			}, e.prototype.setRippleCenter = function (t) {
				this.foundation_.setRippleCenter(t)
			}, e.prototype.getDefaultFoundation = function () {
				var n = this;
				return new Jt({
					addClass: function (t) {
						return n.root_.classList.add(t)
					},
					removeClass: function (t) {
						return n.root_.classList.remove(t)
					},
					hasClass: function (t) {
						return n.root_.classList.contains(t)
					},
					setStyle: function (t, e) {
						return n.root_.style.setProperty(t, e)
					},
					registerEventHandler: function (t, e) {
						return n.listen(t, e)
					},
					deregisterEventHandler: function (t, e) {
						return n.unlisten(t, e)
					}
				})
			}, e
		}(t),
		ee = {
			CLOSED_CLASS: "mdc-linear-progress--closed",
			INDETERMINATE_CLASS: "mdc-linear-progress--indeterminate",
			REVERSED_CLASS: "mdc-linear-progress--reversed"
		},
		ne = {
			BUFFER_SELECTOR: ".mdc-linear-progress__buffer",
			PRIMARY_BAR_SELECTOR: ".mdc-linear-progress__primary-bar"
		},
		ie = function (e) {
			function n(t) {
				return e.call(this, a({}, n.defaultAdapter, t)) || this
			}
			return o(n, e), Object.defineProperty(n, "cssClasses", {
				get: function () {
					return ee
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n, "strings", {
				get: function () {
					return ne
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n, "defaultAdapter", {
				get: function () {
					return {
						addClass: function () {},
						getBuffer: function () {
							return null
						},
						getPrimaryBar: function () {
							return null
						},
						hasClass: function () {
							return !1
						},
						removeClass: function () {},
						setStyle: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), n.prototype.init = function () {
				this.isDeterminate_ = !this.adapter_.hasClass(ee.INDETERMINATE_CLASS), this.isReversed_ = this.adapter_.hasClass(ee.REVERSED_CLASS), this.progress_ = 0
			}, n.prototype.setDeterminate = function (t) {
				this.isDeterminate_ = t, this.isDeterminate_ ? (this.adapter_.removeClass(ee.INDETERMINATE_CLASS), this.setScale_(this.adapter_.getPrimaryBar(), this.progress_)) : (this.adapter_.addClass(ee.INDETERMINATE_CLASS), this.setScale_(this.adapter_.getPrimaryBar(), 1), this.setScale_(this.adapter_.getBuffer(), 1))
			}, n.prototype.setProgress = function (t) {
				this.progress_ = t, this.isDeterminate_ && this.setScale_(this.adapter_.getPrimaryBar(), t)
			}, n.prototype.setBuffer = function (t) {
				this.isDeterminate_ && this.setScale_(this.adapter_.getBuffer(), t)
			}, n.prototype.setReverse = function (t) {
				this.isReversed_ = t, this.isReversed_ ? this.adapter_.addClass(ee.REVERSED_CLASS) : this.adapter_.removeClass(ee.REVERSED_CLASS)
			}, n.prototype.open = function () {
				this.adapter_.removeClass(ee.CLOSED_CLASS)
			}, n.prototype.close = function () {
				this.adapter_.addClass(ee.CLOSED_CLASS)
			}, n.prototype.setScale_ = function (t, e) {
				if (t) {
					var n = "scaleX(" + e + ")";
					this.adapter_.setStyle(t, d(window, "transform"), n)
				}
			}, n
		}(n),
		re = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, Object.defineProperty(e.prototype, "determinate", {
				set: function (t) {
					this.foundation_.setDeterminate(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "progress", {
				set: function (t) {
					this.foundation_.setProgress(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "buffer", {
				set: function (t) {
					this.foundation_.setBuffer(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "reverse", {
				set: function (t) {
					this.foundation_.setReverse(t)
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.open = function () {
				this.foundation_.open()
			}, e.prototype.close = function () {
				this.foundation_.close()
			}, e.prototype.getDefaultFoundation = function () {
				var e = this;
				return new ie({
					addClass: function (t) {
						return e.root_.classList.add(t)
					},
					getBuffer: function () {
						return e.root_.querySelector(ie.strings.BUFFER_SELECTOR)
					},
					getPrimaryBar: function () {
						return e.root_.querySelector(ie.strings.PRIMARY_BAR_SELECTOR)
					},
					hasClass: function (t) {
						return e.root_.classList.contains(t)
					},
					removeClass: function (t) {
						return e.root_.classList.remove(t)
					},
					setStyle: function (t, e, n) {
						return t.style.setProperty(e, n)
					}
				})
			}, e
		}(t);
	var oe, se, ae, ce, le = {
			ANCHOR: "mdc-menu-surface--anchor",
			ANIMATING_CLOSED: "mdc-menu-surface--animating-closed",
			ANIMATING_OPEN: "mdc-menu-surface--animating-open",
			FIXED: "mdc-menu-surface--fixed",
			OPEN: "mdc-menu-surface--open",
			ROOT: "mdc-menu-surface"
		},
		ue = {
			CLOSED_EVENT: "MDCMenuSurface:closed",
			OPENED_EVENT: "MDCMenuSurface:opened",
			FOCUSABLE_ELEMENTS: ["button:not(:disabled)", '[href]:not([aria-disabled="true"])', "input:not(:disabled)", "select:not(:disabled)", "textarea:not(:disabled)", '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])'].join(", ")
		},
		de = {
			TRANSITION_OPEN_DURATION: 120,
			TRANSITION_CLOSE_DURATION: 75,
			MARGIN_TO_EDGE: 32,
			ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO: .67
		};
	(se = oe || (oe = {}))[se.BOTTOM = 1] = "BOTTOM", se[se.CENTER = 2] = "CENTER", se[se.RIGHT = 4] = "RIGHT", se[se.FLIP_RTL = 8] = "FLIP_RTL", (ce = ae || (ae = {}))[ce.TOP_LEFT = 0] = "TOP_LEFT", ce[ce.TOP_RIGHT = 4] = "TOP_RIGHT", ce[ce.BOTTOM_LEFT = 1] = "BOTTOM_LEFT", ce[ce.BOTTOM_RIGHT = 5] = "BOTTOM_RIGHT", ce[ce.TOP_START = 8] = "TOP_START", ce[ce.TOP_END = 12] = "TOP_END", ce[ce.BOTTOM_START = 9] = "BOTTOM_START", ce[ce.BOTTOM_END = 13] = "BOTTOM_END";
	var he, pe, fe = function (n) {
			function s(t) {
				var e = n.call(this, a({}, s.defaultAdapter, t)) || this;
				return e.isOpen_ = !1, e.isQuickOpen_ = !1, e.isHoistedElement_ = !1, e.isFixedPosition_ = !1, e.openAnimationEndTimerId_ = 0, e.closeAnimationEndTimerId_ = 0, e.animationRequestId_ = 0, e.anchorCorner_ = ae.TOP_START, e.anchorMargin_ = {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				}, e.position_ = {
					x: 0,
					y: 0
				}, e
			}
			return o(s, n), Object.defineProperty(s, "cssClasses", {
				get: function () {
					return le
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(s, "strings", {
				get: function () {
					return ue
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(s, "numbers", {
				get: function () {
					return de
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(s, "Corner", {
				get: function () {
					return ae
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(s, "defaultAdapter", {
				get: function () {
					return {
						addClass: function () {},
						removeClass: function () {},
						hasClass: function () {
							return !1
						},
						hasAnchor: function () {
							return !1
						},
						isElementInContainer: function () {
							return !1
						},
						isFocused: function () {
							return !1
						},
						isFirstElementFocused: function () {
							return !1
						},
						isLastElementFocused: function () {
							return !1
						},
						isRtl: function () {
							return !1
						},
						getInnerDimensions: function () {
							return {
								height: 0,
								width: 0
							}
						},
						getAnchorDimensions: function () {
							return null
						},
						getWindowDimensions: function () {
							return {
								height: 0,
								width: 0
							}
						},
						getBodyDimensions: function () {
							return {
								height: 0,
								width: 0
							}
						},
						getWindowScroll: function () {
							return {
								x: 0,
								y: 0
							}
						},
						setPosition: function () {},
						setMaxHeight: function () {},
						setTransformOrigin: function () {},
						saveFocus: function () {},
						restoreFocus: function () {},
						focusFirstElement: function () {},
						focusLastElement: function () {},
						notifyClose: function () {},
						notifyOpen: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), s.prototype.init = function () {
				var t = s.cssClasses,
					e = t.ROOT,
					n = t.OPEN;
				if (!this.adapter_.hasClass(e)) throw new Error(e + " class required in root element.");
				this.adapter_.hasClass(n) && (this.isOpen_ = !0)
			}, s.prototype.destroy = function () {
				clearTimeout(this.openAnimationEndTimerId_), clearTimeout(this.closeAnimationEndTimerId_), cancelAnimationFrame(this.animationRequestId_)
			}, s.prototype.setAnchorCorner = function (t) {
				this.anchorCorner_ = t
			}, s.prototype.setAnchorMargin = function (t) {
				this.anchorMargin_.top = t.top || 0, this.anchorMargin_.right = t.right || 0, this.anchorMargin_.bottom = t.bottom || 0, this.anchorMargin_.left = t.left || 0
			}, s.prototype.setIsHoisted = function (t) {
				this.isHoistedElement_ = t
			}, s.prototype.setFixedPosition = function (t) {
				this.isFixedPosition_ = t
			}, s.prototype.setAbsolutePosition = function (t, e) {
				this.position_.x = this.isFinite_(t) ? t : 0, this.position_.y = this.isFinite_(e) ? e : 0
			}, s.prototype.setQuickOpen = function (t) {
				this.isQuickOpen_ = t
			}, s.prototype.isOpen = function () {
				return this.isOpen_
			}, s.prototype.open = function () {
				var t = this;
				this.adapter_.saveFocus(), this.isQuickOpen_ || this.adapter_.addClass(s.cssClasses.ANIMATING_OPEN), this.animationRequestId_ = requestAnimationFrame(function () {
					t.adapter_.addClass(s.cssClasses.OPEN), t.dimensions_ = t.adapter_.getInnerDimensions(), t.autoPosition_(), t.isQuickOpen_ ? t.adapter_.notifyOpen() : t.openAnimationEndTimerId_ = setTimeout(function () {
						t.openAnimationEndTimerId_ = 0, t.adapter_.removeClass(s.cssClasses.ANIMATING_OPEN), t.adapter_.notifyOpen()
					}, de.TRANSITION_OPEN_DURATION)
				}), this.isOpen_ = !0
			}, s.prototype.close = function () {
				var t = this;
				this.isQuickOpen_ || this.adapter_.addClass(s.cssClasses.ANIMATING_CLOSED), requestAnimationFrame(function () {
					t.adapter_.removeClass(s.cssClasses.OPEN), t.isQuickOpen_ ? t.adapter_.notifyClose() : t.closeAnimationEndTimerId_ = setTimeout(function () {
						t.closeAnimationEndTimerId_ = 0, t.adapter_.removeClass(s.cssClasses.ANIMATING_CLOSED), t.adapter_.notifyClose()
					}, de.TRANSITION_CLOSE_DURATION)
				}), this.isOpen_ = !1, this.maybeRestoreFocus_()
			}, s.prototype.handleBodyClick = function (t) {
				var e = t.target;
				this.adapter_.isElementInContainer(e) || this.close()
			}, s.prototype.handleKeydown = function (t) {
				var e = t.keyCode,
					n = t.key,
					i = t.shiftKey,
					r = "Tab" === n || 9 === e;
				"Escape" === n || 27 === e ? this.close() : r && (this.adapter_.isLastElementFocused() && !i ? (this.adapter_.focusFirstElement(), t.preventDefault()) : this.adapter_.isFirstElementFocused() && i && (this.adapter_.focusLastElement(), t.preventDefault()))
			}, s.prototype.autoPosition_ = function () {
				var t;
				this.measurements_ = this.getAutoLayoutMeasurements_();
				var e = this.getOriginCorner_(),
					n = this.getMenuSurfaceMaxHeight_(e),
					i = this.hasBit_(e, oe.BOTTOM) ? "bottom" : "top",
					r = this.hasBit_(e, oe.RIGHT) ? "right" : "left",
					o = this.getHorizontalOriginOffset_(e),
					s = this.getVerticalOriginOffset_(e),
					a = this.measurements_,
					c = a.anchorSize,
					l = a.surfaceSize,
					u = ((t = {})[r] = o, t[i] = s, t);
				c.width / l.width > de.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO && (r = "center"), (this.isHoistedElement_ || this.isFixedPosition_) && this.adjustPositionForHoistedElement_(u), this.adapter_.setTransformOrigin(r + " " + i), this.adapter_.setPosition(u), this.adapter_.setMaxHeight(n ? n + "px" : "")
			}, s.prototype.getAutoLayoutMeasurements_ = function () {
				var t = this.adapter_.getAnchorDimensions(),
					e = this.adapter_.getBodyDimensions(),
					n = this.adapter_.getWindowDimensions(),
					i = this.adapter_.getWindowScroll();
				return t || (t = {
					top: this.position_.y,
					right: this.position_.x,
					bottom: this.position_.y,
					left: this.position_.x,
					width: 0,
					height: 0
				}), {
					anchorSize: t,
					bodySize: e,
					surfaceSize: this.dimensions_,
					viewportDistance: {
						top: t.top,
						right: n.width - t.right,
						bottom: n.height - t.bottom,
						left: t.left
					},
					viewportSize: n,
					windowScroll: i
				}
			}, s.prototype.getOriginCorner_ = function () {
				var t = ae.TOP_LEFT,
					e = this.measurements_,
					n = e.viewportDistance,
					i = e.anchorSize,
					r = e.surfaceSize,
					o = this.hasBit_(this.anchorCorner_, oe.BOTTOM),
					s = o ? n.top + i.height + this.anchorMargin_.bottom : n.top + this.anchorMargin_.top,
					a = o ? n.bottom - this.anchorMargin_.bottom : n.bottom + i.height - this.anchorMargin_.top,
					c = r.height - s,
					l = r.height - a;
				0 < l && c < l && (t = this.setBit_(t, oe.BOTTOM));
				var u = this.adapter_.isRtl(),
					d = this.hasBit_(this.anchorCorner_, oe.FLIP_RTL),
					h = this.hasBit_(this.anchorCorner_, oe.RIGHT),
					p = h && !u || !h && d && u,
					f = p ? n.left + i.width + this.anchorMargin_.right : n.left + this.anchorMargin_.left,
					_ = p ? n.right - this.anchorMargin_.right : n.right + i.width - this.anchorMargin_.left,
					m = r.width - f,
					g = r.width - _;
				return (m < 0 && p && u || h && !p && m < 0 || 0 < g && m < g) && (t = this.setBit_(t, oe.RIGHT)), t
			}, s.prototype.getMenuSurfaceMaxHeight_ = function (t) {
				var e = this.measurements_.viewportDistance,
					n = 0,
					i = this.hasBit_(t, oe.BOTTOM),
					r = this.hasBit_(this.anchorCorner_, oe.BOTTOM),
					o = s.numbers.MARGIN_TO_EDGE;
				return i ? (n = e.top + this.anchorMargin_.top - o, r || (n += this.measurements_.anchorSize.height)) : (n = e.bottom - this.anchorMargin_.bottom + this.measurements_.anchorSize.height - o, r && (n -= this.measurements_.anchorSize.height)), n
			}, s.prototype.getHorizontalOriginOffset_ = function (t) {
				var e = this.measurements_.anchorSize,
					n = this.hasBit_(t, oe.RIGHT),
					i = this.hasBit_(this.anchorCorner_, oe.RIGHT);
				if (n) {
					var r = i ? e.width - this.anchorMargin_.left : this.anchorMargin_.right;
					return this.isHoistedElement_ || this.isFixedPosition_ ? r - (this.measurements_.viewportSize.width - this.measurements_.bodySize.width) : r
				}
				return i ? e.width - this.anchorMargin_.right : this.anchorMargin_.left
			}, s.prototype.getVerticalOriginOffset_ = function (t) {
				var e = this.measurements_.anchorSize,
					n = this.hasBit_(t, oe.BOTTOM),
					i = this.hasBit_(this.anchorCorner_, oe.BOTTOM);
				return n ? i ? e.height - this.anchorMargin_.top : -this.anchorMargin_.bottom : i ? e.height + this.anchorMargin_.bottom : this.anchorMargin_.top
			}, s.prototype.adjustPositionForHoistedElement_ = function (t) {
				var e, n, i = this.measurements_,
					r = i.windowScroll,
					o = i.viewportDistance,
					s = Object.keys(t);
				try {
					for (var a = m(s), c = a.next(); !c.done; c = a.next()) {
						var l = c.value,
							u = t[l] || 0;
						u += o[l], this.isFixedPosition_ || ("top" === l ? u += r.y : "bottom" === l ? u -= r.y : "left" === l ? u += r.x : u -= r.x), t[l] = u
					}
				} catch (t) {
					e = {
						error: t
					}
				} finally {
					try {
						c && !c.done && (n = a.return) && n.call(a)
					} finally {
						if (e) throw e.error
					}
				}
			}, s.prototype.maybeRestoreFocus_ = function () {
				var t = this.adapter_.isFocused(),
					e = document.activeElement && this.adapter_.isElementInContainer(document.activeElement);
				(t || e) && this.adapter_.restoreFocus()
			}, s.prototype.hasBit_ = function (t, e) {
				return Boolean(t & e)
			}, s.prototype.setBit_ = function (t, e) {
				return t | e
			}, s.prototype.isFinite_ = function (t) {
				return "number" == typeof t && isFinite(t)
			}, s
		}(n),
		_e = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, e.prototype.initialSyncWithDOM = function () {
				var e = this,
					t = this.root_.parentElement;
				this.anchorElement = t && t.classList.contains(le.ANCHOR) ? t : null, this.root_.classList.contains(le.FIXED) && this.setFixedPosition(!0), this.handleKeydown_ = function (t) {
					return e.foundation_.handleKeydown(t)
				}, this.handleBodyClick_ = function (t) {
					return e.foundation_.handleBodyClick(t)
				}, this.registerBodyClickListener_ = function () {
					return document.body.addEventListener("click", e.handleBodyClick_)
				}, this.deregisterBodyClickListener_ = function () {
					return document.body.removeEventListener("click", e.handleBodyClick_)
				}, this.listen("keydown", this.handleKeydown_), this.listen(ue.OPENED_EVENT, this.registerBodyClickListener_), this.listen(ue.CLOSED_EVENT, this.deregisterBodyClickListener_)
			}, e.prototype.destroy = function () {
				this.unlisten("keydown", this.handleKeydown_), this.unlisten(ue.OPENED_EVENT, this.registerBodyClickListener_), this.unlisten(ue.CLOSED_EVENT, this.deregisterBodyClickListener_), t.prototype.destroy.call(this)
			}, Object.defineProperty(e.prototype, "open", {
				get: function () {
					return this.foundation_.isOpen()
				},
				set: function (t) {
					if (t) {
						var e = this.root_.querySelectorAll(ue.FOCUSABLE_ELEMENTS);
						this.firstFocusableElement_ = e[0], this.lastFocusableElement_ = e[e.length - 1], this.foundation_.open()
					} else this.foundation_.close()
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "quickOpen", {
				set: function (t) {
					this.foundation_.setQuickOpen(t)
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.hoistMenuToBody = function () {
				document.body.appendChild(this.root_), this.setIsHoisted(!0)
			}, e.prototype.setIsHoisted = function (t) {
				this.foundation_.setIsHoisted(t)
			}, e.prototype.setMenuSurfaceAnchorElement = function (t) {
				this.anchorElement = t
			}, e.prototype.setFixedPosition = function (t) {
				t ? this.root_.classList.add(le.FIXED) : this.root_.classList.remove(le.FIXED), this.foundation_.setFixedPosition(t)
			}, e.prototype.setAbsolutePosition = function (t, e) {
				this.foundation_.setAbsolutePosition(t, e), this.setIsHoisted(!0)
			}, e.prototype.setAnchorCorner = function (t) {
				this.foundation_.setAnchorCorner(t)
			}, e.prototype.setAnchorMargin = function (t) {
				this.foundation_.setAnchorMargin(t)
			}, e.prototype.getDefaultFoundation = function () {
				var n = this;
				return new fe({
					addClass: function (t) {
						return n.root_.classList.add(t)
					},
					removeClass: function (t) {
						return n.root_.classList.remove(t)
					},
					hasClass: function (t) {
						return n.root_.classList.contains(t)
					},
					hasAnchor: function () {
						return !!n.anchorElement
					},
					notifyClose: function () {
						return n.emit(fe.strings.CLOSED_EVENT, {})
					},
					notifyOpen: function () {
						return n.emit(fe.strings.OPENED_EVENT, {})
					},
					isElementInContainer: function (t) {
						return n.root_.contains(t)
					},
					isRtl: function () {
						return "rtl" === getComputedStyle(n.root_).getPropertyValue("direction")
					},
					setTransformOrigin: function (t) {
						var e = function (t, e) {
							if (void 0 === e && (e = !1), void 0 === Ot || e) {
								var n = t.document.createElement("div");
								Ot = "transform" in n.style ? "transform" : "webkitTransform"
							}
							return Ot
						}(window) + "-origin";
						n.root_.style.setProperty(e, t)
					},
					isFocused: function () {
						return document.activeElement === n.root_
					},
					saveFocus: function () {
						n.previousFocus_ = document.activeElement
					},
					restoreFocus: function () {
						n.root_.contains(document.activeElement) && n.previousFocus_ && n.previousFocus_.focus && n.previousFocus_.focus()
					},
					isFirstElementFocused: function () {
						return !!n.firstFocusableElement_ && n.firstFocusableElement_ === document.activeElement
					},
					isLastElementFocused: function () {
						return !!n.lastFocusableElement_ && n.lastFocusableElement_ === document.activeElement
					},
					focusFirstElement: function () {
						return n.firstFocusableElement_ && n.firstFocusableElement_.focus && n.firstFocusableElement_.focus()
					},
					focusLastElement: function () {
						return n.lastFocusableElement_ && n.lastFocusableElement_.focus && n.lastFocusableElement_.focus()
					},
					getInnerDimensions: function () {
						return {
							width: n.root_.offsetWidth,
							height: n.root_.offsetHeight
						}
					},
					getAnchorDimensions: function () {
						return n.anchorElement ? n.anchorElement.getBoundingClientRect() : null
					},
					getWindowDimensions: function () {
						return {
							width: window.innerWidth,
							height: window.innerHeight
						}
					},
					getBodyDimensions: function () {
						return {
							width: document.body.clientWidth,
							height: document.body.clientHeight
						}
					},
					getWindowScroll: function () {
						return {
							x: window.pageXOffset,
							y: window.pageYOffset
						}
					},
					setPosition: function (t) {
						n.root_.style.left = "left" in t ? t.left + "px" : "", n.root_.style.right = "right" in t ? t.right + "px" : "", n.root_.style.top = "top" in t ? t.top + "px" : "", n.root_.style.bottom = "bottom" in t ? t.bottom + "px" : ""
					},
					setMaxHeight: function (t) {
						n.root_.style.maxHeight = t
					}
				})
			}, e
		}(t),
		me = {
			MENU_SELECTED_LIST_ITEM: "mdc-menu-item--selected",
			MENU_SELECTION_GROUP: "mdc-menu__selection-group",
			ROOT: "mdc-menu"
		},
		ge = {
			ARIA_SELECTED_ATTR: "aria-selected",
			CHECKBOX_SELECTOR: 'input[type="checkbox"]',
			LIST_SELECTOR: ".mdc-list",
			SELECTED_EVENT: "MDCMenu:selected"
		},
		ye = {
			FOCUS_ROOT_INDEX: -1
		};
	(pe = he || (he = {}))[pe.NONE = 0] = "NONE", pe[pe.LIST_ROOT = 1] = "LIST_ROOT", pe[pe.FIRST_ITEM = 2] = "FIRST_ITEM", pe[pe.LAST_ITEM = 3] = "LAST_ITEM";
	var Ee = function (n) {
			function i(t) {
				var e = n.call(this, a({}, i.defaultAdapter, t)) || this;
				return e.closeAnimationEndTimerId_ = 0, e.defaultFocusState_ = he.LIST_ROOT, e
			}
			return o(i, n), Object.defineProperty(i, "cssClasses", {
				get: function () {
					return me
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "strings", {
				get: function () {
					return ge
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "numbers", {
				get: function () {
					return ye
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "defaultAdapter", {
				get: function () {
					return {
						addClassToElementAtIndex: function () {},
						removeClassFromElementAtIndex: function () {},
						addAttributeToElementAtIndex: function () {},
						removeAttributeFromElementAtIndex: function () {},
						elementContainsClass: function () {
							return !1
						},
						closeSurface: function () {},
						getElementIndex: function () {
							return -1
						},
						getParentElement: function () {
							return null
						},
						getSelectedElementIndex: function () {
							return -1
						},
						notifySelected: function () {},
						getMenuItemCount: function () {
							return 0
						},
						focusItemAtIndex: function () {},
						focusListRoot: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.destroy = function () {
				this.closeAnimationEndTimerId_ && clearTimeout(this.closeAnimationEndTimerId_), this.adapter_.closeSurface()
			}, i.prototype.handleKeydown = function (t) {
				var e = t.key,
					n = t.keyCode;
				("Tab" === e || 9 === n) && this.adapter_.closeSurface()
			}, i.prototype.handleItemAction = function (e) {
				var n = this,
					i = this.adapter_.getElementIndex(e);
				i < 0 || (this.adapter_.notifySelected({
					index: i
				}), this.adapter_.closeSurface(), this.closeAnimationEndTimerId_ = setTimeout(function () {
					var t = n.getSelectionGroup_(e);
					t && n.handleSelectionGroup_(t, i)
				}, fe.numbers.TRANSITION_CLOSE_DURATION))
			}, i.prototype.handleMenuSurfaceOpened = function () {
				switch (this.defaultFocusState_) {
					case he.FIRST_ITEM:
						this.adapter_.focusItemAtIndex(0);
						break;
					case he.LAST_ITEM:
						this.adapter_.focusItemAtIndex(this.adapter_.getMenuItemCount() - 1);
						break;
					case he.NONE:
						break;
					default:
						this.adapter_.focusListRoot()
				}
			}, i.prototype.setDefaultFocusState = function (t) {
				this.defaultFocusState_ = t
			}, i.prototype.handleSelectionGroup_ = function (t, e) {
				var n = this.adapter_.getSelectedElementIndex(t);
				0 <= n && (this.adapter_.removeAttributeFromElementAtIndex(n, ge.ARIA_SELECTED_ATTR), this.adapter_.removeClassFromElementAtIndex(n, me.MENU_SELECTED_LIST_ITEM)), this.adapter_.addClassToElementAtIndex(e, me.MENU_SELECTED_LIST_ITEM), this.adapter_.addAttributeToElementAtIndex(e, ge.ARIA_SELECTED_ATTR, "true")
			}, i.prototype.getSelectionGroup_ = function (t) {
				var e = this.adapter_.getParentElement(t);
				if (!e) return null;
				for (var n = this.adapter_.elementContainsClass(e, me.MENU_SELECTION_GROUP); !n && e && !this.adapter_.elementContainsClass(e, Lt.cssClasses.ROOT);) n = !!(e = this.adapter_.getParentElement(e)) && this.adapter_.elementContainsClass(e, me.MENU_SELECTION_GROUP);
				return n ? e : null
			}, i
		}(n),
		ve = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, e.prototype.initialize = function (t, e) {
				void 0 === t && (t = function (t) {
					return new _e(t)
				}), void 0 === e && (e = function (t) {
					return new Rt(t)
				}), this.menuSurfaceFactory_ = t, this.listFactory_ = e
			}, e.prototype.initialSyncWithDOM = function () {
				var e = this;
				this.menuSurface_ = this.menuSurfaceFactory_(this.root_);
				var t = this.root_.querySelector(ge.LIST_SELECTOR);
				t ? (this.list_ = this.listFactory_(t), this.list_.wrapFocus = !0) : this.list_ = null, this.handleKeydown_ = function (t) {
					return e.foundation_.handleKeydown(t)
				}, this.handleItemAction_ = function (t) {
					return e.foundation_.handleItemAction(e.items[t.detail.index])
				}, this.handleMenuSurfaceOpened_ = function () {
					return e.foundation_.handleMenuSurfaceOpened()
				}, this.menuSurface_.listen(fe.strings.OPENED_EVENT, this.handleMenuSurfaceOpened_), this.listen("keydown", this.handleKeydown_), this.listen(Lt.strings.ACTION_EVENT, this.handleItemAction_)
			}, e.prototype.destroy = function () {
				this.list_ && this.list_.destroy(), this.menuSurface_.destroy(), this.menuSurface_.unlisten(fe.strings.OPENED_EVENT, this.handleMenuSurfaceOpened_), this.unlisten("keydown", this.handleKeydown_), this.unlisten(Lt.strings.ACTION_EVENT, this.handleItemAction_), t.prototype.destroy.call(this)
			}, Object.defineProperty(e.prototype, "open", {
				get: function () {
					return this.menuSurface_.open
				},
				set: function (t) {
					this.menuSurface_.open = t
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "wrapFocus", {
				get: function () {
					return !!this.list_ && this.list_.wrapFocus
				},
				set: function (t) {
					this.list_ && (this.list_.wrapFocus = t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "items", {
				get: function () {
					return this.list_ ? this.list_.listElements : []
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "quickOpen", {
				set: function (t) {
					this.menuSurface_.quickOpen = t
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.setDefaultFocusState = function (t) {
				this.foundation_.setDefaultFocusState(t)
			}, e.prototype.setAnchorCorner = function (t) {
				this.menuSurface_.setAnchorCorner(t)
			}, e.prototype.setAnchorMargin = function (t) {
				this.menuSurface_.setAnchorMargin(t)
			}, e.prototype.getOptionByIndex = function (t) {
				return t < this.items.length ? this.items[t] : null
			}, e.prototype.setFixedPosition = function (t) {
				this.menuSurface_.setFixedPosition(t)
			}, e.prototype.hoistMenuToBody = function () {
				this.menuSurface_.hoistMenuToBody()
			}, e.prototype.setIsHoisted = function (t) {
				this.menuSurface_.setIsHoisted(t)
			}, e.prototype.setAbsolutePosition = function (t, e) {
				this.menuSurface_.setAbsolutePosition(t, e)
			}, e.prototype.setAnchorElement = function (t) {
				this.menuSurface_.anchorElement = t
			}, e.prototype.getDefaultFoundation = function () {
				var i = this;
				return new Ee({
					addClassToElementAtIndex: function (t, e) {
						i.items[t].classList.add(e)
					},
					removeClassFromElementAtIndex: function (t, e) {
						i.items[t].classList.remove(e)
					},
					addAttributeToElementAtIndex: function (t, e, n) {
						i.items[t].setAttribute(e, n)
					},
					removeAttributeFromElementAtIndex: function (t, e) {
						i.items[t].removeAttribute(e)
					},
					elementContainsClass: function (t, e) {
						return t.classList.contains(e)
					},
					closeSurface: function () {
						return i.open = !1
					},
					getElementIndex: function (t) {
						return i.items.indexOf(t)
					},
					getParentElement: function (t) {
						return t.parentElement
					},
					getSelectedElementIndex: function (t) {
						var e = t.querySelector("." + me.MENU_SELECTED_LIST_ITEM);
						return e ? i.items.indexOf(e) : -1
					},
					notifySelected: function (t) {
						return i.emit(ge.SELECTED_EVENT, {
							index: t.index,
							item: i.items[t.index]
						})
					},
					getMenuItemCount: function () {
						return i.items.length
					},
					focusItemAtIndex: function (t) {
						return i.items[t].focus()
					},
					focusListRoot: function () {
						return i.root_.querySelector(ge.LIST_SELECTOR).focus()
					}
				})
			}, e
		}(t),
		Ce = {
			NOTCH_ELEMENT_SELECTOR: ".mdc-notched-outline__notch"
		},
		be = {
			NOTCH_ELEMENT_PADDING: 8
		},
		Te = {
			NO_LABEL: "mdc-notched-outline--no-label",
			OUTLINE_NOTCHED: "mdc-notched-outline--notched",
			OUTLINE_UPGRADED: "mdc-notched-outline--upgraded"
		},
		Ie = function (e) {
			function n(t) {
				return e.call(this, a({}, n.defaultAdapter, t)) || this
			}
			return o(n, e), Object.defineProperty(n, "strings", {
				get: function () {
					return Ce
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n, "cssClasses", {
				get: function () {
					return Te
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n, "numbers", {
				get: function () {
					return be
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n, "defaultAdapter", {
				get: function () {
					return {
						addClass: function () {},
						removeClass: function () {},
						setNotchWidthProperty: function () {},
						removeNotchWidthProperty: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), n.prototype.notch = function (t) {
				var e = n.cssClasses.OUTLINE_NOTCHED;
				0 < t && (t += be.NOTCH_ELEMENT_PADDING), this.adapter_.setNotchWidthProperty(t), this.adapter_.addClass(e)
			}, n.prototype.closeNotch = function () {
				var t = n.cssClasses.OUTLINE_NOTCHED;
				this.adapter_.removeClass(t), this.adapter_.removeNotchWidthProperty()
			}, n
		}(n),
		Ae = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, e.prototype.initialSyncWithDOM = function () {
				this.notchElement_ = this.root_.querySelector(Ce.NOTCH_ELEMENT_SELECTOR);
				var t = this.root_.querySelector("." + Ft.cssClasses.ROOT);
				t ? (t.style.transitionDuration = "0s", this.root_.classList.add(Te.OUTLINE_UPGRADED), requestAnimationFrame(function () {
					t.style.transitionDuration = ""
				})) : this.root_.classList.add(Te.NO_LABEL)
			}, e.prototype.notch = function (t) {
				this.foundation_.notch(t)
			}, e.prototype.closeNotch = function () {
				this.foundation_.closeNotch()
			}, e.prototype.getDefaultFoundation = function () {
				var e = this;
				return new Ie({
					addClass: function (t) {
						return e.root_.classList.add(t)
					},
					removeClass: function (t) {
						return e.root_.classList.remove(t)
					},
					setNotchWidthProperty: function (t) {
						return e.notchElement_.style.setProperty("width", t + "px")
					},
					removeNotchWidthProperty: function () {
						return e.notchElement_.style.removeProperty("width")
					}
				})
			}, e
		}(t),
		Se = {
			NATIVE_CONTROL_SELECTOR: ".mdc-radio__native-control"
		},
		Oe = {
			DISABLED: "mdc-radio--disabled",
			ROOT: "mdc-radio"
		},
		Le = function (e) {
			function n(t) {
				return e.call(this, a({}, n.defaultAdapter, t)) || this
			}
			return o(n, e), Object.defineProperty(n, "cssClasses", {
				get: function () {
					return Oe
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n, "strings", {
				get: function () {
					return Se
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n, "defaultAdapter", {
				get: function () {
					return {
						addClass: function () {},
						removeClass: function () {},
						setNativeControlDisabled: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), n.prototype.setDisabled = function (t) {
				var e = n.cssClasses.DISABLED;
				this.adapter_.setNativeControlDisabled(t), t ? this.adapter_.addClass(e) : this.adapter_.removeClass(e)
			}, n
		}(n),
		Re = function (e) {
			function n() {
				var t = null !== e && e.apply(this, arguments) || this;
				return t.ripple_ = t.createRipple_(), t
			}
			return o(n, e), n.attachTo = function (t) {
				return new n(t)
			}, Object.defineProperty(n.prototype, "checked", {
				get: function () {
					return this.nativeControl_.checked
				},
				set: function (t) {
					this.nativeControl_.checked = t
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n.prototype, "disabled", {
				get: function () {
					return this.nativeControl_.disabled
				},
				set: function (t) {
					this.foundation_.setDisabled(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n.prototype, "value", {
				get: function () {
					return this.nativeControl_.value
				},
				set: function (t) {
					this.nativeControl_.value = t
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n.prototype, "ripple", {
				get: function () {
					return this.ripple_
				},
				enumerable: !0,
				configurable: !0
			}), n.prototype.destroy = function () {
				this.ripple_.destroy(), e.prototype.destroy.call(this)
			}, n.prototype.getDefaultFoundation = function () {
				var e = this;
				return new Le({
					addClass: function (t) {
						return e.root_.classList.add(t)
					},
					removeClass: function (t) {
						return e.root_.classList.remove(t)
					},
					setNativeControlDisabled: function (t) {
						return e.nativeControl_.disabled = t
					}
				})
			}, n.prototype.createRipple_ = function () {
				var n = this,
					t = a({}, L.createAdapter(this), {
						registerInteractionHandler: function (t, e) {
							return n.nativeControl_.addEventListener(t, e)
						},
						deregisterInteractionHandler: function (t, e) {
							return n.nativeControl_.removeEventListener(t, e)
						},
						isSurfaceActive: function () {
							return !1
						},
						isUnbounded: function () {
							return !0
						}
					});
				return new L(this.root_, new O(t))
			}, Object.defineProperty(n.prototype, "nativeControl_", {
				get: function () {
					var t = Le.strings.NATIVE_CONTROL_SELECTOR,
						e = this.root_.querySelector(t);
					if (!e) throw new Error("Radio component requires a " + t + " element");
					return e
				},
				enumerable: !0,
				configurable: !0
			}), n
		}(t),
		we = {
			DISABLED: "mdc-select--disabled",
			FOCUSED: "mdc-select--focused",
			INVALID: "mdc-select--invalid",
			OUTLINED: "mdc-select--outlined",
			REQUIRED: "mdc-select--required",
			ROOT: "mdc-select",
			SELECTED_ITEM_CLASS: "mdc-list-item--selected",
			WITH_LEADING_ICON: "mdc-select--with-leading-icon"
		},
		xe = {
			ARIA_CONTROLS: "aria-controls",
			ARIA_SELECTED_ATTR: "aria-selected",
			CHANGE_EVENT: "MDCSelect:change",
			ENHANCED_VALUE_ATTR: "data-value",
			HIDDEN_INPUT_SELECTOR: 'input[type="hidden"]',
			LABEL_SELECTOR: ".mdc-floating-label",
			LEADING_ICON_SELECTOR: ".mdc-select__icon",
			LINE_RIPPLE_SELECTOR: ".mdc-line-ripple",
			MENU_SELECTOR: ".mdc-select__menu",
			NATIVE_CONTROL_SELECTOR: ".mdc-select__native-control",
			OUTLINE_SELECTOR: ".mdc-notched-outline",
			SELECTED_ITEM_SELECTOR: "." + we.SELECTED_ITEM_CLASS,
			SELECTED_TEXT_SELECTOR: ".mdc-select__selected-text"
		},
		Ne = {
			LABEL_SCALE: .75
		},
		De = function (i) {
			function r(t, e) {
				void 0 === e && (e = {});
				var n = i.call(this, a({}, r.defaultAdapter, t)) || this;
				return n.leadingIcon_ = e.leadingIcon, n.helperText_ = e.helperText, n
			}
			return o(r, i), Object.defineProperty(r, "cssClasses", {
				get: function () {
					return we
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(r, "numbers", {
				get: function () {
					return Ne
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(r, "strings", {
				get: function () {
					return xe
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(r, "defaultAdapter", {
				get: function () {
					return {
						addClass: function () {},
						removeClass: function () {},
						hasClass: function () {
							return !1
						},
						activateBottomLine: function () {},
						deactivateBottomLine: function () {},
						setValue: function () {},
						getValue: function () {
							return ""
						},
						floatLabel: function () {},
						getLabelWidth: function () {
							return 0
						},
						hasOutline: function () {
							return !1
						},
						notchOutline: function () {},
						closeOutline: function () {},
						openMenu: function () {},
						closeMenu: function () {},
						isMenuOpen: function () {
							return !1
						},
						setSelectedIndex: function () {},
						setDisabled: function () {},
						setRippleCenter: function () {},
						notifyChange: function () {},
						checkValidity: function () {
							return !1
						},
						setValid: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), r.prototype.setSelectedIndex = function (t) {
				this.adapter_.setSelectedIndex(t), this.adapter_.closeMenu();
				this.handleChange(!0)
			}, r.prototype.setValue = function (t) {
				this.adapter_.setValue(t);
				this.handleChange(!0)
			}, r.prototype.getValue = function () {
				return this.adapter_.getValue()
			}, r.prototype.setDisabled = function (t) {
				t ? this.adapter_.addClass(we.DISABLED) : this.adapter_.removeClass(we.DISABLED), this.adapter_.setDisabled(t), this.adapter_.closeMenu(), this.leadingIcon_ && this.leadingIcon_.setDisabled(t)
			}, r.prototype.setHelperTextContent = function (t) {
				this.helperText_ && this.helperText_.setContent(t)
			}, r.prototype.layout = function () {
				var t = 0 < this.getValue().length;
				this.notchOutline(t)
			}, r.prototype.handleChange = function (t) {
				void 0 === t && (t = !0);
				var e = this.getValue(),
					n = 0 < e.length,
					i = this.adapter_.hasClass(we.REQUIRED);
				this.notchOutline(n), this.adapter_.hasClass(we.FOCUSED) || this.adapter_.floatLabel(n), t && (this.adapter_.notifyChange(e), i && (this.setValid(this.isValid()), this.helperText_ && this.helperText_.setValidity(this.isValid())))
			}, r.prototype.handleFocus = function () {
				this.adapter_.addClass(we.FOCUSED), this.adapter_.floatLabel(!0), this.notchOutline(!0), this.adapter_.activateBottomLine(), this.helperText_ && this.helperText_.showToScreenReader()
			}, r.prototype.handleBlur = function () {
				this.adapter_.isMenuOpen() || (this.adapter_.removeClass(we.FOCUSED), this.handleChange(!1), this.adapter_.deactivateBottomLine(), this.adapter_.hasClass(we.REQUIRED) && (this.setValid(this.isValid()), this.helperText_ && this.helperText_.setValidity(this.isValid())))
			}, r.prototype.handleClick = function (t) {
				this.adapter_.isMenuOpen() || (this.adapter_.setRippleCenter(t), this.adapter_.openMenu())
			}, r.prototype.handleKeydown = function (t) {
				if (!this.adapter_.isMenuOpen()) {
					var e = "Enter" === t.key || 13 === t.keyCode,
						n = "Space" === t.key || 32 === t.keyCode,
						i = "ArrowUp" === t.key || 38 === t.keyCode,
						r = "ArrowDown" === t.key || 40 === t.keyCode;
					this.adapter_.hasClass(we.FOCUSED) && (e || n || i || r) && (this.adapter_.openMenu(), t.preventDefault())
				}
			}, r.prototype.notchOutline = function (t) {
				if (this.adapter_.hasOutline()) {
					var e = this.adapter_.hasClass(we.FOCUSED);
					if (t) {
						var n = Ne.LABEL_SCALE,
							i = this.adapter_.getLabelWidth() * n;
						this.adapter_.notchOutline(i)
					} else e || this.adapter_.closeOutline()
				}
			}, r.prototype.setLeadingIconAriaLabel = function (t) {
				this.leadingIcon_ && this.leadingIcon_.setAriaLabel(t)
			}, r.prototype.setLeadingIconContent = function (t) {
				this.leadingIcon_ && this.leadingIcon_.setContent(t)
			}, r.prototype.setValid = function (t) {
				this.adapter_.setValid(t)
			}, r.prototype.isValid = function () {
				return this.adapter_.checkValidity()
			}, r
		}(n),
		ke = {
			ARIA_HIDDEN: "aria-hidden",
			ROLE: "role"
		},
		Me = {
			HELPER_TEXT_PERSISTENT: "mdc-select-helper-text--persistent",
			HELPER_TEXT_VALIDATION_MSG: "mdc-select-helper-text--validation-msg"
		},
		Pe = function (e) {
			function n(t) {
				return e.call(this, a({}, n.defaultAdapter, t)) || this
			}
			return o(n, e), Object.defineProperty(n, "cssClasses", {
				get: function () {
					return Me
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n, "strings", {
				get: function () {
					return ke
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n, "defaultAdapter", {
				get: function () {
					return {
						addClass: function () {},
						removeClass: function () {},
						hasClass: function () {
							return !1
						},
						setAttr: function () {},
						removeAttr: function () {},
						setContent: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), n.prototype.setContent = function (t) {
				this.adapter_.setContent(t)
			}, n.prototype.setPersistent = function (t) {
				t ? this.adapter_.addClass(Me.HELPER_TEXT_PERSISTENT) : this.adapter_.removeClass(Me.HELPER_TEXT_PERSISTENT)
			}, n.prototype.setValidation = function (t) {
				t ? this.adapter_.addClass(Me.HELPER_TEXT_VALIDATION_MSG) : this.adapter_.removeClass(Me.HELPER_TEXT_VALIDATION_MSG)
			}, n.prototype.showToScreenReader = function () {
				this.adapter_.removeAttr(ke.ARIA_HIDDEN)
			}, n.prototype.setValidity = function (t) {
				var e = this.adapter_.hasClass(Me.HELPER_TEXT_PERSISTENT),
					n = this.adapter_.hasClass(Me.HELPER_TEXT_VALIDATION_MSG) && !t;
				n ? this.adapter_.setAttr(ke.ROLE, "alert") : this.adapter_.removeAttr(ke.ROLE), e || n || this.hide_()
			}, n.prototype.hide_ = function () {
				this.adapter_.setAttr(ke.ARIA_HIDDEN, "true")
			}, n
		}(n),
		He = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, Object.defineProperty(e.prototype, "foundation", {
				get: function () {
					return this.foundation_
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.getDefaultFoundation = function () {
				var n = this;
				return new Pe({
					addClass: function (t) {
						return n.root_.classList.add(t)
					},
					removeClass: function (t) {
						return n.root_.classList.remove(t)
					},
					hasClass: function (t) {
						return n.root_.classList.contains(t)
					},
					setAttr: function (t, e) {
						return n.root_.setAttribute(t, e)
					},
					removeAttr: function (t) {
						return n.root_.removeAttribute(t)
					},
					setContent: function (t) {
						n.root_.textContent = t
					}
				})
			}, e
		}(t),
		Fe = {
			ICON_EVENT: "MDCSelect:icon",
			ICON_ROLE: "button"
		},
		Be = ["click", "keydown"],
		Ve = function (n) {
			function i(t) {
				var e = n.call(this, a({}, i.defaultAdapter, t)) || this;
				return e.savedTabIndex_ = null, e.interactionHandler_ = function (t) {
					return e.handleInteraction(t)
				}, e
			}
			return o(i, n), Object.defineProperty(i, "strings", {
				get: function () {
					return Fe
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "defaultAdapter", {
				get: function () {
					return {
						getAttr: function () {
							return null
						},
						setAttr: function () {},
						removeAttr: function () {},
						setContent: function () {},
						registerInteractionHandler: function () {},
						deregisterInteractionHandler: function () {},
						notifyIconAction: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.init = function () {
				var e = this;
				this.savedTabIndex_ = this.adapter_.getAttr("tabindex"), Be.forEach(function (t) {
					e.adapter_.registerInteractionHandler(t, e.interactionHandler_)
				})
			}, i.prototype.destroy = function () {
				var e = this;
				Be.forEach(function (t) {
					e.adapter_.deregisterInteractionHandler(t, e.interactionHandler_)
				})
			}, i.prototype.setDisabled = function (t) {
				this.savedTabIndex_ && (t ? (this.adapter_.setAttr("tabindex", "-1"), this.adapter_.removeAttr("role")) : (this.adapter_.setAttr("tabindex", this.savedTabIndex_), this.adapter_.setAttr("role", Fe.ICON_ROLE)))
			}, i.prototype.setAriaLabel = function (t) {
				this.adapter_.setAttr("aria-label", t)
			}, i.prototype.setContent = function (t) {
				this.adapter_.setContent(t)
			}, i.prototype.handleInteraction = function (t) {
				var e = "Enter" === t.key || 13 === t.keyCode;
				("click" === t.type || e) && this.adapter_.notifyIconAction()
			}, i
		}(n),
		je = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, Object.defineProperty(e.prototype, "foundation", {
				get: function () {
					return this.foundation_
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.getDefaultFoundation = function () {
				var n = this;
				return new Ve({
					getAttr: function (t) {
						return n.root_.getAttribute(t)
					},
					setAttr: function (t, e) {
						return n.root_.setAttribute(t, e)
					},
					removeAttr: function (t) {
						return n.root_.removeAttribute(t)
					},
					setContent: function (t) {
						n.root_.textContent = t
					},
					registerInteractionHandler: function (t, e) {
						return n.listen(t, e)
					},
					deregisterInteractionHandler: function (t, e) {
						return n.unlisten(t, e)
					},
					notifyIconAction: function () {
						return n.emit(Ve.strings.ICON_EVENT, {}, !0)
					}
				})
			}, e
		}(t),
		ze = ["required", "aria-required"],
		Ue = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, e.prototype.initialize = function (t, e, n, i, r, o) {
				void 0 === t && (t = function (t) {
					return new Bt(t)
				}), void 0 === e && (e = function (t) {
					return new te(t)
				}), void 0 === n && (n = function (t) {
					return new Ae(t)
				}), void 0 === i && (i = function (t) {
					return new ve(t)
				}), void 0 === r && (r = function (t) {
					return new je(t)
				}), void 0 === o && (o = function (t) {
					return new He(t)
				}), this.isMenuOpen_ = !1, this.nativeControl_ = this.root_.querySelector(xe.NATIVE_CONTROL_SELECTOR), this.selectedText_ = this.root_.querySelector(xe.SELECTED_TEXT_SELECTOR);
				var s = this.nativeControl_ || this.selectedText_;
				if (!s) throw new Error("MDCSelect: Missing required element: Exactly one of the following selectors must be present: '" + xe.NATIVE_CONTROL_SELECTOR + "' or '" + xe.SELECTED_TEXT_SELECTOR + "'");
				if (this.targetElement_ = s, this.targetElement_.hasAttribute(xe.ARIA_CONTROLS)) {
					var a = document.getElementById(this.targetElement_.getAttribute(xe.ARIA_CONTROLS));
					a && (this.helperText_ = o(a))
				}
				this.selectedText_ && this.enhancedSelectSetup_(i);
				var c = this.root_.querySelector(xe.LABEL_SELECTOR);
				this.label_ = c ? t(c) : null;
				var l = this.root_.querySelector(xe.LINE_RIPPLE_SELECTOR);
				this.lineRipple_ = l ? e(l) : null;
				var u = this.root_.querySelector(xe.OUTLINE_SELECTOR);
				this.outline_ = u ? n(u) : null;
				var d = this.root_.querySelector(xe.LEADING_ICON_SELECTOR);
				d && (this.root_.classList.add(we.WITH_LEADING_ICON), this.leadingIcon_ = r(d), this.menuElement_ && this.menuElement_.classList.add(we.WITH_LEADING_ICON)), this.root_.classList.contains(we.OUTLINED) || (this.ripple = this.createRipple_()), this.initialSyncRequiredState_(), this.addMutationObserverForRequired_()
			}, e.prototype.initialSyncWithDOM = function () {
				var e = this;
				if (this.handleChange_ = function () {
						return e.foundation_.handleChange(!0)
					}, this.handleFocus_ = function () {
						return e.foundation_.handleFocus()
					}, this.handleBlur_ = function () {
						return e.foundation_.handleBlur()
					}, this.handleClick_ = function (t) {
						e.selectedText_ && e.selectedText_.focus(), e.foundation_.handleClick(e.getNormalizedXCoordinate_(t))
					}, this.handleKeydown_ = function (t) {
						return e.foundation_.handleKeydown(t)
					}, this.handleMenuSelected_ = function (t) {
						return e.selectedIndex = t.detail.index
					}, this.handleMenuOpened_ = function () {
						if (0 !== e.menu_.items.length) {
							var t = 0 <= e.selectedIndex ? e.selectedIndex : 0;
							e.menu_.items[t].focus()
						}
					}, this.handleMenuClosed_ = function () {
						e.isMenuOpen_ = !1, e.selectedText_.removeAttribute("aria-expanded"), document.activeElement !== e.selectedText_ && e.foundation_.handleBlur()
					}, this.targetElement_.addEventListener("change", this.handleChange_), this.targetElement_.addEventListener("focus", this.handleFocus_), this.targetElement_.addEventListener("blur", this.handleBlur_), this.targetElement_.addEventListener("click", this.handleClick_), this.menuElement_)
					if (this.selectedText_.addEventListener("keydown", this.handleKeydown_), this.menu_.listen(ue.CLOSED_EVENT, this.handleMenuClosed_), this.menu_.listen(ue.OPENED_EVENT, this.handleMenuOpened_), this.menu_.listen(ge.SELECTED_EVENT, this.handleMenuSelected_), this.hiddenInput_ && this.hiddenInput_.value)(t = this.getEnhancedSelectAdapterMethods_()).setValue(this.hiddenInput_.value);
					else if (this.menuElement_.querySelector(xe.SELECTED_ITEM_SELECTOR)) {
					var t;
					(t = this.getEnhancedSelectAdapterMethods_()).setValue(t.getValue())
				}
				this.foundation_.handleChange(!1), (this.root_.classList.contains(we.DISABLED) || this.nativeControl_ && this.nativeControl_.disabled) && (this.disabled = !0)
			}, e.prototype.destroy = function () {
				this.targetElement_.removeEventListener("change", this.handleChange_), this.targetElement_.removeEventListener("focus", this.handleFocus_), this.targetElement_.removeEventListener("blur", this.handleBlur_), this.targetElement_.removeEventListener("keydown", this.handleKeydown_), this.targetElement_.removeEventListener("click", this.handleClick_), this.menu_ && (this.menu_.unlisten(ue.CLOSED_EVENT, this.handleMenuClosed_), this.menu_.unlisten(ue.OPENED_EVENT, this.handleMenuOpened_), this.menu_.unlisten(ge.SELECTED_EVENT, this.handleMenuSelected_), this.menu_.destroy()), this.ripple && this.ripple.destroy(), this.outline_ && this.outline_.destroy(), this.leadingIcon_ && this.leadingIcon_.destroy(), this.helperText_ && this.helperText_.destroy(), this.validationObserver_ && this.validationObserver_.disconnect(), t.prototype.destroy.call(this)
			}, Object.defineProperty(e.prototype, "value", {
				get: function () {
					return this.foundation_.getValue()
				},
				set: function (t) {
					this.foundation_.setValue(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "selectedIndex", {
				get: function () {
					var t = -1;
					if (this.menuElement_ && this.menu_) {
						var e = this.menuElement_.querySelector(xe.SELECTED_ITEM_SELECTOR);
						t = this.menu_.items.indexOf(e)
					} else this.nativeControl_ && (t = this.nativeControl_.selectedIndex);
					return t
				},
				set: function (t) {
					this.foundation_.setSelectedIndex(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "disabled", {
				get: function () {
					return this.root_.classList.contains(we.DISABLED) || !!this.nativeControl_ && this.nativeControl_.disabled
				},
				set: function (t) {
					this.foundation_.setDisabled(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "leadingIconAriaLabel", {
				set: function (t) {
					this.foundation_.setLeadingIconAriaLabel(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "leadingIconContent", {
				set: function (t) {
					this.foundation_.setLeadingIconContent(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "helperTextContent", {
				set: function (t) {
					this.foundation_.setHelperTextContent(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "valid", {
				get: function () {
					return this.foundation_.isValid()
				},
				set: function (t) {
					this.foundation_.setValid(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "required", {
				get: function () {
					return this.nativeControl_ ? this.nativeControl_.required : "true" === this.selectedText_.getAttribute("aria-required")
				},
				set: function (t) {
					this.nativeControl_ ? this.nativeControl_.required = t : t ? this.selectedText_.setAttribute("aria-required", t.toString()) : this.selectedText_.removeAttribute("aria-required")
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.layout = function () {
				this.foundation_.layout()
			}, e.prototype.getDefaultFoundation = function () {
				var t = a({}, this.nativeControl_ ? this.getNativeSelectAdapterMethods_() : this.getEnhancedSelectAdapterMethods_(), this.getCommonAdapterMethods_(), this.getOutlineAdapterMethods_(), this.getLabelAdapterMethods_());
				return new De(t, this.getFoundationMap_())
			}, e.prototype.enhancedSelectSetup_ = function (t) {
				var e = this.root_.classList.contains(we.DISABLED);
				this.selectedText_.setAttribute("tabindex", e ? "-1" : "0"), this.hiddenInput_ = this.root_.querySelector(xe.HIDDEN_INPUT_SELECTOR), this.menuElement_ = this.root_.querySelector(xe.MENU_SELECTOR), this.menu_ = t(this.menuElement_), this.menu_.hoistMenuToBody(), this.menu_.setAnchorElement(this.root_), this.menu_.setAnchorCorner(ae.BOTTOM_START), this.menu_.wrapFocus = !1
			}, e.prototype.createRipple_ = function () {
				var n = this,
					t = a({}, L.createAdapter(this), {
						registerInteractionHandler: function (t, e) {
							return n.targetElement_.addEventListener(t, e)
						},
						deregisterInteractionHandler: function (t, e) {
							return n.targetElement_.removeEventListener(t, e)
						}
					});
				return new L(this.root_, new O(t))
			}, e.prototype.getNativeSelectAdapterMethods_ = function () {
				var e = this;
				return {
					getValue: function () {
						return e.nativeControl_.value
					},
					setValue: function (t) {
						e.nativeControl_.value = t
					},
					openMenu: function () {},
					closeMenu: function () {},
					isMenuOpen: function () {
						return !1
					},
					setSelectedIndex: function (t) {
						e.nativeControl_.selectedIndex = t
					},
					setDisabled: function (t) {
						e.nativeControl_.disabled = t
					},
					setValid: function (t) {
						t ? e.root_.classList.remove(we.INVALID) : e.root_.classList.add(we.INVALID)
					},
					checkValidity: function () {
						return e.nativeControl_.checkValidity()
					}
				}
			}, e.prototype.getEnhancedSelectAdapterMethods_ = function () {
				var n = this;
				return {
					getValue: function () {
						var t = n.menuElement_.querySelector(xe.SELECTED_ITEM_SELECTOR);
						return t && t.hasAttribute(xe.ENHANCED_VALUE_ATTR) && t.getAttribute(xe.ENHANCED_VALUE_ATTR) || ""
					},
					setValue: function (t) {
						var e = n.menuElement_.querySelector("[" + xe.ENHANCED_VALUE_ATTR + '="' + t + '"]');
						n.setEnhancedSelectedIndex_(e ? n.menu_.items.indexOf(e) : -1)
					},
					openMenu: function () {
						n.menu_ && !n.menu_.open && (n.menu_.open = !0, n.isMenuOpen_ = !0, n.selectedText_.setAttribute("aria-expanded", "true"))
					},
					closeMenu: function () {
						n.menu_ && n.menu_.open && (n.menu_.open = !1)
					},
					isMenuOpen: function () {
						return Boolean(n.menu_) && n.isMenuOpen_
					},
					setSelectedIndex: function (t) {
						return n.setEnhancedSelectedIndex_(t)
					},
					setDisabled: function (t) {
						n.selectedText_.setAttribute("tabindex", t ? "-1" : "0"), n.selectedText_.setAttribute("aria-disabled", t.toString()), n.hiddenInput_ && (n.hiddenInput_.disabled = t)
					},
					checkValidity: function () {
						var t = n.root_.classList;
						return !(t.contains(we.REQUIRED) && !t.contains(we.DISABLED)) || -1 !== n.selectedIndex && (0 !== n.selectedIndex || Boolean(n.value))
					},
					setValid: function (t) {
						n.selectedText_.setAttribute("aria-invalid", (!t).toString()), t ? n.root_.classList.remove(we.INVALID) : n.root_.classList.add(we.INVALID)
					}
				}
			}, e.prototype.getCommonAdapterMethods_ = function () {
				var n = this;
				return {
					addClass: function (t) {
						return n.root_.classList.add(t)
					},
					removeClass: function (t) {
						return n.root_.classList.remove(t)
					},
					hasClass: function (t) {
						return n.root_.classList.contains(t)
					},
					setRippleCenter: function (t) {
						return n.lineRipple_ && n.lineRipple_.setRippleCenter(t)
					},
					activateBottomLine: function () {
						return n.lineRipple_ && n.lineRipple_.activate()
					},
					deactivateBottomLine: function () {
						return n.lineRipple_ && n.lineRipple_.deactivate()
					},
					notifyChange: function (t) {
						var e = n.selectedIndex;
						n.emit(xe.CHANGE_EVENT, {
							value: t,
							index: e
						}, !0)
					}
				}
			}, e.prototype.getOutlineAdapterMethods_ = function () {
				var e = this;
				return {
					hasOutline: function () {
						return Boolean(e.outline_)
					},
					notchOutline: function (t) {
						return e.outline_ && e.outline_.notch(t)
					},
					closeOutline: function () {
						return e.outline_ && e.outline_.closeNotch()
					}
				}
			}, e.prototype.getLabelAdapterMethods_ = function () {
				var e = this;
				return {
					floatLabel: function (t) {
						return e.label_ && e.label_.float(t)
					},
					getLabelWidth: function () {
						return e.label_ ? e.label_.getWidth() : 0
					}
				}
			}, e.prototype.getNormalizedXCoordinate_ = function (t) {
				var e = t.target.getBoundingClientRect();
				return (this.isTouchEvent_(t) ? t.touches[0].clientX : t.clientX) - e.left
			}, e.prototype.isTouchEvent_ = function (t) {
				return Boolean(t.touches)
			}, e.prototype.getFoundationMap_ = function () {
				return {
					helperText: this.helperText_ ? this.helperText_.foundation : void 0,
					leadingIcon: this.leadingIcon_ ? this.leadingIcon_.foundation : void 0
				}
			}, e.prototype.setEnhancedSelectedIndex_ = function (t) {
				var e = this.menu_.items[t];
				this.selectedText_.textContent = e ? e.textContent.trim() : "";
				var n = this.menuElement_.querySelector(xe.SELECTED_ITEM_SELECTOR);
				n && (n.classList.remove(we.SELECTED_ITEM_CLASS), n.removeAttribute(xe.ARIA_SELECTED_ATTR)), e && (e.classList.add(we.SELECTED_ITEM_CLASS), e.setAttribute(xe.ARIA_SELECTED_ATTR, "true")), this.hiddenInput_ && (this.hiddenInput_.value = e && e.getAttribute(xe.ENHANCED_VALUE_ATTR) || ""), this.layout()
			}, e.prototype.initialSyncRequiredState_ = function () {
				(this.targetElement_.required || "true" === this.targetElement_.getAttribute("aria-required") || this.root_.classList.contains(we.REQUIRED)) && (this.nativeControl_ ? this.nativeControl_.required = !0 : this.selectedText_.setAttribute("aria-required", "true"), this.root_.classList.add(we.REQUIRED))
			}, e.prototype.addMutationObserverForRequired_ = function () {
				var e = this,
					t = new MutationObserver(function (t) {
						t.map(function (t) {
							return t.attributeName
						}).filter(function (t) {
							return t
						}).some(function (t) {
							return -1 !== ze.indexOf(t) && (e.selectedText_ ? "true" === e.selectedText_.getAttribute("aria-required") ? e.root_.classList.add(we.REQUIRED) : e.root_.classList.remove(we.REQUIRED) : e.nativeControl_.required ? e.root_.classList.add(we.REQUIRED) : e.root_.classList.remove(we.REQUIRED), !0)
						})
					});
				t.observe(this.targetElement_, {
					attributes: !0
				}), this.validationObserver_ = t
			}, e
		}(t),
		Ke = {
			ACTIVE: "mdc-slider--active",
			DISABLED: "mdc-slider--disabled",
			DISCRETE: "mdc-slider--discrete",
			FOCUS: "mdc-slider--focus",
			HAS_TRACK_MARKER: "mdc-slider--display-markers",
			IN_TRANSIT: "mdc-slider--in-transit",
			IS_DISCRETE: "mdc-slider--discrete"
		},
		qe = {
			ARIA_DISABLED: "aria-disabled",
			ARIA_VALUEMAX: "aria-valuemax",
			ARIA_VALUEMIN: "aria-valuemin",
			ARIA_VALUENOW: "aria-valuenow",
			CHANGE_EVENT: "MDCSlider:change",
			INPUT_EVENT: "MDCSlider:input",
			LAST_TRACK_MARKER_SELECTOR: ".mdc-slider__track-marker:last-child",
			PIN_VALUE_MARKER_SELECTOR: ".mdc-slider__pin-value-marker",
			STEP_DATA_ATTR: "data-step",
			THUMB_CONTAINER_SELECTOR: ".mdc-slider__thumb-container",
			TRACK_MARKER_CONTAINER_SELECTOR: ".mdc-slider__track-marker-container",
			TRACK_SELECTOR: ".mdc-slider__track"
		},
		We = {
			PAGE_FACTOR: 4
		},
		$e = ["mousedown", "pointerdown", "touchstart"],
		Ge = ["mouseup", "pointerup", "touchend"],
		Xe = {
			mousedown: "mousemove",
			pointerdown: "pointermove",
			touchstart: "touchmove"
		},
		Ye = "ArrowDown",
		Qe = "ArrowLeft",
		Ze = "ArrowRight",
		Je = "ArrowUp",
		tn = "End",
		en = "Home",
		nn = "PageDown",
		rn = "PageUp",
		on = function (n) {
			function i(t) {
				var e = n.call(this, a({}, i.defaultAdapter, t)) || this;
				return e.savedTabIndex_ = NaN, e.active_ = !1, e.inTransit_ = !1, e.isDiscrete_ = !1, e.hasTrackMarker_ = !1, e.handlingThumbTargetEvt_ = !1, e.min_ = 0, e.max_ = 100, e.step_ = 0, e.value_ = 0, e.disabled_ = !1, e.preventFocusState_ = !1, e.thumbContainerPointerHandler_ = function () {
					return e.handlingThumbTargetEvt_ = !0
				}, e.interactionStartHandler_ = function (t) {
					return e.handleDown_(t)
				}, e.keydownHandler_ = function (t) {
					return e.handleKeydown_(t)
				}, e.focusHandler_ = function () {
					return e.handleFocus_()
				}, e.blurHandler_ = function () {
					return e.handleBlur_()
				}, e.resizeHandler_ = function () {
					return e.layout()
				}, e
			}
			return o(i, n), Object.defineProperty(i, "cssClasses", {
				get: function () {
					return Ke
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "strings", {
				get: function () {
					return qe
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "numbers", {
				get: function () {
					return We
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "defaultAdapter", {
				get: function () {
					return {
						hasClass: function () {
							return !1
						},
						addClass: function () {},
						removeClass: function () {},
						getAttribute: function () {
							return null
						},
						setAttribute: function () {},
						removeAttribute: function () {},
						computeBoundingRect: function () {
							return {
								top: 0,
								right: 0,
								bottom: 0,
								left: 0,
								width: 0,
								height: 0
							}
						},
						getTabIndex: function () {
							return 0
						},
						registerInteractionHandler: function () {},
						deregisterInteractionHandler: function () {},
						registerThumbContainerInteractionHandler: function () {},
						deregisterThumbContainerInteractionHandler: function () {},
						registerBodyInteractionHandler: function () {},
						deregisterBodyInteractionHandler: function () {},
						registerResizeHandler: function () {},
						deregisterResizeHandler: function () {},
						notifyInput: function () {},
						notifyChange: function () {},
						setThumbContainerStyleProperty: function () {},
						setTrackStyleProperty: function () {},
						setMarkerValue: function () {},
						appendTrackMarkers: function () {},
						removeTrackMarkers: function () {},
						setLastTrackMarkersStyleProperty: function () {},
						isRTL: function () {
							return !1
						}
					}
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.init = function () {
				var e = this;
				this.isDiscrete_ = this.adapter_.hasClass(Ke.IS_DISCRETE), this.hasTrackMarker_ = this.adapter_.hasClass(Ke.HAS_TRACK_MARKER), $e.forEach(function (t) {
					e.adapter_.registerInteractionHandler(t, e.interactionStartHandler_), e.adapter_.registerThumbContainerInteractionHandler(t, e.thumbContainerPointerHandler_)
				}), this.adapter_.registerInteractionHandler("keydown", this.keydownHandler_), this.adapter_.registerInteractionHandler("focus", this.focusHandler_), this.adapter_.registerInteractionHandler("blur", this.blurHandler_), this.adapter_.registerResizeHandler(this.resizeHandler_), this.layout(), this.isDiscrete_ && 0 === this.getStep() && (this.step_ = 1)
			}, i.prototype.destroy = function () {
				var e = this;
				$e.forEach(function (t) {
					e.adapter_.deregisterInteractionHandler(t, e.interactionStartHandler_), e.adapter_.deregisterThumbContainerInteractionHandler(t, e.thumbContainerPointerHandler_)
				}), this.adapter_.deregisterInteractionHandler("keydown", this.keydownHandler_), this.adapter_.deregisterInteractionHandler("focus", this.focusHandler_), this.adapter_.deregisterInteractionHandler("blur", this.blurHandler_), this.adapter_.deregisterResizeHandler(this.resizeHandler_)
			}, i.prototype.setupTrackMarker = function () {
				if (this.isDiscrete_ && this.hasTrackMarker_ && 0 !== this.getStep()) {
					var t = this.getMin(),
						e = this.getMax(),
						n = this.getStep(),
						i = (e - t) / n,
						r = Math.ceil(i) !== i;
					if (r && (i = Math.ceil(i)), this.adapter_.removeTrackMarkers(), this.adapter_.appendTrackMarkers(i), r) {
						var o = (e - i * n) / n + 1;
						this.adapter_.setLastTrackMarkersStyleProperty("flex-grow", String(o))
					}
				}
			}, i.prototype.layout = function () {
				this.rect_ = this.adapter_.computeBoundingRect(), this.updateUIForCurrentValue_()
			}, i.prototype.getValue = function () {
				return this.value_
			}, i.prototype.setValue = function (t) {
				this.setValue_(t, !1)
			}, i.prototype.getMax = function () {
				return this.max_
			}, i.prototype.setMax = function (t) {
				if (t < this.min_) throw new Error("Cannot set max to be less than the slider's minimum value");
				this.max_ = t, this.setValue_(this.value_, !1, !0), this.adapter_.setAttribute(qe.ARIA_VALUEMAX, String(this.max_)), this.setupTrackMarker()
			}, i.prototype.getMin = function () {
				return this.min_
			}, i.prototype.setMin = function (t) {
				if (t > this.max_) throw new Error("Cannot set min to be greater than the slider's maximum value");
				this.min_ = t, this.setValue_(this.value_, !1, !0), this.adapter_.setAttribute(qe.ARIA_VALUEMIN, String(this.min_)), this.setupTrackMarker()
			}, i.prototype.getStep = function () {
				return this.step_
			}, i.prototype.setStep = function (t) {
				if (t < 0) throw new Error("Step cannot be set to a negative number");
				this.isDiscrete_ && ("number" != typeof t || t < 1) && (t = 1), this.step_ = t, this.setValue_(this.value_, !1, !0), this.setupTrackMarker()
			}, i.prototype.isDisabled = function () {
				return this.disabled_
			}, i.prototype.setDisabled = function (t) {
				this.disabled_ = t, this.toggleClass_(Ke.DISABLED, this.disabled_), this.disabled_ ? (this.savedTabIndex_ = this.adapter_.getTabIndex(), this.adapter_.setAttribute(qe.ARIA_DISABLED, "true"), this.adapter_.removeAttribute("tabindex")) : (this.adapter_.removeAttribute(qe.ARIA_DISABLED), isNaN(this.savedTabIndex_) || this.adapter_.setAttribute("tabindex", String(this.savedTabIndex_)))
			}, i.prototype.handleDown_ = function (t) {
				var e = this;
				if (!this.disabled_) {
					this.preventFocusState_ = !0, this.setInTransit_(!this.handlingThumbTargetEvt_), this.handlingThumbTargetEvt_ = !1, this.setActive_(!0);
					var n = function (t) {
							e.handleMove_(t)
						},
						i = Xe[t.type],
						r = function () {
							e.handleUp_(), e.adapter_.deregisterBodyInteractionHandler(i, n), Ge.forEach(function (t) {
								return e.adapter_.deregisterBodyInteractionHandler(t, r)
							})
						};
					this.adapter_.registerBodyInteractionHandler(i, n), Ge.forEach(function (t) {
						return e.adapter_.registerBodyInteractionHandler(t, r)
					}), this.setValueFromEvt_(t)
				}
			}, i.prototype.handleMove_ = function (t) {
				t.preventDefault(), this.setValueFromEvt_(t)
			}, i.prototype.handleUp_ = function () {
				this.setActive_(!1), this.adapter_.notifyChange()
			}, i.prototype.getPageX_ = function (t) {
				return t.targetTouches && 0 < t.targetTouches.length ? t.targetTouches[0].pageX : t.pageX
			}, i.prototype.setValueFromEvt_ = function (t) {
				var e = this.getPageX_(t),
					n = this.computeValueFromPageX_(e);
				this.setValue_(n, !0)
			}, i.prototype.computeValueFromPageX_ = function (t) {
				var e = this.max_,
					n = this.min_,
					i = (t - this.rect_.left) / this.rect_.width;
				return this.adapter_.isRTL() && (i = 1 - i), n + i * (e - n)
			}, i.prototype.handleKeydown_ = function (t) {
				var e = this.getKeyId_(t),
					n = this.getValueForKeyId_(e);
				isNaN(n) || (t.preventDefault(), this.adapter_.addClass(Ke.FOCUS), this.setValue_(n, !0), this.adapter_.notifyChange())
			}, i.prototype.getKeyId_ = function (t) {
				return t.key === Qe || 37 === t.keyCode ? Qe : t.key === Ze || 39 === t.keyCode ? Ze : t.key === Je || 38 === t.keyCode ? Je : t.key === Ye || 40 === t.keyCode ? Ye : t.key === en || 36 === t.keyCode ? en : t.key === tn || 35 === t.keyCode ? tn : t.key === rn || 33 === t.keyCode ? rn : t.key === nn || 34 === t.keyCode ? nn : ""
			}, i.prototype.getValueForKeyId_ = function (t) {
				var e = this.max_,
					n = this.min_,
					i = this.step_ || (e - n) / 100;
				switch (this.adapter_.isRTL() && (t === Qe || t === Ze) && (i = -i), t) {
					case Qe:
					case Ye:
						return this.value_ - i;
					case Ze:
					case Je:
						return this.value_ + i;
					case en:
						return this.min_;
					case tn:
						return this.max_;
					case rn:
						return this.value_ + i * We.PAGE_FACTOR;
					case nn:
						return this.value_ - i * We.PAGE_FACTOR;
					default:
						return NaN
				}
			}, i.prototype.handleFocus_ = function () {
				this.preventFocusState_ || this.adapter_.addClass(Ke.FOCUS)
			}, i.prototype.handleBlur_ = function () {
				this.preventFocusState_ = !1, this.adapter_.removeClass(Ke.FOCUS)
			}, i.prototype.setValue_ = function (t, e, n) {
				if (void 0 === n && (n = !1), t !== this.value_ || n) {
					var i = this.min_,
						r = this.max_,
						o = t === i || t === r;
					this.step_ && !o && (t = this.quantize_(t)), t < i ? t = i : r < t && (t = r), this.value_ = t, this.adapter_.setAttribute(qe.ARIA_VALUENOW, String(this.value_)), this.updateUIForCurrentValue_(), e && (this.adapter_.notifyInput(), this.isDiscrete_ && this.adapter_.setMarkerValue(t))
				}
			}, i.prototype.quantize_ = function (t) {
				return Math.round(t / this.step_) * this.step_
			}, i.prototype.updateUIForCurrentValue_ = function () {
				var t = this,
					e = this.max_,
					n = this.min_,
					i = (this.value_ - n) / (e - n),
					r = i * this.rect_.width;
				this.adapter_.isRTL() && (r = this.rect_.width - r);
				var o = d(window, "transform"),
					s = h(window, "transitionend");
				if (this.inTransit_) {
					var a = function () {
						t.setInTransit_(!1), t.adapter_.deregisterThumbContainerInteractionHandler(s, a)
					};
					this.adapter_.registerThumbContainerInteractionHandler(s, a)
				}
				requestAnimationFrame(function () {
					t.adapter_.setThumbContainerStyleProperty(o, "translateX(" + r + "px) translateX(-50%)"), t.adapter_.setTrackStyleProperty(o, "scaleX(" + i + ")")
				})
			}, i.prototype.setActive_ = function (t) {
				this.active_ = t, this.toggleClass_(Ke.ACTIVE, this.active_)
			}, i.prototype.setInTransit_ = function (t) {
				this.inTransit_ = t, this.toggleClass_(Ke.IN_TRANSIT, this.inTransit_)
			}, i.prototype.toggleClass_ = function (t, e) {
				e ? this.adapter_.addClass(t) : this.adapter_.removeClass(t)
			}, i
		}(n),
		sn = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, Object.defineProperty(e.prototype, "value", {
				get: function () {
					return this.foundation_.getValue()
				},
				set: function (t) {
					this.foundation_.setValue(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "min", {
				get: function () {
					return this.foundation_.getMin()
				},
				set: function (t) {
					this.foundation_.setMin(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "max", {
				get: function () {
					return this.foundation_.getMax()
				},
				set: function (t) {
					this.foundation_.setMax(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "step", {
				get: function () {
					return this.foundation_.getStep()
				},
				set: function (t) {
					this.foundation_.setStep(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "disabled", {
				get: function () {
					return this.foundation_.isDisabled()
				},
				set: function (t) {
					this.foundation_.setDisabled(t)
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.initialize = function () {
				this.thumbContainer_ = this.root_.querySelector(qe.THUMB_CONTAINER_SELECTOR), this.track_ = this.root_.querySelector(qe.TRACK_SELECTOR), this.pinValueMarker_ = this.root_.querySelector(qe.PIN_VALUE_MARKER_SELECTOR), this.trackMarkerContainer_ = this.root_.querySelector(qe.TRACK_MARKER_CONTAINER_SELECTOR)
			}, e.prototype.getDefaultFoundation = function () {
				var r = this;
				return new on({
					hasClass: function (t) {
						return r.root_.classList.contains(t)
					},
					addClass: function (t) {
						return r.root_.classList.add(t)
					},
					removeClass: function (t) {
						return r.root_.classList.remove(t)
					},
					getAttribute: function (t) {
						return r.root_.getAttribute(t)
					},
					setAttribute: function (t, e) {
						return r.root_.setAttribute(t, e)
					},
					removeAttribute: function (t) {
						return r.root_.removeAttribute(t)
					},
					computeBoundingRect: function () {
						return r.root_.getBoundingClientRect()
					},
					getTabIndex: function () {
						return r.root_.tabIndex
					},
					registerInteractionHandler: function (t, e) {
						return r.listen(t, e)
					},
					deregisterInteractionHandler: function (t, e) {
						return r.unlisten(t, e)
					},
					registerThumbContainerInteractionHandler: function (t, e) {
						r.thumbContainer_.addEventListener(t, e)
					},
					deregisterThumbContainerInteractionHandler: function (t, e) {
						r.thumbContainer_.removeEventListener(t, e)
					},
					registerBodyInteractionHandler: function (t, e) {
						return document.body.addEventListener(t, e)
					},
					deregisterBodyInteractionHandler: function (t, e) {
						return document.body.removeEventListener(t, e)
					},
					registerResizeHandler: function (t) {
						return window.addEventListener("resize", t)
					},
					deregisterResizeHandler: function (t) {
						return window.removeEventListener("resize", t)
					},
					notifyInput: function () {
						return r.emit(qe.INPUT_EVENT, r)
					},
					notifyChange: function () {
						return r.emit(qe.CHANGE_EVENT, r)
					},
					setThumbContainerStyleProperty: function (t, e) {
						r.thumbContainer_.style.setProperty(t, e)
					},
					setTrackStyleProperty: function (t, e) {
						return r.track_.style.setProperty(t, e)
					},
					setMarkerValue: function (t) {
						return r.pinValueMarker_.innerText = t.toLocaleString()
					},
					appendTrackMarkers: function (t) {
						for (var e = document.createDocumentFragment(), n = 0; n < t; n++) {
							var i = document.createElement("div");
							i.classList.add("mdc-slider__track-marker"), e.appendChild(i)
						}
						r.trackMarkerContainer_.appendChild(e)
					},
					removeTrackMarkers: function () {
						for (; r.trackMarkerContainer_.firstChild;) r.trackMarkerContainer_.removeChild(r.trackMarkerContainer_.firstChild)
					},
					setLastTrackMarkersStyleProperty: function (t, e) {
						r.root_.querySelector(qe.LAST_TRACK_MARKER_SELECTOR).style.setProperty(t, e)
					},
					isRTL: function () {
						return "rtl" === getComputedStyle(r.root_).direction
					}
				})
			}, e.prototype.initialSyncWithDOM = function () {
				var t = this.parseFloat_(this.root_.getAttribute(qe.ARIA_VALUENOW), this.value),
					e = this.parseFloat_(this.root_.getAttribute(qe.ARIA_VALUEMIN), this.min),
					n = this.parseFloat_(this.root_.getAttribute(qe.ARIA_VALUEMAX), this.max);
				e >= this.max ? (this.max = n, this.min = e) : (this.min = e, this.max = n), this.step = this.parseFloat_(this.root_.getAttribute(qe.STEP_DATA_ATTR), this.step), this.value = t, this.disabled = this.root_.hasAttribute(qe.ARIA_DISABLED) && "false" !== this.root_.getAttribute(qe.ARIA_DISABLED), this.foundation_.setupTrackMarker()
			}, e.prototype.layout = function () {
				this.foundation_.layout()
			}, e.prototype.stepUp = function (t) {
				void 0 === t && (t = this.step || 1), this.value += t
			}, e.prototype.stepDown = function (t) {
				void 0 === t && (t = this.step || 1), this.value -= t
			}, e.prototype.parseFloat_ = function (t, e) {
				var n = parseFloat(t);
				return "number" == typeof n && isFinite(n) ? n : e
			}, e
		}(t),
		an = {
			CLOSING: "mdc-snackbar--closing",
			OPEN: "mdc-snackbar--open",
			OPENING: "mdc-snackbar--opening"
		},
		cn = {
			ACTION_SELECTOR: ".mdc-snackbar__action",
			ARIA_LIVE_LABEL_TEXT_ATTR: "data-mdc-snackbar-label-text",
			CLOSED_EVENT: "MDCSnackbar:closed",
			CLOSING_EVENT: "MDCSnackbar:closing",
			DISMISS_SELECTOR: ".mdc-snackbar__dismiss",
			LABEL_SELECTOR: ".mdc-snackbar__label",
			OPENED_EVENT: "MDCSnackbar:opened",
			OPENING_EVENT: "MDCSnackbar:opening",
			REASON_ACTION: "action",
			REASON_DISMISS: "dismiss",
			SURFACE_SELECTOR: ".mdc-snackbar__surface"
		},
		ln = {
			DEFAULT_AUTO_DISMISS_TIMEOUT_MS: 5e3,
			MAX_AUTO_DISMISS_TIMEOUT_MS: 1e4,
			MIN_AUTO_DISMISS_TIMEOUT_MS: 4e3,
			SNACKBAR_ANIMATION_CLOSE_TIME_MS: 75,
			SNACKBAR_ANIMATION_OPEN_TIME_MS: 150,
			ARIA_LIVE_DELAY_MS: 1e3
		},
		un = ln.ARIA_LIVE_DELAY_MS,
		dn = cn.ARIA_LIVE_LABEL_TEXT_ATTR;

	function hn(t, e) {
		void 0 === e && (e = t);
		var n = t.getAttribute("aria-live"),
			i = e.textContent.trim();
		i && n && (t.setAttribute("aria-live", "off"), e.textContent = "", e.innerHTML = '<span style="display: inline-block; width: 0; height: 1px;"> </span>', e.setAttribute(dn, i), setTimeout(function () {
			t.setAttribute("aria-live", n), e.removeAttribute(dn), e.textContent = i
		}, un))
	}
	var pn, fn = an.OPENING,
		_n = an.OPEN,
		mn = an.CLOSING,
		gn = cn.REASON_ACTION,
		yn = cn.REASON_DISMISS,
		En = function (n) {
			function i(t) {
				var e = n.call(this, a({}, i.defaultAdapter, t)) || this;
				return e.isOpen_ = !1, e.animationFrame_ = 0, e.animationTimer_ = 0, e.autoDismissTimer_ = 0, e.autoDismissTimeoutMs_ = ln.DEFAULT_AUTO_DISMISS_TIMEOUT_MS, e.closeOnEscape_ = !0, e
			}
			return o(i, n), Object.defineProperty(i, "cssClasses", {
				get: function () {
					return an
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "strings", {
				get: function () {
					return cn
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "numbers", {
				get: function () {
					return ln
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "defaultAdapter", {
				get: function () {
					return {
						addClass: function () {},
						announce: function () {},
						notifyClosed: function () {},
						notifyClosing: function () {},
						notifyOpened: function () {},
						notifyOpening: function () {},
						removeClass: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.destroy = function () {
				this.clearAutoDismissTimer_(), cancelAnimationFrame(this.animationFrame_), this.animationFrame_ = 0, clearTimeout(this.animationTimer_), this.animationTimer_ = 0, this.adapter_.removeClass(fn), this.adapter_.removeClass(_n), this.adapter_.removeClass(mn)
			}, i.prototype.open = function () {
				var t = this;
				this.clearAutoDismissTimer_(), this.isOpen_ = !0, this.adapter_.notifyOpening(), this.adapter_.removeClass(mn), this.adapter_.addClass(fn), this.adapter_.announce(), this.runNextAnimationFrame_(function () {
					t.adapter_.addClass(_n), t.animationTimer_ = setTimeout(function () {
						t.handleAnimationTimerEnd_(), t.adapter_.notifyOpened(), t.autoDismissTimer_ = setTimeout(function () {
							t.close(yn)
						}, t.getTimeoutMs())
					}, ln.SNACKBAR_ANIMATION_OPEN_TIME_MS)
				})
			}, i.prototype.close = function (t) {
				var e = this;
				void 0 === t && (t = ""), this.isOpen_ && (cancelAnimationFrame(this.animationFrame_), this.animationFrame_ = 0, this.clearAutoDismissTimer_(), this.isOpen_ = !1, this.adapter_.notifyClosing(t), this.adapter_.addClass(an.CLOSING), this.adapter_.removeClass(an.OPEN), this.adapter_.removeClass(an.OPENING), clearTimeout(this.animationTimer_), this.animationTimer_ = setTimeout(function () {
					e.handleAnimationTimerEnd_(), e.adapter_.notifyClosed(t)
				}, ln.SNACKBAR_ANIMATION_CLOSE_TIME_MS))
			}, i.prototype.isOpen = function () {
				return this.isOpen_
			}, i.prototype.getTimeoutMs = function () {
				return this.autoDismissTimeoutMs_
			}, i.prototype.setTimeoutMs = function (t) {
				var e = ln.MIN_AUTO_DISMISS_TIMEOUT_MS,
					n = ln.MAX_AUTO_DISMISS_TIMEOUT_MS;
				if (!(t <= n && e <= t)) throw new Error("timeoutMs must be an integer in the range " + e + "–" + n + ", but got '" + t + "'");
				this.autoDismissTimeoutMs_ = t
			}, i.prototype.getCloseOnEscape = function () {
				return this.closeOnEscape_
			}, i.prototype.setCloseOnEscape = function (t) {
				this.closeOnEscape_ = t
			}, i.prototype.handleKeyDown = function (t) {
				("Escape" === t.key || 27 === t.keyCode) && this.getCloseOnEscape() && this.close(yn)
			}, i.prototype.handleActionButtonClick = function (t) {
				this.close(gn)
			}, i.prototype.handleActionIconClick = function (t) {
				this.close(yn)
			}, i.prototype.clearAutoDismissTimer_ = function () {
				clearTimeout(this.autoDismissTimer_), this.autoDismissTimer_ = 0
			}, i.prototype.handleAnimationTimerEnd_ = function () {
				this.animationTimer_ = 0, this.adapter_.removeClass(an.OPENING), this.adapter_.removeClass(an.CLOSING)
			}, i.prototype.runNextAnimationFrame_ = function (t) {
				var e = this;
				cancelAnimationFrame(this.animationFrame_), this.animationFrame_ = requestAnimationFrame(function () {
					e.animationFrame_ = 0, clearTimeout(e.animationTimer_), e.animationTimer_ = setTimeout(t, 0)
				})
			}, i
		}(n),
		vn = cn.SURFACE_SELECTOR,
		Cn = cn.LABEL_SELECTOR,
		bn = cn.ACTION_SELECTOR,
		Tn = cn.DISMISS_SELECTOR,
		In = cn.OPENING_EVENT,
		An = cn.OPENED_EVENT,
		Sn = cn.CLOSING_EVENT,
		On = cn.CLOSED_EVENT,
		Ln = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, e.prototype.initialize = function (t) {
				void 0 === t && (t = function () {
					return hn
				}), this.announce_ = t()
			}, e.prototype.initialSyncWithDOM = function () {
				var n = this;
				this.surfaceEl_ = this.root_.querySelector(vn), this.labelEl_ = this.root_.querySelector(Cn), this.actionEl_ = this.root_.querySelector(bn), this.handleKeyDown_ = function (t) {
					return n.foundation_.handleKeyDown(t)
				}, this.handleSurfaceClick_ = function (t) {
					var e = t.target;
					n.isActionButton_(e) ? n.foundation_.handleActionButtonClick(t) : n.isActionIcon_(e) && n.foundation_.handleActionIconClick(t)
				}, this.registerKeyDownHandler_(this.handleKeyDown_), this.registerSurfaceClickHandler_(this.handleSurfaceClick_)
			}, e.prototype.destroy = function () {
				t.prototype.destroy.call(this), this.deregisterKeyDownHandler_(this.handleKeyDown_), this.deregisterSurfaceClickHandler_(this.handleSurfaceClick_)
			}, e.prototype.open = function () {
				this.foundation_.open()
			}, e.prototype.close = function (t) {
				void 0 === t && (t = ""), this.foundation_.close(t)
			}, e.prototype.getDefaultFoundation = function () {
				var e = this;
				return new En({
					addClass: function (t) {
						return e.root_.classList.add(t)
					},
					announce: function () {
						return e.announce_(e.labelEl_)
					},
					notifyClosed: function (t) {
						return e.emit(On, t ? {
							reason: t
						} : {})
					},
					notifyClosing: function (t) {
						return e.emit(Sn, t ? {
							reason: t
						} : {})
					},
					notifyOpened: function () {
						return e.emit(An, {})
					},
					notifyOpening: function () {
						return e.emit(In, {})
					},
					removeClass: function (t) {
						return e.root_.classList.remove(t)
					}
				})
			}, Object.defineProperty(e.prototype, "timeoutMs", {
				get: function () {
					return this.foundation_.getTimeoutMs()
				},
				set: function (t) {
					this.foundation_.setTimeoutMs(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "closeOnEscape", {
				get: function () {
					return this.foundation_.getCloseOnEscape()
				},
				set: function (t) {
					this.foundation_.setCloseOnEscape(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "isOpen", {
				get: function () {
					return this.foundation_.isOpen()
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "labelText", {
				get: function () {
					return this.labelEl_.textContent
				},
				set: function (t) {
					this.labelEl_.textContent = t
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "actionButtonText", {
				get: function () {
					return this.actionEl_.textContent
				},
				set: function (t) {
					this.actionEl_.textContent = t
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.registerKeyDownHandler_ = function (t) {
				this.listen("keydown", t)
			}, e.prototype.deregisterKeyDownHandler_ = function (t) {
				this.unlisten("keydown", t)
			}, e.prototype.registerSurfaceClickHandler_ = function (t) {
				this.surfaceEl_.addEventListener("click", t)
			}, e.prototype.deregisterSurfaceClickHandler_ = function (t) {
				this.surfaceEl_.removeEventListener("click", t)
			}, e.prototype.isActionButton_ = function (t) {
				return Boolean(p(t, bn))
			}, e.prototype.isActionIcon_ = function (t) {
				return Boolean(p(t, Tn))
			}, e
		}(t),
		Rn = {
			CHECKED: "mdc-switch--checked",
			DISABLED: "mdc-switch--disabled"
		},
		wn = {
			NATIVE_CONTROL_SELECTOR: ".mdc-switch__native-control",
			RIPPLE_SURFACE_SELECTOR: ".mdc-switch__thumb-underlay"
		},
		xn = function (e) {
			function n(t) {
				return e.call(this, a({}, n.defaultAdapter, t)) || this
			}
			return o(n, e), Object.defineProperty(n, "strings", {
				get: function () {
					return wn
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n, "cssClasses", {
				get: function () {
					return Rn
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n, "defaultAdapter", {
				get: function () {
					return {
						addClass: function () {},
						removeClass: function () {},
						setNativeControlChecked: function () {},
						setNativeControlDisabled: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), n.prototype.setChecked = function (t) {
				this.adapter_.setNativeControlChecked(t), this.updateCheckedStyling_(t)
			}, n.prototype.setDisabled = function (t) {
				this.adapter_.setNativeControlDisabled(t), t ? this.adapter_.addClass(Rn.DISABLED) : this.adapter_.removeClass(Rn.DISABLED)
			}, n.prototype.handleChange = function (t) {
				var e = t.target;
				this.updateCheckedStyling_(e.checked)
			}, n.prototype.updateCheckedStyling_ = function (t) {
				t ? this.adapter_.addClass(Rn.CHECKED) : this.adapter_.removeClass(Rn.CHECKED)
			}, n
		}(n),
		Nn = function (e) {
			function n() {
				var t = null !== e && e.apply(this, arguments) || this;
				return t.ripple_ = t.createRipple_(), t
			}
			return o(n, e), n.attachTo = function (t) {
				return new n(t)
			}, n.prototype.destroy = function () {
				e.prototype.destroy.call(this), this.ripple_.destroy(), this.nativeControl_.removeEventListener("change", this.changeHandler_)
			}, n.prototype.initialSyncWithDOM = function () {
				var i = this;
				this.changeHandler_ = function () {
					for (var t, e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
					return (t = i.foundation_).handleChange.apply(t, s(e))
				}, this.nativeControl_.addEventListener("change", this.changeHandler_), this.checked = this.checked
			}, n.prototype.getDefaultFoundation = function () {
				var e = this;
				return new xn({
					addClass: function (t) {
						return e.root_.classList.add(t)
					},
					removeClass: function (t) {
						return e.root_.classList.remove(t)
					},
					setNativeControlChecked: function (t) {
						return e.nativeControl_.checked = t
					},
					setNativeControlDisabled: function (t) {
						return e.nativeControl_.disabled = t
					}
				})
			}, Object.defineProperty(n.prototype, "ripple", {
				get: function () {
					return this.ripple_
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n.prototype, "checked", {
				get: function () {
					return this.nativeControl_.checked
				},
				set: function (t) {
					this.foundation_.setChecked(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n.prototype, "disabled", {
				get: function () {
					return this.nativeControl_.disabled
				},
				set: function (t) {
					this.foundation_.setDisabled(t)
				},
				enumerable: !0,
				configurable: !0
			}), n.prototype.createRipple_ = function () {
				var n = this,
					t = xn.strings.RIPPLE_SURFACE_SELECTOR,
					i = this.root_.querySelector(t),
					e = a({}, L.createAdapter(this), {
						addClass: function (t) {
							return i.classList.add(t)
						},
						computeBoundingRect: function () {
							return i.getBoundingClientRect()
						},
						deregisterInteractionHandler: function (t, e) {
							n.nativeControl_.removeEventListener(t, e)
						},
						isSurfaceActive: function () {
							return f(n.nativeControl_, ":active")
						},
						isUnbounded: function () {
							return !0
						},
						registerInteractionHandler: function (t, e) {
							n.nativeControl_.addEventListener(t, e)
						},
						removeClass: function (t) {
							return i.classList.remove(t)
						},
						updateCssVariable: function (t, e) {
							i.style.setProperty(t, e)
						}
					});
				return new L(this.root_, new O(e))
			}, Object.defineProperty(n.prototype, "nativeControl_", {
				get: function () {
					var t = xn.strings.NATIVE_CONTROL_SELECTOR;
					return this.root_.querySelector(t)
				},
				enumerable: !0,
				configurable: !0
			}), n
		}(t),
		Dn = {
			ANIMATING: "mdc-tab-scroller--animating",
			SCROLL_AREA_SCROLL: "mdc-tab-scroller__scroll-area--scroll",
			SCROLL_TEST: "mdc-tab-scroller__test"
		},
		kn = {
			AREA_SELECTOR: ".mdc-tab-scroller__scroll-area",
			CONTENT_SELECTOR: ".mdc-tab-scroller__scroll-content"
		},
		Mn = function (t) {
			this.adapter_ = t
		},
		Pn = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.prototype.getScrollPositionRTL = function () {
				var t = this.adapter_.getScrollAreaScrollLeft(),
					e = this.calculateScrollEdges_().right;
				return Math.round(e - t)
			}, e.prototype.scrollToRTL = function (t) {
				var e = this.calculateScrollEdges_(),
					n = this.adapter_.getScrollAreaScrollLeft(),
					i = this.clampScrollValue_(e.right - t);
				return {
					finalScrollPosition: i,
					scrollDelta: i - n
				}
			}, e.prototype.incrementScrollRTL = function (t) {
				var e = this.adapter_.getScrollAreaScrollLeft(),
					n = this.clampScrollValue_(e - t);
				return {
					finalScrollPosition: n,
					scrollDelta: n - e
				}
			}, e.prototype.getAnimatingScrollPosition = function (t) {
				return t
			}, e.prototype.calculateScrollEdges_ = function () {
				return {
					left: 0,
					right: this.adapter_.getScrollContentOffsetWidth() - this.adapter_.getScrollAreaOffsetWidth()
				}
			}, e.prototype.clampScrollValue_ = function (t) {
				var e = this.calculateScrollEdges_();
				return Math.min(Math.max(e.left, t), e.right)
			}, e
		}(Mn),
		Hn = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.prototype.getScrollPositionRTL = function (t) {
				var e = this.adapter_.getScrollAreaScrollLeft();
				return Math.round(t - e)
			}, e.prototype.scrollToRTL = function (t) {
				var e = this.adapter_.getScrollAreaScrollLeft(),
					n = this.clampScrollValue_(-t);
				return {
					finalScrollPosition: n,
					scrollDelta: n - e
				}
			}, e.prototype.incrementScrollRTL = function (t) {
				var e = this.adapter_.getScrollAreaScrollLeft(),
					n = this.clampScrollValue_(e - t);
				return {
					finalScrollPosition: n,
					scrollDelta: n - e
				}
			}, e.prototype.getAnimatingScrollPosition = function (t, e) {
				return t - e
			}, e.prototype.calculateScrollEdges_ = function () {
				var t = this.adapter_.getScrollContentOffsetWidth();
				return {
					left: this.adapter_.getScrollAreaOffsetWidth() - t,
					right: 0
				}
			}, e.prototype.clampScrollValue_ = function (t) {
				var e = this.calculateScrollEdges_();
				return Math.max(Math.min(e.right, t), e.left)
			}, e
		}(Mn),
		Fn = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.prototype.getScrollPositionRTL = function (t) {
				var e = this.adapter_.getScrollAreaScrollLeft();
				return Math.round(e - t)
			}, e.prototype.scrollToRTL = function (t) {
				var e = this.adapter_.getScrollAreaScrollLeft(),
					n = this.clampScrollValue_(t);
				return {
					finalScrollPosition: n,
					scrollDelta: e - n
				}
			}, e.prototype.incrementScrollRTL = function (t) {
				var e = this.adapter_.getScrollAreaScrollLeft(),
					n = this.clampScrollValue_(e + t);
				return {
					finalScrollPosition: n,
					scrollDelta: e - n
				}
			}, e.prototype.getAnimatingScrollPosition = function (t, e) {
				return t + e
			}, e.prototype.calculateScrollEdges_ = function () {
				return {
					left: this.adapter_.getScrollContentOffsetWidth() - this.adapter_.getScrollAreaOffsetWidth(),
					right: 0
				}
			}, e.prototype.clampScrollValue_ = function (t) {
				var e = this.calculateScrollEdges_();
				return Math.min(Math.max(e.right, t), e.left)
			}, e
		}(Mn),
		Bn = function (n) {
			function i(t) {
				var e = n.call(this, a({}, i.defaultAdapter, t)) || this;
				return e.isAnimating_ = !1, e
			}
			return o(i, n), Object.defineProperty(i, "cssClasses", {
				get: function () {
					return Dn
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "strings", {
				get: function () {
					return kn
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "defaultAdapter", {
				get: function () {
					return {
						eventTargetMatchesSelector: function () {
							return !1
						},
						addClass: function () {},
						removeClass: function () {},
						addScrollAreaClass: function () {},
						setScrollAreaStyleProperty: function () {},
						setScrollContentStyleProperty: function () {},
						getScrollContentStyleValue: function () {
							return ""
						},
						setScrollAreaScrollLeft: function () {},
						getScrollAreaScrollLeft: function () {
							return 0
						},
						getScrollContentOffsetWidth: function () {
							return 0
						},
						getScrollAreaOffsetWidth: function () {
							return 0
						},
						computeScrollAreaClientRect: function () {
							return {
								top: 0,
								right: 0,
								bottom: 0,
								left: 0,
								width: 0,
								height: 0
							}
						},
						computeScrollContentClientRect: function () {
							return {
								top: 0,
								right: 0,
								bottom: 0,
								left: 0,
								width: 0,
								height: 0
							}
						},
						computeHorizontalScrollbarHeight: function () {
							return 0
						}
					}
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.init = function () {
				var t = this.adapter_.computeHorizontalScrollbarHeight();
				this.adapter_.setScrollAreaStyleProperty("margin-bottom", -t + "px"), this.adapter_.addScrollAreaClass(i.cssClasses.SCROLL_AREA_SCROLL)
			}, i.prototype.getScrollPosition = function () {
				if (this.isRTL_()) return this.computeCurrentScrollPositionRTL_();
				var t = this.calculateCurrentTranslateX_();
				return this.adapter_.getScrollAreaScrollLeft() - t
			}, i.prototype.handleInteraction = function () {
				this.isAnimating_ && this.stopScrollAnimation_()
			}, i.prototype.handleTransitionEnd = function (t) {
				var e = t.target;
				this.isAnimating_ && this.adapter_.eventTargetMatchesSelector(e, i.strings.CONTENT_SELECTOR) && (this.isAnimating_ = !1, this.adapter_.removeClass(i.cssClasses.ANIMATING))
			}, i.prototype.incrementScroll = function (t) {
				if (0 !== t) return this.isRTL_() ? this.incrementScrollRTL_(t) : void this.incrementScroll_(t)
			}, i.prototype.scrollTo = function (t) {
				if (this.isRTL_()) return this.scrollToRTL_(t);
				this.scrollTo_(t)
			}, i.prototype.getRTLScroller = function () {
				return this.rtlScrollerInstance_ || (this.rtlScrollerInstance_ = this.rtlScrollerFactory_()), this.rtlScrollerInstance_
			}, i.prototype.calculateCurrentTranslateX_ = function () {
				var t = this.adapter_.getScrollContentStyleValue("transform");
				if ("none" === t) return 0;
				var e = /\((.+?)\)/.exec(t);
				if (!e) return 0;
				var n = r(e[1].split(","), 6),
					i = (n[0], n[1], n[2], n[3], n[4]);
				n[5];
				return parseFloat(i)
			}, i.prototype.clampScrollValue_ = function (t) {
				var e = this.calculateScrollEdges_();
				return Math.min(Math.max(e.left, t), e.right)
			}, i.prototype.computeCurrentScrollPositionRTL_ = function () {
				var t = this.calculateCurrentTranslateX_();
				return this.getRTLScroller().getScrollPositionRTL(t)
			}, i.prototype.calculateScrollEdges_ = function () {
				return {
					left: 0,
					right: this.adapter_.getScrollContentOffsetWidth() - this.adapter_.getScrollAreaOffsetWidth()
				}
			}, i.prototype.scrollTo_ = function (t) {
				var e = this.getScrollPosition(),
					n = this.clampScrollValue_(t),
					i = n - e;
				this.animate_({
					finalScrollPosition: n,
					scrollDelta: i
				})
			}, i.prototype.scrollToRTL_ = function (t) {
				var e = this.getRTLScroller().scrollToRTL(t);
				this.animate_(e)
			}, i.prototype.incrementScroll_ = function (t) {
				var e = this.getScrollPosition(),
					n = t + e,
					i = this.clampScrollValue_(n),
					r = i - e;
				this.animate_({
					finalScrollPosition: i,
					scrollDelta: r
				})
			}, i.prototype.incrementScrollRTL_ = function (t) {
				var e = this.getRTLScroller().incrementScrollRTL(t);
				this.animate_(e)
			}, i.prototype.animate_ = function (t) {
				var e = this;
				0 !== t.scrollDelta && (this.stopScrollAnimation_(), this.adapter_.setScrollAreaScrollLeft(t.finalScrollPosition), this.adapter_.setScrollContentStyleProperty("transform", "translateX(" + t.scrollDelta + "px)"), this.adapter_.computeScrollAreaClientRect(), requestAnimationFrame(function () {
					e.adapter_.addClass(i.cssClasses.ANIMATING), e.adapter_.setScrollContentStyleProperty("transform", "none")
				}), this.isAnimating_ = !0)
			}, i.prototype.stopScrollAnimation_ = function () {
				this.isAnimating_ = !1;
				var t = this.getAnimatingScrollPosition_();
				this.adapter_.removeClass(i.cssClasses.ANIMATING), this.adapter_.setScrollContentStyleProperty("transform", "translateX(0px)"), this.adapter_.setScrollAreaScrollLeft(t)
			}, i.prototype.getAnimatingScrollPosition_ = function () {
				var t = this.calculateCurrentTranslateX_(),
					e = this.adapter_.getScrollAreaScrollLeft();
				return this.isRTL_() ? this.getRTLScroller().getAnimatingScrollPosition(e, t) : e - t
			}, i.prototype.rtlScrollerFactory_ = function () {
				var t = this.adapter_.getScrollAreaScrollLeft();
				this.adapter_.setScrollAreaScrollLeft(t - 1);
				var e = this.adapter_.getScrollAreaScrollLeft();
				if (e < 0) return this.adapter_.setScrollAreaScrollLeft(t), new Hn(this.adapter_);
				var n = this.adapter_.computeScrollAreaClientRect(),
					i = this.adapter_.computeScrollContentClientRect(),
					r = Math.round(i.right - n.right);
				return this.adapter_.setScrollAreaScrollLeft(t), r === e ? new Fn(this.adapter_) : new Pn(this.adapter_)
			}, i.prototype.isRTL_ = function () {
				return "rtl" === this.adapter_.getScrollContentStyleValue("direction")
			}, i
		}(n);
	var Vn = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, e.prototype.initialize = function () {
				this.area_ = this.root_.querySelector(Bn.strings.AREA_SELECTOR), this.content_ = this.root_.querySelector(Bn.strings.CONTENT_SELECTOR)
			}, e.prototype.initialSyncWithDOM = function () {
				var e = this;
				this.handleInteraction_ = function () {
					return e.foundation_.handleInteraction()
				}, this.handleTransitionEnd_ = function (t) {
					return e.foundation_.handleTransitionEnd(t)
				}, this.area_.addEventListener("wheel", this.handleInteraction_), this.area_.addEventListener("touchstart", this.handleInteraction_), this.area_.addEventListener("pointerdown", this.handleInteraction_), this.area_.addEventListener("mousedown", this.handleInteraction_), this.area_.addEventListener("keydown", this.handleInteraction_), this.content_.addEventListener("transitionend", this.handleTransitionEnd_)
			}, e.prototype.destroy = function () {
				t.prototype.destroy.call(this), this.area_.removeEventListener("wheel", this.handleInteraction_), this.area_.removeEventListener("touchstart", this.handleInteraction_), this.area_.removeEventListener("pointerdown", this.handleInteraction_), this.area_.removeEventListener("mousedown", this.handleInteraction_), this.area_.removeEventListener("keydown", this.handleInteraction_), this.content_.removeEventListener("transitionend", this.handleTransitionEnd_)
			}, e.prototype.getDefaultFoundation = function () {
				var n = this;
				return new Bn({
					eventTargetMatchesSelector: function (t, e) {
						return f(t, e)
					},
					addClass: function (t) {
						return n.root_.classList.add(t)
					},
					removeClass: function (t) {
						return n.root_.classList.remove(t)
					},
					addScrollAreaClass: function (t) {
						return n.area_.classList.add(t)
					},
					setScrollAreaStyleProperty: function (t, e) {
						return n.area_.style.setProperty(t, e)
					},
					setScrollContentStyleProperty: function (t, e) {
						return n.content_.style.setProperty(t, e)
					},
					getScrollContentStyleValue: function (t) {
						return window.getComputedStyle(n.content_).getPropertyValue(t)
					},
					setScrollAreaScrollLeft: function (t) {
						return n.area_.scrollLeft = t
					},
					getScrollAreaScrollLeft: function () {
						return n.area_.scrollLeft
					},
					getScrollContentOffsetWidth: function () {
						return n.content_.offsetWidth
					},
					getScrollAreaOffsetWidth: function () {
						return n.area_.offsetWidth
					},
					computeScrollAreaClientRect: function () {
						return n.area_.getBoundingClientRect()
					},
					computeScrollContentClientRect: function () {
						return n.content_.getBoundingClientRect()
					},
					computeHorizontalScrollbarHeight: function () {
						return function (t, e) {
							if (void 0 === e && (e = !0), e && void 0 !== pn) return pn;
							var n = t.createElement("div");
							n.classList.add(Dn.SCROLL_TEST), t.body.appendChild(n);
							var i = n.offsetHeight - n.clientHeight;
							return t.body.removeChild(n), e && (pn = i), i
						}(document)
					}
				})
			}, e.prototype.getScrollPosition = function () {
				return this.foundation_.getScrollPosition()
			}, e.prototype.getScrollContentWidth = function () {
				return this.content_.offsetWidth
			}, e.prototype.incrementScroll = function (t) {
				this.foundation_.incrementScroll(t)
			}, e.prototype.scrollTo = function (t) {
				this.foundation_.scrollTo(t)
			}, e
		}(t),
		jn = {
			ACTIVE: "mdc-tab-indicator--active",
			FADE: "mdc-tab-indicator--fade",
			NO_TRANSITION: "mdc-tab-indicator--no-transition"
		},
		zn = {
			CONTENT_SELECTOR: ".mdc-tab-indicator__content"
		},
		Un = function (e) {
			function n(t) {
				return e.call(this, a({}, n.defaultAdapter, t)) || this
			}
			return o(n, e), Object.defineProperty(n, "cssClasses", {
				get: function () {
					return jn
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n, "strings", {
				get: function () {
					return zn
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n, "defaultAdapter", {
				get: function () {
					return {
						addClass: function () {},
						removeClass: function () {},
						computeContentClientRect: function () {
							return {
								top: 0,
								right: 0,
								bottom: 0,
								left: 0,
								width: 0,
								height: 0
							}
						},
						setContentStyleProperty: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), n.prototype.computeContentClientRect = function () {
				return this.adapter_.computeContentClientRect()
			}, n
		}(n),
		Kn = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.prototype.activate = function () {
				this.adapter_.addClass(Un.cssClasses.ACTIVE)
			}, e.prototype.deactivate = function () {
				this.adapter_.removeClass(Un.cssClasses.ACTIVE)
			}, e
		}(Un),
		qn = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.prototype.activate = function (t) {
				if (t) {
					var e = this.computeContentClientRect(),
						n = t.width / e.width,
						i = t.left - e.left;
					this.adapter_.addClass(Un.cssClasses.NO_TRANSITION), this.adapter_.setContentStyleProperty("transform", "translateX(" + i + "px) scaleX(" + n + ")"), this.computeContentClientRect(), this.adapter_.removeClass(Un.cssClasses.NO_TRANSITION), this.adapter_.addClass(Un.cssClasses.ACTIVE), this.adapter_.setContentStyleProperty("transform", "")
				} else this.adapter_.addClass(Un.cssClasses.ACTIVE)
			}, e.prototype.deactivate = function () {
				this.adapter_.removeClass(Un.cssClasses.ACTIVE)
			}, e
		}(Un),
		Wn = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, e.prototype.initialize = function () {
				this.content_ = this.root_.querySelector(Un.strings.CONTENT_SELECTOR)
			}, e.prototype.computeContentClientRect = function () {
				return this.foundation_.computeContentClientRect()
			}, e.prototype.getDefaultFoundation = function () {
				var n = this,
					t = {
						addClass: function (t) {
							return n.root_.classList.add(t)
						},
						removeClass: function (t) {
							return n.root_.classList.remove(t)
						},
						computeContentClientRect: function () {
							return n.content_.getBoundingClientRect()
						},
						setContentStyleProperty: function (t, e) {
							return n.content_.style.setProperty(t, e)
						}
					};
				return this.root_.classList.contains(Un.cssClasses.FADE) ? new Kn(t) : new qn(t)
			}, e.prototype.activate = function (t) {
				this.foundation_.activate(t)
			}, e.prototype.deactivate = function () {
				this.foundation_.deactivate()
			}, e
		}(t),
		$n = {
			ACTIVE: "mdc-tab--active"
		},
		Gn = {
			ARIA_SELECTED: "aria-selected",
			CONTENT_SELECTOR: ".mdc-tab__content",
			INTERACTED_EVENT: "MDCTab:interacted",
			RIPPLE_SELECTOR: ".mdc-tab__ripple",
			TABINDEX: "tabIndex",
			TAB_INDICATOR_SELECTOR: ".mdc-tab-indicator"
		},
		Xn = function (n) {
			function i(t) {
				var e = n.call(this, a({}, i.defaultAdapter, t)) || this;
				return e.focusOnActivate_ = !0, e
			}
			return o(i, n), Object.defineProperty(i, "cssClasses", {
				get: function () {
					return $n
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "strings", {
				get: function () {
					return Gn
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "defaultAdapter", {
				get: function () {
					return {
						addClass: function () {},
						removeClass: function () {},
						hasClass: function () {
							return !1
						},
						setAttr: function () {},
						activateIndicator: function () {},
						deactivateIndicator: function () {},
						notifyInteracted: function () {},
						getOffsetLeft: function () {
							return 0
						},
						getOffsetWidth: function () {
							return 0
						},
						getContentOffsetLeft: function () {
							return 0
						},
						getContentOffsetWidth: function () {
							return 0
						},
						focus: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.handleClick = function () {
				this.adapter_.notifyInteracted()
			}, i.prototype.isActive = function () {
				return this.adapter_.hasClass($n.ACTIVE)
			}, i.prototype.setFocusOnActivate = function (t) {
				this.focusOnActivate_ = t
			}, i.prototype.activate = function (t) {
				this.adapter_.addClass($n.ACTIVE), this.adapter_.setAttr(Gn.ARIA_SELECTED, "true"), this.adapter_.setAttr(Gn.TABINDEX, "0"), this.adapter_.activateIndicator(t), this.focusOnActivate_ && this.adapter_.focus()
			}, i.prototype.deactivate = function () {
				this.isActive() && (this.adapter_.removeClass($n.ACTIVE), this.adapter_.setAttr(Gn.ARIA_SELECTED, "false"), this.adapter_.setAttr(Gn.TABINDEX, "-1"), this.adapter_.deactivateIndicator())
			}, i.prototype.computeDimensions = function () {
				var t = this.adapter_.getOffsetWidth(),
					e = this.adapter_.getOffsetLeft(),
					n = this.adapter_.getContentOffsetWidth(),
					i = this.adapter_.getContentOffsetLeft();
				return {
					contentLeft: e + i,
					contentRight: e + i + n,
					rootLeft: e,
					rootRight: e + t
				}
			}, i
		}(n),
		Yn = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, e.prototype.initialize = function (t, e) {
				void 0 === t && (t = function (t, e) {
					return new L(t, e)
				}), void 0 === e && (e = function (t) {
					return new Wn(t)
				}), this.id = this.root_.id;
				var n = this.root_.querySelector(Xn.strings.RIPPLE_SELECTOR),
					i = a({}, L.createAdapter(this), {
						addClass: function (t) {
							return n.classList.add(t)
						},
						removeClass: function (t) {
							return n.classList.remove(t)
						},
						updateCssVariable: function (t, e) {
							return n.style.setProperty(t, e)
						}
					}),
					r = new O(i);
				this.ripple_ = t(this.root_, r);
				var o = this.root_.querySelector(Xn.strings.TAB_INDICATOR_SELECTOR);
				this.tabIndicator_ = e(o), this.content_ = this.root_.querySelector(Xn.strings.CONTENT_SELECTOR)
			}, e.prototype.initialSyncWithDOM = function () {
				var t = this;
				this.handleClick_ = function () {
					return t.foundation_.handleClick()
				}, this.listen("click", this.handleClick_)
			}, e.prototype.destroy = function () {
				this.unlisten("click", this.handleClick_), this.ripple_.destroy(), t.prototype.destroy.call(this)
			}, e.prototype.getDefaultFoundation = function () {
				var n = this;
				return new Xn({
					setAttr: function (t, e) {
						return n.root_.setAttribute(t, e)
					},
					addClass: function (t) {
						return n.root_.classList.add(t)
					},
					removeClass: function (t) {
						return n.root_.classList.remove(t)
					},
					hasClass: function (t) {
						return n.root_.classList.contains(t)
					},
					activateIndicator: function (t) {
						return n.tabIndicator_.activate(t)
					},
					deactivateIndicator: function () {
						return n.tabIndicator_.deactivate()
					},
					notifyInteracted: function () {
						return n.emit(Xn.strings.INTERACTED_EVENT, {
							tabId: n.id
						}, !0)
					},
					getOffsetLeft: function () {
						return n.root_.offsetLeft
					},
					getOffsetWidth: function () {
						return n.root_.offsetWidth
					},
					getContentOffsetLeft: function () {
						return n.content_.offsetLeft
					},
					getContentOffsetWidth: function () {
						return n.content_.offsetWidth
					},
					focus: function () {
						return n.root_.focus()
					}
				})
			}, Object.defineProperty(e.prototype, "active", {
				get: function () {
					return this.foundation_.isActive()
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "focusOnActivate", {
				set: function (t) {
					this.foundation_.setFocusOnActivate(t)
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.activate = function (t) {
				this.foundation_.activate(t)
			}, e.prototype.deactivate = function () {
				this.foundation_.deactivate()
			}, e.prototype.computeIndicatorClientRect = function () {
				return this.tabIndicator_.computeContentClientRect()
			}, e.prototype.computeDimensions = function () {
				return this.foundation_.computeDimensions()
			}, e.prototype.focus = function () {
				this.root_.focus()
			}, e
		}(t),
		Qn = {
			ARROW_LEFT_KEY: "ArrowLeft",
			ARROW_RIGHT_KEY: "ArrowRight",
			END_KEY: "End",
			ENTER_KEY: "Enter",
			HOME_KEY: "Home",
			SPACE_KEY: "Space",
			TAB_ACTIVATED_EVENT: "MDCTabBar:activated",
			TAB_SCROLLER_SELECTOR: ".mdc-tab-scroller",
			TAB_SELECTOR: ".mdc-tab"
		},
		Zn = {
			ARROW_LEFT_KEYCODE: 37,
			ARROW_RIGHT_KEYCODE: 39,
			END_KEYCODE: 35,
			ENTER_KEYCODE: 13,
			EXTRA_SCROLL_AMOUNT: 20,
			HOME_KEYCODE: 36,
			SPACE_KEYCODE: 32
		},
		Jn = new Set;
	Jn.add(Qn.ARROW_LEFT_KEY), Jn.add(Qn.ARROW_RIGHT_KEY), Jn.add(Qn.END_KEY), Jn.add(Qn.HOME_KEY), Jn.add(Qn.ENTER_KEY), Jn.add(Qn.SPACE_KEY);
	var ti = new Map;
	ti.set(Zn.ARROW_LEFT_KEYCODE, Qn.ARROW_LEFT_KEY), ti.set(Zn.ARROW_RIGHT_KEYCODE, Qn.ARROW_RIGHT_KEY), ti.set(Zn.END_KEYCODE, Qn.END_KEY), ti.set(Zn.HOME_KEYCODE, Qn.HOME_KEY), ti.set(Zn.ENTER_KEYCODE, Qn.ENTER_KEY), ti.set(Zn.SPACE_KEYCODE, Qn.SPACE_KEY);
	var ei = function (n) {
			function i(t) {
				var e = n.call(this, a({}, i.defaultAdapter, t)) || this;
				return e.useAutomaticActivation_ = !1, e
			}
			return o(i, n), Object.defineProperty(i, "strings", {
				get: function () {
					return Qn
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "numbers", {
				get: function () {
					return Zn
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "defaultAdapter", {
				get: function () {
					return {
						scrollTo: function () {},
						incrementScroll: function () {},
						getScrollPosition: function () {
							return 0
						},
						getScrollContentWidth: function () {
							return 0
						},
						getOffsetWidth: function () {
							return 0
						},
						isRTL: function () {
							return !1
						},
						setActiveTab: function () {},
						activateTabAtIndex: function () {},
						deactivateTabAtIndex: function () {},
						focusTabAtIndex: function () {},
						getTabIndicatorClientRectAtIndex: function () {
							return {
								top: 0,
								right: 0,
								bottom: 0,
								left: 0,
								width: 0,
								height: 0
							}
						},
						getTabDimensionsAtIndex: function () {
							return {
								rootLeft: 0,
								rootRight: 0,
								contentLeft: 0,
								contentRight: 0
							}
						},
						getPreviousActiveTabIndex: function () {
							return -1
						},
						getFocusedTabIndex: function () {
							return -1
						},
						getIndexOfTabById: function () {
							return -1
						},
						getTabListLength: function () {
							return 0
						},
						notifyTabActivated: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.setUseAutomaticActivation = function (t) {
				this.useAutomaticActivation_ = t
			}, i.prototype.activateTab = function (t) {
				var e, n = this.adapter_.getPreviousActiveTabIndex();
				this.indexIsInRange_(t) && t !== n && (-1 !== n && (this.adapter_.deactivateTabAtIndex(n), e = this.adapter_.getTabIndicatorClientRectAtIndex(n)), this.adapter_.activateTabAtIndex(t, e), this.scrollIntoView(t), this.adapter_.notifyTabActivated(t))
			}, i.prototype.handleKeyDown = function (t) {
				var e = this.getKeyFromEvent_(t);
				if (void 0 !== e)
					if (this.isActivationKey_(e) || t.preventDefault(), this.useAutomaticActivation_) {
						if (this.isActivationKey_(e)) return;
						var n = this.determineTargetFromKey_(this.adapter_.getPreviousActiveTabIndex(), e);
						this.adapter_.setActiveTab(n), this.scrollIntoView(n)
					} else {
						var i = this.adapter_.getFocusedTabIndex();
						if (this.isActivationKey_(e)) this.adapter_.setActiveTab(i);
						else {
							n = this.determineTargetFromKey_(i, e);
							this.adapter_.focusTabAtIndex(n), this.scrollIntoView(n)
						}
					}
			}, i.prototype.handleTabInteraction = function (t) {
				this.adapter_.setActiveTab(this.adapter_.getIndexOfTabById(t.detail.tabId))
			}, i.prototype.scrollIntoView = function (t) {
				if (this.indexIsInRange_(t)) return 0 === t ? this.adapter_.scrollTo(0) : t === this.adapter_.getTabListLength() - 1 ? this.adapter_.scrollTo(this.adapter_.getScrollContentWidth()) : this.isRTL_() ? this.scrollIntoViewRTL_(t) : void this.scrollIntoView_(t)
			}, i.prototype.determineTargetFromKey_ = function (t, e) {
				var n = this.isRTL_(),
					i = this.adapter_.getTabListLength() - 1,
					r = t;
				return e === Qn.END_KEY ? r = i : e === Qn.ARROW_LEFT_KEY && !n || e === Qn.ARROW_RIGHT_KEY && n ? r -= 1 : e === Qn.ARROW_RIGHT_KEY && !n || e === Qn.ARROW_LEFT_KEY && n ? r += 1 : r = 0, r < 0 ? r = i : i < r && (r = 0), r
			}, i.prototype.calculateScrollIncrement_ = function (t, e, n, i) {
				var r = this.adapter_.getTabDimensionsAtIndex(e),
					o = r.contentLeft - n - i,
					s = r.contentRight - n - Zn.EXTRA_SCROLL_AMOUNT,
					a = o + Zn.EXTRA_SCROLL_AMOUNT;
				return e < t ? Math.min(s, 0) : Math.max(a, 0)
			}, i.prototype.calculateScrollIncrementRTL_ = function (t, e, n, i, r) {
				var o = this.adapter_.getTabDimensionsAtIndex(e),
					s = r - o.contentLeft - n,
					a = r - o.contentRight - n - i + Zn.EXTRA_SCROLL_AMOUNT,
					c = s - Zn.EXTRA_SCROLL_AMOUNT;
				return t < e ? Math.max(a, 0) : Math.min(c, 0)
			}, i.prototype.findAdjacentTabIndexClosestToEdge_ = function (t, e, n, i) {
				var r = e.rootLeft - n,
					o = e.rootRight - n - i,
					s = r + o;
				return r < 0 || s < 0 ? t - 1 : 0 < o || 0 < s ? t + 1 : -1
			}, i.prototype.findAdjacentTabIndexClosestToEdgeRTL_ = function (t, e, n, i, r) {
				var o = r - e.rootLeft - i - n,
					s = r - e.rootRight - n,
					a = o + s;
				return 0 < o || 0 < a ? t + 1 : s < 0 || a < 0 ? t - 1 : -1
			}, i.prototype.getKeyFromEvent_ = function (t) {
				return Jn.has(t.key) ? t.key : ti.get(t.keyCode)
			}, i.prototype.isActivationKey_ = function (t) {
				return t === Qn.SPACE_KEY || t === Qn.ENTER_KEY
			}, i.prototype.indexIsInRange_ = function (t) {
				return 0 <= t && t < this.adapter_.getTabListLength()
			}, i.prototype.isRTL_ = function () {
				return this.adapter_.isRTL()
			}, i.prototype.scrollIntoView_ = function (t) {
				var e = this.adapter_.getScrollPosition(),
					n = this.adapter_.getOffsetWidth(),
					i = this.adapter_.getTabDimensionsAtIndex(t),
					r = this.findAdjacentTabIndexClosestToEdge_(t, i, e, n);
				if (this.indexIsInRange_(r)) {
					var o = this.calculateScrollIncrement_(t, r, e, n);
					this.adapter_.incrementScroll(o)
				}
			}, i.prototype.scrollIntoViewRTL_ = function (t) {
				var e = this.adapter_.getScrollPosition(),
					n = this.adapter_.getOffsetWidth(),
					i = this.adapter_.getTabDimensionsAtIndex(t),
					r = this.adapter_.getScrollContentWidth(),
					o = this.findAdjacentTabIndexClosestToEdgeRTL_(t, i, e, n, r);
				if (this.indexIsInRange_(o)) {
					var s = this.calculateScrollIncrementRTL_(t, o, e, n, r);
					this.adapter_.incrementScroll(s)
				}
			}, i
		}(n),
		ni = ei.strings,
		ii = 0,
		ri = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, Object.defineProperty(e.prototype, "focusOnActivate", {
				set: function (e) {
					this.tabList_.forEach(function (t) {
						return t.focusOnActivate = e
					})
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "useAutomaticActivation", {
				set: function (t) {
					this.foundation_.setUseAutomaticActivation(t)
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.initialize = function (t, e) {
				void 0 === t && (t = function (t) {
					return new Yn(t)
				}), void 0 === e && (e = function (t) {
					return new Vn(t)
				}), this.tabList_ = this.instantiateTabs_(t), this.tabScroller_ = this.instantiateTabScroller_(e)
			}, e.prototype.initialSyncWithDOM = function () {
				var e = this;
				this.handleTabInteraction_ = function (t) {
					return e.foundation_.handleTabInteraction(t)
				}, this.handleKeyDown_ = function (t) {
					return e.foundation_.handleKeyDown(t)
				}, this.listen(Xn.strings.INTERACTED_EVENT, this.handleTabInteraction_), this.listen("keydown", this.handleKeyDown_);
				for (var t = 0; t < this.tabList_.length; t++)
					if (this.tabList_[t].active) {
						this.scrollIntoView(t);
						break
					}
			}, e.prototype.destroy = function () {
				t.prototype.destroy.call(this), this.unlisten(Xn.strings.INTERACTED_EVENT, this.handleTabInteraction_), this.unlisten("keydown", this.handleKeyDown_), this.tabList_.forEach(function (t) {
					return t.destroy()
				}), this.tabScroller_ && this.tabScroller_.destroy()
			}, e.prototype.getDefaultFoundation = function () {
				var n = this;
				return new ei({
					scrollTo: function (t) {
						return n.tabScroller_.scrollTo(t)
					},
					incrementScroll: function (t) {
						return n.tabScroller_.incrementScroll(t)
					},
					getScrollPosition: function () {
						return n.tabScroller_.getScrollPosition()
					},
					getScrollContentWidth: function () {
						return n.tabScroller_.getScrollContentWidth()
					},
					getOffsetWidth: function () {
						return n.root_.offsetWidth
					},
					isRTL: function () {
						return "rtl" === window.getComputedStyle(n.root_).getPropertyValue("direction")
					},
					setActiveTab: function (t) {
						return n.foundation_.activateTab(t)
					},
					activateTabAtIndex: function (t, e) {
						return n.tabList_[t].activate(e)
					},
					deactivateTabAtIndex: function (t) {
						return n.tabList_[t].deactivate()
					},
					focusTabAtIndex: function (t) {
						return n.tabList_[t].focus()
					},
					getTabIndicatorClientRectAtIndex: function (t) {
						return n.tabList_[t].computeIndicatorClientRect()
					},
					getTabDimensionsAtIndex: function (t) {
						return n.tabList_[t].computeDimensions()
					},
					getPreviousActiveTabIndex: function () {
						for (var t = 0; t < n.tabList_.length; t++)
							if (n.tabList_[t].active) return t;
						return -1
					},
					getFocusedTabIndex: function () {
						var t = n.getTabElements_(),
							e = document.activeElement;
						return t.indexOf(e)
					},
					getIndexOfTabById: function (t) {
						for (var e = 0; e < n.tabList_.length; e++)
							if (n.tabList_[e].id === t) return e;
						return -1
					},
					getTabListLength: function () {
						return n.tabList_.length
					},
					notifyTabActivated: function (t) {
						return n.emit(ni.TAB_ACTIVATED_EVENT, {
							index: t
						}, !0)
					}
				})
			}, e.prototype.activateTab = function (t) {
				this.foundation_.activateTab(t)
			}, e.prototype.scrollIntoView = function (t) {
				this.foundation_.scrollIntoView(t)
			}, e.prototype.getTabElements_ = function () {
				return [].slice.call(this.root_.querySelectorAll(ni.TAB_SELECTOR))
			}, e.prototype.instantiateTabs_ = function (e) {
				return this.getTabElements_().map(function (t) {
					return t.id = t.id || "mdc-tab-" + ++ii, e(t)
				})
			}, e.prototype.instantiateTabScroller_ = function (t) {
				var e = this.root_.querySelector(ni.TAB_SCROLLER_SELECTOR);
				return e ? t(e) : null
			}, e
		}(t),
		oi = {
			ROOT: "mdc-text-field-character-counter"
		},
		si = {
			ROOT_SELECTOR: "." + oi.ROOT
		},
		ai = function (e) {
			function n(t) {
				return e.call(this, a({}, n.defaultAdapter, t)) || this
			}
			return o(n, e), Object.defineProperty(n, "cssClasses", {
				get: function () {
					return oi
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n, "strings", {
				get: function () {
					return si
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n, "defaultAdapter", {
				get: function () {
					return {
						setContent: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), n.prototype.setCounterValue = function (t, e) {
				t = Math.min(t, e), this.adapter_.setContent(t + " / " + e)
			}, n
		}(n),
		ci = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, Object.defineProperty(e.prototype, "foundation", {
				get: function () {
					return this.foundation_
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.getDefaultFoundation = function () {
				var e = this;
				return new ai({
					setContent: function (t) {
						e.root_.textContent = t
					}
				})
			}, e
		}(t),
		li = {
			ARIA_CONTROLS: "aria-controls",
			ICON_SELECTOR: ".mdc-text-field__icon",
			INPUT_SELECTOR: ".mdc-text-field__input",
			LABEL_SELECTOR: ".mdc-floating-label",
			LINE_RIPPLE_SELECTOR: ".mdc-line-ripple",
			OUTLINE_SELECTOR: ".mdc-notched-outline"
		},
		ui = {
			DENSE: "mdc-text-field--dense",
			DISABLED: "mdc-text-field--disabled",
			FOCUSED: "mdc-text-field--focused",
			FULLWIDTH: "mdc-text-field--fullwidth",
			HELPER_LINE: "mdc-text-field-helper-line",
			INVALID: "mdc-text-field--invalid",
			NO_LABEL: "mdc-text-field--no-label",
			OUTLINED: "mdc-text-field--outlined",
			ROOT: "mdc-text-field",
			TEXTAREA: "mdc-text-field--textarea",
			WITH_LEADING_ICON: "mdc-text-field--with-leading-icon",
			WITH_TRAILING_ICON: "mdc-text-field--with-trailing-icon"
		},
		di = {
			DENSE_LABEL_SCALE: .923,
			LABEL_SCALE: .75
		},
		hi = ["pattern", "min", "max", "required", "step", "minlength", "maxlength"],
		pi = ["color", "date", "datetime-local", "month", "range", "time", "week"],
		fi = ["mousedown", "touchstart"],
		_i = ["click", "keydown"],
		mi = function (i) {
			function r(t, e) {
				void 0 === e && (e = {});
				var n = i.call(this, a({}, r.defaultAdapter, t)) || this;
				return n.isFocused_ = !1, n.receivedUserInput_ = !1, n.isValid_ = !0, n.useNativeValidation_ = !0, n.helperText_ = e.helperText, n.characterCounter_ = e.characterCounter, n.leadingIcon_ = e.leadingIcon, n.trailingIcon_ = e.trailingIcon, n.inputFocusHandler_ = function () {
					return n.activateFocus()
				}, n.inputBlurHandler_ = function () {
					return n.deactivateFocus()
				}, n.inputInputHandler_ = function () {
					return n.handleInput()
				}, n.setPointerXOffset_ = function (t) {
					return n.setTransformOrigin(t)
				}, n.textFieldInteractionHandler_ = function () {
					return n.handleTextFieldInteraction()
				}, n.validationAttributeChangeHandler_ = function (t) {
					return n.handleValidationAttributeChange(t)
				}, n
			}
			return o(r, i), Object.defineProperty(r, "cssClasses", {
				get: function () {
					return ui
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(r, "strings", {
				get: function () {
					return li
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(r, "numbers", {
				get: function () {
					return di
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(r.prototype, "shouldAlwaysFloat_", {
				get: function () {
					var t = this.getNativeInput_().type;
					return 0 <= pi.indexOf(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(r.prototype, "shouldFloat", {
				get: function () {
					return this.shouldAlwaysFloat_ || this.isFocused_ || Boolean(this.getValue()) || this.isBadInput_()
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(r.prototype, "shouldShake", {
				get: function () {
					return !this.isFocused_ && !this.isValid() && Boolean(this.getValue())
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(r, "defaultAdapter", {
				get: function () {
					return {
						addClass: function () {},
						removeClass: function () {},
						hasClass: function () {
							return !0
						},
						registerTextFieldInteractionHandler: function () {},
						deregisterTextFieldInteractionHandler: function () {},
						registerInputInteractionHandler: function () {},
						deregisterInputInteractionHandler: function () {},
						registerValidationAttributeChangeHandler: function () {
							return new MutationObserver(function () {})
						},
						deregisterValidationAttributeChangeHandler: function () {},
						getNativeInput: function () {
							return null
						},
						isFocused: function () {
							return !1
						},
						activateLineRipple: function () {},
						deactivateLineRipple: function () {},
						setLineRippleTransformOrigin: function () {},
						shakeLabel: function () {},
						floatLabel: function () {},
						hasLabel: function () {
							return !1
						},
						getLabelWidth: function () {
							return 0
						},
						hasOutline: function () {
							return !1
						},
						notchOutline: function () {},
						closeOutline: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), r.prototype.init = function () {
				var e = this;
				this.adapter_.isFocused() ? this.inputFocusHandler_() : this.adapter_.hasLabel() && this.shouldFloat && (this.notchOutline(!0), this.adapter_.floatLabel(!0)), this.adapter_.registerInputInteractionHandler("focus", this.inputFocusHandler_), this.adapter_.registerInputInteractionHandler("blur", this.inputBlurHandler_), this.adapter_.registerInputInteractionHandler("input", this.inputInputHandler_), fi.forEach(function (t) {
					e.adapter_.registerInputInteractionHandler(t, e.setPointerXOffset_)
				}), _i.forEach(function (t) {
					e.adapter_.registerTextFieldInteractionHandler(t, e.textFieldInteractionHandler_)
				}), this.validationObserver_ = this.adapter_.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler_), this.setCharacterCounter_(this.getValue().length)
			}, r.prototype.destroy = function () {
				var e = this;
				this.adapter_.deregisterInputInteractionHandler("focus", this.inputFocusHandler_), this.adapter_.deregisterInputInteractionHandler("blur", this.inputBlurHandler_), this.adapter_.deregisterInputInteractionHandler("input", this.inputInputHandler_), fi.forEach(function (t) {
					e.adapter_.deregisterInputInteractionHandler(t, e.setPointerXOffset_)
				}), _i.forEach(function (t) {
					e.adapter_.deregisterTextFieldInteractionHandler(t, e.textFieldInteractionHandler_)
				}), this.adapter_.deregisterValidationAttributeChangeHandler(this.validationObserver_)
			}, r.prototype.handleTextFieldInteraction = function () {
				var t = this.adapter_.getNativeInput();
				t && t.disabled || (this.receivedUserInput_ = !0)
			}, r.prototype.handleValidationAttributeChange = function (t) {
				var e = this;
				t.some(function (t) {
					return -1 < hi.indexOf(t) && (e.styleValidity_(!0), !0)
				}), -1 < t.indexOf("maxlength") && this.setCharacterCounter_(this.getValue().length)
			}, r.prototype.notchOutline = function (t) {
				if (this.adapter_.hasOutline())
					if (t) {
						var e = this.adapter_.hasClass(ui.DENSE) ? di.DENSE_LABEL_SCALE : di.LABEL_SCALE,
							n = this.adapter_.getLabelWidth() * e;
						this.adapter_.notchOutline(n)
					} else this.adapter_.closeOutline()
			}, r.prototype.activateFocus = function () {
				this.isFocused_ = !0, this.styleFocused_(this.isFocused_), this.adapter_.activateLineRipple(), this.adapter_.hasLabel() && (this.notchOutline(this.shouldFloat), this.adapter_.floatLabel(this.shouldFloat), this.adapter_.shakeLabel(this.shouldShake)), this.helperText_ && this.helperText_.showToScreenReader()
			}, r.prototype.setTransformOrigin = function (t) {
				var e = t.touches,
					n = e ? e[0] : t,
					i = n.target.getBoundingClientRect(),
					r = n.clientX - i.left;
				this.adapter_.setLineRippleTransformOrigin(r)
			}, r.prototype.handleInput = function () {
				this.autoCompleteFocus(), this.setCharacterCounter_(this.getValue().length)
			}, r.prototype.autoCompleteFocus = function () {
				this.receivedUserInput_ || this.activateFocus()
			}, r.prototype.deactivateFocus = function () {
				this.isFocused_ = !1, this.adapter_.deactivateLineRipple();
				var t = this.isValid();
				this.styleValidity_(t), this.styleFocused_(this.isFocused_), this.adapter_.hasLabel() && (this.notchOutline(this.shouldFloat), this.adapter_.floatLabel(this.shouldFloat), this.adapter_.shakeLabel(this.shouldShake)), this.shouldFloat || (this.receivedUserInput_ = !1)
			}, r.prototype.getValue = function () {
				return this.getNativeInput_().value
			}, r.prototype.setValue = function (t) {
				this.getValue() !== t && (this.getNativeInput_().value = t), this.setCharacterCounter_(t.length);
				var e = this.isValid();
				this.styleValidity_(e), this.adapter_.hasLabel() && (this.notchOutline(this.shouldFloat), this.adapter_.floatLabel(this.shouldFloat), this.adapter_.shakeLabel(this.shouldShake))
			}, r.prototype.isValid = function () {
				return this.useNativeValidation_ ? this.isNativeInputValid_() : this.isValid_
			}, r.prototype.setValid = function (t) {
				this.isValid_ = t, this.styleValidity_(t);
				var e = !t && !this.isFocused_;
				this.adapter_.hasLabel() && this.adapter_.shakeLabel(e)
			}, r.prototype.setUseNativeValidation = function (t) {
				this.useNativeValidation_ = t
			}, r.prototype.isDisabled = function () {
				return this.getNativeInput_().disabled
			}, r.prototype.setDisabled = function (t) {
				this.getNativeInput_().disabled = t, this.styleDisabled_(t)
			}, r.prototype.setHelperTextContent = function (t) {
				this.helperText_ && this.helperText_.setContent(t)
			}, r.prototype.setLeadingIconAriaLabel = function (t) {
				this.leadingIcon_ && this.leadingIcon_.setAriaLabel(t)
			}, r.prototype.setLeadingIconContent = function (t) {
				this.leadingIcon_ && this.leadingIcon_.setContent(t)
			}, r.prototype.setTrailingIconAriaLabel = function (t) {
				this.trailingIcon_ && this.trailingIcon_.setAriaLabel(t)
			}, r.prototype.setTrailingIconContent = function (t) {
				this.trailingIcon_ && this.trailingIcon_.setContent(t)
			}, r.prototype.setCharacterCounter_ = function (t) {
				if (this.characterCounter_) {
					var e = this.getNativeInput_().maxLength;
					if (-1 === e) throw new Error("MDCTextFieldFoundation: Expected maxlength html property on text input or textarea.");
					this.characterCounter_.setCounterValue(t, e)
				}
			}, r.prototype.isBadInput_ = function () {
				return this.getNativeInput_().validity.badInput || !1
			}, r.prototype.isNativeInputValid_ = function () {
				return this.getNativeInput_().validity.valid
			}, r.prototype.styleValidity_ = function (t) {
				var e = r.cssClasses.INVALID;
				t ? this.adapter_.removeClass(e) : this.adapter_.addClass(e), this.helperText_ && this.helperText_.setValidity(t)
			}, r.prototype.styleFocused_ = function (t) {
				var e = r.cssClasses.FOCUSED;
				t ? this.adapter_.addClass(e) : this.adapter_.removeClass(e)
			}, r.prototype.styleDisabled_ = function (t) {
				var e = r.cssClasses,
					n = e.DISABLED,
					i = e.INVALID;
				t ? (this.adapter_.addClass(n), this.adapter_.removeClass(i)) : this.adapter_.removeClass(n), this.leadingIcon_ && this.leadingIcon_.setDisabled(t), this.trailingIcon_ && this.trailingIcon_.setDisabled(t)
			}, r.prototype.getNativeInput_ = function () {
				return (this.adapter_ ? this.adapter_.getNativeInput() : null) || {
					disabled: !1,
					maxLength: -1,
					type: "input",
					validity: {
						badInput: !1,
						valid: !0
					},
					value: ""
				}
			}, r
		}(n),
		gi = {
			HELPER_TEXT_PERSISTENT: "mdc-text-field-helper-text--persistent",
			HELPER_TEXT_VALIDATION_MSG: "mdc-text-field-helper-text--validation-msg",
			ROOT: "mdc-text-field-helper-text"
		},
		yi = {
			ARIA_HIDDEN: "aria-hidden",
			ROLE: "role",
			ROOT_SELECTOR: "." + gi.ROOT
		},
		Ei = function (e) {
			function n(t) {
				return e.call(this, a({}, n.defaultAdapter, t)) || this
			}
			return o(n, e), Object.defineProperty(n, "cssClasses", {
				get: function () {
					return gi
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n, "strings", {
				get: function () {
					return yi
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n, "defaultAdapter", {
				get: function () {
					return {
						addClass: function () {},
						removeClass: function () {},
						hasClass: function () {
							return !1
						},
						setAttr: function () {},
						removeAttr: function () {},
						setContent: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), n.prototype.setContent = function (t) {
				this.adapter_.setContent(t)
			}, n.prototype.setPersistent = function (t) {
				t ? this.adapter_.addClass(gi.HELPER_TEXT_PERSISTENT) : this.adapter_.removeClass(gi.HELPER_TEXT_PERSISTENT)
			}, n.prototype.setValidation = function (t) {
				t ? this.adapter_.addClass(gi.HELPER_TEXT_VALIDATION_MSG) : this.adapter_.removeClass(gi.HELPER_TEXT_VALIDATION_MSG)
			}, n.prototype.showToScreenReader = function () {
				this.adapter_.removeAttr(yi.ARIA_HIDDEN)
			}, n.prototype.setValidity = function (t) {
				var e = this.adapter_.hasClass(gi.HELPER_TEXT_PERSISTENT),
					n = this.adapter_.hasClass(gi.HELPER_TEXT_VALIDATION_MSG) && !t;
				n ? this.adapter_.setAttr(yi.ROLE, "alert") : this.adapter_.removeAttr(yi.ROLE), e || n || this.hide_()
			}, n.prototype.hide_ = function () {
				this.adapter_.setAttr(yi.ARIA_HIDDEN, "true")
			}, n
		}(n),
		vi = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, Object.defineProperty(e.prototype, "foundation", {
				get: function () {
					return this.foundation_
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.getDefaultFoundation = function () {
				var n = this;
				return new Ei({
					addClass: function (t) {
						return n.root_.classList.add(t)
					},
					removeClass: function (t) {
						return n.root_.classList.remove(t)
					},
					hasClass: function (t) {
						return n.root_.classList.contains(t)
					},
					setAttr: function (t, e) {
						return n.root_.setAttribute(t, e)
					},
					removeAttr: function (t) {
						return n.root_.removeAttribute(t)
					},
					setContent: function (t) {
						n.root_.textContent = t
					}
				})
			}, e
		}(t),
		Ci = {
			ICON_EVENT: "MDCTextField:icon",
			ICON_ROLE: "button"
		},
		bi = {
			ROOT: "mdc-text-field__icon"
		},
		Ti = ["click", "keydown"],
		Ii = function (n) {
			function i(t) {
				var e = n.call(this, a({}, i.defaultAdapter, t)) || this;
				return e.savedTabIndex_ = null, e.interactionHandler_ = function (t) {
					return e.handleInteraction(t)
				}, e
			}
			return o(i, n), Object.defineProperty(i, "strings", {
				get: function () {
					return Ci
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "cssClasses", {
				get: function () {
					return bi
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "defaultAdapter", {
				get: function () {
					return {
						getAttr: function () {
							return null
						},
						setAttr: function () {},
						removeAttr: function () {},
						setContent: function () {},
						registerInteractionHandler: function () {},
						deregisterInteractionHandler: function () {},
						notifyIconAction: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.init = function () {
				var e = this;
				this.savedTabIndex_ = this.adapter_.getAttr("tabindex"), Ti.forEach(function (t) {
					e.adapter_.registerInteractionHandler(t, e.interactionHandler_)
				})
			}, i.prototype.destroy = function () {
				var e = this;
				Ti.forEach(function (t) {
					e.adapter_.deregisterInteractionHandler(t, e.interactionHandler_)
				})
			}, i.prototype.setDisabled = function (t) {
				this.savedTabIndex_ && (t ? (this.adapter_.setAttr("tabindex", "-1"), this.adapter_.removeAttr("role")) : (this.adapter_.setAttr("tabindex", this.savedTabIndex_), this.adapter_.setAttr("role", Ci.ICON_ROLE)))
			}, i.prototype.setAriaLabel = function (t) {
				this.adapter_.setAttr("aria-label", t)
			}, i.prototype.setContent = function (t) {
				this.adapter_.setContent(t)
			}, i.prototype.handleInteraction = function (t) {
				var e = "Enter" === t.key || 13 === t.keyCode;
				("click" === t.type || e) && this.adapter_.notifyIconAction()
			}, i
		}(n),
		Ai = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, Object.defineProperty(e.prototype, "foundation", {
				get: function () {
					return this.foundation_
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.getDefaultFoundation = function () {
				var n = this;
				return new Ii({
					getAttr: function (t) {
						return n.root_.getAttribute(t)
					},
					setAttr: function (t, e) {
						return n.root_.setAttribute(t, e)
					},
					removeAttr: function (t) {
						return n.root_.removeAttribute(t)
					},
					setContent: function (t) {
						n.root_.textContent = t
					},
					registerInteractionHandler: function (t, e) {
						return n.listen(t, e)
					},
					deregisterInteractionHandler: function (t, e) {
						return n.unlisten(t, e)
					},
					notifyIconAction: function () {
						return n.emit(Ii.strings.ICON_EVENT, {}, !0)
					}
				})
			}, e
		}(t),
		Si = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, e.prototype.initialize = function (t, e, n, i, r, o, s) {
				void 0 === t && (t = function (t, e) {
					return new L(t, e)
				}), void 0 === e && (e = function (t) {
					return new te(t)
				}), void 0 === n && (n = function (t) {
					return new vi(t)
				}), void 0 === i && (i = function (t) {
					return new ci(t)
				}), void 0 === r && (r = function (t) {
					return new Ai(t)
				}), void 0 === o && (o = function (t) {
					return new Bt(t)
				}), void 0 === s && (s = function (t) {
					return new Ae(t)
				}), this.input_ = this.root_.querySelector(li.INPUT_SELECTOR);
				var a = this.root_.querySelector(li.LABEL_SELECTOR);
				this.label_ = a ? o(a) : null;
				var c = this.root_.querySelector(li.LINE_RIPPLE_SELECTOR);
				this.lineRipple_ = c ? e(c) : null;
				var l = this.root_.querySelector(li.OUTLINE_SELECTOR);
				this.outline_ = l ? s(l) : null;
				var u = Ei.strings,
					d = this.root_.nextElementSibling,
					h = d && d.classList.contains(ui.HELPER_LINE),
					p = h && d && d.querySelector(u.ROOT_SELECTOR);
				this.helperText_ = p ? n(p) : null;
				var f = ai.strings,
					_ = this.root_.querySelector(f.ROOT_SELECTOR);
				!_ && h && d && (_ = d.querySelector(f.ROOT_SELECTOR)), this.characterCounter_ = _ ? i(_) : null, this.leadingIcon_ = null, this.trailingIcon_ = null;
				var m = this.root_.querySelectorAll(li.ICON_SELECTOR);
				0 < m.length && (1 < m.length ? (this.leadingIcon_ = r(m[0]), this.trailingIcon_ = r(m[1])) : this.root_.classList.contains(ui.WITH_LEADING_ICON) ? this.leadingIcon_ = r(m[0]) : this.trailingIcon_ = r(m[0])), this.ripple = this.createRipple_(t)
			}, e.prototype.destroy = function () {
				this.ripple && this.ripple.destroy(), this.lineRipple_ && this.lineRipple_.destroy(), this.helperText_ && this.helperText_.destroy(), this.characterCounter_ && this.characterCounter_.destroy(), this.leadingIcon_ && this.leadingIcon_.destroy(), this.trailingIcon_ && this.trailingIcon_.destroy(), this.label_ && this.label_.destroy(), this.outline_ && this.outline_.destroy(), t.prototype.destroy.call(this)
			}, e.prototype.initialSyncWithDOM = function () {
				this.disabled = this.input_.disabled
			}, Object.defineProperty(e.prototype, "value", {
				get: function () {
					return this.foundation_.getValue()
				},
				set: function (t) {
					this.foundation_.setValue(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "disabled", {
				get: function () {
					return this.foundation_.isDisabled()
				},
				set: function (t) {
					this.foundation_.setDisabled(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "valid", {
				get: function () {
					return this.foundation_.isValid()
				},
				set: function (t) {
					this.foundation_.setValid(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "required", {
				get: function () {
					return this.input_.required
				},
				set: function (t) {
					this.input_.required = t
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "pattern", {
				get: function () {
					return this.input_.pattern
				},
				set: function (t) {
					this.input_.pattern = t
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "minLength", {
				get: function () {
					return this.input_.minLength
				},
				set: function (t) {
					this.input_.minLength = t
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "maxLength", {
				get: function () {
					return this.input_.maxLength
				},
				set: function (t) {
					t < 0 ? this.input_.removeAttribute("maxLength") : this.input_.maxLength = t
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "min", {
				get: function () {
					return this.input_.min
				},
				set: function (t) {
					this.input_.min = t
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "max", {
				get: function () {
					return this.input_.max
				},
				set: function (t) {
					this.input_.max = t
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "step", {
				get: function () {
					return this.input_.step
				},
				set: function (t) {
					this.input_.step = t
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "helperTextContent", {
				set: function (t) {
					this.foundation_.setHelperTextContent(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "leadingIconAriaLabel", {
				set: function (t) {
					this.foundation_.setLeadingIconAriaLabel(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "leadingIconContent", {
				set: function (t) {
					this.foundation_.setLeadingIconContent(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "trailingIconAriaLabel", {
				set: function (t) {
					this.foundation_.setTrailingIconAriaLabel(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "trailingIconContent", {
				set: function (t) {
					this.foundation_.setTrailingIconContent(t)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "useNativeValidation", {
				set: function (t) {
					this.foundation_.setUseNativeValidation(t)
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.focus = function () {
				this.input_.focus()
			}, e.prototype.layout = function () {
				var t = this.foundation_.shouldFloat;
				this.foundation_.notchOutline(t)
			}, e.prototype.getDefaultFoundation = function () {
				var t = a({}, this.getRootAdapterMethods_(), this.getInputAdapterMethods_(), this.getLabelAdapterMethods_(), this.getLineRippleAdapterMethods_(), this.getOutlineAdapterMethods_());
				return new mi(t, this.getFoundationMap_())
			}, e.prototype.getRootAdapterMethods_ = function () {
				var n = this;
				return {
					addClass: function (t) {
						return n.root_.classList.add(t)
					},
					removeClass: function (t) {
						return n.root_.classList.remove(t)
					},
					hasClass: function (t) {
						return n.root_.classList.contains(t)
					},
					registerTextFieldInteractionHandler: function (t, e) {
						return n.listen(t, e)
					},
					deregisterTextFieldInteractionHandler: function (t, e) {
						return n.unlisten(t, e)
					},
					registerValidationAttributeChangeHandler: function (e) {
						var t = new MutationObserver(function (t) {
							return e(t.map(function (t) {
								return t.attributeName
							}).filter(function (t) {
								return t
							}))
						});
						return t.observe(n.input_, {
							attributes: !0
						}), t
					},
					deregisterValidationAttributeChangeHandler: function (t) {
						return t.disconnect()
					}
				}
			}, e.prototype.getInputAdapterMethods_ = function () {
				var n = this;
				return {
					getNativeInput: function () {
						return n.input_
					},
					isFocused: function () {
						return document.activeElement === n.input_
					},
					registerInputInteractionHandler: function (t, e) {
						return n.input_.addEventListener(t, e)
					},
					deregisterInputInteractionHandler: function (t, e) {
						return n.input_.removeEventListener(t, e)
					}
				}
			}, e.prototype.getLabelAdapterMethods_ = function () {
				var e = this;
				return {
					floatLabel: function (t) {
						return e.label_ && e.label_.float(t)
					},
					getLabelWidth: function () {
						return e.label_ ? e.label_.getWidth() : 0
					},
					hasLabel: function () {
						return Boolean(e.label_)
					},
					shakeLabel: function (t) {
						return e.label_ && e.label_.shake(t)
					}
				}
			}, e.prototype.getLineRippleAdapterMethods_ = function () {
				var e = this;
				return {
					activateLineRipple: function () {
						e.lineRipple_ && e.lineRipple_.activate()
					},
					deactivateLineRipple: function () {
						e.lineRipple_ && e.lineRipple_.deactivate()
					},
					setLineRippleTransformOrigin: function (t) {
						e.lineRipple_ && e.lineRipple_.setRippleCenter(t)
					}
				}
			}, e.prototype.getOutlineAdapterMethods_ = function () {
				var e = this;
				return {
					closeOutline: function () {
						return e.outline_ && e.outline_.closeNotch()
					},
					hasOutline: function () {
						return Boolean(e.outline_)
					},
					notchOutline: function (t) {
						return e.outline_ && e.outline_.notch(t)
					}
				}
			}, e.prototype.getFoundationMap_ = function () {
				return {
					characterCounter: this.characterCounter_ ? this.characterCounter_.foundation : void 0,
					helperText: this.helperText_ ? this.helperText_.foundation : void 0,
					leadingIcon: this.leadingIcon_ ? this.leadingIcon_.foundation : void 0,
					trailingIcon: this.trailingIcon_ ? this.trailingIcon_.foundation : void 0
				}
			}, e.prototype.createRipple_ = function (t) {
				var n = this,
					e = this.root_.classList.contains(ui.TEXTAREA),
					i = this.root_.classList.contains(ui.OUTLINED);
				if (e || i) return null;
				var r = a({}, L.createAdapter(this), {
					isSurfaceActive: function () {
						return f(n.input_, ":active")
					},
					registerInteractionHandler: function (t, e) {
						return n.input_.addEventListener(t, e)
					},
					deregisterInteractionHandler: function (t, e) {
						return n.input_.removeEventListener(t, e)
					}
				});
				return t(this.root_, new O(r))
			}, e
		}(t),
		Oi = {
			FIXED: "mdc-toolbar--fixed",
			FIXED_AT_LAST_ROW: "mdc-toolbar--fixed-at-last-row",
			FIXED_LASTROW: "mdc-toolbar--fixed-lastrow-only",
			FLEXIBLE_DEFAULT_BEHAVIOR: "mdc-toolbar--flexible-default-behavior",
			FLEXIBLE_MAX: "mdc-toolbar--flexible-space-maximized",
			FLEXIBLE_MIN: "mdc-toolbar--flexible-space-minimized",
			TOOLBAR_ROW_FLEXIBLE: "mdc-toolbar--flexible"
		},
		Li = {
			CHANGE_EVENT: "MDCToolbar:change",
			FIRST_ROW_SELECTOR: ".mdc-toolbar__row:first-child",
			ICON_SELECTOR: ".mdc-toolbar__icon",
			TITLE_SELECTOR: ".mdc-toolbar__title"
		},
		Ri = {
			MAX_TITLE_SIZE: 2.125,
			MIN_TITLE_SIZE: 1.25,
			TOOLBAR_MOBILE_BREAKPOINT: 600,
			TOOLBAR_ROW_HEIGHT: 64,
			TOOLBAR_ROW_MOBILE_HEIGHT: 56
		},
		wi = function (n) {
			function i(t) {
				var e = n.call(this, a({}, i.defaultAdapter, t)) || this;
				return e.checkRowHeightFrame_ = 0, e.scrollFrame_ = 0, e.executedLastChange_ = !1, e.isFixed_ = !1, e.isFixedLastRow_ = !1, e.hasFlexibleFirstRow_ = !1, e.useFlexDefaultBehavior_ = !1, e.calculations_ = {
					flexibleExpansionHeight: 0,
					flexibleExpansionRatio: 0,
					maxTranslateYDistance: 0,
					maxTranslateYRatio: 0,
					scrollThreshold: 0,
					scrollThresholdRatio: 0,
					toolbarHeight: 0,
					toolbarRatio: 0,
					toolbarRowHeight: 0
				}, e
			}
			return o(i, n), Object.defineProperty(i, "cssClasses", {
				get: function () {
					return Oi
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "strings", {
				get: function () {
					return Li
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "numbers", {
				get: function () {
					return Ri
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "defaultAdapter", {
				get: function () {
					return {
						hasClass: function () {
							return !1
						},
						addClass: function () {},
						removeClass: function () {},
						registerScrollHandler: function () {},
						deregisterScrollHandler: function () {},
						registerResizeHandler: function () {},
						deregisterResizeHandler: function () {},
						getViewportWidth: function () {
							return 0
						},
						getViewportScrollY: function () {
							return 0
						},
						getOffsetHeight: function () {
							return 0
						},
						getFirstRowElementOffsetHeight: function () {
							return 0
						},
						notifyChange: function () {},
						setStyle: function () {},
						setStyleForTitleElement: function () {},
						setStyleForFlexibleRowElement: function () {},
						setStyleForFixedAdjustElement: function () {}
					}
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.init = function () {
				var t = this;
				this.isFixed_ = this.adapter_.hasClass(Oi.FIXED), this.isFixedLastRow_ = this.adapter_.hasClass(Oi.FIXED_LASTROW) && this.isFixed_, this.hasFlexibleFirstRow_ = this.adapter_.hasClass(Oi.TOOLBAR_ROW_FLEXIBLE), this.hasFlexibleFirstRow_ && (this.useFlexDefaultBehavior_ = this.adapter_.hasClass(Oi.FLEXIBLE_DEFAULT_BEHAVIOR)), this.resizeHandler_ = function () {
					return t.checkRowHeight_()
				}, this.scrollHandler_ = function () {
					return t.updateToolbarStyles_()
				}, this.adapter_.registerResizeHandler(this.resizeHandler_), this.adapter_.registerScrollHandler(this.scrollHandler_), this.initKeyRatio_(), this.setKeyHeights_()
			}, i.prototype.destroy = function () {
				this.adapter_.deregisterResizeHandler(this.resizeHandler_), this.adapter_.deregisterScrollHandler(this.scrollHandler_)
			}, i.prototype.updateAdjustElementStyles = function () {
				this.isFixed_ && this.adapter_.setStyleForFixedAdjustElement("margin-top", this.calculations_.toolbarHeight + "px")
			}, i.prototype.getFlexibleExpansionRatio_ = function (t) {
				return Math.max(0, 1 - t / (this.calculations_.flexibleExpansionHeight + 1e-4))
			}, i.prototype.checkRowHeight_ = function () {
				var t = this;
				cancelAnimationFrame(this.checkRowHeightFrame_), this.checkRowHeightFrame_ = requestAnimationFrame(function () {
					return t.setKeyHeights_()
				})
			}, i.prototype.setKeyHeights_ = function () {
				var t = this.getRowHeight_();
				t !== this.calculations_.toolbarRowHeight && (this.calculations_.toolbarRowHeight = t, this.calculations_.toolbarHeight = this.calculations_.toolbarRatio * this.calculations_.toolbarRowHeight, this.calculations_.flexibleExpansionHeight = this.calculations_.flexibleExpansionRatio * this.calculations_.toolbarRowHeight, this.calculations_.maxTranslateYDistance = this.calculations_.maxTranslateYRatio * this.calculations_.toolbarRowHeight, this.calculations_.scrollThreshold = this.calculations_.scrollThresholdRatio * this.calculations_.toolbarRowHeight, this.updateAdjustElementStyles(), this.updateToolbarStyles_())
			}, i.prototype.updateToolbarStyles_ = function () {
				var i = this;
				cancelAnimationFrame(this.scrollFrame_), this.scrollFrame_ = requestAnimationFrame(function () {
					var t = i.adapter_.getViewportScrollY(),
						e = i.scrolledOutOfThreshold_(t);
					if (!e || !i.executedLastChange_) {
						var n = i.getFlexibleExpansionRatio_(t);
						i.updateToolbarFlexibleState_(n), i.isFixedLastRow_ && i.updateToolbarFixedState_(t), i.hasFlexibleFirstRow_ && i.updateFlexibleRowElementStyles_(n), i.executedLastChange_ = e, i.adapter_.notifyChange({
							flexibleExpansionRatio: n
						})
					}
				})
			}, i.prototype.scrolledOutOfThreshold_ = function (t) {
				return t > this.calculations_.scrollThreshold
			}, i.prototype.initKeyRatio_ = function () {
				var t = this.getRowHeight_(),
					e = this.adapter_.getFirstRowElementOffsetHeight() / t;
				this.calculations_.toolbarRatio = this.adapter_.getOffsetHeight() / t, this.calculations_.flexibleExpansionRatio = e - 1, this.calculations_.maxTranslateYRatio = this.isFixedLastRow_ ? this.calculations_.toolbarRatio - e : 0, this.calculations_.scrollThresholdRatio = (this.isFixedLastRow_ ? this.calculations_.toolbarRatio : e) - 1
			}, i.prototype.getRowHeight_ = function () {
				var t = Ri.TOOLBAR_MOBILE_BREAKPOINT;
				return this.adapter_.getViewportWidth() < t ? Ri.TOOLBAR_ROW_MOBILE_HEIGHT : Ri.TOOLBAR_ROW_HEIGHT
			}, i.prototype.updateToolbarFlexibleState_ = function (t) {
				this.adapter_.removeClass(Oi.FLEXIBLE_MAX), this.adapter_.removeClass(Oi.FLEXIBLE_MIN), 1 === t ? this.adapter_.addClass(Oi.FLEXIBLE_MAX) : 0 === t && this.adapter_.addClass(Oi.FLEXIBLE_MIN)
			}, i.prototype.updateToolbarFixedState_ = function (t) {
				var e = Math.max(0, Math.min(t - this.calculations_.flexibleExpansionHeight, this.calculations_.maxTranslateYDistance));
				this.adapter_.setStyle("transform", "translateY(" + -e + "px)"), e === this.calculations_.maxTranslateYDistance ? this.adapter_.addClass(Oi.FIXED_AT_LAST_ROW) : this.adapter_.removeClass(Oi.FIXED_AT_LAST_ROW)
			}, i.prototype.updateFlexibleRowElementStyles_ = function (t) {
				if (this.isFixed_) {
					var e = this.calculations_.flexibleExpansionHeight * t;
					this.adapter_.setStyleForFlexibleRowElement("height", e + this.calculations_.toolbarRowHeight + "px")
				}
				this.useFlexDefaultBehavior_ && this.updateElementStylesDefaultBehavior_(t)
			}, i.prototype.updateElementStylesDefaultBehavior_ = function (t) {
				var e = Ri.MIN_TITLE_SIZE,
					n = (Ri.MAX_TITLE_SIZE - e) * t + e;
				this.adapter_.setStyleForTitleElement("font-size", n + "rem")
			}, i
		}(n),
		xi = wi.strings,
		Ni = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, e.prototype.initialize = function () {
				var n = this;
				this.ripples_ = [], this.fixedAdjustElement_ = null, this.titleElement_ = this.root_.querySelector(xi.TITLE_SELECTOR);
				var t = this.root_.querySelector(xi.FIRST_ROW_SELECTOR);
				if (!t) throw new Error("MDCToolbar: Required sub-element '" + xi.FIRST_ROW_SELECTOR + "' is missing");
				this.firstRowElement_ = t, [].forEach.call(this.root_.querySelectorAll(xi.ICON_SELECTOR), function (t) {
					var e = L.attachTo(t);
					e.unbounded = !0, n.ripples_.push(e)
				})
			}, e.prototype.destroy = function () {
				this.ripples_.forEach(function (t) {
					t.destroy()
				}), t.prototype.destroy.call(this)
			}, Object.defineProperty(e.prototype, "fixedAdjustElement", {
				get: function () {
					return this.fixedAdjustElement_
				},
				set: function (t) {
					this.fixedAdjustElement_ = t, this.foundation_.updateAdjustElementStyles()
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.getDefaultFoundation = function () {
				var n = this;
				return new wi({
					hasClass: function (t) {
						return n.root_.classList.contains(t)
					},
					addClass: function (t) {
						return n.root_.classList.add(t)
					},
					removeClass: function (t) {
						return n.root_.classList.remove(t)
					},
					registerScrollHandler: function (t) {
						return window.addEventListener("scroll", t)
					},
					deregisterScrollHandler: function (t) {
						return window.removeEventListener("scroll", t)
					},
					registerResizeHandler: function (t) {
						return window.addEventListener("resize", t)
					},
					deregisterResizeHandler: function (t) {
						return window.removeEventListener("resize", t)
					},
					getViewportWidth: function () {
						return window.innerWidth
					},
					getViewportScrollY: function () {
						return window.pageYOffset
					},
					getOffsetHeight: function () {
						return n.root_.offsetHeight
					},
					getFirstRowElementOffsetHeight: function () {
						return n.firstRowElement_.offsetHeight
					},
					notifyChange: function (t) {
						return n.emit(xi.CHANGE_EVENT, t)
					},
					setStyle: function (t, e) {
						return n.root_.style.setProperty(t, e)
					},
					setStyleForTitleElement: function (t, e) {
						n.titleElement_ && n.titleElement_.style.setProperty(t, e)
					},
					setStyleForFlexibleRowElement: function (t, e) {
						return n.firstRowElement_.style.setProperty(t, e)
					},
					setStyleForFixedAdjustElement: function (t, e) {
						n.fixedAdjustElement && n.fixedAdjustElement.style.setProperty(t, e)
					}
				})
			}, e
		}(t),
		Di = {
			FIXED_CLASS: "mdc-top-app-bar--fixed",
			FIXED_SCROLLED_CLASS: "mdc-top-app-bar--fixed-scrolled",
			SHORT_CLASS: "mdc-top-app-bar--short",
			SHORT_COLLAPSED_CLASS: "mdc-top-app-bar--short-collapsed",
			SHORT_HAS_ACTION_ITEM_CLASS: "mdc-top-app-bar--short-has-action-item"
		},
		ki = {
			DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100,
			MAX_TOP_APP_BAR_HEIGHT: 128
		},
		Mi = {
			ACTION_ITEM_SELECTOR: ".mdc-top-app-bar__action-item",
			NAVIGATION_EVENT: "MDCTopAppBar:nav",
			NAVIGATION_ICON_SELECTOR: ".mdc-top-app-bar__navigation-icon",
			ROOT_SELECTOR: ".mdc-top-app-bar",
			TITLE_SELECTOR: ".mdc-top-app-bar__title"
		},
		Pi = function (n) {
			function i(t) {
				var e = n.call(this, a({}, i.defaultAdapter, t)) || this;
				return e.navClickHandler_ = function () {
					return e.adapter_.notifyNavigationIconClicked()
				}, e
			}
			return o(i, n), Object.defineProperty(i, "strings", {
				get: function () {
					return Mi
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "cssClasses", {
				get: function () {
					return Di
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "numbers", {
				get: function () {
					return ki
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(i, "defaultAdapter", {
				get: function () {
					return {
						addClass: function () {},
						removeClass: function () {},
						hasClass: function () {
							return !1
						},
						setStyle: function () {},
						getTopAppBarHeight: function () {
							return 0
						},
						registerNavigationIconInteractionHandler: function () {},
						deregisterNavigationIconInteractionHandler: function () {},
						notifyNavigationIconClicked: function () {},
						registerScrollHandler: function () {},
						deregisterScrollHandler: function () {},
						registerResizeHandler: function () {},
						deregisterResizeHandler: function () {},
						getViewportScrollY: function () {
							return 0
						},
						getTotalActionItems: function () {
							return 0
						}
					}
				},
				enumerable: !0,
				configurable: !0
			}), i.prototype.init = function () {
				this.initScrollHandler(), this.initResizeHandler_(), this.adapter_.registerNavigationIconInteractionHandler("click", this.navClickHandler_)
			}, i.prototype.destroy = function () {
				this.destroyScrollHandler(), this.destroyResizeHandler_(), this.adapter_.deregisterNavigationIconInteractionHandler("click", this.navClickHandler_)
			}, i.prototype.initScrollHandler = function () {
				this.scrollHandler_ && this.adapter_.registerScrollHandler(this.scrollHandler_)
			}, i.prototype.destroyScrollHandler = function () {
				this.scrollHandler_ && this.adapter_.deregisterScrollHandler(this.scrollHandler_)
			}, i.prototype.initResizeHandler_ = function () {
				this.resizeHandler_ && this.adapter_.registerResizeHandler(this.resizeHandler_)
			}, i.prototype.destroyResizeHandler_ = function () {
				this.resizeHandler_ && this.adapter_.deregisterResizeHandler(this.resizeHandler_)
			}, i
		}(n),
		Hi = function (n) {
			function t(t) {
				var e = n.call(this, t) || this;
				return e.wasDocked_ = !0, e.isDockedShowing_ = !0, e.currentAppBarOffsetTop_ = 0, e.isCurrentlyBeingResized_ = !1, e.resizeThrottleId_ = 0, e.resizeDebounceId_ = 0, e.lastScrollPosition_ = e.adapter_.getViewportScrollY(), e.topAppBarHeight_ = e.adapter_.getTopAppBarHeight(), e.scrollHandler_ = function () {
					return e.topAppBarScrollHandler_()
				}, e.resizeHandler_ = function () {
					return e.topAppBarResizeHandler_()
				}, e
			}
			return o(t, n), t.prototype.destroy = function () {
				n.prototype.destroy.call(this), this.adapter_.setStyle("top", "")
			}, t.prototype.checkForUpdate_ = function () {
				var t = -this.topAppBarHeight_,
					e = this.currentAppBarOffsetTop_ < 0,
					n = this.currentAppBarOffsetTop_ > t,
					i = e && n;
				if (i) this.wasDocked_ = !1;
				else {
					if (!this.wasDocked_) return this.wasDocked_ = !0;
					if (this.isDockedShowing_ !== n) return this.isDockedShowing_ = n, !0
				}
				return i
			}, t.prototype.moveTopAppBar_ = function () {
				if (this.checkForUpdate_()) {
					var t = this.currentAppBarOffsetTop_;
					Math.abs(t) >= this.topAppBarHeight_ && (t = -ki.MAX_TOP_APP_BAR_HEIGHT), this.adapter_.setStyle("top", t + "px")
				}
			}, t.prototype.topAppBarScrollHandler_ = function () {
				var t = Math.max(this.adapter_.getViewportScrollY(), 0),
					e = t - this.lastScrollPosition_;
				this.lastScrollPosition_ = t, this.isCurrentlyBeingResized_ || (this.currentAppBarOffsetTop_ -= e, 0 < this.currentAppBarOffsetTop_ ? this.currentAppBarOffsetTop_ = 0 : Math.abs(this.currentAppBarOffsetTop_) > this.topAppBarHeight_ && (this.currentAppBarOffsetTop_ = -this.topAppBarHeight_), this.moveTopAppBar_())
			}, t.prototype.topAppBarResizeHandler_ = function () {
				var t = this;
				this.resizeThrottleId_ || (this.resizeThrottleId_ = setTimeout(function () {
					t.resizeThrottleId_ = 0, t.throttledResizeHandler_()
				}, ki.DEBOUNCE_THROTTLE_RESIZE_TIME_MS)), this.isCurrentlyBeingResized_ = !0, this.resizeDebounceId_ && clearTimeout(this.resizeDebounceId_), this.resizeDebounceId_ = setTimeout(function () {
					t.topAppBarScrollHandler_(), t.isCurrentlyBeingResized_ = !1, t.resizeDebounceId_ = 0
				}, ki.DEBOUNCE_THROTTLE_RESIZE_TIME_MS)
			}, t.prototype.throttledResizeHandler_ = function () {
				var t = this.adapter_.getTopAppBarHeight();
				this.topAppBarHeight_ !== t && (this.wasDocked_ = !1, this.currentAppBarOffsetTop_ -= this.topAppBarHeight_ - t, this.topAppBarHeight_ = t), this.topAppBarScrollHandler_()
			}, t
		}(Pi),
		Fi = function (n) {
			function t(t) {
				var e = n.call(this, t) || this;
				return e.wasScrolled_ = !1, e.scrollHandler_ = function () {
					return e.fixedScrollHandler_()
				}, e
			}
			return o(t, n), t.prototype.fixedScrollHandler_ = function () {
				this.adapter_.getViewportScrollY() <= 0 ? this.wasScrolled_ && (this.adapter_.removeClass(Di.FIXED_SCROLLED_CLASS), this.wasScrolled_ = !1) : this.wasScrolled_ || (this.adapter_.addClass(Di.FIXED_SCROLLED_CLASS), this.wasScrolled_ = !0)
			}, t
		}(Hi),
		Bi = function (n) {
			function t(t) {
				var e = n.call(this, t) || this;
				return e.isCollapsed_ = !1, e
			}
			return o(t, n), Object.defineProperty(t.prototype, "isCollapsed", {
				get: function () {
					return this.isCollapsed_
				},
				enumerable: !0,
				configurable: !0
			}), t.prototype.init = function () {
				var t = this;
				n.prototype.init.call(this), 0 < this.adapter_.getTotalActionItems() && this.adapter_.addClass(Di.SHORT_HAS_ACTION_ITEM_CLASS), this.adapter_.hasClass(Di.SHORT_COLLAPSED_CLASS) || (this.scrollHandler_ = function () {
					return t.shortAppBarScrollHandler_()
				}, this.adapter_.registerScrollHandler(this.scrollHandler_), this.shortAppBarScrollHandler_())
			}, t.prototype.destroy = function () {
				n.prototype.destroy.call(this)
			}, t.prototype.shortAppBarScrollHandler_ = function () {
				this.adapter_.getViewportScrollY() <= 0 ? this.isCollapsed_ && (this.adapter_.removeClass(Di.SHORT_COLLAPSED_CLASS), this.isCollapsed_ = !1) : this.isCollapsed_ || (this.adapter_.addClass(Di.SHORT_COLLAPSED_CLASS), this.isCollapsed_ = !0)
			}, t
		}(Pi),
		Vi = function (t) {
			function e() {
				return null !== t && t.apply(this, arguments) || this
			}
			return o(e, t), e.attachTo = function (t) {
				return new e(t)
			}, e.prototype.initialize = function (n) {
				void 0 === n && (n = function (t) {
					return L.attachTo(t)
				}), this.navIcon_ = this.root_.querySelector(Mi.NAVIGATION_ICON_SELECTOR);
				var t = [].slice.call(this.root_.querySelectorAll(Mi.ACTION_ITEM_SELECTOR));
				this.navIcon_ && t.push(this.navIcon_), this.iconRipples_ = t.map(function (t) {
					var e = n(t);
					return e.unbounded = !0, e
				}), this.scrollTarget_ = window
			}, e.prototype.destroy = function () {
				this.iconRipples_.forEach(function (t) {
					return t.destroy()
				}), t.prototype.destroy.call(this)
			}, e.prototype.setScrollTarget = function (t) {
				this.foundation_.destroyScrollHandler(), this.scrollTarget_ = t, this.foundation_.initScrollHandler()
			}, e.prototype.getDefaultFoundation = function () {
				var n = this,
					t = {
						hasClass: function (t) {
							return n.root_.classList.contains(t)
						},
						addClass: function (t) {
							return n.root_.classList.add(t)
						},
						removeClass: function (t) {
							return n.root_.classList.remove(t)
						},
						setStyle: function (t, e) {
							return n.root_.style.setProperty(t, e)
						},
						getTopAppBarHeight: function () {
							return n.root_.clientHeight
						},
						registerNavigationIconInteractionHandler: function (t, e) {
							n.navIcon_ && n.navIcon_.addEventListener(t, e)
						},
						deregisterNavigationIconInteractionHandler: function (t, e) {
							n.navIcon_ && n.navIcon_.removeEventListener(t, e)
						},
						notifyNavigationIconClicked: function () {
							return n.emit(Mi.NAVIGATION_EVENT, {})
						},
						registerScrollHandler: function (t) {
							return n.scrollTarget_.addEventListener("scroll", t)
						},
						deregisterScrollHandler: function (t) {
							return n.scrollTarget_.removeEventListener("scroll", t)
						},
						registerResizeHandler: function (t) {
							return window.addEventListener("resize", t)
						},
						deregisterResizeHandler: function (t) {
							return window.removeEventListener("resize", t)
						},
						getViewportScrollY: function () {
							var t = n.scrollTarget_,
								e = n.scrollTarget_;
							return void 0 !== t.pageYOffset ? t.pageYOffset : e.scrollTop
						},
						getTotalActionItems: function () {
							return n.root_.querySelectorAll(Mi.ACTION_ITEM_SELECTOR).length
						}
					};
				return this.root_.classList.contains(Di.SHORT_CLASS) ? new Bi(t) : this.root_.classList.contains(Di.FIXED_CLASS) ? new Fi(t) : new Hi(t)
			}, e
		}(t);
	e.register("MDCCheckbox", k), e.register("MDCChip", j), e.register("MDCChipSet", Z), e.register("MDCDialog", bt), e.register("MDCDrawer", Pt), e.register("MDCFloatingLabel", Bt), e.register("MDCFormField", Ut), e.register("MDCGridList", Wt), e.register("MDCIconButtonToggle", Qt), e.register("MDCLineRipple", te), e.register("MDCLinearProgress", re), e.register("MDCList", Rt), e.register("MDCMenu", ve), e.register("MDCMenuSurface", _e), e.register("MDCNotchedOutline", Ae), e.register("MDCRadio", Re), e.register("MDCRipple", L), e.register("MDCSelect", Ue), e.register("MDCSlider", sn), e.register("MDCSnackbar", Ln), e.register("MDCSwitch", Nn), e.register("MDCTabBar", ri), e.register("MDCTextField", Si), e.register("MDCToolbar", Ni), e.register("MDCTopAppBar", Vi);
	"undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;

	function ji(t, e) {
		return t(e = {
			exports: {}
		}, e.exports), e.exports
	}
	var zi, Ui, Ki, qi, Wi, $i, Gi, Xi, Yi, Qi, Zi, Ji, tr, er, nr, ir, rr, or, sr, ar, cr, lr, ur, dr, hr = ji(function (t) {
			! function () {
				var i, r, o, s, a, c, l, u, d, n, h, p, f, _, m, g, y, E, v, C, b, T, I, A, S, O, L, R, w, x, N, D, k, M = window,
					P = [],
					H = {},
					F = document,
					B = "appendChild",
					V = "createElement",
					j = "removeChild",
					z = "innerHTML",
					U = "pointer-events:auto",
					e = "clientHeight",
					K = "clientWidth",
					q = "addEventListener",
					W = M.setTimeout,
					$ = M.clearTimeout;

				function G() {
					var t = i.getBoundingClientRect();
					return "transform:translate3D(" + (t.left - (o[K] - t.width) / 2) + "px, " + (t.top - (o[e] - t.height) / 2) + "px, 0) scale3D(" + i[K] / s[K] + ", " + i[e] / s[e] + ", 0)"
				}

				function X(t) {
					var e, i = x.length - 1;
					if (!f) {
						if (0 < t ? w === i && (e = !0) : 0 === w && (e = !0), e) return rt(a, ""), void W(rt, 9, a, "animation:" + (0 < t ? "bpl" : "bpf") + " .3s;transition:transform .35s");
						if ([(w = Math.max(0, Math.min(w + t, i))) - 1, w, w + 1].forEach(function (t) {
								if (t = Math.max(0, Math.min(t, i)), !H[t]) {
									var e = x[t].src,
										n = F[V]("IMG");
									n[q]("load", tt.bind(null, e)), n.src = e, H[t] = n
								}
							}), H[w].complete) return Y(t);
						f = !0, rt(m, "opacity:.4;"), o[B](m), H[w].onload = function () {
							b && Y(t)
						}, H[w].onerror = function () {
							x[w] = {
								error: "Error loading image"
							}, b && Y(t)
						}
					}
				}

				function Y(t) {
					f && (o[j](m), f = !1);
					var e = x[w];
					if (e.error) alert(e.error);
					else {
						var n = o.querySelector("img:last-of-type");
						rt(a = s = H[w], "animation:" + (0 < t ? "bpfl" : "bpfr") + " .35s;transition:transform .35s"), rt(n, "animation:" + (0 < t ? "bpfol" : "bpfor") + " .35s both"), o[B](a), e.el && (i = e.el)
					}
					N[z] = w + 1 + "/" + x.length, J(x[w].caption), O && O([a, x[w]])
				}

				function Q(t) {
					~[1, 4].indexOf(s.readyState) ? (et(), W(function () {
						s.play()
					}, 99)) : s.error ? et(t) : _ = W(Q, 35, t)
				}

				function Z(t) {
					k.noLoader || (t && rt(m, "top:" + i.offsetTop + "px;left:" + i.offsetLeft + "px;height:" + i[e] + "px;width:" + i[K] + "px"), i.parentElement[t ? B : j](m), f = t)
				}

				function J(t) {
					t && (y[z] = t), rt(g, "opacity:" + (t ? "1;" + U : "0"))
				}

				function tt(t) {
					!~P.indexOf(t) && P.push(t)
				}

				function et(t) {
					if (f && Z(), A && A(), "string" == typeof t) return it(), k.onError ? k.onError() : alert("Error: The requested " + t + " could not be loaded.");
					I && tt(n), rt(s, G()), rt(o, "opacity:1;" + U), S = W(S, 410), C = !0, b = !!x, W(function () {
						rt(s, "transition:transform .35s;transform:none"), E && W(J, 250, E)
					}, 60)
				}

				function nt(t) {
					var e = t.target,
						n = [g, v, c, l, y, R, L, m];
					e && e.blur(), T || ~n.indexOf(e) || (s.style.cssText += G(), rt(o, U), W(it, 350), $(S), T = !(C = !1))
				}

				function it() {
					if (F.body[j](o), o[j](s), rt(o, ""), (s === u ? d : s).removeAttribute("src"), J(!1), b) {
						for (var t = o.querySelectorAll("img"), e = 0; e < t.length; e++) o[j](t[e]);
						f && o[j](m), o[j](N), b = x = !1, H = {}, D || o[j](L), D || o[j](R), a.onload = et, a.onerror = et.bind(null, "image")
					}
					k.onClose && k.onClose(), T = f = !1
				}

				function rt(t, e) {
					t.style.cssText = e
				}
				t.exports = function (t) {
					var e;
					r || function () {
						var i;

						function t(t) {
							var e = F[V]("button");
							return e.className = t, e[z] = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M28 24L47 5a3 3 0 1 0-4-4L24 20 5 1a3 3 0 1 0-4 4l19 19L1 43a3 3 0 1 0 4 4l19-19 19 19a3 3 0 0 0 4 0v-4L28 24z"/></svg>', e
						}

						function e(e, t) {
							var n = F[V]("button");
							return n.className = "bp-lr", n[z] = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" height="70" fill="#fff"><path d="M88.6 121.3c.8.8 1.8 1.2 2.9 1.2s2.1-.4 2.9-1.2a4.1 4.1 0 0 0 0-5.8l-51-51 51-51a4.1 4.1 0 0 0-5.8-5.8l-54 53.9a4.1 4.1 0 0 0 0 5.8l54 53.9z"/></svg>', rt(n, t), n.onclick = function (t) {
								t.stopPropagation(), X(e)
							}, n
						}
						var n = F[V]("STYLE");
						n[z] = "#bp_caption,#bp_container{bottom:0;left:0;right:0;position:fixed;opacity:0}#bp_container>*,#bp_loader{position:absolute;right:0;z-index:10}#bp_container,#bp_caption,#bp_container svg{pointer-events:none}#bp_container{top:0;z-index:9999;background:rgba(0,0,0,.7);opacity:0;transition:opacity .35s}#bp_loader{top:0;left:0;bottom:0;display:flex;margin:0;cursor:wait;z-index:9;background:0 0}#bp_loader svg{width:50%;max-width:300px;max-height:50%;margin:auto;animation:bpturn 1s infinite linear}#bp_aud,#bp_container img,#bp_sv,#bp_vid{user-select:none;max-height:96%;max-width:96%;top:0;bottom:0;left:0;margin:auto;box-shadow:0 0 3em rgba(0,0,0,.4);z-index:-1}#bp_sv{height:0;padding-bottom:54%;background-color:#000;width:96%}#bp_caption{font-size:.9em;padding:1.3em;background:rgba(15,15,15,.94);color:#fff;text-align:center;transition:opacity .3s}#bp_aud{width:650px;top:calc(50% - 20px);bottom:auto;box-shadow:none}#bp_count{left:0;right:auto;padding:14px;color:rgba(255,255,255,.7);font-size:22px;cursor:default}#bp_container button{position:absolute;border:0;outline:0;background:0 0;cursor:pointer;transition:all .1s}#bp_container>.bp-x{height:41px;width:41px;border-radius:100%;top:8px;right:14px;opacity:.8;line-height:1}#bp_container>.bp-x:focus,#bp_container>.bp-x:hover{background:rgba(255,255,255,.2)}.bp-x svg,.bp-xc svg{height:21px;width:20px;fill:#fff;vertical-align:top;}.bp-xc svg{width:16px}#bp_container .bp-xc{left:2%;bottom:100%;padding:9px 20px 7px;background:#d04444;border-radius:2px 2px 0 0;opacity:.85}#bp_container .bp-xc:focus,#bp_container .bp-xc:hover{opacity:1}.bp-lr{top:50%;top:calc(50% - 130px);padding:99px 0;width:6%;background:0 0;border:0;opacity:.4;transition:opacity .1s}.bp-lr:focus,.bp-lr:hover{opacity:.8}@keyframes bpf{50%{transform:translatex(15px)}100%{transform:none}}@keyframes bpl{50%{transform:translatex(-15px)}100%{transform:none}}@keyframes bpfl{0%{opacity:0;transform:translatex(70px)}100%{opacity:1;transform:none}}@keyframes bpfr{0%{opacity:0;transform:translatex(-70px)}100%{opacity:1;transform:none}}@keyframes bpfol{0%{opacity:1;transform:none}100%{opacity:0;transform:translatex(-70px)}}@keyframes bpfor{0%{opacity:1;transform:none}100%{opacity:0;transform:translatex(70px)}}@keyframes bpturn{0%{transform:none}100%{transform:rotate(360deg)}}@media (max-width:600px){.bp-lr{font-size:15vw}}@media (min-aspect-ratio:9/5){#bp_sv{height:98%;width:170.6vh;padding:0}}", F.head[B](n), (o = F[V]("DIV")).id = "bp_container", o.onclick = nt, h = t("bp-x"), o[B](h), "ontouchstart" in M && (D = !0, o.ontouchstart = function (t) {
							i = t.changedTouches[0].pageX
						}, o.ontouchmove = function (t) {
							t.preventDefault()
						}, o.ontouchend = function (t) {
							if (b) {
								var e = t.changedTouches[0],
									n = e.pageX - i;
								n < -30 && X(1), 30 < n && X(-1)
							}
						});
						a = F[V]("IMG"), (c = F[V]("VIDEO")).id = "bp_vid", c.setAttribute("playsinline", !0), c.controls = !0, c.loop = !0, (l = F[V]("audio")).id = "bp_aud", l.controls = !0, l.loop = !0, (N = F[V]("span")).id = "bp_count", (g = F[V]("DIV")).id = "bp_caption", (v = t("bp-xc")).onclick = J.bind(null, !1), g[B](v), y = F[V]("SPAN"), g[B](y), o[B](g), L = e(1, "transform:scalex(-1)"), R = e(-1, "left:0;right:auto"), (m = F[V]("DIV")).id = "bp_loader", m[z] = '<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 32 32" fill="#fff" opacity=".8"><path d="M16 0a16 16 0 0 0 0 32 16 16 0 0 0 0-32m0 4a12 12 0 0 1 0 24 12 12 0 0 1 0-24" fill="#000" opacity=".5"/><path d="M16 0a16 16 0 0 1 16 16h-4A12 12 0 0 0 16 4z"/></svg>', (u = F[V]("DIV")).id = "bp_sv", (d = F[V]("IFRAME")).setAttribute("allowfullscreen", !0), d.allow = "autoplay; fullscreen", d.onload = et, rt(d, "border:0;position:absolute;height:100%;width:100%;left:0;top:0"), u[B](d), a.onload = et, a.onerror = et.bind(null, "image"), M[q]("resize", function () {
							b || f && Z(!0)
						}), F[q]("keyup", function (t) {
							var e = t.keyCode;
							27 === e && C && nt(o), b && (39 === e && X(1), 37 === e && X(-1), 38 === e && X(10), 40 === e && X(-10))
						}), F[q]("keydown", function (t) {
							b && ~[37, 38, 39, 40].indexOf(t.keyCode) && t.preventDefault()
						}), F[q]("focus", function (t) {
							C && !o.contains(t.target) && (t.stopPropagation(), h.focus())
						}, !0), r = !0
					}(), f && ($(_), it()), p = (k = t).ytSrc || t.vimeoSrc, A = t.animationStart, S = t.animationEnd, O = t.onChangeImage, i = t.el, I = !1, E = i.getAttribute("data-caption"), t.gallery ? function (t) {
						if (Array.isArray(t)) E = (x = t)[w = 0].caption;
						else {
							var e = (x = [].slice.call("string" == typeof t ? F.querySelectorAll(t + " [data-bp]") : t)).indexOf(i);
							w = -1 !== e ? e : 0, x = x.map(function (t) {
								return {
									el: t,
									src: t.getAttribute("data-bp"),
									caption: t.getAttribute("data-caption")
								}
							})
						}
						I = !0, n = x[w].src, !~P.indexOf(n) && Z(!0), 1 < x.length ? (o[B](N), N[z] = w + 1 + "/" + x.length, D || (o[B](L), o[B](R))) : x = !1;
						(s = a).src = n
					}(t.gallery) : p || t.iframeSrc ? (Z(!0), s = u, function () {
						var t, e = "https://",
							n = "autoplay=1";
						k.ytSrc ? t = e + "www.youtube.com/embed/" + p + "?html5=1&rel=0&playsinline=1&" + n : k.vimeoSrc ? t = e + "player.vimeo.com/video/" + p + "?" + n : k.iframeSrc && (t = k.iframeSrc);
						d.src = t
					}()) : t.imgSrc ? (I = !0, n = t.imgSrc, !~P.indexOf(n) && Z(!0), (s = a).src = n) : t.audio ? (Z(!0), (s = l).src = t.audio, Q("audio file")) : t.vidSrc ? (Z(!0), e = t.vidSrc, Array.isArray(e) ? (s = c.cloneNode(), e.forEach(function (t) {
						var e = F[V]("SOURCE");
						e.src = t, e.type = "video/" + t.match(/.(\w+)$/)[1], s[B](e)
					})) : (s = c).src = e, Q("video")) : (s = a).src = "IMG" === i.tagName ? i.src : M.getComputedStyle(i).backgroundImage.replace(/^url|[(|)|'|"]/g, ""), o[B](s), F.body[B](o)
				}
			}()
		}),
		pr = ji(function (t, e) {
			t.exports = function (n) {
				function i(t) {
					if (r[t]) return r[t].exports;
					var e = r[t] = {
						exports: {},
						id: t,
						loaded: !1
					};
					return n[t].call(e.exports, e, e.exports, i), e.loaded = !0, e.exports
				}
				var r = {};
				return i.m = n, i.c = r, i.p = "dist/", i(0)
			}([function (t, e, n) {
				function i(t) {
					return t && t.__esModule ? t : {
						default: t
					}
				}
				var r = Object.assign || function (t) {
						for (var e = 1; e < arguments.length; e++) {
							var n = arguments[e];
							for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
						}
						return t
					},
					o = n(1),
					s = (i(o), n(6)),
					a = i(s),
					c = n(7),
					l = i(c),
					u = n(8),
					d = i(u),
					h = n(9),
					p = i(h),
					f = n(10),
					_ = i(f),
					m = n(11),
					g = i(m),
					y = n(14),
					E = i(y),
					v = [],
					C = !1,
					b = {
						offset: 120,
						delay: 0,
						easing: "ease",
						duration: 400,
						disable: !1,
						once: !1,
						startEvent: "DOMContentLoaded",
						throttleDelay: 99,
						debounceDelay: 50,
						disableMutationObserver: !1
					},
					T = function () {
						var t = 0 < arguments.length && void 0 !== arguments[0] && arguments[0];
						if (t && (C = !0), C) return v = (0, g.default)(v, b), (0, _.default)(v, b.once), v
					},
					I = function () {
						v = (0, E.default)(), T()
					};
				t.exports = {
					init: function (t) {
						b = r(b, t), v = (0, E.default)();
						var e, n = document.all && !window.atob;
						return !0 === (e = b.disable) || "mobile" === e && p.default.mobile() || "phone" === e && p.default.phone() || "tablet" === e && p.default.tablet() || "function" == typeof e && !0 === e() || n ? void v.forEach(function (t, e) {
							t.node.removeAttribute("data-aos"), t.node.removeAttribute("data-aos-easing"), t.node.removeAttribute("data-aos-duration"), t.node.removeAttribute("data-aos-delay")
						}) : (b.disableMutationObserver || d.default.isSupported() || (console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '), b.disableMutationObserver = !0), document.querySelector("body").setAttribute("data-aos-easing", b.easing), document.querySelector("body").setAttribute("data-aos-duration", b.duration), document.querySelector("body").setAttribute("data-aos-delay", b.delay), "DOMContentLoaded" === b.startEvent && -1 < ["complete", "interactive"].indexOf(document.readyState) ? T(!0) : "load" === b.startEvent ? window.addEventListener(b.startEvent, function () {
							T(!0)
						}) : document.addEventListener(b.startEvent, function () {
							T(!0)
						}), window.addEventListener("resize", (0, l.default)(T, b.debounceDelay, !0)), window.addEventListener("orientationchange", (0, l.default)(T, b.debounceDelay, !0)), window.addEventListener("scroll", (0, a.default)(function () {
							(0, _.default)(v, b.once)
						}, b.throttleDelay)), b.disableMutationObserver || d.default.ready("[data-aos]", I), v)
					},
					refresh: T,
					refreshHard: I
				}
			}, function (t, e) {}, , , , , function (m, t) {
				(function (t) {
					function o(i, r, t) {
						function o(t) {
							var e = l,
								n = u;
							return l = u = void 0, _ = t, h = i.apply(n, e)
						}

						function s(t) {
							var e = t - f,
								n = t - _;
							return void 0 === f || r <= e || e < 0 || g && d <= n
						}

						function a() {
							var t, e, n, i = T();
							return s(i) ? c(i) : void(p = setTimeout(a, (e = (t = i) - _, n = r - (t - f), g ? b(n, d - e) : n)))
						}

						function c(t) {
							return p = void 0, n && l ? o(t) : (l = u = void 0, h)
						}

						function e() {
							var t, e = T(),
								n = s(e);
							if (l = arguments, u = this, f = e, n) {
								if (void 0 === p) return _ = t = f, p = setTimeout(a, r), m ? o(t) : h;
								if (g) return p = setTimeout(a, r), o(f)
							}
							return void 0 === p && (p = setTimeout(a, r)), h
						}
						var l, u, d, h, p, f, _ = 0,
							m = !1,
							g = !1,
							n = !0;
						if ("function" != typeof i) throw new TypeError(v);
						return r = E(r) || 0, y(t) && (m = !!t.leading, d = (g = "maxWait" in t) ? C(E(t.maxWait) || 0, r) : d, n = "trailing" in t ? !!t.trailing : n), e.cancel = function () {
							void 0 !== p && clearTimeout(p), l = f = u = p = void(_ = 0)
						}, e.flush = function () {
							return void 0 === p ? h : c(T())
						}, e
					}

					function y(t) {
						var e = void 0 === t ? "undefined" : n(t);
						return !!t && ("object" == e || "function" == e)
					}

					function i(t) {
						return "symbol" == (void 0 === t ? "undefined" : n(t)) || !!(e = t) && "object" == (void 0 === e ? "undefined" : n(e)) && _.call(t) == s;
						var e
					}

					function E(t) {
						if ("number" == typeof t) return t;
						if (i(t)) return r;
						if (y(t)) {
							var e = "function" == typeof t.valueOf ? t.valueOf() : t;
							t = y(e) ? e + "" : e
						}
						if ("string" != typeof t) return 0 === t ? t : +t;
						t = t.replace(a, "");
						var n = l.test(t);
						return n || u.test(t) ? d(t.slice(2), n ? 2 : 8) : c.test(t) ? r : +t
					}
					var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
							return typeof t
						} : function (t) {
							return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
						},
						v = "Expected a function",
						r = NaN,
						s = "[object Symbol]",
						a = /^\s+|\s+$/g,
						c = /^[-+]0x[0-9a-f]+$/i,
						l = /^0b[01]+$/i,
						u = /^0o[0-7]+$/i,
						d = parseInt,
						e = "object" == (void 0 === t ? "undefined" : n(t)) && t && t.Object === Object && t,
						h = "object" == ("undefined" == typeof self ? "undefined" : n(self)) && self && self.Object === Object && self,
						p = e || h || Function("return this")(),
						f = Object.prototype,
						_ = f.toString,
						C = Math.max,
						b = Math.min,
						T = function () {
							return p.Date.now()
						};
					m.exports = function (t, e, n) {
						var i = !0,
							r = !0;
						if ("function" != typeof t) throw new TypeError(v);
						return y(n) && (i = "leading" in n ? !!n.leading : i, r = "trailing" in n ? !!n.trailing : r), o(t, e, {
							leading: i,
							maxWait: e,
							trailing: r
						})
					}
				}).call(t, function () {
					return this
				}())
			}, function (_, t) {
				(function (t) {
					function y(t) {
						var e = void 0 === t ? "undefined" : n(t);
						return !!t && ("object" == e || "function" == e)
					}

					function i(t) {
						return "symbol" == (void 0 === t ? "undefined" : n(t)) || !!(e = t) && "object" == (void 0 === e ? "undefined" : n(e)) && f.call(t) == o;
						var e
					}

					function E(t) {
						if ("number" == typeof t) return t;
						if (i(t)) return r;
						if (y(t)) {
							var e = "function" == typeof t.valueOf ? t.valueOf() : t;
							t = y(e) ? e + "" : e
						}
						if ("string" != typeof t) return 0 === t ? t : +t;
						t = t.replace(s, "");
						var n = c.test(t);
						return n || l.test(t) ? u(t.slice(2), n ? 2 : 8) : a.test(t) ? r : +t
					}
					var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
							return typeof t
						} : function (t) {
							return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
						},
						r = NaN,
						o = "[object Symbol]",
						s = /^\s+|\s+$/g,
						a = /^[-+]0x[0-9a-f]+$/i,
						c = /^0b[01]+$/i,
						l = /^0o[0-7]+$/i,
						u = parseInt,
						e = "object" == (void 0 === t ? "undefined" : n(t)) && t && t.Object === Object && t,
						d = "object" == ("undefined" == typeof self ? "undefined" : n(self)) && self && self.Object === Object && self,
						h = e || d || Function("return this")(),
						p = Object.prototype,
						f = p.toString,
						v = Math.max,
						C = Math.min,
						b = function () {
							return h.Date.now()
						};
					_.exports = function (i, r, t) {
						function o(t) {
							var e = l,
								n = u;
							return l = u = void 0, _ = t, h = i.apply(n, e)
						}

						function s(t) {
							var e = t - f,
								n = t - _;
							return void 0 === f || r <= e || e < 0 || g && d <= n
						}

						function a() {
							var t, e, n, i = b();
							return s(i) ? c(i) : void(p = setTimeout(a, (e = (t = i) - _, n = r - (t - f), g ? C(n, d - e) : n)))
						}

						function c(t) {
							return p = void 0, n && l ? o(t) : (l = u = void 0, h)
						}

						function e() {
							var t, e = b(),
								n = s(e);
							if (l = arguments, u = this, f = e, n) {
								if (void 0 === p) return _ = t = f, p = setTimeout(a, r), m ? o(t) : h;
								if (g) return p = setTimeout(a, r), o(f)
							}
							return void 0 === p && (p = setTimeout(a, r)), h
						}
						var l, u, d, h, p, f, _ = 0,
							m = !1,
							g = !1,
							n = !0;
						if ("function" != typeof i) throw new TypeError("Expected a function");
						return r = E(r) || 0, y(t) && (m = !!t.leading, d = (g = "maxWait" in t) ? v(E(t.maxWait) || 0, r) : d, n = "trailing" in t ? !!t.trailing : n), e.cancel = function () {
							void 0 !== p && clearTimeout(p), l = f = u = p = void(_ = 0)
						}, e.flush = function () {
							return void 0 === p ? h : c(b())
						}, e
					}
				}).call(t, function () {
					return this
				}())
			}, function (t, e) {
				function r() {
					return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
				}

				function o(t) {
					t && t.forEach(function (t) {
						var e = Array.prototype.slice.call(t.addedNodes),
							n = Array.prototype.slice.call(t.removedNodes),
							i = e.concat(n);
						if (function t(e) {
								var n = void 0,
									i = void 0;
								for (n = 0; n < e.length; n += 1) {
									if ((i = e[n]).dataset && i.dataset.aos) return !0;
									if (i.children && t(i.children)) return !0
								}
								return !1
							}(i)) return s()
					})
				}
				Object.defineProperty(e, "__esModule", {
					value: !0
				});
				var s = function () {};
				e.default = {
					isSupported: function () {
						return !!r()
					},
					ready: function (t, e) {
						var n = window.document,
							i = new(r())(o);
						s = e, i.observe(n.documentElement, {
							childList: !0,
							subtree: !0,
							removedNodes: !0
						})
					}
				}
			}, function (t, e) {
				function n() {
					return navigator.userAgent || navigator.vendor || window.opera || ""
				}
				Object.defineProperty(e, "__esModule", {
					value: !0
				});
				var i = function () {
						function i(t, e) {
							for (var n = 0; n < e.length; n++) {
								var i = e[n];
								i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
							}
						}
						return function (t, e, n) {
							return e && i(t.prototype, e), n && i(t, n), t
						}
					}(),
					r = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
					o = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
					s = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
					a = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
					c = function () {
						function t() {
							! function (t, e) {
								if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
							}(this, t)
						}
						return i(t, [{
							key: "phone",
							value: function () {
								var t = n();
								return !(!r.test(t) && !o.test(t.substr(0, 4)))
							}
						}, {
							key: "mobile",
							value: function () {
								var t = n();
								return !(!s.test(t) && !a.test(t.substr(0, 4)))
							}
						}, {
							key: "tablet",
							value: function () {
								return this.mobile() && !this.phone()
							}
						}]), t
					}();
				e.default = new c
			}, function (t, e) {
				Object.defineProperty(e, "__esModule", {
					value: !0
				}), e.default = function (t, s) {
					var a = window.pageYOffset,
						c = window.innerHeight;
					t.forEach(function (t, e) {
						var n, i, r, o;
						i = c + a, r = s, o = (n = t).node.getAttribute("data-aos-once"), i > n.position ? n.node.classList.add("aos-animate") : void 0 !== o && ("false" === o || !r && "true" !== o) && n.node.classList.remove("aos-animate")
					})
				}
			}, function (t, e, n) {
				Object.defineProperty(e, "__esModule", {
					value: !0
				});
				var i, r = n(12),
					o = (i = r) && i.__esModule ? i : {
						default: i
					};
				e.default = function (t, n) {
					return t.forEach(function (t, e) {
						t.node.classList.add("aos-init"), t.position = (0, o.default)(t.node, n.offset)
					}), t
				}
			}, function (t, e, n) {
				Object.defineProperty(e, "__esModule", {
					value: !0
				});
				var i, r = n(13),
					s = (i = r) && i.__esModule ? i : {
						default: i
					};
				e.default = function (t, e) {
					var n = 0,
						i = 0,
						r = window.innerHeight,
						o = {
							offset: t.getAttribute("data-aos-offset"),
							anchor: t.getAttribute("data-aos-anchor"),
							anchorPlacement: t.getAttribute("data-aos-anchor-placement")
						};
					switch (o.offset && !isNaN(o.offset) && (i = parseInt(o.offset)), o.anchor && document.querySelectorAll(o.anchor) && (t = document.querySelectorAll(o.anchor)[0]), n = (0, s.default)(t).top, o.anchorPlacement) {
						case "top-bottom":
							break;
						case "center-bottom":
							n += t.offsetHeight / 2;
							break;
						case "bottom-bottom":
							n += t.offsetHeight;
							break;
						case "top-center":
							n += r / 2;
							break;
						case "bottom-center":
							n += r / 2 + t.offsetHeight;
							break;
						case "center-center":
							n += r / 2 + t.offsetHeight / 2;
							break;
						case "top-top":
							n += r;
							break;
						case "bottom-top":
							n += t.offsetHeight + r;
							break;
						case "center-top":
							n += t.offsetHeight / 2 + r
					}
					return o.anchorPlacement || o.offset || isNaN(e) || (i = e), n + i
				}
			}, function (t, e) {
				Object.defineProperty(e, "__esModule", {
					value: !0
				}), e.default = function (t) {
					for (var e = 0, n = 0; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop);) e += t.offsetLeft - ("BODY" != t.tagName ? t.scrollLeft : 0), n += t.offsetTop - ("BODY" != t.tagName ? t.scrollTop : 0), t = t.offsetParent;
					return {
						top: n,
						left: e
					}
				}
			}, function (t, e) {
				Object.defineProperty(e, "__esModule", {
					value: !0
				}), e.default = function (t) {
					return t = t || document.querySelectorAll("[data-aos]"), Array.prototype.map.call(t, function (t) {
						return {
							node: t
						}
					})
				}
			}])
		}),
		fr = (zi = pr) && zi.__esModule && Object.prototype.hasOwnProperty.call(zi, "default") ? zi.default : zi;
	pr.AOS;
	! function (c, n, r, a) {
		function l(t, e) {
			this.settings = null, this.options = c.extend({}, l.Defaults, e), this.$element = c(t), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
				time: null,
				target: null,
				pointer: null,
				stage: {
					start: null,
					current: null
				},
				direction: null
			}, this._states = {
				current: {},
				tags: {
					initializing: ["busy"],
					animating: ["busy"],
					dragging: ["interacting"]
				}
			}, c.each(["onResize", "onThrottledResize"], c.proxy(function (t, e) {
				this._handlers[e] = c.proxy(this[e], this)
			}, this)), c.each(l.Plugins, c.proxy(function (t, e) {
				this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this)
			}, this)), c.each(l.Workers, c.proxy(function (t, e) {
				this._pipe.push({
					filter: e.filter,
					run: c.proxy(e.run, this)
				})
			}, this)), this.setup(), this.initialize()
		}
		l.Defaults = {
			items: 3,
			loop: !1,
			center: !1,
			rewind: !1,
			checkVisibility: !0,
			mouseDrag: !0,
			touchDrag: !0,
			pullDrag: !0,
			freeDrag: !1,
			margin: 0,
			stagePadding: 0,
			merge: !1,
			mergeFit: !0,
			autoWidth: !1,
			startPosition: 0,
			rtl: !1,
			smartSpeed: 250,
			fluidSpeed: !1,
			dragEndSpeed: !1,
			responsive: {},
			responsiveRefreshRate: 200,
			responsiveBaseElement: n,
			fallbackEasing: "swing",
			slideTransition: "",
			info: !1,
			nestedItemSelector: !1,
			itemElement: "div",
			stageElement: "div",
			refreshClass: "owl-refresh",
			loadedClass: "owl-loaded",
			loadingClass: "owl-loading",
			rtlClass: "owl-rtl",
			responsiveClass: "owl-responsive",
			dragClass: "owl-drag",
			itemClass: "owl-item",
			stageClass: "owl-stage",
			stageOuterClass: "owl-stage-outer",
			grabClass: "owl-grab"
		}, l.Width = {
			Default: "default",
			Inner: "inner",
			Outer: "outer"
		}, l.Type = {
			Event: "event",
			State: "state"
		}, l.Plugins = {}, l.Workers = [{
			filter: ["width", "settings"],
			run: function () {
				this._width = this.$element.width()
			}
		}, {
			filter: ["width", "items", "settings"],
			run: function (t) {
				t.current = this._items && this._items[this.relative(this._current)]
			}
		}, {
			filter: ["items", "settings"],
			run: function () {
				this.$stage.children(".cloned").remove()
			}
		}, {
			filter: ["width", "items", "settings"],
			run: function (t) {
				var e = this.settings.margin || "",
					n = !this.settings.autoWidth,
					i = this.settings.rtl,
					r = {
						width: "auto",
						"margin-left": i ? e : "",
						"margin-right": i ? "" : e
					};
				!n && this.$stage.children().css(r), t.css = r
			}
		}, {
			filter: ["width", "items", "settings"],
			run: function (t) {
				var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
					n = null,
					i = this._items.length,
					r = !this.settings.autoWidth,
					o = [];
				for (t.items = {
						merge: !1,
						width: e
					}; i--;) n = this._mergers[i], n = this.settings.mergeFit && Math.min(n, this.settings.items) || n, t.items.merge = 1 < n || t.items.merge, o[i] = r ? e * n : this._items[i].width();
				this._widths = o
			}
		}, {
			filter: ["items", "settings"],
			run: function () {
				var t = [],
					e = this._items,
					n = this.settings,
					i = Math.max(2 * n.items, 4),
					r = 2 * Math.ceil(e.length / 2),
					o = n.loop && e.length ? n.rewind ? i : Math.max(i, r) : 0,
					s = "",
					a = "";
				for (o /= 2; 0 < o;) t.push(this.normalize(t.length / 2, !0)), s += e[t[t.length - 1]][0].outerHTML, t.push(this.normalize(e.length - 1 - (t.length - 1) / 2, !0)), a = e[t[t.length - 1]][0].outerHTML + a, o -= 1;
				this._clones = t, c(s).addClass("cloned").appendTo(this.$stage), c(a).addClass("cloned").prependTo(this.$stage)
			}
		}, {
			filter: ["width", "items", "settings"],
			run: function () {
				for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, n = -1, i = 0, r = 0, o = []; ++n < e;) i = o[n - 1] || 0, r = this._widths[this.relative(n)] + this.settings.margin, o.push(i + r * t);
				this._coordinates = o
			}
		}, {
			filter: ["width", "items", "settings"],
			run: function () {
				var t = this.settings.stagePadding,
					e = this._coordinates,
					n = {
						width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
						"padding-left": t || "",
						"padding-right": t || ""
					};
				this.$stage.css(n)
			}
		}, {
			filter: ["width", "items", "settings"],
			run: function (t) {
				var e = this._coordinates.length,
					n = !this.settings.autoWidth,
					i = this.$stage.children();
				if (n && t.items.merge)
					for (; e--;) t.css.width = this._widths[this.relative(e)], i.eq(e).css(t.css);
				else n && (t.css.width = t.items.width, i.css(t.css))
			}
		}, {
			filter: ["items"],
			run: function () {
				this._coordinates.length < 1 && this.$stage.removeAttr("style")
			}
		}, {
			filter: ["width", "items", "settings"],
			run: function (t) {
				t.current = t.current ? this.$stage.children().index(t.current) : 0, t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current)), this.reset(t.current)
			}
		}, {
			filter: ["position"],
			run: function () {
				this.animate(this.coordinates(this._current))
			}
		}, {
			filter: ["width", "position", "items", "settings"],
			run: function () {
				var t, e, n, i, r = this.settings.rtl ? 1 : -1,
					o = 2 * this.settings.stagePadding,
					s = this.coordinates(this.current()) + o,
					a = s + this.width() * r,
					c = [];
				for (n = 0, i = this._coordinates.length; n < i; n++) t = this._coordinates[n - 1] || 0, e = Math.abs(this._coordinates[n]) + o * r, (this.op(t, "<=", s) && this.op(t, ">", a) || this.op(e, "<", s) && this.op(e, ">", a)) && c.push(n);
				this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + c.join("), :eq(") + ")").addClass("active"), this.$stage.children(".center").removeClass("center"), this.settings.center && this.$stage.children().eq(this.current()).addClass("center")
			}
		}], l.prototype.initializeStage = function () {
			this.$stage = this.$element.find("." + this.settings.stageClass), this.$stage.length || (this.$element.addClass(this.options.loadingClass), this.$stage = c("<" + this.settings.stageElement + ">", {
				class: this.settings.stageClass
			}).wrap(c("<div/>", {
				class: this.settings.stageOuterClass
			})), this.$element.append(this.$stage.parent()))
		}, l.prototype.initializeItems = function () {
			var t = this.$element.find(".owl-item");
			if (t.length) return this._items = t.get().map(function (t) {
				return c(t)
			}), this._mergers = this._items.map(function () {
				return 1
			}), void this.refresh();
			this.replace(this.$element.children().not(this.$stage.parent())), this.isVisible() ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)
		}, l.prototype.initialize = function () {
			var t, e, n;
			(this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) && (t = this.$element.find("img"), e = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : a, n = this.$element.children(e).width(), t.length && n <= 0 && this.preloadAutoWidthImages(t));
			this.initializeStage(), this.initializeItems(), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
		}, l.prototype.isVisible = function () {
			return !this.settings.checkVisibility || this.$element.is(":visible")
		}, l.prototype.setup = function () {
			var e = this.viewport(),
				t = this.options.responsive,
				n = -1,
				i = null;
			t ? (c.each(t, function (t) {
				t <= e && n < t && (n = Number(t))
			}), "function" == typeof (i = c.extend({}, this.options, t[n])).stagePadding && (i.stagePadding = i.stagePadding()), delete i.responsive, i.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + n))) : i = c.extend({}, this.options), this.trigger("change", {
				property: {
					name: "settings",
					value: i
				}
			}), this._breakpoint = n, this.settings = i, this.invalidate("settings"), this.trigger("changed", {
				property: {
					name: "settings",
					value: this.settings
				}
			})
		}, l.prototype.optionsLogic = function () {
			this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
		}, l.prototype.prepare = function (t) {
			var e = this.trigger("prepare", {
				content: t
			});
			return e.data || (e.data = c("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(t)), this.trigger("prepared", {
				content: e.data
			}), e.data
		}, l.prototype.update = function () {
			for (var t = 0, e = this._pipe.length, n = c.proxy(function (t) {
					return this[t]
				}, this._invalidated), i = {}; t < e;)(this._invalidated.all || 0 < c.grep(this._pipe[t].filter, n).length) && this._pipe[t].run(i), t++;
			this._invalidated = {}, !this.is("valid") && this.enter("valid")
		}, l.prototype.width = function (t) {
			switch (t = t || l.Width.Default) {
				case l.Width.Inner:
				case l.Width.Outer:
					return this._width;
				default:
					return this._width - 2 * this.settings.stagePadding + this.settings.margin
			}
		}, l.prototype.refresh = function () {
			this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
		}, l.prototype.onThrottledResize = function () {
			n.clearTimeout(this.resizeTimer), this.resizeTimer = n.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
		}, l.prototype.onResize = function () {
			return !!this._items.length && (this._width !== this.$element.width() && (!!this.isVisible() && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
		}, l.prototype.registerEventHandlers = function () {
			c.support.transition && this.$stage.on(c.support.transition.end + ".owl.core", c.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(n, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", c.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
				return !1
			})), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", c.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", c.proxy(this.onDragEnd, this)))
		}, l.prototype.onDragStart = function (t) {
			var e = null;
			3 !== t.which && (c.support.transform ? e = {
				x: (e = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","))[16 === e.length ? 12 : 4],
				y: e[16 === e.length ? 13 : 5]
			} : (e = this.$stage.position(), e = {
				x: this.settings.rtl ? e.left + this.$stage.width() - this.width() + this.settings.margin : e.left,
				y: e.top
			}), this.is("animating") && (c.support.transform ? this.animate(e.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === t.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = c(t.target), this._drag.stage.start = e, this._drag.stage.current = e, this._drag.pointer = this.pointer(t), c(r).on("mouseup.owl.core touchend.owl.core", c.proxy(this.onDragEnd, this)), c(r).one("mousemove.owl.core touchmove.owl.core", c.proxy(function (t) {
				var e = this.difference(this._drag.pointer, this.pointer(t));
				c(r).on("mousemove.owl.core touchmove.owl.core", c.proxy(this.onDragMove, this)), Math.abs(e.x) < Math.abs(e.y) && this.is("valid") || (t.preventDefault(), this.enter("dragging"), this.trigger("drag"))
			}, this)))
		}, l.prototype.onDragMove = function (t) {
			var e = null,
				n = null,
				i = null,
				r = this.difference(this._drag.pointer, this.pointer(t)),
				o = this.difference(this._drag.stage.start, r);
			this.is("dragging") && (t.preventDefault(), this.settings.loop ? (e = this.coordinates(this.minimum()), n = this.coordinates(this.maximum() + 1) - e, o.x = ((o.x - e) % n + n) % n + e) : (e = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), n = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), i = this.settings.pullDrag ? -1 * r.x / 5 : 0, o.x = Math.max(Math.min(o.x, e + i), n + i)), this._drag.stage.current = o, this.animate(o.x))
		}, l.prototype.onDragEnd = function (t) {
			var e = this.difference(this._drag.pointer, this.pointer(t)),
				n = this._drag.stage.current,
				i = 0 < e.x ^ this.settings.rtl ? "left" : "right";
			c(r).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== e.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(n.x, 0 !== e.x ? i : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = i, (3 < Math.abs(e.x) || 300 < (new Date).getTime() - this._drag.time) && this._drag.target.one("click.owl.core", function () {
				return !1
			})), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
		}, l.prototype.closest = function (n, i) {
			var r = -1,
				o = this.width(),
				s = this.coordinates();
			return this.settings.freeDrag || c.each(s, c.proxy(function (t, e) {
				return "left" === i && e - 30 < n && n < e + 30 ? r = t : "right" === i && e - o - 30 < n && n < e - o + 30 ? r = t + 1 : this.op(n, "<", e) && this.op(n, ">", s[t + 1] !== a ? s[t + 1] : e - o) && (r = "left" === i ? t + 1 : t), -1 === r
			}, this)), this.settings.loop || (this.op(n, ">", s[this.minimum()]) ? r = n = this.minimum() : this.op(n, "<", s[this.maximum()]) && (r = n = this.maximum())), r
		}, l.prototype.animate = function (t) {
			var e = 0 < this.speed();
			this.is("animating") && this.onTransitionEnd(), e && (this.enter("animating"), this.trigger("translate")), c.support.transform3d && c.support.transition ? this.$stage.css({
				transform: "translate3d(" + t + "px,0px,0px)",
				transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
			}) : e ? this.$stage.animate({
				left: t + "px"
			}, this.speed(), this.settings.fallbackEasing, c.proxy(this.onTransitionEnd, this)) : this.$stage.css({
				left: t + "px"
			})
		}, l.prototype.is = function (t) {
			return this._states.current[t] && 0 < this._states.current[t]
		}, l.prototype.current = function (t) {
			if (t === a) return this._current;
			if (0 === this._items.length) return a;
			if (t = this.normalize(t), this._current !== t) {
				var e = this.trigger("change", {
					property: {
						name: "position",
						value: t
					}
				});
				e.data !== a && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
					property: {
						name: "position",
						value: this._current
					}
				})
			}
			return this._current
		}, l.prototype.invalidate = function (t) {
			return "string" === c.type(t) && (this._invalidated[t] = !0, this.is("valid") && this.leave("valid")), c.map(this._invalidated, function (t, e) {
				return e
			})
		}, l.prototype.reset = function (t) {
			(t = this.normalize(t)) !== a && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
		}, l.prototype.normalize = function (t, e) {
			var n = this._items.length,
				i = e ? 0 : this._clones.length;
			return !this.isNumeric(t) || n < 1 ? t = a : (t < 0 || n + i <= t) && (t = ((t - i / 2) % n + n) % n + i / 2), t
		}, l.prototype.relative = function (t) {
			return t -= this._clones.length / 2, this.normalize(t, !0)
		}, l.prototype.maximum = function (t) {
			var e, n, i, r = this.settings,
				o = this._coordinates.length;
			if (r.loop) o = this._clones.length / 2 + this._items.length - 1;
			else if (r.autoWidth || r.merge) {
				if (e = this._items.length)
					for (n = this._items[--e].width(), i = this.$element.width(); e-- && !(i < (n += this._items[e].width() + this.settings.margin)););
				o = e + 1
			} else o = r.center ? this._items.length - 1 : this._items.length - r.items;
			return t && (o -= this._clones.length / 2), Math.max(o, 0)
		}, l.prototype.minimum = function (t) {
			return t ? 0 : this._clones.length / 2
		}, l.prototype.items = function (t) {
			return t === a ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
		}, l.prototype.mergers = function (t) {
			return t === a ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
		}, l.prototype.clones = function (n) {
			var e = this._clones.length / 2,
				i = e + this._items.length,
				r = function (t) {
					return t % 2 == 0 ? i + t / 2 : e - (t + 1) / 2
				};
			return n === a ? c.map(this._clones, function (t, e) {
				return r(e)
			}) : c.map(this._clones, function (t, e) {
				return t === n ? r(e) : null
			})
		}, l.prototype.speed = function (t) {
			return t !== a && (this._speed = t), this._speed
		}, l.prototype.coordinates = function (t) {
			var e, n = 1,
				i = t - 1;
			return t === a ? c.map(this._coordinates, c.proxy(function (t, e) {
				return this.coordinates(e)
			}, this)) : (this.settings.center ? (this.settings.rtl && (n = -1, i = t + 1), e = this._coordinates[t], e += (this.width() - e + (this._coordinates[i] || 0)) / 2 * n) : e = this._coordinates[i] || 0, e = Math.ceil(e))
		}, l.prototype.duration = function (t, e, n) {
			return 0 === n ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(n || this.settings.smartSpeed)
		}, l.prototype.to = function (t, e) {
			var n = this.current(),
				i = null,
				r = t - this.relative(n),
				o = (0 < r) - (r < 0),
				s = this._items.length,
				a = this.minimum(),
				c = this.maximum();
			this.settings.loop ? (!this.settings.rewind && Math.abs(r) > s / 2 && (r += -1 * o * s), (i = (((t = n + r) - a) % s + s) % s + a) !== t && i - r <= c && 0 < i - r && (n = i - r, t = i, this.reset(n))) : t = this.settings.rewind ? (t % (c += 1) + c) % c : Math.max(a, Math.min(c, t)), this.speed(this.duration(n, t, e)), this.current(t), this.isVisible() && this.update()
		}, l.prototype.next = function (t) {
			t = t || !1, this.to(this.relative(this.current()) + 1, t)
		}, l.prototype.prev = function (t) {
			t = t || !1, this.to(this.relative(this.current()) - 1, t)
		}, l.prototype.onTransitionEnd = function (t) {
			if (t !== a && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))) return !1;
			this.leave("animating"), this.trigger("translated")
		}, l.prototype.viewport = function () {
			var t;
			return this.options.responsiveBaseElement !== n ? t = c(this.options.responsiveBaseElement).width() : n.innerWidth ? t = n.innerWidth : r.documentElement && r.documentElement.clientWidth ? t = r.documentElement.clientWidth : console.warn("Can not detect viewport width."), t
		}, l.prototype.replace = function (t) {
			this.$stage.empty(), this._items = [], t && (t = t instanceof jQuery ? t : c(t)), this.settings.nestedItemSelector && (t = t.find("." + this.settings.nestedItemSelector)), t.filter(function () {
				return 1 === this.nodeType
			}).each(c.proxy(function (t, e) {
				e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
			}, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
		}, l.prototype.add = function (t, e) {
			var n = this.relative(this._current);
			e = e === a ? this._items.length : this.normalize(e, !0), t = t instanceof jQuery ? t : c(t), this.trigger("add", {
				content: t,
				position: e
			}), t = this.prepare(t), 0 === this._items.length || e === this._items.length ? (0 === this._items.length && this.$stage.append(t), 0 !== this._items.length && this._items[e - 1].after(t), this._items.push(t), this._mergers.push(1 * t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[e].before(t), this._items.splice(e, 0, t), this._mergers.splice(e, 0, 1 * t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[n] && this.reset(this._items[n].index()), this.invalidate("items"), this.trigger("added", {
				content: t,
				position: e
			})
		}, l.prototype.remove = function (t) {
			(t = this.normalize(t, !0)) !== a && (this.trigger("remove", {
				content: this._items[t],
				position: t
			}), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
				content: null,
				position: t
			}))
		}, l.prototype.preloadAutoWidthImages = function (t) {
			t.each(c.proxy(function (t, e) {
				this.enter("pre-loading"), e = c(e), c(new Image).one("load", c.proxy(function (t) {
					e.attr("src", t.target.src), e.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
				}, this)).attr("src", e.attr("src") || e.attr("data-src") || e.attr("data-src-retina"))
			}, this))
		}, l.prototype.destroy = function () {
			for (var t in this.$element.off(".owl.core"), this.$stage.off(".owl.core"), c(r).off(".owl.core"), !1 !== this.settings.responsive && (n.clearTimeout(this.resizeTimer), this.off(n, "resize", this._handlers.onThrottledResize)), this._plugins) this._plugins[t].destroy();
			this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.remove(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
		}, l.prototype.op = function (t, e, n) {
			var i = this.settings.rtl;
			switch (e) {
				case "<":
					return i ? n < t : t < n;
				case ">":
					return i ? t < n : n < t;
				case ">=":
					return i ? t <= n : n <= t;
				case "<=":
					return i ? n <= t : t <= n
			}
		}, l.prototype.on = function (t, e, n, i) {
			t.addEventListener ? t.addEventListener(e, n, i) : t.attachEvent && t.attachEvent("on" + e, n)
		}, l.prototype.off = function (t, e, n, i) {
			t.removeEventListener ? t.removeEventListener(e, n, i) : t.detachEvent && t.detachEvent("on" + e, n)
		}, l.prototype.trigger = function (t, e, n, i, r) {
			var o = {
					item: {
						count: this._items.length,
						index: this.current()
					}
				},
				s = c.camelCase(c.grep(["on", t, n], function (t) {
					return t
				}).join("-").toLowerCase()),
				a = c.Event([t, "owl", n || "carousel"].join(".").toLowerCase(), c.extend({
					relatedTarget: this
				}, o, e));
			return this._supress[t] || (c.each(this._plugins, function (t, e) {
				e.onTrigger && e.onTrigger(a)
			}), this.register({
				type: l.Type.Event,
				name: t
			}), this.$element.trigger(a), this.settings && "function" == typeof this.settings[s] && this.settings[s].call(this, a)), a
		}, l.prototype.enter = function (t) {
			c.each([t].concat(this._states.tags[t] || []), c.proxy(function (t, e) {
				this._states.current[e] === a && (this._states.current[e] = 0), this._states.current[e]++
			}, this))
		}, l.prototype.leave = function (t) {
			c.each([t].concat(this._states.tags[t] || []), c.proxy(function (t, e) {
				this._states.current[e]--
			}, this))
		}, l.prototype.register = function (n) {
			if (n.type === l.Type.Event) {
				if (c.event.special[n.name] || (c.event.special[n.name] = {}), !c.event.special[n.name].owl) {
					var e = c.event.special[n.name]._default;
					c.event.special[n.name]._default = function (t) {
						return !e || !e.apply || t.namespace && -1 !== t.namespace.indexOf("owl") ? t.namespace && -1 < t.namespace.indexOf("owl") : e.apply(this, arguments)
					}, c.event.special[n.name].owl = !0
				}
			} else n.type === l.Type.State && (this._states.tags[n.name] ? this._states.tags[n.name] = this._states.tags[n.name].concat(n.tags) : this._states.tags[n.name] = n.tags, this._states.tags[n.name] = c.grep(this._states.tags[n.name], c.proxy(function (t, e) {
				return c.inArray(t, this._states.tags[n.name]) === e
			}, this)))
		}, l.prototype.suppress = function (t) {
			c.each(t, c.proxy(function (t, e) {
				this._supress[e] = !0
			}, this))
		}, l.prototype.release = function (t) {
			c.each(t, c.proxy(function (t, e) {
				delete this._supress[e]
			}, this))
		}, l.prototype.pointer = function (t) {
			var e = {
				x: null,
				y: null
			};
			return (t = (t = t.originalEvent || t || n.event).touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t).pageX ? (e.x = t.pageX, e.y = t.pageY) : (e.x = t.clientX, e.y = t.clientY), e
		}, l.prototype.isNumeric = function (t) {
			return !isNaN(parseFloat(t))
		}, l.prototype.difference = function (t, e) {
			return {
				x: t.x - e.x,
				y: t.y - e.y
			}
		}, c.fn.owlCarousel = function (e) {
			var i = Array.prototype.slice.call(arguments, 1);
			return this.each(function () {
				var t = c(this),
					n = t.data("owl.carousel");
				n || (n = new l(this, "object" == typeof e && e), t.data("owl.carousel", n), c.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (t, e) {
					n.register({
						type: l.Type.Event,
						name: e
					}), n.$element.on(e + ".owl.carousel.core", c.proxy(function (t) {
						t.namespace && t.relatedTarget !== this && (this.suppress([e]), n[e].apply(this, [].slice.call(arguments, 1)), this.release([e]))
					}, n))
				})), "string" == typeof e && "_" !== e.charAt(0) && n[e].apply(n, i)
			})
		}, c.fn.owlCarousel.Constructor = l
	}(window.Zepto || window.jQuery, window, document), Ui = window.Zepto || window.jQuery, Ki = window, document, (qi = function (t) {
			this._core = t, this._interval = null, this._visible = null, this._handlers = {
				"initialized.owl.carousel": Ui.proxy(function (t) {
					t.namespace && this._core.settings.autoRefresh && this.watch()
				}, this)
			}, this._core.options = Ui.extend({}, qi.Defaults, this._core.options), this._core.$element.on(this._handlers)
		}).Defaults = {
			autoRefresh: !0,
			autoRefreshInterval: 500
		}, qi.prototype.watch = function () {
			this._interval || (this._visible = this._core.isVisible(), this._interval = Ki.setInterval(Ui.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
		}, qi.prototype.refresh = function () {
			this._core.isVisible() !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
		}, qi.prototype.destroy = function () {
			var t, e;
			for (t in Ki.clearInterval(this._interval), this._handlers) this._core.$element.off(t, this._handlers[t]);
			for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
		}, Ui.fn.owlCarousel.Constructor.Plugins.AutoRefresh = qi, Wi = window.Zepto || window.jQuery, $i = window, document, (Gi = function (t) {
			this._core = t, this._loaded = [], this._handlers = {
				"initialized.owl.carousel change.owl.carousel resized.owl.carousel": Wi.proxy(function (t) {
					if (t.namespace && this._core.settings && this._core.settings.lazyLoad && (t.property && "position" == t.property.name || "initialized" == t.type)) {
						var e = this._core.settings,
							n = e.center && Math.ceil(e.items / 2) || e.items,
							i = e.center && -1 * n || 0,
							r = (t.property && void 0 !== t.property.value ? t.property.value : this._core.current()) + i,
							o = this._core.clones().length,
							s = Wi.proxy(function (t, e) {
								this.load(e)
							}, this);
						for (0 < e.lazyLoadEager && (n += e.lazyLoadEager, e.loop && (r -= e.lazyLoadEager, n++)); i++ < n;) this.load(o / 2 + this._core.relative(r)), o && Wi.each(this._core.clones(this._core.relative(r)), s), r++
					}
				}, this)
			}, this._core.options = Wi.extend({}, Gi.Defaults, this._core.options), this._core.$element.on(this._handlers)
		}).Defaults = {
			lazyLoad: !1,
			lazyLoadEager: 0
		}, Gi.prototype.load = function (t) {
			var e = this._core.$stage.children().eq(t),
				n = e && e.find(".owl-lazy");
			!n || -1 < Wi.inArray(e.get(0), this._loaded) || (n.each(Wi.proxy(function (t, e) {
				var n, i = Wi(e),
					r = 1 < $i.devicePixelRatio && i.attr("data-src-retina") || i.attr("data-src") || i.attr("data-srcset");
				this._core.trigger("load", {
					element: i,
					url: r
				}, "lazy"), i.is("img") ? i.one("load.owl.lazy", Wi.proxy(function () {
					i.css("opacity", 1), this._core.trigger("loaded", {
						element: i,
						url: r
					}, "lazy")
				}, this)).attr("src", r) : i.is("source") ? i.one("load.owl.lazy", Wi.proxy(function () {
					this._core.trigger("loaded", {
						element: i,
						url: r
					}, "lazy")
				}, this)).attr("srcset", r) : ((n = new Image).onload = Wi.proxy(function () {
					i.css({
						"background-image": 'url("' + r + '")',
						opacity: "1"
					}), this._core.trigger("loaded", {
						element: i,
						url: r
					}, "lazy")
				}, this), n.src = r)
			}, this)), this._loaded.push(e.get(0)))
		}, Gi.prototype.destroy = function () {
			var t, e;
			for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
			for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
		}, Wi.fn.owlCarousel.Constructor.Plugins.Lazy = Gi, Xi = window.Zepto || window.jQuery, Yi = window, document, (Qi = function (t) {
			this._core = t, this._previousHeight = null, this._handlers = {
				"initialized.owl.carousel refreshed.owl.carousel": Xi.proxy(function (t) {
					t.namespace && this._core.settings.autoHeight && this.update()
				}, this),
				"changed.owl.carousel": Xi.proxy(function (t) {
					t.namespace && this._core.settings.autoHeight && "position" === t.property.name && this.update()
				}, this),
				"loaded.owl.lazy": Xi.proxy(function (t) {
					t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
				}, this)
			}, this._core.options = Xi.extend({}, Qi.Defaults, this._core.options), this._core.$element.on(this._handlers), this._intervalId = null;
			var e = this;
			Xi(Yi).on("load", function () {
				e._core.settings.autoHeight && e.update()
			}), Xi(Yi).resize(function () {
				e._core.settings.autoHeight && (null != e._intervalId && clearTimeout(e._intervalId), e._intervalId = setTimeout(function () {
					e.update()
				}, 250))
			})
		}).Defaults = {
			autoHeight: !1,
			autoHeightClass: "owl-height"
		}, Qi.prototype.update = function () {
			var t = this._core._current,
				e = t + this._core.settings.items,
				n = this._core.settings.lazyLoad,
				i = this._core.$stage.children().toArray().slice(t, e),
				r = [],
				o = 0;
			Xi.each(i, function (t, e) {
				r.push(Xi(e).height())
			}), (o = Math.max.apply(null, r)) <= 1 && n && this._previousHeight && (o = this._previousHeight), this._previousHeight = o, this._core.$stage.parent().height(o).addClass(this._core.settings.autoHeightClass)
		}, Qi.prototype.destroy = function () {
			var t, e;
			for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
			for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
		}, Xi.fn.owlCarousel.Constructor.Plugins.AutoHeight = Qi, Zi = window.Zepto || window.jQuery, window, Ji = document, (tr = function (t) {
			this._core = t, this._videos = {}, this._playing = null, this._handlers = {
				"initialized.owl.carousel": Zi.proxy(function (t) {
					t.namespace && this._core.register({
						type: "state",
						name: "playing",
						tags: ["interacting"]
					})
				}, this),
				"resize.owl.carousel": Zi.proxy(function (t) {
					t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault()
				}, this),
				"refreshed.owl.carousel": Zi.proxy(function (t) {
					t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
				}, this),
				"changed.owl.carousel": Zi.proxy(function (t) {
					t.namespace && "position" === t.property.name && this._playing && this.stop()
				}, this),
				"prepared.owl.carousel": Zi.proxy(function (t) {
					if (t.namespace) {
						var e = Zi(t.content).find(".owl-video");
						e.length && (e.css("display", "none"), this.fetch(e, Zi(t.content)))
					}
				}, this)
			}, this._core.options = Zi.extend({}, tr.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", Zi.proxy(function (t) {
				this.play(t)
			}, this))
		}).Defaults = {
			video: !1,
			videoHeight: !1,
			videoWidth: !1
		}, tr.prototype.fetch = function (t, e) {
			var n = t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube",
				i = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
				r = t.attr("data-width") || this._core.settings.videoWidth,
				o = t.attr("data-height") || this._core.settings.videoHeight,
				s = t.attr("href");
			if (!s) throw new Error("Missing video URL.");
			if (-1 < (i = s.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu")) n = "youtube";
			else if (-1 < i[3].indexOf("vimeo")) n = "vimeo";
			else {
				if (!(-1 < i[3].indexOf("vzaar"))) throw new Error("Video URL not supported.");
				n = "vzaar"
			}
			i = i[6], this._videos[s] = {
				type: n,
				id: i,
				width: r,
				height: o
			}, e.attr("data-video", s), this.thumbnail(t, this._videos[s])
		}, tr.prototype.thumbnail = function (e, t) {
			var n, i, r = t.width && t.height ? "width:" + t.width + "px;height:" + t.height + "px;" : "",
				o = e.find("img"),
				s = "src",
				a = "",
				c = this._core.settings,
				l = function (t) {
					n = c.lazyLoad ? Zi("<div/>", {
						class: "owl-video-tn " + a,
						srcType: t
					}) : Zi("<div/>", {
						class: "owl-video-tn",
						style: "opacity:1;background-image:url(" + t + ")"
					}), e.after(n), e.after('<div class="owl-video-play-icon"></div>')
				};
			if (e.wrap(Zi("<div/>", {
					class: "owl-video-wrapper",
					style: r
				})), this._core.settings.lazyLoad && (s = "data-src", a = "owl-lazy"), o.length) return l(o.attr(s)), o.remove(), !1;
			"youtube" === t.type ? (i = "//img.youtube.com/vi/" + t.id + "/hqdefault.jpg", l(i)) : "vimeo" === t.type ? Zi.ajax({
				type: "GET",
				url: "//vimeo.com/api/v2/video/" + t.id + ".json",
				jsonp: "callback",
				dataType: "jsonp",
				success: function (t) {
					i = t[0].thumbnail_large, l(i)
				}
			}) : "vzaar" === t.type && Zi.ajax({
				type: "GET",
				url: "//vzaar.com/api/videos/" + t.id + ".json",
				jsonp: "callback",
				dataType: "jsonp",
				success: function (t) {
					i = t.framegrab_url, l(i)
				}
			})
		}, tr.prototype.stop = function () {
			this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
		}, tr.prototype.play = function (t) {
			var e, n = Zi(t.target).closest("." + this._core.settings.itemClass),
				i = this._videos[n.attr("data-video")],
				r = i.width || "100%",
				o = i.height || this._core.$stage.height();
			this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), n = this._core.items(this._core.relative(n.index())), this._core.reset(n.index()), (e = Zi('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>')).attr("height", o), e.attr("width", r), "youtube" === i.type ? e.attr("src", "//www.youtube.com/embed/" + i.id + "?autoplay=1&rel=0&v=" + i.id) : "vimeo" === i.type ? e.attr("src", "//player.vimeo.com/video/" + i.id + "?autoplay=1") : "vzaar" === i.type && e.attr("src", "//view.vzaar.com/" + i.id + "/player?autoplay=true"), Zi(e).wrap('<div class="owl-video-frame" />').insertAfter(n.find(".owl-video")), this._playing = n.addClass("owl-video-playing"))
		}, tr.prototype.isInFullScreen = function () {
			var t = Ji.fullscreenElement || Ji.mozFullScreenElement || Ji.webkitFullscreenElement;
			return t && Zi(t).parent().hasClass("owl-video-frame")
		}, tr.prototype.destroy = function () {
			var t, e;
			for (t in this._core.$element.off("click.owl.video"), this._handlers) this._core.$element.off(t, this._handlers[t]);
			for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
		}, Zi.fn.owlCarousel.Constructor.Plugins.Video = tr, er = window.Zepto || window.jQuery, window, document, (nr = function (t) {
			this.core = t, this.core.options = er.extend({}, nr.Defaults, this.core.options), this.swapping = !0, this.previous = void 0, this.next = void 0, this.handlers = {
				"change.owl.carousel": er.proxy(function (t) {
					t.namespace && "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
				}, this),
				"drag.owl.carousel dragged.owl.carousel translated.owl.carousel": er.proxy(function (t) {
					t.namespace && (this.swapping = "translated" == t.type)
				}, this),
				"translate.owl.carousel": er.proxy(function (t) {
					t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
				}, this)
			}, this.core.$element.on(this.handlers)
		}).Defaults = {
			animateOut: !1,
			animateIn: !1
		}, nr.prototype.swap = function () {
			if (1 === this.core.settings.items && er.support.animation && er.support.transition) {
				this.core.speed(0);
				var t, e = er.proxy(this.clear, this),
					n = this.core.$stage.children().eq(this.previous),
					i = this.core.$stage.children().eq(this.next),
					r = this.core.settings.animateIn,
					o = this.core.settings.animateOut;
				this.core.current() !== this.previous && (o && (t = this.core.coordinates(this.previous) - this.core.coordinates(this.next), n.one(er.support.animation.end, e).css({
					left: t + "px"
				}).addClass("animated owl-animated-out").addClass(o)), r && i.one(er.support.animation.end, e).addClass("animated owl-animated-in").addClass(r))
			}
		}, nr.prototype.clear = function (t) {
			er(t.target).css({
				left: ""
			}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
		}, nr.prototype.destroy = function () {
			var t, e;
			for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
			for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
		}, er.fn.owlCarousel.Constructor.Plugins.Animate = nr, ir = window.Zepto || window.jQuery, rr = window, or = document, (sr = function (t) {
			this._core = t, this._call = null, this._time = 0, this._timeout = 0, this._paused = !0, this._handlers = {
				"changed.owl.carousel": ir.proxy(function (t) {
					t.namespace && "settings" === t.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : t.namespace && "position" === t.property.name && this._paused && (this._time = 0)
				}, this),
				"initialized.owl.carousel": ir.proxy(function (t) {
					t.namespace && this._core.settings.autoplay && this.play()
				}, this),
				"play.owl.autoplay": ir.proxy(function (t, e, n) {
					t.namespace && this.play(e, n)
				}, this),
				"stop.owl.autoplay": ir.proxy(function (t) {
					t.namespace && this.stop()
				}, this),
				"mouseover.owl.autoplay": ir.proxy(function () {
					this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
				}, this),
				"mouseleave.owl.autoplay": ir.proxy(function () {
					this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
				}, this),
				"touchstart.owl.core": ir.proxy(function () {
					this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
				}, this),
				"touchend.owl.core": ir.proxy(function () {
					this._core.settings.autoplayHoverPause && this.play()
				}, this)
			}, this._core.$element.on(this._handlers), this._core.options = ir.extend({}, sr.Defaults, this._core.options)
		}).Defaults = {
			autoplay: !1,
			autoplayTimeout: 8e3,
			autoplayHoverPause: !1,
			autoplaySpeed: !1
		}, sr.prototype._next = function (t) {
			this._call = rr.setTimeout(ir.proxy(this._next, this, t), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()), this._core.is("interacting") || or.hidden || this._core.next(t || this._core.settings.autoplaySpeed)
		}, sr.prototype.read = function () {
			return (new Date).getTime() - this._time
		}, sr.prototype.play = function (t, e) {
			var n;
			this._core.is("rotating") || this._core.enter("rotating"), t = t || this._core.settings.autoplayTimeout, n = Math.min(this._time % (this._timeout || t), t), this._paused ? (this._time = this.read(), this._paused = !1) : rr.clearTimeout(this._call), this._time += this.read() % t - n, this._timeout = t, this._call = rr.setTimeout(ir.proxy(this._next, this, e), t - n)
		}, sr.prototype.stop = function () {
			this._core.is("rotating") && (this._time = 0, this._paused = !0, rr.clearTimeout(this._call), this._core.leave("rotating"))
		}, sr.prototype.pause = function () {
			this._core.is("rotating") && !this._paused && (this._time = this.read(), this._paused = !0, rr.clearTimeout(this._call))
		}, sr.prototype.destroy = function () {
			var t, e;
			for (t in this.stop(), this._handlers) this._core.$element.off(t, this._handlers[t]);
			for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
		}, ir.fn.owlCarousel.Constructor.Plugins.autoplay = sr, ar = window.Zepto || window.jQuery, window, document, (cr = function (t) {
			this._core = t, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
				next: this._core.next,
				prev: this._core.prev,
				to: this._core.to
			}, this._handlers = {
				"prepared.owl.carousel": ar.proxy(function (t) {
					t.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + ar(t.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
				}, this),
				"added.owl.carousel": ar.proxy(function (t) {
					t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop())
				}, this),
				"remove.owl.carousel": ar.proxy(function (t) {
					t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1)
				}, this),
				"changed.owl.carousel": ar.proxy(function (t) {
					t.namespace && "position" == t.property.name && this.draw()
				}, this),
				"initialized.owl.carousel": ar.proxy(function (t) {
					t.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
				}, this),
				"refreshed.owl.carousel": ar.proxy(function (t) {
					t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
				}, this)
			}, this._core.options = ar.extend({}, cr.Defaults, this._core.options), this.$element.on(this._handlers)
		}).Defaults = {
			nav: !1,
			navText: ['<span aria-label="Previous">‹</span>', '<span aria-label="Next">›</span>'],
			navSpeed: !1,
			navElement: 'button type="button" role="presentation"',
			navContainer: !1,
			navContainerClass: "owl-nav",
			navClass: ["owl-prev", "owl-next"],
			slideBy: 1,
			dotClass: "owl-dot",
			dotsClass: "owl-dots",
			dots: !0,
			dotsEach: !1,
			dotsData: !1,
			dotsSpeed: !1,
			dotsContainer: !1
		}, cr.prototype.initialize = function () {
			var t, n = this._core.settings;
			for (t in this._controls.$relative = (n.navContainer ? ar(n.navContainer) : ar("<div>").addClass(n.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = ar("<" + n.navElement + ">").addClass(n.navClass[0]).html(n.navText[0]).prependTo(this._controls.$relative).on("click", ar.proxy(function (t) {
					this.prev(n.navSpeed)
				}, this)), this._controls.$next = ar("<" + n.navElement + ">").addClass(n.navClass[1]).html(n.navText[1]).appendTo(this._controls.$relative).on("click", ar.proxy(function (t) {
					this.next(n.navSpeed)
				}, this)), n.dotsData || (this._templates = [ar('<button role="button">').addClass(n.dotClass).append(ar("<span>")).prop("outerHTML")]), this._controls.$absolute = (n.dotsContainer ? ar(n.dotsContainer) : ar("<div>").addClass(n.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "button", ar.proxy(function (t) {
					var e = ar(t.target).parent().is(this._controls.$absolute) ? ar(t.target).index() : ar(t.target).parent().index();
					t.preventDefault(), this.to(e, n.dotsSpeed)
				}, this)), this._overrides) this._core[t] = ar.proxy(this[t], this)
		}, cr.prototype.destroy = function () {
			var t, e, n, i, r;
			for (t in r = this._core.settings, this._handlers) this.$element.off(t, this._handlers[t]);
			for (e in this._controls) "$relative" === e && r.navContainer ? this._controls[e].html("") : this._controls[e].remove();
			for (i in this.overides) this._core[i] = this._overrides[i];
			for (n in Object.getOwnPropertyNames(this)) "function" != typeof this[n] && (this[n] = null)
		}, cr.prototype.update = function () {
			var t, e, n = this._core.clones().length / 2,
				i = n + this._core.items().length,
				r = this._core.maximum(!0),
				o = this._core.settings,
				s = o.center || o.autoWidth || o.dotsData ? 1 : o.dotsEach || o.items;
			if ("page" !== o.slideBy && (o.slideBy = Math.min(o.slideBy, o.items)), o.dots || "page" == o.slideBy)
				for (this._pages = [], t = n, e = 0; t < i; t++) {
					if (s <= e || 0 === e) {
						if (this._pages.push({
								start: Math.min(r, t - n),
								end: t - n + s - 1
							}), Math.min(r, t - n) === r) break;
						e = 0
					}
					e += this._core.mergers(this._core.relative(t))
				}
		}, cr.prototype.draw = function () {
			var t, e = this._core.settings,
				n = this._core.items().length <= e.items,
				i = this._core.relative(this._core.current()),
				r = e.loop || e.rewind;
			this._controls.$relative.toggleClass("disabled", !e.nav || n), e.nav && (this._controls.$previous.toggleClass("disabled", !r && i <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !r && i >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !e.dots || n), e.dots && (t = this._pages.length - this._controls.$absolute.children().length, e.dotsData && 0 !== t ? this._controls.$absolute.html(this._templates.join("")) : 0 < t ? this._controls.$absolute.append(new Array(t + 1).join(this._templates[0])) : t < 0 && this._controls.$absolute.children().slice(t).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(ar.inArray(this.current(), this._pages)).addClass("active"))
		}, cr.prototype.onTrigger = function (t) {
			var e = this._core.settings;
			t.page = {
				index: ar.inArray(this.current(), this._pages),
				count: this._pages.length,
				size: e && (e.center || e.autoWidth || e.dotsData ? 1 : e.dotsEach || e.items)
			}
		}, cr.prototype.current = function () {
			var n = this._core.relative(this._core.current());
			return ar.grep(this._pages, ar.proxy(function (t, e) {
				return t.start <= n && t.end >= n
			}, this)).pop()
		}, cr.prototype.getPosition = function (t) {
			var e, n, i = this._core.settings;
			return "page" == i.slideBy ? (e = ar.inArray(this.current(), this._pages), n = this._pages.length, t ? ++e : --e, e = this._pages[(e % n + n) % n].start) : (e = this._core.relative(this._core.current()), n = this._core.items().length, t ? e += i.slideBy : e -= i.slideBy), e
		}, cr.prototype.next = function (t) {
			ar.proxy(this._overrides.to, this._core)(this.getPosition(!0), t)
		}, cr.prototype.prev = function (t) {
			ar.proxy(this._overrides.to, this._core)(this.getPosition(!1), t)
		}, cr.prototype.to = function (t, e, n) {
			var i;
			!n && this._pages.length ? (i = this._pages.length, ar.proxy(this._overrides.to, this._core)(this._pages[(t % i + i) % i].start, e)) : ar.proxy(this._overrides.to, this._core)(t, e)
		}, ar.fn.owlCarousel.Constructor.Plugins.Navigation = cr, lr = window.Zepto || window.jQuery, ur = window, document, (dr = function (t) {
			this._core = t, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
				"initialized.owl.carousel": lr.proxy(function (t) {
					t.namespace && "URLHash" === this._core.settings.startPosition && lr(ur).trigger("hashchange.owl.navigation")
				}, this),
				"prepared.owl.carousel": lr.proxy(function (t) {
					if (t.namespace) {
						var e = lr(t.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
						if (!e) return;
						this._hashes[e] = t.content
					}
				}, this),
				"changed.owl.carousel": lr.proxy(function (t) {
					if (t.namespace && "position" === t.property.name) {
						var n = this._core.items(this._core.relative(this._core.current())),
							e = lr.map(this._hashes, function (t, e) {
								return t === n ? e : null
							}).join();
						if (!e || ur.location.hash.slice(1) === e) return;
						ur.location.hash = e
					}
				}, this)
			}, this._core.options = lr.extend({}, dr.Defaults, this._core.options), this.$element.on(this._handlers), lr(ur).on("hashchange.owl.navigation", lr.proxy(function (t) {
				var e = ur.location.hash.substring(1),
					n = this._core.$stage.children(),
					i = this._hashes[e] && n.index(this._hashes[e]);
				void 0 !== i && i !== this._core.current() && this._core.to(this._core.relative(i), !1, !0)
			}, this))
		}).Defaults = {
			URLhashListener: !1
		}, dr.prototype.destroy = function () {
			var t, e;
			for (t in lr(ur).off("hashchange.owl.navigation"), this._handlers) this._core.$element.off(t, this._handlers[t]);
			for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
		}, lr.fn.owlCarousel.Constructor.Plugins.Hash = dr,
		function (r, t, e, o) {
			var s = r("<support>").get(0).style,
				a = "Webkit Moz O ms".split(" "),
				n = {
					transition: {
						end: {
							WebkitTransition: "webkitTransitionEnd",
							MozTransition: "transitionend",
							OTransition: "oTransitionEnd",
							transition: "transitionend"
						}
					},
					animation: {
						end: {
							WebkitAnimation: "webkitAnimationEnd",
							MozAnimation: "animationend",
							OAnimation: "oAnimationEnd",
							animation: "animationend"
						}
					}
				},
				i = function () {
					return !!u("transform")
				},
				c = function () {
					return !!u("perspective")
				},
				l = function () {
					return !!u("animation")
				};

			function u(t, n) {
				var i = !1,
					e = t.charAt(0).toUpperCase() + t.slice(1);
				return r.each((t + " " + a.join(e + " ") + e).split(" "), function (t, e) {
					if (s[e] !== o) return i = !n || e, !1
				}), i
			}

			function d(t) {
				return u(t, !0)
			}(function () {
				return !!u("transition")
			})() && (r.support.transition = new String(d("transition")), r.support.transition.end = n.transition.end[r.support.transition]), l() && (r.support.animation = new String(d("animation")), r.support.animation.end = n.animation.end[r.support.animation]), i() && (r.support.transform = new String(d("transform")), r.support.transform3d = c())
		}(window.Zepto || window.jQuery, window, document);
	var _r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
		return typeof t
	} : function (t) {
		return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
	};
	window.onload = function () {
		var t, n;
		$(function () {
			var t = $("header");
			$(".Section-hero").outerHeight(), $(window).scroll(function () {
				200 <= $(window).scrollTop() ? t.addClass("minimized") : t.removeClass("minimized")
			})
		}), $(".menu-toggle").click(function () {
			$(".nav").toggleClass("open")
		}), $(".menu a").click(function () {
			$(".nav.open").removeClass("open")
		}), $(function () {
			var t = $("footer"),
				e = $("main");
			$(window).scroll(function () {
				768 <= $(window).width() ? e.css("margin-bottom", t.outerHeight()) : e.css("margin-bottom", 0)
			})
		}), t = document.querySelectorAll(".ugb-video-popup"), n = function (t) {
			if (hr) {
				var e = t.getAttribute("data-video"),
					n = {
						el: t,
						noLoader: !0
					};
				e.match(/^\d+$/g) ? n.vimeoSrc = e : e.match(/^https?:\/\//g) ? n.vidSrc = e : n.ytSrc = e, hr(n)
			}
		}, t.forEach(function (e) {
			var t = e.querySelector("a");
			t.addEventListener("click", function (t) {
				t.preventDefault(), n(e)
			}), t.addEventListener("touchend", function (t) {
				t.preventDefault(), n(e)
			})
		}), $(".more-link").click(function (t) {
			var e = 10;
			t.preventDefault();
			var n = !1,
				i = $(this).closest(".sgc-feature-card");
			i.hasClass("show-more") && (n = !0), $(".sgc-feature-cards").hasClass("showing") ? ($(".sgc-feature-card.show-more").removeClass("show-more"), n ? $(".sgc-feature-cards").removeClass("showing") : i.css({
				zIndex: e
			}).addClass("show-more")) : ($(".sgc-feature-cards").addClass("showing"), i.css({
				zIndex: e
			}).addClass("show-more")), e++
		}), $(document).ready(function () {
			$(".tabs").bind("click", function () {
				$(".tab-container .table-content").hide(), $("#" + $(this).attr("id") + "-content").css("display", "grid"), $(".tabs").removeClass("tabs-selected"), $(this).addClass("tabs-selected")
			})
		}), $(".js-anchor-link").click(function (t) {
			t.preventDefault();
			var e = $($(this).attr("href"));
			if (e.length) {
				var n = e.offset().top;
				$("body, html").animate({
					scrollTop: n + "px"
				}, 200)
			}
		}), $(".js-anchor-link-top").click(function (t) {
			t.preventDefault(), $("html, body").animate({
				scrollTop: 0
			})
		}), fr.init({
			once: !0,
			offset: 100,
			duration: 400,
			easing: "ease-in-sine"
		}), window.addEventListener("load", fr.refresh), e(), $(".full-page-carousel").length && ($(".full-page-carousel").owlCarousel({
			loop: !0,
			nav: !0,
			lazyLoad: !0,
			navText: ["<i class='material-icons'>chevron_left</i>", "<i class='material-icons'>chevron_right</i>"],
			autoplay: !0,
			autoplayHoverPause: !0,
			items: 1
		}), $(".full-page-carousel").on("translate.owl.carousel", function (t) {
			$(".owl-item .item-videoslide video").each(function () {
				$(this).get(0).pause()
			})
		}), $(".full-page-carousel").on("translated.owl.carousel", function (t) {
			$(".owl-item.active .item-videoslide video").length && ($(".owl-item.active .item-videoslide video").get(0).play(), $(".full-page-carousel").trigger("stop.owl.autoplay"), $(".owl-item.active .item-videoslide video").get(0).onended = function () {
				$(".full-page-carousel").trigger("play.owl.autoplay")
			})
		}), $(".owl-item .item-videoslide").each(function () {
			var t = $(this).attr("data-videosrc");
			if ("undefined" !== (void 0 === t ? "undefined" : _r(t)) && !1 !== t) {
				var e = $(this).attr("data-videosrc");
				$(this).prepend('<video muted><source src="' + e + '" type="video/mp4"></video>')
			}
		}), $(".owl-item.active video").attr("autoplay", !0).attr("loop", !0))
	}
}();

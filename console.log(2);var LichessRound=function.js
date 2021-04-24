var LichessRound = (function (e) {
  'use strict';
  const t = {
    createElement: function (e, t) {
      return document.createElement(e, t);
    },
    createElementNS: function (e, t, o) {
      return document.createElementNS(e, t, o);
    },
    createTextNode: function (e) {
      return document.createTextNode(e);
    },
    createComment: function (e) {
      return document.createComment(e);
    },
    insertBefore: function (e, t, o) {
      e.insertBefore(t, o);
    },
    removeChild: function (e, t) {
      e.removeChild(t);
    },
    appendChild: function (e, t) {
      e.appendChild(t);
    },
    parentNode: function (e) {
      return e.parentNode;
    },
    nextSibling: function (e) {
      return e.nextSibling;
    },
    tagName: function (e) {
      return e.tagName;
    },
    setTextContent: function (e, t) {
      e.textContent = t;
    },
    getTextContent: function (e) {
      return e.textContent;
    },
    isElement: function (e) {
      return 1 === e.nodeType;
    },
    isText: function (e) {
      return 3 === e.nodeType;
    },
    isComment: function (e) {
      return 8 === e.nodeType;
    },
  };

  function o(e, t, o, n, s) {
    return {
      sel: e,
      data: t,
      children: o,
      text: n,
      elm: s,
      key: void 0 === t ? void 0 : t.key,
    };
  }
  const n = Array.isArray;

  function s(e) {
    return 'string' == typeof e || 'number' == typeof e;
  }

  function r(e) {
    return void 0 === e;
  }

  function i(e) {
    return void 0 !== e;
  }
  const a = o('', {}, [], void 0, void 0);

  function c(e, t) {
    var o, n;
    const s = e.key === t.key,
      r =
        (null === (o = e.data) || void 0 === o ? void 0 : o.is) ===
        (null === (n = t.data) || void 0 === n ? void 0 : n.is);
    return e.sel === t.sel && s && r;
  }

  function l(e, t, o) {
    var n;
    const s = {};
    for (let r = t; r <= o; ++r) {
      const t = null === (n = e[r]) || void 0 === n ? void 0 : n.key;
      void 0 !== t && (s[t] = r);
    }
    return s;
  }
  const d = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];

  function u(e, u) {
    let p, h;
    const m = {
        create: [],
        update: [],
        remove: [],
        destroy: [],
        pre: [],
        post: [],
      },
      f = void 0 !== u ? u : t;
    for (p = 0; p < d.length; ++p)
      for (m[d[p]] = [], h = 0; h < e.length; ++h) {
        const t = e[h][d[p]];
        void 0 !== t && m[d[p]].push(t);
      }

    function g(e) {
      const t = e.id ? '#' + e.id : '',
        n = e.className ? '.' + e.className.split(' ').join('.') : '';
      return o(f.tagName(e).toLowerCase() + t + n, {}, [], void 0, e);
    }

    function v(e, t) {
      return function () {
        if (0 == --t) {
          const t = f.parentNode(e);
          f.removeChild(t, e);
        }
      };
    }

    function b(e, t) {
      var o, c;
      let l,
        d = e.data;
      if (void 0 !== d) {
        const t = null === (o = d.hook) || void 0 === o ? void 0 : o.init;
        i(t) && (t(e), (d = e.data));
      }
      const u = e.children,
        p = e.sel;
      if ('!' === p)
        r(e.text) && (e.text = ''), (e.elm = f.createComment(e.text));
      else if (void 0 !== p) {
        const o = p.indexOf('#'),
          r = p.indexOf('.', o),
          h = o > 0 ? o : p.length,
          g = r > 0 ? r : p.length,
          v = -1 !== o || -1 !== r ? p.slice(0, Math.min(h, g)) : p,
          y = (e.elm =
            i(d) && i((l = d.ns))
              ? f.createElementNS(l, v, d)
              : f.createElement(v, d));
        for (
          h < g && y.setAttribute('id', p.slice(h + 1, g)),
            r > 0 &&
              y.setAttribute('class', p.slice(g + 1).replace(/\./g, ' ')),
            l = 0;
          l < m.create.length;
          ++l
        )
          m.create[l](a, e);
        if (n(u))
          for (l = 0; l < u.length; ++l) {
            const e = u[l];
            null != e && f.appendChild(y, b(e, t));
          }
        else s(e.text) && f.appendChild(y, f.createTextNode(e.text));
        const w = e.data.hook;
        i(w) &&
          (null === (c = w.create) || void 0 === c || c.call(w, a, e),
          w.insert && t.push(e));
      } else e.elm = f.createTextNode(e.text);
      return e.elm;
    }

    function y(e, t, o, n, s, r) {
      for (; n <= s; ++n) {
        const s = o[n];
        null != s && f.insertBefore(e, b(s, r), t);
      }
    }

    function w(e) {
      var t, o;
      const n = e.data;
      if (void 0 !== n) {
        null ===
          (o =
            null === (t = null == n ? void 0 : n.hook) || void 0 === t
              ? void 0
              : t.destroy) ||
          void 0 === o ||
          o.call(t, e);
        for (let t = 0; t < m.destroy.length; ++t) m.destroy[t](e);
        if (void 0 !== e.children)
          for (let t = 0; t < e.children.length; ++t) {
            const o = e.children[t];
            null != o && 'string' != typeof o && w(o);
          }
      }
    }

    function k(e, t, o, n) {
      for (var s, r; o <= n; ++o) {
        let n, a;
        const c = t[o];
        if (null != c)
          if (i(c.sel)) {
            w(c), (n = m.remove.length + 1), (a = v(c.elm, n));
            for (let e = 0; e < m.remove.length; ++e) m.remove[e](c, a);
            const e =
              null ===
                (r =
                  null === (s = null == c ? void 0 : c.data) || void 0 === s
                    ? void 0
                    : s.hook) || void 0 === r
                ? void 0
                : r.remove;
            i(e) ? e(c, a) : a();
          } else f.removeChild(e, c.elm);
      }
    }

    function P(e, t, o) {
      var n, s, a, d, u;
      const p = null === (n = t.data) || void 0 === n ? void 0 : n.hook;
      null === (s = null == p ? void 0 : p.prepatch) ||
        void 0 === s ||
        s.call(p, e, t);
      const h = (t.elm = e.elm),
        g = e.children,
        v = t.children;
      if (e !== t) {
        if (void 0 !== t.data) {
          for (let o = 0; o < m.update.length; ++o) m.update[o](e, t);
          null ===
            (d =
              null === (a = t.data.hook) || void 0 === a ? void 0 : a.update) ||
            void 0 === d ||
            d.call(a, e, t);
        }
        r(t.text)
          ? i(g) && i(v)
            ? g !== v &&
              (function (e, t, o, n) {
                let s,
                  i,
                  a,
                  d,
                  u = 0,
                  p = 0,
                  h = t.length - 1,
                  m = t[0],
                  g = t[h],
                  v = o.length - 1,
                  w = o[0],
                  M = o[v];
                for (; u <= h && p <= v; )
                  null == m
                    ? (m = t[++u])
                    : null == g
                    ? (g = t[--h])
                    : null == w
                    ? (w = o[++p])
                    : null == M
                    ? (M = o[--v])
                    : c(m, w)
                    ? (P(m, w, n), (m = t[++u]), (w = o[++p]))
                    : c(g, M)
                    ? (P(g, M, n), (g = t[--h]), (M = o[--v]))
                    : c(m, M)
                    ? (P(m, M, n),
                      f.insertBefore(e, m.elm, f.nextSibling(g.elm)),
                      (m = t[++u]),
                      (M = o[--v]))
                    : c(g, w)
                    ? (P(g, w, n),
                      f.insertBefore(e, g.elm, m.elm),
                      (g = t[--h]),
                      (w = o[++p]))
                    : (void 0 === s && (s = l(t, u, h)),
                      (i = s[w.key]),
                      r(i)
                        ? f.insertBefore(e, b(w, n), m.elm)
                        : ((a = t[i]),
                          a.sel !== w.sel
                            ? f.insertBefore(e, b(w, n), m.elm)
                            : (P(a, w, n),
                              (t[i] = void 0),
                              f.insertBefore(e, a.elm, m.elm))),
                      (w = o[++p]));
                (u <= h || p <= v) &&
                  (u > h
                    ? ((d = null == o[v + 1] ? null : o[v + 1].elm),
                      y(e, d, o, p, v, n))
                    : k(e, t, u, h));
              })(h, g, v, o)
            : i(v)
            ? (i(e.text) && f.setTextContent(h, ''),
              y(h, null, v, 0, v.length - 1, o))
            : i(g)
            ? k(h, g, 0, g.length - 1)
            : i(e.text) && f.setTextContent(h, '')
          : e.text !== t.text &&
            (i(g) && k(h, g, 0, g.length - 1), f.setTextContent(h, t.text)),
          null === (u = null == p ? void 0 : p.postpatch) ||
            void 0 === u ||
            u.call(p, e, t);
      }
    }
    return function (e, t) {
      let o, n, s;
      const r = [];
      for (o = 0; o < m.pre.length; ++o) m.pre[o]();
      for (
        (function (e) {
          return void 0 !== e.sel;
        })(e) || (e = g(e)),
          c(e, t)
            ? P(e, t, r)
            : ((n = e.elm),
              (s = f.parentNode(n)),
              b(t, r),
              null !== s &&
                (f.insertBefore(s, t.elm, f.nextSibling(n)), k(s, [e], 0, 0))),
          o = 0;
        o < r.length;
        ++o
      )
        r[o].data.hook.insert(r[o]);
      for (o = 0; o < m.post.length; ++o) m.post[o]();
      return t;
    };
  }

  function p(e, t, o) {
    if (
      ((e.ns = 'http://www.w3.org/2000/svg'),
      'foreignObject' !== o && void 0 !== t)
    )
      for (let e = 0; e < t.length; ++e) {
        const o = t[e].data;
        void 0 !== o && p(o, t[e].children, t[e].sel);
      }
  }

  function h(e, t, r) {
    let i,
      a,
      c,
      l = {};
    if (
      (void 0 !== r
        ? (null !== t && (l = t),
          n(r) ? (i = r) : s(r) ? (a = r) : r && r.sel && (i = [r]))
        : null != t &&
          (n(t) ? (i = t) : s(t) ? (a = t) : t && t.sel ? (i = [t]) : (l = t)),
      void 0 !== i)
    )
      for (c = 0; c < i.length; ++c)
        s(i[c]) && (i[c] = o(void 0, void 0, void 0, i[c], void 0));
    return (
      's' !== e[0] ||
        'v' !== e[1] ||
        'g' !== e[2] ||
        (3 !== e.length && '.' !== e[3] && '#' !== e[3]) ||
        p(l, i, e),
      o(e, l, i, a, void 0)
    );
  }

  function m(e, t) {
    (e.data.fn = t.data.fn),
      (e.data.args = t.data.args),
      (t.data = e.data),
      (t.children = e.children),
      (t.text = e.text),
      (t.elm = e.elm);
  }

  function f(e) {
    const t = e.data;
    m(t.fn(...t.args), e);
  }

  function g(e, t) {
    let o;
    const n = e.data,
      s = t.data,
      r = n.args,
      i = s.args;
    if (n.fn === s.fn && r.length === i.length) {
      for (o = 0; o < i.length; ++o)
        if (r[o] !== i[o]) return void m(s.fn(...i), t);
      m(e, t);
    } else m(s.fn(...i), t);
  }

  function v(e, t) {
    const o = e.data.attachData;
    (t.data.attachData.placeholder = o.placeholder),
      (t.data.attachData.real = o.real),
      (e.elm = e.data.attachData.real);
  }

  function b(e, t) {
    t.elm = t.data.attachData.placeholder;
  }

  function y(e) {
    void 0 !== e.elm && e.elm.parentNode.removeChild(e.elm),
      (e.elm = e.data.attachData.real);
  }

  function w(e, t) {
    const o = t.elm,
      n = t.data.attachData,
      s = document.createElement('span');
    (t.elm = s), n.target.appendChild(o), (n.real = o), (n.placeholder = s);
  }

  function k(e, t) {
    let o;
    const n = t.elm;
    let s = e.data.attrs,
      r = t.data.attrs;
    if ((s || r) && s !== r) {
      for (o in ((s = s || {}), (r = r || {}), r)) {
        const e = r[o];
        s[o] !== e &&
          (!0 === e
            ? n.setAttribute(o, '')
            : !1 === e
            ? n.removeAttribute(o)
            : 120 !== o.charCodeAt(0)
            ? n.setAttribute(o, e)
            : 58 === o.charCodeAt(3)
            ? n.setAttributeNS('http://www.w3.org/XML/1998/namespace', o, e)
            : 58 === o.charCodeAt(5)
            ? n.setAttributeNS('http://www.w3.org/1999/xlink', o, e)
            : n.setAttribute(o, e));
      }
      for (o in s) o in r || n.removeAttribute(o);
    }
  }
  const P = {
    create: k,
    update: k,
  };

  function M(e, t) {
    let o, n;
    const s = t.elm;
    let r = e.data.class,
      i = t.data.class;
    if ((r || i) && r !== i) {
      for (n in ((r = r || {}), (i = i || {}), r))
        r[n] &&
          !Object.prototype.hasOwnProperty.call(i, n) &&
          s.classList.remove(n);
      for (n in i)
        (o = i[n]), o !== r[n] && s.classList[o ? 'add' : 'remove'](n);
    }
  }
  const C = {
      create: M,
      update: M,
    },
    T = /[A-Z]/g;

  function x(e, t) {
    const o = t.elm;
    let n,
      s = e.data.dataset,
      r = t.data.dataset;
    if (!s && !r) return;
    if (s === r) return;
    (s = s || {}), (r = r || {});
    const i = o.dataset;
    for (n in s)
      r[n] ||
        (i
          ? n in i && delete i[n]
          : o.removeAttribute('data-' + n.replace(T, '-$&').toLowerCase()));
    for (n in r)
      s[n] !== r[n] &&
        (i
          ? (i[n] = r[n])
          : o.setAttribute('data-' + n.replace(T, '-$&').toLowerCase(), r[n]));
  }
  const S = {
    create: x,
    update: x,
  };

  function O(e, t, o) {
    if ('function' == typeof e) e.call(t, o, t);
    else if ('object' == typeof e)
      for (let n = 0; n < e.length; n++) O(e[n], t, o);
  }

  function _(e, t) {
    const o = e.type,
      n = t.data.on;
    n && n[o] && O(n[o], t, e);
  }

  function A(e, t) {
    const o = e.data.on,
      n = e.listener,
      s = e.elm,
      r = t && t.data.on,
      i = t && t.elm;
    let a;
    if (o !== r) {
      if (o && n)
        if (r) for (a in o) r[a] || s.removeEventListener(a, n, !1);
        else for (a in o) s.removeEventListener(a, n, !1);
      if (r) {
        const n = (t.listener =
          e.listener ||
          function e(t) {
            _(t, e.vnode);
          });
        if (((n.vnode = t), o))
          for (a in r) o[a] || i.addEventListener(a, n, !1);
        else for (a in r) i.addEventListener(a, n, !1);
      }
    }
  }
  const j = {
      create: A,
      update: A,
      destroy: A,
    },
    L =
      ('undefined' != typeof window && window.requestAnimationFrame) ||
      setTimeout;

  function D(e, t, o) {
    var n;
    (n = function () {
      e[t] = o;
    }),
      L(function () {
        L(n);
      });
  }

  function E(e) {
    let t;
    if (document.createRange) {
      const o = document.createRange();
      o.selectNodeContents(e),
        o.getBoundingClientRect && (t = o.getBoundingClientRect());
    }
    return t;
  }

  function N(e, t, o) {
    if (e && t) {
      return `${t.left + t.width / 2 - o.left}px ${
        t.top + t.height / 2 - o.top
      }px`;
    }
    return '0 0';
  }

  function R(e, t) {
    return e && t ? e.left + e.width / 2 - (t.left + t.width / 2) : 0;
  }

  function B(e, t) {
    return e && t ? e.top + e.height / 2 - (t.top + t.height / 2) : 0;
  }

  function I(e) {
    return 1 === e.childNodes.length && 3 === e.childNodes[0].nodeType;
  }
  let q, F;
  const G = {
    pre: function () {
      (q = {}), (F = []);
    },
    create: function (e, t) {
      const o = t.data.hero;
      o && o.id && (F.push(o.id), F.push(t));
    },
    destroy: function (e) {
      const t = e.data.hero;
      if (t && t.id) {
        const o = e.elm;
        (e.isTextNode = I(o)),
          (e.boundingRect = o.getBoundingClientRect()),
          (e.textRect = e.isTextNode ? E(o.childNodes[0]) : null);
        const n = window.getComputedStyle(o, void 0);
        (e.savedStyle = JSON.parse(JSON.stringify(n))), (q[t.id] = e);
      }
    },
    post: function () {
      let e, t, o, n, s, r, i, a, c, l, d, u, p, h, m, f, g, v, b;
      for (e = 0; e < F.length; e += 2)
        if (((t = F[e]), (o = F[e + 1].elm), (n = q[t]), n)) {
          (g = n.isTextNode && I(o)),
            (h = o.style),
            (f = window.getComputedStyle(o, void 0)),
            (s = n.elm),
            (m = s.style),
            (c = o.getBoundingClientRect()),
            (a = n.boundingRect),
            g
              ? ((v = E(o.childNodes[0])),
                (b = n.textRect),
                (l = R(b, v)),
                (d = B(b, v)))
              : ((l = a.left - c.left), (d = a.top - c.top)),
            (r = c.height / Math.max(a.height, 1)),
            (i = g ? r : c.width / Math.max(a.width, 1)),
            (u = h.transform),
            (p = h.transition),
            'inline' === f.display && (h.display = 'inline-block'),
            (h.transition = p + 'transform 0s'),
            (h.transformOrigin = N(g, v, c)),
            (h.opacity = '0'),
            (h.transform = `${u}translate(${l}px, ${d}px) scale(${1 / i}, ${
              1 / r
            })`),
            D(h, 'transition', p),
            D(h, 'transform', u),
            D(h, 'opacity', '1');
          for (const e in n.savedStyle)
            if (String(parseInt(e)) !== e) {
              const t = 'ms' === e.substring(0, 2),
                o = 'moz' === e.substring(0, 3),
                s = 'webkit' === e.substring(0, 6);
              t || o || s || (m[e] = n.savedStyle[e]);
            }
          (m.position = 'absolute'),
            (m.top = `${a.top}px`),
            (m.left = `${a.left}px`),
            (m.width = `${a.width}px`),
            (m.height = `${a.height}px`),
            (m.margin = '0'),
            (m.transformOrigin = N(g, b, a)),
            (m.transform = ''),
            (m.opacity = '1'),
            document.body.appendChild(s),
            D(m, 'transform', `translate(${-l}px, ${-d}px) scale(${i}, ${r})`),
            D(m, 'opacity', '0'),
            s.addEventListener('transitionend', function (e) {
              'transform' === e.propertyName &&
                document.body.removeChild(e.target);
            });
        }
      q = F = void 0;
    },
  };

  function z(e, t) {
    let o, n, s;
    const r = t.elm;
    let i = e.data.props,
      a = t.data.props;
    if ((i || a) && i !== a)
      for (o in ((i = i || {}), (a = a || {}), a))
        (n = a[o]),
          (s = i[o]),
          s === n || ('value' === o && r[o] === n) || (r[o] = n);
  }
  const K = {
      create: z,
      update: z,
    },
    H =
      ('undefined' != typeof window &&
        window.requestAnimationFrame.bind(window)) ||
      setTimeout;
  let V = !1;

  function U(e, t, o) {
    var n;
    (n = function () {
      e[t] = o;
    }),
      H(function () {
        H(n);
      });
  }

  function W(e, t) {
    let o, n;
    const s = t.elm;
    let r = e.data.style,
      i = t.data.style;
    if (!r && !i) return;
    if (r === i) return;
    (r = r || {}), (i = i || {});
    const a = 'delayed' in r;
    for (n in r)
      i[n] ||
        ('-' === n[0] && '-' === n[1]
          ? s.style.removeProperty(n)
          : (s.style[n] = ''));
    for (n in i)
      if (((o = i[n]), 'delayed' === n && i.delayed))
        for (const e in i.delayed)
          (o = i.delayed[e]), (a && o === r.delayed[e]) || U(s.style, e, o);
      else
        'remove' !== n &&
          o !== r[n] &&
          ('-' === n[0] && '-' === n[1]
            ? s.style.setProperty(n, o)
            : (s.style[n] = o));
  }
  const Y = {
    pre: function () {
      V = !1;
    },
    create: W,
    update: W,
    destroy: function (e) {
      let t, o;
      const n = e.elm,
        s = e.data.style;
      if (s && (t = s.destroy)) for (o in t) n.style[o] = t[o];
    },
    remove: function (e, t) {
      const o = e.data.style;
      if (!o || !o.remove) return void t();
      let n;
      V || (e.elm.offsetLeft, (V = !0));
      const s = e.elm;
      let r = 0;
      const i = o.remove;
      let a = 0;
      const c = [];
      for (n in i) c.push(n), (s.style[n] = i[n]);
      const l = getComputedStyle(s)['transition-property'].split(', ');
      for (; r < l.length; ++r) -1 !== c.indexOf(l[r]) && a++;
      s.addEventListener('transitionend', function (e) {
        e.target === s && --a, 0 === a && t();
      });
    },
  };

  function X(e, t) {
    for (const n of e)
      null != n &&
        !1 !== n &&
        '' !== n &&
        (Array.isArray(n)
          ? X(n, t)
          : 'string' == typeof n ||
            'number' == typeof n ||
            'boolean' == typeof n
          ? t.push(o(void 0, void 0, void 0, String(n), void 0))
          : t.push(n));
    return t;
  }

  function J(e, t, ...o) {
    const n = X(o, []);
    return 'function' == typeof e
      ? e(t, n)
      : 1 === n.length && !n[0].sel && n[0].text
      ? h(e, t, n[0].text)
      : h(e, t, n);
  }
  J || (J = {});
  var Z = Object.freeze({
      __proto__: null,
      htmlDomApi: t,
      init: u,
      thunk: function (e, t, o, n) {
        return (
          void 0 === n && ((n = o), (o = t), (t = void 0)),
          h(e, {
            key: t,
            hook: {
              init: f,
              prepatch: g,
            },
            fn: o,
            args: n,
          })
        );
      },
      vnode: o,
      attachTo: function (e, t) {
        void 0 === t.data && (t.data = {}),
          void 0 === t.data.hook && (t.data.hook = {});
        const o = t.data,
          n = t.data.hook;
        return (
          (o.attachData = {
            target: e,
            placeholder: void 0,
            real: void 0,
          }),
          (n.create = w),
          (n.prepatch = v),
          (n.postpatch = b),
          (n.destroy = y),
          t
        );
      },
      array: n,
      primitive: s,
      toVNode: function e(n, s) {
        const r = void 0 !== s ? s : t;
        let i;
        if (r.isElement(n)) {
          const t = n.id ? '#' + n.id : '',
            i = n.getAttribute('class'),
            a = i ? '.' + i.split(' ').join('.') : '',
            c = r.tagName(n).toLowerCase() + t + a,
            l = {},
            d = [];
          let u, p, h;
          const m = n.attributes,
            f = n.childNodes;
          for (p = 0, h = m.length; p < h; p++)
            (u = m[p].nodeName),
              'id' !== u && 'class' !== u && (l[u] = m[p].nodeValue);
          for (p = 0, h = f.length; p < h; p++) d.push(e(f[p], s));
          return o(
            c,
            {
              attrs: l,
            },
            d,
            void 0,
            n
          );
        }
        return r.isText(n)
          ? ((i = r.getTextContent(n)), o(void 0, void 0, void 0, i, n))
          : r.isComment(n)
          ? ((i = r.getTextContent(n)), o('!', {}, [], i, n))
          : o('', {}, [], void 0, n);
      },
      h: h,
      attributesModule: P,
      classModule: C,
      datasetModule: S,
      eventListenersModule: j,
      heroModule: G,
      propsModule: K,
      styleModule: Y,
      get jsx() {
        return J;
      },
    }),
    Q =
      'undefined' != typeof globalThis
        ? globalThis
        : 'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : {};

  function ee(e) {
    return e &&
      e.__esModule &&
      Object.prototype.hasOwnProperty.call(e, 'default')
      ? e.default
      : e;
  }

  function te(e, t, o) {
    return (
      e(
        (o = {
          path: t,
          exports: {},
          require: function (e, t) {
            return (function () {
              throw new Error(
                'Dynamic requires are not currently supported by @rollup/plugin-commonjs'
              );
            })(null == t && o.path);
          },
        }),
        o.exports
      ),
      o.exports
    );
  }

  function oe(e) {
    if (e.__esModule) return e;
    var t = Object.defineProperty({}, '__esModule', {
      value: !0,
    });
    return (
      Object.keys(e).forEach(function (o) {
        var n = Object.getOwnPropertyDescriptor(e, o);
        Object.defineProperty(
          t,
          o,
          n.get
            ? n
            : {
                enumerable: !0,
                get: function () {
                  return e[o];
                },
              }
        );
      }),
      t
    );
  }
  var ne = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.prop = t.notEmpty = t.isEmpty = t.notNull = t.defined = void 0);
      t.defined = (e) => void 0 !== e;
      t.notNull = (e) => null != e;
      t.isEmpty = (e) => !e || 0 === e.length;
      t.notEmpty = (e) => !t.isEmpty(e);
      t.prop = (e) => {
        let o = e;
        return function (e) {
          return t.defined(e) && (o = e), o;
        };
      };
    }),
    se = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.formToXhr = t.url = t.form = t.script = t.textRaw = t.text = t.json = t.xhrHeader = t.defaultInit = void 0);
      const o = {
        Accept: 'application/vnd.lichess.v5+json',
      };
      (t.defaultInit = {
        cache: 'no-cache',
        credentials: 'same-origin',
      }),
        (t.xhrHeader = {
          'X-Requested-With': 'XMLHttpRequest',
        });
      t.json = (e, n = {}) =>
        fetch(
          e,
          Object.assign(
            Object.assign(Object.assign({}, t.defaultInit), {
              headers: Object.assign(Object.assign({}, o), t.xhrHeader),
            }),
            n
          )
        ).then((e) => {
          if (e.ok) return e.json();
          throw e.statusText;
        });
      t.text = (e, o = {}) =>
        t.textRaw(e, o).then((e) => {
          if (e.ok) return e.text();
          throw e.statusText;
        });
      t.textRaw = (e, o = {}) =>
        fetch(
          e,
          Object.assign(
            Object.assign(Object.assign({}, t.defaultInit), {
              headers: Object.assign({}, t.xhrHeader),
            }),
            o
          )
        );
      t.script = (e) =>
        new Promise((t, o) => {
          const n = document.body.getAttribute('data-nonce'),
            s = document.createElement('script');
          n && s.setAttribute('nonce', n),
            (s.onload = t),
            (s.onerror = o),
            (s.src = e),
            document.head.append(s);
        });
      t.form = (e) => {
        const t = new FormData();
        for (const o of Object.keys(e)) t.append(o, e[o]);
        return t;
      };
      t.url = (e, t) => {
        const o = new URLSearchParams();
        for (const e of Object.keys(t)) ne.defined(t[e]) && o.append(e, t[e]);
        const n = o.toString();
        return n ? `${e}?${n}` : e;
      };
      t.formToXhr = (e) => {
        const o = e.getAttribute('action');
        return o
          ? t.text(o, {
              method: e.method,
              body: new FormData(e),
            })
          : Promise.reject(`Form has no action: ${e}`);
      };
    }),
    re = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.ranks = t.files = t.colors = void 0),
        (t.colors = ['white', 'black']),
        (t.files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']),
        (t.ranks = ['1', '2', '3', '4', '5', '6', '7', '8']);
    }),
    ie = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.computeSquareCenter = t.createEl = t.isRightButton = t.eventPosition = t.setVisible = t.translateRel = t.translateAbs = t.posToTranslateRel = t.posToTranslateAbs = t.samePiece = t.distanceSq = t.opposite = t.timer = t.memo = t.allPos = t.key2pos = t.pos2key = t.allKeys = t.invRanks = void 0),
        (t.invRanks = [...re.ranks].reverse()),
        (t.allKeys = Array.prototype.concat(
          ...re.files.map((e) => re.ranks.map((t) => e + t))
        ));
      t.pos2key = (e) => t.allKeys[8 * e[0] + e[1]];
      (t.key2pos = (e) => [e.charCodeAt(0) - 97, e.charCodeAt(1) - 49]),
        (t.allPos = t.allKeys.map(t.key2pos)),
        (t.memo = function (e) {
          let t;
          const o = () => (void 0 === t && (t = e()), t);
          return (
            (o.clear = () => {
              t = void 0;
            }),
            o
          );
        });
      t.timer = () => {
        let e;
        return {
          start() {
            e = performance.now();
          },
          cancel() {
            e = void 0;
          },
          stop() {
            if (!e) return 0;
            const t = performance.now() - e;
            return (e = void 0), t;
          },
        };
      };
      t.opposite = (e) => ('white' === e ? 'black' : 'white');
      t.distanceSq = (e, t) => {
        const o = e[0] - t[0],
          n = e[1] - t[1];
        return o * o + n * n;
      };
      t.samePiece = (e, t) => e.role === t.role && e.color === t.color;
      const o = (e, t, o, n) => [
        (t ? e[0] : 7 - e[0]) * o,
        (t ? 7 - e[1] : e[1]) * n,
      ];
      t.posToTranslateAbs = (e) => {
        const t = e.width / 8,
          n = e.height / 8;
        return (e, s) => o(e, s, t, n);
      };
      t.posToTranslateRel = (e, t) => o(e, t, 100, 100);
      t.translateAbs = (e, t) => {
        e.style.transform = `translate(${t[0]}px,${t[1]}px)`;
      };
      t.translateRel = (e, t) => {
        e.style.transform = `translate(${t[0]}%,${t[1]}%)`;
      };
      t.setVisible = (e, t) => {
        e.style.visibility = t ? 'visible' : 'hidden';
      };
      t.eventPosition = (e) => {
        var t;
        return e.clientX || 0 === e.clientX
          ? [e.clientX, e.clientY]
          : (null === (t = e.targetTouches) || void 0 === t ? void 0 : t[0])
          ? [e.targetTouches[0].clientX, e.targetTouches[0].clientY]
          : void 0;
      };
      t.isRightButton = (e) => 2 === e.buttons || 2 === e.button;
      (t.createEl = (e, t) => {
        const o = document.createElement(e);
        return t && (o.className = t), o;
      }),
        (t.computeSquareCenter = function (e, o, n) {
          const s = t.key2pos(e);
          return (
            o || ((s[0] = 7 - s[0]), (s[1] = 7 - s[1])),
            [
              n.left + (n.width * s[0]) / 8 + n.width / 16,
              n.top + (n.height * (7 - s[1])) / 8 + n.height / 16,
            ]
          );
        });
    });
  const ae = {
      pawn: 1,
      knight: 3,
      bishop: 3,
      rook: 5,
      queen: 9,
      king: 0,
    },
    ce = (e) => ({
      attrs: {
        'data-icon': e,
      },
    }),
    le = (e) => {
      if (e)
        return '@' === e[1] ? [e.slice(2, 4)] : [e.slice(0, 2), e.slice(2, 4)];
    },
    de = (e) => ({
      insert(t) {
        e(t.elm);
      },
    }),
    ue = (e, t, o, n = !0) =>
      de((s) => {
        s.addEventListener(
          e,
          (e) => {
            t(e), o && o();
          },
          {
            passive: n,
          }
        );
      });

  function pe(e) {
    const t = new Map();
    if (!e) return t;
    if ('string' == typeof e)
      for (const o of e.split(' '))
        t.set(o.slice(0, 2), o.slice(2).match(/.{2}/g));
    else for (const o in e) t.set(o, e[o].match(/.{2}/g));
    return t;
  }
  const he = {
    white: 0,
    black: 0,
  };
  var me = oe(Z),
    fe = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.bind = t.userLink = void 0),
        (t.userLink = function (e, t) {
          const o = e.substring(0, 14);
          return me.h(
            'a',
            {
              class: {
                'user-link': !0,
                ulpt: !0,
              },
              attrs: {
                href: '/@/' + e,
              },
            },
            t && 'BOT' != t ? [me.h('span.utitle', t), o] : [o]
          );
        }),
        (t.bind = function (e, t) {
          return {
            insert(o) {
              o.elm.addEventListener(e, t);
            },
          };
        });
    }),
    ge = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.presetView = t.presetCtrl = void 0);
      const o = {
        start: ['hi/Hello', 'gl/Good luck', 'hf/Have fun!', 'u2/You too!'].map(
          n
        ),
        end: [
          'gg/Good game',
          'wp/Well played',
          'ty/Thank you',
          "gtg/I've got to go",
          'bye/Bye!',
        ].map(n),
      };

      function n(e) {
        const t = e.split('/');
        return {
          key: t[0],
          text: t[1],
        };
      }
      (t.presetCtrl = function (e) {
        let t = e.initialGroup,
          n = [];
        return {
          group: () => t,
          said: () => n,
          setGroup(o) {
            o !== t && ((t = o), o || (n = []), e.redraw());
          },
          post(s) {
            if (!t) return;
            o[t] && (n.includes(s.key) || (e.post(s.text) && n.push(s.key)));
          },
        };
      }),
        (t.presetView = function (e) {
          const t = e.group();
          if (!t) return;
          const n = o[t],
            s = e.said();
          return n && s.length < 2
            ? me.h(
                'div.mchat__presets',
                n.map((t) => {
                  const o = s.includes(t.key);
                  return me.h(
                    'span',
                    {
                      class: {
                        disabled: o,
                      },
                      attrs: {
                        title: t.text,
                        disabled: o,
                      },
                      hook: fe.bind('click', () => {
                        !o && e.post(t);
                      }),
                    },
                    t.key
                  );
                })
              )
            : void 0;
        });
    }),
    ve = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.setNote = t.getNote = t.flag = t.userModInfo = void 0);
      t.userModInfo = (e) => se.json('/mod/chat-user/' + e);
      t.flag = (e, t, o) =>
        se.json('/report/flag', {
          method: 'post',
          body: se.form({
            username: t,
            resource: e,
            text: o,
          }),
        });
      t.getNote = (e) => se.text(o(e));
      t.setNote = (e, t) =>
        se.json(o(e), {
          method: 'post',
          body: se.form({
            text: t,
          }),
        });
      const o = (e) => `/${e}/note`;
    }),
    be = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.default = function (e, t, o = !1) {
          let n,
            s = 0;
          return function (...r) {
            const i = this;
            n && clearTimeout(n), (n = void 0);
            const a = performance.now() - s;
            (s = performance.now()),
              o && a > t
                ? e.apply(i, r)
                : (n = setTimeout(() => {
                    (n = void 0), e.apply(i, r);
                  }, t));
          };
        });
    }),
    ye = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.noteView = t.noteCtrl = void 0),
        (t.noteCtrl = function (e) {
          let t = e.text;
          const o = be.default(() => {
            ve.setNote(e.id, t || '');
          }, 1e3);
          return {
            id: e.id,
            trans: e.trans,
            text: () => t,
            fetch() {
              ve.getNote(e.id).then((o) => {
                (t = o || ''), e.redraw();
              });
            },
            post(e) {
              (t = e), o();
            },
          };
        }),
        (t.noteView = function (e) {
          const t = e.text();
          return null == t
            ? me.h('div.loading', {
                hook: {
                  insert: e.fetch,
                },
              })
            : me.h('textarea', {
                attrs: {
                  placeholder: e.trans('typePrivateNotesHere'),
                },
                hook: {
                  insert(o) {
                    const n = $(o.elm);
                    n.val(t).on('change keyup paste', () => e.post(n.val()));
                  },
                },
              });
        });
    }),
    we = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.numberSpread = t.numberFormat = void 0);
      let o = !1;
      t.numberFormat = (e) => (
        !1 === o &&
          (o =
            window.Intl && Intl.NumberFormat ? new Intl.NumberFormat() : null),
        null === o ? '' + e : o.format(e)
      );
      t.numberSpread = (e, o, n, s) => {
        let r;
        const i = (n, s, i) => {
          const a = t.numberFormat(
            Math.round((n * (o - 1 - i) + s * (i + 1)) / o)
          );
          a !== r && ((e.textContent = a), (r = a));
        };
        let a = [];
        return (t, r) => {
          if (!e || (!t && 0 !== t)) return;
          r && (o = Math.abs(r)), a.forEach(clearTimeout), (a = []);
          const c = 0 === s ? 0 : s || t;
          s = t;
          const l = Math.abs(n / o);
          for (let e = 0; e < o; e++)
            a.push(setTimeout(i.bind(null, c, t, e), Math.round(e * l)));
        };
      };
    }),
    ke = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.moderationView = t.lineAction = t.moderationCtrl = void 0),
        (t.moderationCtrl = function (e) {
          let t,
            o = !1;
          const n = () => {
            (t = void 0), (o = !1), e.redraw();
          };
          return {
            loading: () => o,
            data: () => t,
            reasons: e.reasons,
            permissions: () => e.permissions,
            open: (n) => {
              const s = n.querySelector('a.user-link'),
                r = n.querySelector('t').innerText,
                i = s.href.split('/')[4];
              e.permissions.timeout
                ? ((o = !0),
                  ve.userModInfo(i).then((n) => {
                    (t = Object.assign(Object.assign({}, n), {
                      text: r,
                    })),
                      (o = !1),
                      e.redraw();
                  }))
                : (t = {
                    id: i.toLowerCase(),
                    username: i,
                    text: r,
                  }),
                e.redraw();
            },
            close: n,
            timeout(o, s) {
              t &&
                lichess.pubsub.emit('socket.send', 'timeout', {
                  userId: t.id,
                  reason: o.key,
                  text: s,
                }),
                n(),
                e.redraw();
            },
          };
        });
      (t.lineAction = () =>
        me.h('i.mod', {
          attrs: {
            'data-icon': '',
          },
        })),
        (t.moderationView = function (e) {
          if (!e) return;
          if (e.loading()) return [me.h('div.loading')];
          const t = e.data();
          if (!t) return;
          const o = e.permissions(),
            n = t.history
              ? me.h(
                  'div.infos.block',
                  [
                    we.numberFormat(t.games || 0) + ' games',
                    t.troll ? 'TROLL' : void 0,
                    t.engine ? 'ENGINE' : void 0,
                    t.booster ? 'BOOSTER' : void 0,
                  ]
                    .map((e) => e && me.h('span', e))
                    .concat([
                      me.h(
                        'a',
                        {
                          attrs: {
                            href: '/@/' + t.username + '?mod',
                          },
                        },
                        'profile'
                      ),
                    ])
                    .concat(
                      o.shadowban
                        ? [
                            me.h(
                              'a',
                              {
                                attrs: {
                                  href: '/mod/' + t.username + '/communication',
                                },
                              },
                              'coms'
                            ),
                          ]
                        : []
                    )
                )
              : void 0,
            s = o.timeout
              ? me.h('div.timeout.block', [
                  me.h('strong', 'Timeout 15 minutes for'),
                  ...e.reasons.map((o) =>
                    me.h(
                      'a.text',
                      {
                        attrs: {
                          'data-icon': 'p',
                        },
                        hook: fe.bind('click', () => e.timeout(o, t.text)),
                      },
                      o.name
                    )
                  ),
                ])
              : me.h('div.timeout.block', [
                  me.h('strong', 'Moderation'),
                  me.h(
                    'a.text',
                    {
                      attrs: {
                        'data-icon': 'p',
                      },
                      hook: fe.bind('click', () =>
                        e.timeout(e.reasons[0], t.text)
                      ),
                    },
                    'Timeout 15 minutes'
                  ),
                ]),
            r = t.history
              ? me.h('div.history.block', [
                  me.h('strong', 'Timeout history'),
                  me.h(
                    'table',
                    me.h(
                      'tbody.slist',
                      {
                        hook: {
                          insert() {
                            lichess.contentLoaded();
                          },
                        },
                      },
                      t.history.map(function (e) {
                        return me.h('tr', [
                          me.h('td.reason', e.reason),
                          me.h('td.mod', e.mod),
                          me.h(
                            'td',
                            me.h('time.timeago', {
                              attrs: {
                                datetime: e.date,
                              },
                            })
                          ),
                        ]);
                      })
                    )
                  ),
                ])
              : void 0;
          return [
            me.h(
              'div.top',
              {
                key: 'mod-' + t.id,
              },
              [
                me.h(
                  'span.text',
                  {
                    attrs: {
                      'data-icon': '',
                    },
                  },
                  [fe.userLink(t.username)]
                ),
                me.h('a', {
                  attrs: {
                    'data-icon': 'L',
                  },
                  hook: fe.bind('click', e.close),
                }),
              ]
            ),
            me.h('div.mchat__content.moderation', [
              me.h('i.line-text.block', ['"', t.text, '"']),
              n,
              s,
              r,
            ]),
          ];
        });
    }),
    Pe = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.default = function (e, t) {
          const o = e.data;
          o.domVersion = 1;
          const n = {
              instance: void 0,
              loaded: !1,
              enabled: ne.prop(!!o.palantir),
            },
            s = ['discussion'];
          e.noteId && s.push('note'), e.plugin && s.push(e.plugin.tab.key);
          const r = lichess.storage.make('chat.tab'),
            i = r.get();
          let a;
          const c = {
            tab: s.find((e) => e === i) || s[0],
            enabled: e.alwaysEnabled || !lichess.storage.get('nochat'),
            placeholderKey: 'talkInChat',
            loading: !1,
            timeout: e.timeout,
            writeable: e.writeable,
          };
          s.length > 1 &&
            'discussion' === c.tab &&
            lichess.storage.get('nochat') &&
            (c.tab = s[1]);
          const l = (e) =>
              !!(e = e.trim()) &&
              !('You too!' == e && !o.lines.some((e) => e.u != o.userId)) &&
              (e.length > 140
                ? (alert('Max length: 140 chars. ' + e.length + ' chars used.'),
                  !1)
                : (lichess.pubsub.emit('socket.send', 'talk', e), !0)),
            d = lichess.trans(e.i18n);

          function u() {
            (e.permissions.timeout || e.permissions.local) &&
              ((a = ke.moderationCtrl({
                reasons: e.timeoutReasons || [
                  {
                    key: 'other',
                    name: 'Inappropriate behavior',
                  },
                ],
                permissions: e.permissions,
                redraw: t,
              })),
              e.loadCss('chat.mod'));
          }
          u();
          const p = e.noteId
              ? ye.noteCtrl({
                  id: e.noteId,
                  text: e.noteText,
                  trans: d,
                  redraw: t,
                })
              : void 0,
            h = ge.presetCtrl({
              initialGroup: e.preset,
              post: l,
              redraw: t,
            }),
            m = [
              [
                'socket.in.message',
                (e) => {
                  o.lines.push(e);
                  const n = o.lines.length;
                  n > 200 && (o.lines.splice(0, n - 200 + 50), o.domVersion++),
                    t();
                },
              ],
              [
                'socket.in.chat_timeout',
                (e) => {
                  let n = !1;
                  o.lines.forEach((t) => {
                    t.u && t.u.toLowerCase() == e && ((t.d = !0), (n = !0));
                  }),
                    e == o.userId && (c.timeout = n = !0),
                    n && (o.domVersion++, t());
                },
              ],
              [
                'socket.in.chat_reinstate',
                (e) => {
                  e == o.userId && ((c.timeout = !1), t());
                },
              ],
              [
                'chat.writeable',
                (e) => {
                  (c.writeable = e), t();
                },
              ],
              [
                'chat.permissions',
                (o) => {
                  let n;
                  for (n in o) e.permissions[n] = o[n];
                  u(), t();
                },
              ],
              ['palantir.toggle', n.enabled],
            ];
          m.forEach(([e, t]) => lichess.pubsub.on(e, t));
          const f = () => lichess.pubsub.emit('chat.enabled', c.enabled);
          return (
            f(),
            {
              data: o,
              opts: e,
              vm: c,
              allTabs: s,
              setTab(e) {
                (c.tab = e),
                  r.set(e),
                  'discussion' === e &&
                    lichess.requestIdleCallback(
                      () =>
                        $('.mchat__say').each(function () {
                          this.focus();
                        }),
                      500
                    ),
                  t();
              },
              moderation: () => a,
              note: p,
              preset: h,
              post: l,
              trans: d,
              plugin: e.plugin,
              setEnabled(e) {
                (c.enabled = e),
                  f(),
                  e
                    ? lichess.storage.remove('nochat')
                    : lichess.storage.set('nochat', '1'),
                  t();
              },
              redraw: t,
              palantir: n,
              destroy: () => {
                m.forEach(([e, t]) => lichess.pubsub.off(e, t));
              },
            }
          );
        });
    }),
    Me = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.isMoreThanText = t.enhance = void 0),
        (t.enhance = function (e, t) {
          const o = lichess.escapeHtml(e),
            n = o.replace(i, c).replace(s, r);
          return t && n === o
            ? (function (e) {
                return e.replace(l, d);
              })(n)
            : n;
        });
      const o = /[&<>"@]/,
        n = /\.\w/;
      t.isMoreThanText = function (e) {
        return o.test(e) || n.test(e);
      };
      const s = /\b\b(?:https?:\/\/)?(lichess\.org\/[-–—\w+&'@#\/%?=()~|!:,.;]+[\w+&@#\/%=~|])/gi;

      function r(e, t) {
        return t.includes('&quot;')
          ? t
          : `<a target="_blank" rel="nofollow noopener noreferrer" href="https://${t}">${t}</a>`;
      }
      const i = /(^|[^\w@#/])@([\w-]{2,})/g,
        a = /^[a-h][2-7]$/;

      function c(e, t, o) {
        return o.length > 20 || o.match(a)
          ? e
          : t + '<a href="/@/' + o + '">@' + o + '</a>';
      }
      const l = /\b(\d+)\s*(\.+)\s*(?:[o0-]+[o0]|[NBRQKP\u2654\u2655\u2656\u2657\u2658\u2659]?[a-h]?[1-8]?[x@]?[a-z][1-8](?:=[NBRQK\u2654\u2655\u2656\u2657\u2658\u2659])?)\+?#?[!\?=]{0,5}/gi;

      function d(e, t, o) {
        if (t < 1 || t > 200) return e;
        return (
          '<a class="jump" data-ply="' +
          (2 * t - (o.length > 1 ? 0 : 1)) +
          '">' +
          e +
          '</a>'
        );
      }
    }),
    Ce = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.hasTeamUrl = t.selfReport = t.skip = void 0);
      t.skip = (e) => (s(e) || i(e)) && !o();
      t.selfReport = (e) => {
        if (o()) return;
        const t = s(e);
        t &&
          se.text(`/jslog/${window.location.href.substr(-12)}?n=spam`, {
            method: 'post',
          }),
          (t || i(e)) && lichess.storage.set('chat-spam', '1');
      };
      const o = () => '1' == lichess.storage.get('chat-spam'),
        n = new RegExp(
          [
            'xcamweb.com',
            '(^|[^i])chess-bot',
            'chess-cheat',
            'coolteenbitch',
            'letcafa.webcam',
            'tinyurl.com/',
            'wooga.info/',
            'bit.ly/',
            'wbt.link/',
            'eb.by/',
            '001.rs/',
            'shr.name/',
            'u.to/',
            '.3-a.net',
            '.ssl443.org',
            '.ns02.us',
            '.myftp.info',
            '.flinkup.com',
            '.serveusers.com',
            'badoogirls.com',
            'hide.su',
            'wyon.de',
            'sexdatingcz.club',
            'qps.ru',
            'tiny.cc/',
          ]
            .map((e) => e.replace(/\./g, '\\.').replace(/\//g, '\\/'))
            .join('|')
        ),
        s = (e) => !!e.match(n),
        r = /follow me|join my team/i,
        i = (e) => !!e.match(r),
        a = /lichess\.org\/team\//i;
      t.hasTeamUrl = (e) => !!e.match(a);
    }),
    Te = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      });
      const o = /^\/[wW](?:hisper)?\s/;

      function n(e) {
        if (!e.vm.writeable) return;
        if ((e.data.loginRequired && !e.data.userId) || e.data.restricted)
          return me.h('input.mchat__say', {
            attrs: {
              placeholder: e.trans('loginToChat'),
              disabled: !0,
            },
          });
        let t;
        return (
          (t = e.vm.timeout
            ? e.trans('youHaveBeenTimedOut')
            : e.opts.blind
            ? 'Chat'
            : e.trans.noarg(e.vm.placeholderKey)),
          me.h('input.mchat__say', {
            attrs: {
              placeholder: t,
              autocomplete: 'off',
              maxlength: 140,
              disabled: e.vm.timeout || !e.vm.writeable,
              'aria-label': 'Chat input',
            },
            hook: {
              insert(t) {
                r(e, t.elm);
              },
            },
          })
        );
      }
      let s;
      t.default = function (e) {
        if (!e.vm.enabled) return [];
        const t = (t) => {
            const o = t.elm;
            if (e.data.lines.length > 5) {
              (0 === o.scrollTop ||
                o.scrollTop > o.scrollHeight - o.clientHeight - 100) &&
                ((o.scrollTop = 999999),
                setTimeout((e) => (o.scrollTop = 999999), 300));
            }
          },
          o = !!e.moderation(),
          s = [
            me.h(
              'ol.mchat__messages.chat-v-' + e.data.domVersion,
              {
                attrs: {
                  role: 'log',
                  'aria-live': 'polite',
                  'aria-atomic': !1,
                },
                hook: {
                  insert(n) {
                    const s = $(n.elm).on('click', 'a.jump', (e) => {
                      lichess.pubsub.emit(
                        'jump',
                        e.target.getAttribute('data-ply')
                      );
                    });
                    o
                      ? s.on('click', '.mod', (t) => {
                          var o;
                          return null === (o = e.moderation()) || void 0 === o
                            ? void 0
                            : o.open(t.target.parentNode);
                        })
                      : s.on('click', '.flag', (t) =>
                          (function (e, t) {
                            const o = t.querySelector('a.user-link'),
                              n = t.querySelector('t').innerText;
                            o &&
                              confirm(`Report "${n}" to moderators?`) &&
                              ve.flag(
                                e.data.resourceId,
                                o.href.split('/')[4],
                                n
                              );
                          })(e, t.target.parentNode)
                        ),
                      t(n);
                  },
                  postpatch: (e, o) => t(o),
                },
              },
              i(e).map((t) =>
                (function (e, t) {
                  const o = (function (e, t) {
                    if (Me.isMoreThanText(e)) {
                      const o = (function (e) {
                        return (t, o) => {
                          o.data.lichessChat !== t.data.lichessChat &&
                            (o.elm.innerHTML = Me.enhance(
                              o.data.lichessChat,
                              e
                            ));
                        };
                      })(t);
                      return me.h('t', {
                        lichessChat: e,
                        hook: {
                          create: o,
                          update: o,
                        },
                      });
                    }
                    return me.h('t', e);
                  })(t.t, e.opts.parseMoves);
                  if ('lichess' === t.u) return me.h('li.system', o);
                  if (t.c)
                    return me.h('li', [me.h('span.color', '[' + t.c + ']'), o]);
                  const n = me.thunk('a', t.u, fe.userLink, [t.u, t.title]);
                  return me.h(
                    'li',
                    e.moderation()
                      ? [t.u ? ke.lineAction() : null, n, ' ', o]
                      : [
                          e.data.userId && t.u && e.data.userId != t.u
                            ? me.h('i.flag', {
                                attrs: {
                                  'data-icon': '!',
                                  title: 'Report',
                                },
                              })
                            : null,
                          n,
                          ' ',
                          o,
                        ]
                  );
                })(e, t)
              )
            ),
            n(e),
          ],
          r = ge.presetView(e.preset);
        return r && s.push(r), s;
      };
      const r = (e, t) => {
        const n = lichess.tempStorage.make('chat.input'),
          r = n.get();
        r &&
          ((t.value = r),
          t.focus(),
          !e.opts.public && r.match(o) && t.classList.add('whisper')),
          t.addEventListener('keydown', (t) => {
            'Enter' === t.key &&
              setTimeout(() => {
                const o = t.target,
                  s = o.value,
                  r = e.opts.public;
                '' === s
                  ? $('.keyboard-move input').each(function () {
                      this.focus();
                    })
                  : (e.opts.kobold || Ce.selfReport(s),
                    r && Ce.hasTeamUrl(s)
                      ? alert("Please don't advertise teams in the chat.")
                      : e.post(s),
                    (o.value = ''),
                    n.remove(),
                    r || o.classList.remove('whisper'));
              });
          }),
          t.addEventListener('input', (t) =>
            setTimeout(() => {
              const s = t.target,
                r = s.value;
              s.removeAttribute('placeholder'),
                e.opts.public || s.classList.toggle('whisper', !!r.match(o)),
                n.set(r);
            })
          ),
          window.Mousetrap.bind('c', () => t.focus());
        const i = ['touchstart', 'mousedown'];
        s &&
          i.forEach((e) =>
            document.body.removeEventListener(e, s, {
              capture: !0,
            })
          ),
          (s = (e) => {
            e.shiftKey || 2 === e.buttons || 2 === e.button || t.blur();
          }),
          (t.onfocus = () =>
            i.forEach((e) =>
              document.body.addEventListener(e, s, {
                passive: !0,
                capture: !0,
              })
            )),
          (t.onblur = () =>
            i.forEach((e) =>
              document.body.removeEventListener(e, s, {
                capture: !0,
              })
            ));
      };

      function i(e) {
        const t = [];
        let o;
        return (
          e.data.lines.forEach((n) => {
            var s, r;
            n.d ||
              (o && ((r = n), (s = o).d && r.d && s.u === r.u)) ||
              (n.r && (n.u || '').toLowerCase() != e.data.userId) ||
              Ce.skip(n.t) ||
              t.push(n),
              (o = n);
          }),
          t
        );
      }
    }),
    xe = te(function (e, t) {
      function o(e) {
        const t = e.palantir;
        if (t.enabled())
          return t.instance
            ? t.instance.render(me.h)
            : me.h('div.mchat__tab.palantir.palantir-slot', {
                attrs: {
                  'data-icon': '',
                  title: 'Voice chat',
                },
                hook: fe.bind('click', () => {
                  t.loaded ||
                    ((t.loaded = !0),
                    lichess
                      .loadScript('javascripts/vendor/peerjs.min.js')
                      .then(() => {
                        lichess.loadModule('palantir').then(() => {
                          (t.instance = window.Palantir.palantir({
                            uid: e.data.userId,
                            redraw: e.redraw,
                          })),
                            e.redraw();
                        });
                      }));
                }),
              });
      }
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.default = function (e) {
          const t = e.moderation();
          return me.h(
            'section.mchat' + (e.opts.alwaysEnabled ? '' : '.mchat-optional'),
            {
              class: {
                'mchat-mod': !!t,
              },
              hook: {
                destroy: e.destroy,
              },
            },
            ke.moderationView(t) ||
              (function (e) {
                const t = e.vm.tab;
                return [
                  me.h('div.mchat__tabs.nb_' + e.allTabs.length, [
                    ...e.allTabs.map((o) =>
                      (function (e, t, o) {
                        return me.h(
                          'div.mchat__tab.' + t,
                          {
                            class: {
                              'mchat__tab-active': t === o,
                            },
                            hook: fe.bind('click', () => e.setTab(t)),
                          },
                          (function (e, t) {
                            return 'discussion' === t
                              ? [
                                  me.h('span', e.data.name),
                                  e.opts.alwaysEnabled
                                    ? void 0
                                    : me.h('input', {
                                        attrs: {
                                          type: 'checkbox',
                                          title: e.trans.noarg('toggleTheChat'),
                                          checked: e.vm.enabled,
                                        },
                                        hook: fe.bind('change', (t) => {
                                          e.setEnabled(t.target.checked);
                                        }),
                                      }),
                                ]
                              : 'note' === t
                              ? [me.h('span', e.trans.noarg('notes'))]
                              : e.plugin && t === e.plugin.tab.key
                              ? [me.h('span', e.plugin.tab.name)]
                              : [];
                          })(e, t)
                        );
                      })(e, o, t)
                    ),
                    o(e),
                  ]),
                  me.h(
                    'div.mchat__content.' + t,
                    'note' === t && e.note
                      ? [ye.noteView(e.note)]
                      : e.plugin && t === e.plugin.tab.key
                      ? [e.plugin.view()]
                      : Te.default(e)
                  ),
                ];
              })(e)
          );
        });
    }),
    Se = ee(
      te(function (e, t) {
        Object.defineProperty(t, '__esModule', {
          value: !0,
        }),
          (t.default = function (e, t) {
            const o = me.init([me.classModule, me.attributesModule]),
              n = Pe.default(t, function () {
                r = o(r, xe.default(n));
              }),
              s = xe.default(n);
            e.innerHTML = '';
            let r = o(e, s);
            return n;
          });
      })
    ),
    Oe = ee(
      te(function (e, t) {
        Object.defineProperty(t, '__esModule', {
          value: !0,
        }),
          (t.default = function () {
            if ('ontouchstart' in window) return;
            let e, t;
            const o = (o) => {
              (e = o.pageX), (t = o.pageY);
            };
            let n = {};
            $('#topnav.hover').each(function () {
              const s = $(this).removeClass('hover'),
                r = () => s.toggleClass('hover'),
                i = () => {
                  Math.sqrt((n.pX - e) * (n.pX - e) + (n.pY - t) * (n.pY - t)) <
                  8
                    ? (s.off(n.event, o),
                      delete n.timeoutId,
                      (n.isActive = !0),
                      r())
                    : ((n.pX = e),
                      (n.pY = t),
                      (n.timeoutId = setTimeout(i, 200)));
                },
                a = function (e) {
                  n.timeoutId && (n.timeoutId = clearTimeout(n.timeoutId));
                  const t = (n.event = 'mousemove');
                  if ('mouseover' == e.type) {
                    if (n.isActive || e.buttons) return;
                    (n.pX = e.pageX),
                      (n.pY = e.pageY),
                      s.off(t, o).on(t, o),
                      (n.timeoutId = setTimeout(i, 200));
                  } else {
                    if (!n.isActive) return;
                    s.off(t, o), (n = {}), r();
                  }
                };
              s.on('mouseover', a).on('mouseleave', a);
            });
          });
      })
    );
  const _e = (() => {
    const e = 'mousemove';
    let t = !1,
      o = [],
      n = 0;

    function s(e) {
      var t;
      o.push({
        b: 0 != e.buttons,
        x: e.clientX,
        y: e.clientY,
      }),
        o.length > 4 &&
          (o.shift(),
          !(t = o)[0].b &&
            t[1].b &&
            t[2].b &&
            !t[3].b &&
            r(t[0], t[1]) > 900 &&
            0 === r(t[1], t[2]) &&
            0 === r(t[2], t[3]) &&
            n++);
    }

    function r(e, t) {
      return Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2);
    }
    return {
      start() {
        t || ((t = !1), document.addEventListener(e, s));
      },
      stop() {
        t && ((t = !1), document.removeEventListener(e, s));
      },
      hits: () => n,
    };
  })();
  let Ae = [],
    je = !1,
    Le = {
      holdAcc: 0,
    },
    De = !1;
  const Ee = (e, t) =>
      fetch('/jslog/' + e.game.id + e.player.id + '?n=' + t, {
        method: 'post',
      }),
    Ne = (e) => $(atob(e)).length,
    $e = () => $('u8t').first().append('<j>'),
    Re = 10 + Math.round(Math.random(11));
  var Be = (e, t) => {
      !(function (e, t) {
        if (
          (t.premove && e.ply > 1 && (De = !0), De || !t.holdTime || e.ply > 30)
        )
          return void _e.stop();
        if ((Ae.push(t.holdTime), Ae.length <= 6)) return;
        let o,
          n = !1;
        Ae.shift();
        const s = Ae.reduce((e, t) => e + t) / 6;
        s > 2 &&
          s < 140 &&
          ((o = Ae.map((e) => Math.pow(e - s, 2)).reduce((e, t) => e + t) / 5),
          (n = o < 256));
        (n || je) &&
          $('.manipulable .cg-board').toggleClass('bh1', n && _e.hits() > 2),
          n
            ? (Le.hold ||
                (Le.holdAcc++,
                Le.holdAcc > 5 &&
                  (e.socket.send('hold', {
                    mean: Math.round(s),
                    sd: Math.round(Math.sqrt(o)),
                  }),
                  (Le.hold = !0))),
              _e.start(),
              _e.hits() > 2 &&
                !Le.ick &&
                (e.socket.send('bye2'), Ee(e.data, 'ick2'), (Le.ick = !0)))
            : (Le.holdAcc = 0),
          (je = n);
      })(e, t),
        e.ply <= Re + 2 &&
          e.ply > Re &&
          (($(atob('TWVudUFwcGVuZA==')).length ||
            $(atob('LmNnLWJvYXJkIGNhbnZhcw==')).length) &&
            Ee(e.data, 'mcb'),
          Ne('I2NoZXNzX2J0bl9jb250YWluZXI') && Ee(e.data, 'cma0'),
          Ne('bGFiZWwgPiBpbnB1dFt2YWx1ZT0id2hpdGUiXQ==') && Ee(e.data, 'cma1'),
          Ne('bGFiZWw+c3Bhbi5jaC1jaGVja21hcms=') &&
            setTimeout(() => Ee(e.data, 'cma2'), 2e4),
          Ne('YVtocmVmPSJodHRwOi8vdGhhcGF3bmd1bi5saXZlIl0=') &&
            Ee(e.data, 'lga'),
          (Ne('I2F1dGhCYXI=') || Ne('I21vdmVfc3VnZ2VzdF9ib3g=')) &&
            Ee(e.data, 'los')),
        (6 != e.ply && 7 != e.ply) || $e();
    },
    Ie = (e) =>
      setTimeout(() => {
        Object.keys(window.WebSocket).length || Ee(e.data, 'ih1'),
          e.ply >= 6 && $e();
      }, 1e3);
  const qe = (e) => e.steps[0].ply,
    Fe = (e) => Ge(e).ply,
    Ge = (e) => e.steps[e.steps.length - 1],
    ze = (e, t) => e.steps[t - qe(e)],
    Ke = (e) => {
      e.clock &&
        ((e.clock.showTenths = e.pref.clockTenths),
        (e.clock.showBar = e.pref.clockBar)),
        e.correspondence && (e.correspondence.showBar = e.pref.clockBar),
        ['horde', 'crazyhouse'].includes(e.game.variant.key) &&
          (e.pref.showCaptured = !1),
        e.expiration &&
          (e.expiration.movedAt = Date.now() - e.expiration.idleMillis);
    };
  var He = te(function (e, t) {
      function o(e) {
        return e.game.status.id >= t.ids.started;
      }

      function n(e) {
        return e.game.status.id >= t.ids.mate;
      }

      function s(e) {
        return e.game.status.id === t.ids.aborted;
      }
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.playing = t.aborted = t.finished = t.started = t.ids = void 0),
        (t.ids = {
          created: 10,
          started: 20,
          aborted: 25,
          mate: 30,
          resign: 31,
          stalemate: 32,
          timeout: 33,
          draw: 34,
          outoftime: 35,
          cheat: 36,
          noStart: 37,
          variantEnd: 60,
        }),
        (t.started = o),
        (t.finished = n),
        (t.aborted = s),
        (t.playing = function (e) {
          return o(e) && !n(e) && !s(e);
        });
    }),
    Ve = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      });
    }),
    Ue = te(function (e, t) {
      var o =
          (Q && Q.__createBinding) ||
          (Object.create
            ? function (e, t, o, n) {
                void 0 === n && (n = o),
                  Object.defineProperty(e, n, {
                    enumerable: !0,
                    get: function () {
                      return t[o];
                    },
                  });
              }
            : function (e, t, o, n) {
                void 0 === n && (n = o), (e[n] = t[o]);
              }),
        n =
          (Q && Q.__exportStar) ||
          function (e, t) {
            for (var n in e)
              'default' === n ||
                Object.prototype.hasOwnProperty.call(t, n) ||
                o(t, e, n);
          };
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.isSwitchable = t.nbMoves = t.setGone = t.setOnGame = t.isCorrespondence = t.userAnalysable = t.hasAi = t.getPlayer = t.replayable = t.moretimeable = t.berserkableBy = t.resignable = t.drawable = t.takebackable = t.abortable = t.bothPlayersHavePlayed = t.playedTurns = t.mandatory = t.isPlayerTurn = t.isPlayerPlaying = t.playable = void 0),
        n(Ve, t);
      t.playable = (e) => e.game.status.id < He.ids.aborted && !s(e);
      t.isPlayerPlaying = (e) => t.playable(e) && !e.player.spectator;
      t.isPlayerTurn = (e) =>
        t.isPlayerPlaying(e) && e.game.player == e.player.color;
      t.mandatory = (e) => !!e.tournament || !!e.simul || !!e.swiss;
      t.playedTurns = (e) => e.game.turns - (e.game.startedAtTurn || 0);
      t.bothPlayersHavePlayed = (e) => t.playedTurns(e) > 1;
      t.abortable = (e) =>
        t.playable(e) && !t.bothPlayersHavePlayed(e) && !t.mandatory(e);
      t.takebackable = (e) =>
        t.playable(e) &&
        e.takebackable &&
        t.bothPlayersHavePlayed(e) &&
        !e.player.proposingTakeback &&
        !e.opponent.proposingTakeback;
      t.drawable = (e) =>
        t.playable(e) &&
        e.game.turns >= 2 &&
        !e.player.offeringDraw &&
        !t.hasAi(e);
      t.resignable = (e) => t.playable(e) && !t.abortable(e);
      t.berserkableBy = (e) =>
        !!e.tournament &&
        e.tournament.berserkable &&
        t.isPlayerPlaying(e) &&
        !t.bothPlayersHavePlayed(e);
      t.moretimeable = (e) =>
        t.isPlayerPlaying(e) &&
        e.moretimeable &&
        (!!e.clock ||
          (!!e.correspondence &&
            e.correspondence[e.opponent.color] <
              e.correspondence.increment - 3600));
      const s = (e) => 'import' === e.game.source;

      function r(e, t) {
        return e.player.color === t
          ? e.player
          : e.opponent.color === t
          ? e.opponent
          : null;
      }
      (t.replayable = (e) =>
        s(e) ||
        He.finished(e) ||
        (He.aborted(e) && t.bothPlayersHavePlayed(e))),
        (t.getPlayer = r);
      t.hasAi = (e) => !(!e.player.ai && !e.opponent.ai);
      t.userAnalysable = (e) =>
        He.finished(e) ||
        (t.playable(e) && (!e.clock || !t.isPlayerPlaying(e)));
      t.isCorrespondence = (e) => 'correspondence' === e.game.speed;
      t.setOnGame = (e, o, n) => {
        const s = r(e, o);
        (n = n || !!s.ai), (s.onGame = n), n && t.setGone(e, o, !1);
      };
      t.setGone = (e, t, o) => {
        const n = r(e, t);
        (n.gone = !n.ai && o), !1 === n.gone && n.user && (n.user.online = !0);
      };
      t.nbMoves = (e, t) =>
        Math.floor((e.game.turns + ('white' == t ? 1 : 0)) / 2);
      t.isSwitchable = (e) =>
        !t.hasAi(e) && (!!e.simul || t.isCorrespondence(e));
    }),
    We = te(function (e, t) {
      function o(e, t) {
        return Math.abs(e - t);
      }
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.premove = t.queen = t.knight = void 0);
      t.knight = (e, t, n, s) => {
        const r = o(e, n),
          i = o(t, s);
        return (1 === r && 2 === i) || (2 === r && 1 === i);
      };
      const n = (e, t, n, s) => o(e, n) === o(t, s),
        s = (e, t, o, n) => e === o || t === n;
      (t.queen = (e, t, o, r) => n(e, t, o, r) || s(e, t, o, r)),
        (t.premove = function (e, r, i) {
          const a = e.get(r);
          if (!a) return [];
          const c = ie.key2pos(r),
            l = a.role,
            d =
              'pawn' === l
                ? ((u = a.color),
                  (e, t, n, s) =>
                    o(e, n) < 2 &&
                    ('white' === u
                      ? s === t + 1 || (t <= 1 && s === t + 2 && e === n)
                      : s === t - 1 || (t >= 6 && s === t - 2 && e === n)))
                : 'knight' === l
                ? t.knight
                : 'bishop' === l
                ? n
                : 'rook' === l
                ? s
                : 'queen' === l
                ? t.queen
                : (function (e, t, n) {
                    return (s, r, i, a) =>
                      (o(s, i) < 2 && o(r, a) < 2) ||
                      (n &&
                        r === a &&
                        r === ('white' === e ? 0 : 7) &&
                        ((4 === s &&
                          ((2 === i && t.includes(0)) ||
                            (6 === i && t.includes(7)))) ||
                          t.includes(i)));
                  })(
                    a.color,
                    (function (e, t) {
                      const o = 'white' === t ? '1' : '8',
                        n = [];
                      for (const [s, r] of e)
                        s[1] === o &&
                          r.color === t &&
                          'rook' === r.role &&
                          n.push(ie.key2pos(s)[0]);
                      return n;
                    })(e, a.color),
                    i
                  );
          var u;
          return ie.allPos
            .filter(
              (e) =>
                (c[0] !== e[0] || c[1] !== e[1]) && d(c[0], c[1], e[0], e[1])
            )
            .map(ie.pos2key);
        });
    }),
    Ye = te(function (e, t) {
      function o(e, ...t) {
        e && setTimeout(() => e(...t), 1);
      }

      function n(e) {
        e.premovable.current &&
          ((e.premovable.current = void 0), o(e.premovable.events.unset));
      }

      function s(e) {
        const t = e.predroppable;
        t.current && ((t.current = void 0), o(t.events.unset));
      }

      function r(e, t, n) {
        const s = e.pieces.get(t),
          r = e.pieces.get(n);
        if (t === n || !s) return !1;
        const i = r && r.color !== s.color ? r : void 0;
        return (
          n === e.selected && d(e),
          o(e.events.move, t, n, i),
          (function (e, t, o) {
            if (!e.autoCastle) return !1;
            const n = e.pieces.get(t);
            if (!n || 'king' !== n.role) return !1;
            const s = ie.key2pos(t),
              r = ie.key2pos(o);
            if ((0 !== s[1] && 7 !== s[1]) || s[1] !== r[1]) return !1;
            4 !== s[0] ||
              e.pieces.has(o) ||
              (6 === r[0]
                ? (o = ie.pos2key([7, r[1]]))
                : 2 === r[0] && (o = ie.pos2key([0, r[1]])));
            const i = e.pieces.get(o);
            return !(
              !i ||
              i.color !== n.color ||
              'rook' !== i.role ||
              (e.pieces.delete(t),
              e.pieces.delete(o),
              s[0] < r[0]
                ? (e.pieces.set(ie.pos2key([6, r[1]]), n),
                  e.pieces.set(ie.pos2key([5, r[1]]), i))
                : (e.pieces.set(ie.pos2key([2, r[1]]), n),
                  e.pieces.set(ie.pos2key([3, r[1]]), i)),
              0)
            );
          })(e, t, n) || (e.pieces.set(n, s), e.pieces.delete(t)),
          (e.lastMove = [t, n]),
          (e.check = void 0),
          o(e.events.change),
          i || !0
        );
      }

      function i(e, t, n, s) {
        if (e.pieces.has(n)) {
          if (!s) return !1;
          e.pieces.delete(n);
        }
        return (
          o(e.events.dropNewPiece, t, n),
          e.pieces.set(n, t),
          (e.lastMove = [n]),
          (e.check = void 0),
          o(e.events.change),
          (e.movable.dests = void 0),
          (e.turnColor = ie.opposite(e.turnColor)),
          !0
        );
      }

      function a(e, t, o) {
        const n = r(e, t, o);
        return (
          n &&
            ((e.movable.dests = void 0),
            (e.turnColor = ie.opposite(e.turnColor)),
            (e.animation.current = void 0)),
          n
        );
      }

      function c(e, t, n) {
        if (p(e, t, n)) {
          const s = a(e, t, n);
          if (s) {
            const r = e.hold.stop();
            d(e);
            const i = {
              premove: !1,
              ctrlKey: e.stats.ctrlKey,
              holdTime: r,
            };
            return (
              !0 !== s && (i.captured = s),
              o(e.movable.events.after, t, n, i),
              !0
            );
          }
        } else if (
          (function (e, t, o) {
            return (
              t !== o &&
              h(e, t) &&
              We.premove(e.pieces, t, e.premovable.castle).includes(o)
            );
          })(e, t, n)
        )
          return (
            (function (e, t, n, r) {
              s(e),
                (e.premovable.current = [t, n]),
                o(e.premovable.events.set, t, n, r);
            })(e, t, n, {
              ctrlKey: e.stats.ctrlKey,
            }),
            d(e),
            !0
          );
        return d(e), !1;
      }

      function l(e, t) {
        (e.selected = t),
          h(e, t)
            ? (e.premovable.dests = We.premove(
                e.pieces,
                t,
                e.premovable.castle
              ))
            : (e.premovable.dests = void 0);
      }

      function d(e) {
        (e.selected = void 0), (e.premovable.dests = void 0), e.hold.cancel();
      }

      function u(e, t) {
        const o = e.pieces.get(t);
        return (
          !!o &&
          ('both' === e.movable.color ||
            (e.movable.color === o.color && e.turnColor === o.color))
        );
      }

      function p(e, t, o) {
        var n, s;
        return (
          t !== o &&
          u(e, t) &&
          (e.movable.free ||
            !!(null ===
              (s =
                null === (n = e.movable.dests) || void 0 === n
                  ? void 0
                  : n.get(t)) || void 0 === s
              ? void 0
              : s.includes(o)))
        );
      }

      function h(e, t) {
        const o = e.pieces.get(t);
        return (
          !!o &&
          e.premovable.enabled &&
          e.movable.color === o.color &&
          e.turnColor !== o.color
        );
      }

      function m(e) {
        n(e), s(e), d(e);
      }
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.whitePov = t.getSnappedKeyAtDomPos = t.getKeyAtDomPos = t.stop = t.cancelMove = t.playPredrop = t.playPremove = t.isDraggable = t.canMove = t.unselect = t.setSelected = t.selectSquare = t.dropNewPiece = t.userMove = t.baseNewPiece = t.baseMove = t.unsetPredrop = t.unsetPremove = t.setCheck = t.setPieces = t.reset = t.toggleOrientation = t.callUserFunction = void 0),
        (t.callUserFunction = o),
        (t.toggleOrientation = function (e) {
          (e.orientation = ie.opposite(e.orientation)),
            (e.animation.current = e.draggable.current = e.selected = void 0);
        }),
        (t.reset = function (e) {
          (e.lastMove = void 0), d(e), n(e), s(e);
        }),
        (t.setPieces = function (e, t) {
          for (const [o, n] of t) n ? e.pieces.set(o, n) : e.pieces.delete(o);
        }),
        (t.setCheck = function (e, t) {
          if (((e.check = void 0), !0 === t && (t = e.turnColor), t))
            for (const [o, n] of e.pieces)
              'king' === n.role && n.color === t && (e.check = o);
        }),
        (t.unsetPremove = n),
        (t.unsetPredrop = s),
        (t.baseMove = r),
        (t.baseNewPiece = i),
        (t.userMove = c),
        (t.dropNewPiece = function (e, t, r, a) {
          const c = e.pieces.get(t);
          c &&
          ((function (e, t, o) {
            const n = e.pieces.get(t);
            return !(
              !n ||
              (t !== o && e.pieces.has(o)) ||
              ('both' !== e.movable.color &&
                (e.movable.color !== n.color || e.turnColor !== n.color))
            );
          })(e, t, r) ||
            a)
            ? (e.pieces.delete(t),
              i(e, c, r, a),
              o(e.movable.events.afterNewPiece, c.role, r, {
                premove: !1,
                predrop: !1,
              }))
            : c &&
              (function (e, t, o) {
                const n = e.pieces.get(t),
                  s = e.pieces.get(o);
                return (
                  !!n &&
                  (!s || s.color !== e.movable.color) &&
                  e.predroppable.enabled &&
                  ('pawn' !== n.role || ('1' !== o[1] && '8' !== o[1])) &&
                  e.movable.color === n.color &&
                  e.turnColor !== n.color
                );
              })(e, t, r)
            ? (function (e, t, s) {
                n(e),
                  (e.predroppable.current = {
                    role: t,
                    key: s,
                  }),
                  o(e.predroppable.events.set, t, s);
              })(e, c.role, r)
            : (n(e), s(e)),
            e.pieces.delete(t),
            d(e);
        }),
        (t.selectSquare = function (e, t, n) {
          if ((o(e.events.select, t), e.selected)) {
            if (e.selected === t && !e.draggable.enabled)
              return d(e), void e.hold.cancel();
            if (
              (e.selectable.enabled || n) &&
              e.selected !== t &&
              c(e, e.selected, t)
            )
              return void (e.stats.dragged = !1);
          }
          (u(e, t) || h(e, t)) && (l(e, t), e.hold.start());
        }),
        (t.setSelected = l),
        (t.unselect = d),
        (t.canMove = p),
        (t.isDraggable = function (e, t) {
          const o = e.pieces.get(t);
          return (
            !!o &&
            e.draggable.enabled &&
            ('both' === e.movable.color ||
              (e.movable.color === o.color &&
                (e.turnColor === o.color || e.premovable.enabled)))
          );
        }),
        (t.playPremove = function (e) {
          const t = e.premovable.current;
          if (!t) return !1;
          const s = t[0],
            r = t[1];
          let i = !1;
          if (p(e, s, r)) {
            const t = a(e, s, r);
            if (t) {
              const n = {
                premove: !0,
              };
              !0 !== t && (n.captured = t),
                o(e.movable.events.after, s, r, n),
                (i = !0);
            }
          }
          return n(e), i;
        }),
        (t.playPredrop = function (e, t) {
          const n = e.predroppable.current;
          let r = !1;
          if (!n) return !1;
          if (t(n)) {
            i(
              e,
              {
                role: n.role,
                color: e.movable.color,
              },
              n.key
            ) &&
              (o(e.movable.events.afterNewPiece, n.role, n.key, {
                premove: !1,
                predrop: !0,
              }),
              (r = !0));
          }
          return s(e), r;
        }),
        (t.cancelMove = m),
        (t.stop = function (e) {
          (e.movable.color = e.movable.dests = e.animation.current = void 0),
            m(e);
        }),
        (t.getKeyAtDomPos = function (e, t, o) {
          let n = Math.floor((8 * (e[0] - o.left)) / o.width);
          t || (n = 7 - n);
          let s = 7 - Math.floor((8 * (e[1] - o.top)) / o.height);
          return (
            t || (s = 7 - s),
            n >= 0 && n < 8 && s >= 0 && s < 8 ? ie.pos2key([n, s]) : void 0
          );
        }),
        (t.getSnappedKeyAtDomPos = function (e, t, o, n) {
          const s = ie.key2pos(e),
            r = ie.allPos.filter(
              (e) =>
                We.queen(s[0], s[1], e[0], e[1]) ||
                We.knight(s[0], s[1], e[0], e[1])
            ),
            i = r
              .map((e) => ie.computeSquareCenter(ie.pos2key(e), o, n))
              .map((e) => ie.distanceSq(t, e)),
            [, a] = i.reduce((e, t, o) => (e[0] < t ? e : [t, o]), [i[0], 0]);
          return ie.pos2key(r[a]);
        }),
        (t.whitePov = function (e) {
          return 'white' === e.orientation;
        });
    }),
    Xe = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.write = t.read = t.initial = void 0),
        (t.initial = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
      const o = {
          p: 'pawn',
          r: 'rook',
          n: 'knight',
          b: 'bishop',
          q: 'queen',
          k: 'king',
        },
        n = {
          pawn: 'p',
          rook: 'r',
          knight: 'n',
          bishop: 'b',
          queen: 'q',
          king: 'k',
        };
      (t.read = function (e) {
        'start' === e && (e = t.initial);
        const n = new Map();
        let s = 7,
          r = 0;
        for (const t of e)
          switch (t) {
            case ' ':
              return n;
            case '/':
              if ((--s, s < 0)) return n;
              r = 0;
              break;
            case '~':
              const e = n.get(ie.pos2key([r, s]));
              e && (e.promoted = !0);
              break;
            default:
              const i = t.charCodeAt(0);
              if (i < 57) r += i - 48;
              else {
                const e = t.toLowerCase();
                n.set(ie.pos2key([r, s]), {
                  role: o[e],
                  color: t === e ? 'black' : 'white',
                }),
                  ++r;
              }
          }
        return n;
      }),
        (t.write = function (e) {
          return ie.invRanks
            .map((t) =>
              re.files
                .map((o) => {
                  const s = e.get(o + t);
                  if (s) {
                    const e = n[s.role];
                    return 'white' === s.color ? e.toUpperCase() : e;
                  }
                  return '1';
                })
                .join('')
            )
            .join('/')
            .replace(/1{2,}/g, (e) => e.length.toString());
        });
    }),
    Je = te(function (e, t) {
      function o(e, t) {
        for (const s in t) n(e[s]) && n(t[s]) ? o(e[s], t[s]) : (e[s] = t[s]);
      }

      function n(e) {
        return 'object' == typeof e;
      }
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.configure = void 0),
        (t.configure = function (e, t) {
          var n;
          if (
            ((null === (n = t.movable) || void 0 === n ? void 0 : n.dests) &&
              (e.movable.dests = void 0),
            o(e, t),
            t.fen && ((e.pieces = Xe.read(t.fen)), (e.drawable.shapes = [])),
            t.hasOwnProperty('check') && Ye.setCheck(e, t.check || !1),
            t.hasOwnProperty('lastMove') && !t.lastMove
              ? (e.lastMove = void 0)
              : t.lastMove && (e.lastMove = t.lastMove),
            e.selected && Ye.setSelected(e, e.selected),
            (!e.animation.duration || e.animation.duration < 100) &&
              (e.animation.enabled = !1),
            !e.movable.rookCastle && e.movable.dests)
          ) {
            const t = 'white' === e.movable.color ? '1' : '8',
              o = 'e' + t,
              n = e.movable.dests.get(o),
              s = e.pieces.get(o);
            if (!n || !s || 'king' !== s.role) return;
            e.movable.dests.set(
              o,
              n.filter(
                (e) =>
                  !(
                    (e === 'a' + t && n.includes('c' + t)) ||
                    (e === 'h' + t && n.includes('g' + t))
                  )
              )
            );
          }
        });
    }),
    Ze = te(function (e, t) {
      function o(e, t) {
        const o = e(t);
        return t.dom.redraw(), o;
      }

      function n(e, t) {
        return {
          key: e,
          pos: ie.key2pos(e),
          piece: t,
        };
      }

      function s(e, t) {
        return t.sort(
          (t, o) => ie.distanceSq(e.pos, t.pos) - ie.distanceSq(e.pos, o.pos)
        )[0];
      }

      function r(e, t) {
        const o = e.animation.current;
        if (void 0 === o) return void (e.dom.destroyed || e.dom.redrawNow());
        const n = 1 - (t - o.start) * o.frequency;
        if (n <= 0) (e.animation.current = void 0), e.dom.redrawNow();
        else {
          const t =
            (s = n) < 0.5
              ? 4 * s * s * s
              : (s - 1) * (2 * s - 2) * (2 * s - 2) + 1;
          for (const e of o.plan.anims.values())
            (e[2] = e[0] * t), (e[3] = e[1] * t);
          e.dom.redrawNow(!0),
            requestAnimationFrame((t = performance.now()) => r(e, t));
        }
        var s;
      }
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.render = t.anim = void 0),
        (t.anim = function (e, t) {
          return t.animation.enabled
            ? (function (e, t) {
                const o = new Map(t.pieces),
                  i = e(t),
                  a = (function (e, t) {
                    const o = new Map(),
                      r = [],
                      i = new Map(),
                      a = [],
                      c = [],
                      l = new Map();
                    let d, u, p;
                    for (const [t, o] of e) l.set(t, n(t, o));
                    for (const e of ie.allKeys)
                      (d = t.pieces.get(e)),
                        (u = l.get(e)),
                        d
                          ? u
                            ? ie.samePiece(d, u.piece) ||
                              (a.push(u), c.push(n(e, d)))
                            : c.push(n(e, d))
                          : u && a.push(u);
                    for (const e of c)
                      (u = s(
                        e,
                        a.filter((t) => ie.samePiece(e.piece, t.piece))
                      )),
                        u &&
                          ((p = [u.pos[0] - e.pos[0], u.pos[1] - e.pos[1]]),
                          o.set(e.key, p.concat(p)),
                          r.push(u.key));
                    for (const e of a)
                      r.includes(e.key) || i.set(e.key, e.piece);
                    return {
                      anims: o,
                      fadings: i,
                    };
                  })(o, t);
                if (a.anims.size || a.fadings.size) {
                  const e = t.animation.current && t.animation.current.start;
                  (t.animation.current = {
                    start: performance.now(),
                    frequency: 1 / t.animation.duration,
                    plan: a,
                  }),
                    e || r(t, performance.now());
                } else t.dom.redraw();
                return i;
              })(e, t)
            : o(e, t);
        }),
        (t.render = o);
    }),
    Qe = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.clear = t.cancel = t.end = t.move = t.processDraw = t.start = void 0);
      const o = ['green', 'red', 'blue', 'yellow'];

      function n(e) {
        requestAnimationFrame(() => {
          const t = e.drawable.current;
          if (t) {
            const o = Ye.getKeyAtDomPos(t.pos, Ye.whitePov(e), e.dom.bounds());
            o || (t.snapToValidMove = !1);
            const s = t.snapToValidMove
              ? Ye.getSnappedKeyAtDomPos(
                  t.orig,
                  t.pos,
                  Ye.whitePov(e),
                  e.dom.bounds()
                )
              : o;
            s !== t.mouseSq &&
              ((t.mouseSq = s),
              (t.dest = s !== t.orig ? s : void 0),
              e.dom.redrawNow()),
              n(e);
          }
        });
      }

      function s(e) {
        e.drawable.current && ((e.drawable.current = void 0), e.dom.redraw());
      }

      function r(e) {
        var t;
        const n = (e.shiftKey || e.ctrlKey) && ie.isRightButton(e),
          s =
            e.altKey ||
            e.metaKey ||
            (null === (t = e.getModifierState) || void 0 === t
              ? void 0
              : t.call(e, 'AltGraph'));
        return o[(n ? 1 : 0) + (s ? 2 : 0)];
      }

      function i(e) {
        e.onChange && e.onChange(e.shapes);
      }
      (t.start = function (e, t) {
        if (t.touches && t.touches.length > 1) return;
        t.stopPropagation(),
          t.preventDefault(),
          t.ctrlKey ? Ye.unselect(e) : Ye.cancelMove(e);
        const o = ie.eventPosition(t),
          s = Ye.getKeyAtDomPos(o, Ye.whitePov(e), e.dom.bounds());
        s &&
          ((e.drawable.current = {
            orig: s,
            pos: o,
            brush: r(t),
            snapToValidMove: e.drawable.defaultSnapToValidMove,
          }),
          n(e));
      }),
        (t.processDraw = n),
        (t.move = function (e, t) {
          e.drawable.current && (e.drawable.current.pos = ie.eventPosition(t));
        }),
        (t.end = function (e) {
          const t = e.drawable.current;
          t &&
            (t.mouseSq &&
              (function (e, t) {
                const o = (e) => e.orig === t.orig && e.dest === t.dest,
                  n = e.shapes.find(o);
                n && (e.shapes = e.shapes.filter((e) => !o(e)));
                (n && n.brush === t.brush) || e.shapes.push(t);
                i(e);
              })(e.drawable, t),
            s(e));
        }),
        (t.cancel = s),
        (t.clear = function (e) {
          e.drawable.shapes.length &&
            ((e.drawable.shapes = []), e.dom.redraw(), i(e.drawable));
        });
    }),
    et = te(function (e, t) {
      function o(e) {
        requestAnimationFrame(() => {
          var t;
          const s = e.draggable.current;
          if (!s) return;
          (null === (t = e.animation.current) || void 0 === t
            ? void 0
            : t.plan.anims.has(s.orig)) && (e.animation.current = void 0);
          const r = e.pieces.get(s.orig);
          if (r && ie.samePiece(r, s.piece)) {
            if (
              (!s.started &&
                ie.distanceSq(s.pos, s.origPos) >=
                  Math.pow(e.draggable.distance, 2) &&
                (s.started = !0),
              s.started)
            ) {
              if ('function' == typeof s.element) {
                const e = s.element();
                if (!e) return;
                (e.cgDragging = !0),
                  e.classList.add('dragging'),
                  (s.element = e);
              }
              const t = e.dom.bounds();
              ie.translateAbs(s.element, [
                s.pos[0] - t.left - t.width / 16,
                s.pos[1] - t.top - t.height / 16,
              ]);
            }
          } else n(e);
          o(e);
        });
      }

      function n(e) {
        const t = e.draggable.current;
        t &&
          (t.newPiece && e.pieces.delete(t.orig),
          (e.draggable.current = void 0),
          Ye.unselect(e),
          s(e),
          e.dom.redraw());
      }

      function s(e) {
        const t = e.dom.elements;
        t.ghost && ie.setVisible(t.ghost, !1);
      }

      function r(e, t) {
        let o = e.dom.elements.board.firstChild;
        for (; o; ) {
          if (o.cgKey === t && 'PIECE' === o.tagName) return o;
          o = o.nextSibling;
        }
      }
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.cancel = t.end = t.move = t.dragNewPiece = t.start = void 0),
        (t.start = function (e, t) {
          if (
            (!t.isTrusted && (!t.data || t.data[5] !== '-')) ||
            (void 0 !== t.button && 0 !== t.button)
          )
            return;
          if (t.touches && t.touches.length > 1) return;
          const n = e.dom.bounds(),
            s = ie.eventPosition(t),
            i = Ye.getKeyAtDomPos(s, Ye.whitePov(e), n);
          if (!i) return;
          const a = e.pieces.get(i),
            c = e.selected;
          c ||
            !e.drawable.enabled ||
            (!e.drawable.eraseOnClick && a && a.color === e.turnColor) ||
            Qe.clear(e),
            !1 === t.cancelable ||
              (t.touches &&
                e.movable.color &&
                !a &&
                !c &&
                !(function (e, t) {
                  const o = Ye.whitePov(e),
                    n = e.dom.bounds(),
                    s = Math.pow(n.width / 8, 2);
                  for (const r in e.pieces) {
                    const e = ie.computeSquareCenter(r, o, n);
                    if (ie.distanceSq(e, t) <= s) return !0;
                  }
                  return !1;
                })(e, s)) ||
              t.preventDefault();
          const l = !!e.premovable.current,
            d = !!e.predroppable.current;
          (e.stats.ctrlKey = t.ctrlKey),
            e.selected && Ye.canMove(e, e.selected, i)
              ? Ze.anim((e) => Ye.selectSquare(e, i), e)
              : Ye.selectSquare(e, i);
          const u = e.selected === i,
            p = r(e, i);
          if (a && p && u && Ye.isDraggable(e, i)) {
            (e.draggable.current = {
              orig: i,
              piece: a,
              origPos: s,
              pos: s,
              started: e.draggable.autoDistance && e.stats.dragged,
              element: p,
              previouslySelected: c,
              originTarget: t.target,
            }),
              (p.cgDragging = !0),
              p.classList.add('dragging');
            const r = e.dom.elements.ghost;
            r &&
              ((r.className = `ghost ${a.color} ${a.role}`),
              ie.translateAbs(
                r,
                ie.posToTranslateAbs(n)(ie.key2pos(i), Ye.whitePov(e))
              ),
              ie.setVisible(r, !0)),
              o(e);
          } else l && Ye.unsetPremove(e), d && Ye.unsetPredrop(e);
          e.dom.redraw();
        }),
        (t.dragNewPiece = function (e, t, n, s) {
          const i = 'a0';
          e.pieces.set(i, t), e.dom.redraw();
          const a = ie.eventPosition(n);
          (e.draggable.current = {
            orig: i,
            piece: t,
            origPos: a,
            pos: a,
            started: !0,
            element: () => r(e, i),
            originTarget: n.target,
            newPiece: !0,
            force: !!s,
          }),
            o(e);
        }),
        (t.move = function (e, t) {
          e.draggable.current &&
            (!t.touches || t.touches.length < 2) &&
            (e.draggable.current.pos = ie.eventPosition(t));
        }),
        (t.end = function (e, t) {
          const o = e.draggable.current;
          if (!o) return;
          if (
            ('touchend' === t.type && !1 !== t.cancelable && t.preventDefault(),
            'touchend' === t.type && o.originTarget !== t.target && !o.newPiece)
          )
            return void (e.draggable.current = void 0);
          Ye.unsetPremove(e), Ye.unsetPredrop(e);
          const n = ie.eventPosition(t) || o.pos,
            r = Ye.getKeyAtDomPos(n, Ye.whitePov(e), e.dom.bounds());
          r && o.started && o.orig !== r
            ? o.newPiece
              ? Ye.dropNewPiece(e, o.orig, r, o.force)
              : ((e.stats.ctrlKey = t.ctrlKey),
                Ye.userMove(e, o.orig, r) && (e.stats.dragged = !0))
            : o.newPiece
            ? e.pieces.delete(o.orig)
            : e.draggable.deleteOnDropOff &&
              !r &&
              (e.pieces.delete(o.orig), Ye.callUserFunction(e.events.change)),
            ((o.orig !== o.previouslySelected || (o.orig !== r && r)) &&
              e.selectable.enabled) ||
              Ye.unselect(e),
            s(e),
            (e.draggable.current = void 0),
            e.dom.redraw();
        }),
        (t.cancel = n);
    }),
    tt = te(function (e, t) {
      function o(e, t) {
        e.exploding &&
          (t ? (e.exploding.stage = t) : (e.exploding = void 0),
          e.dom.redraw());
      }
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.explosion = void 0),
        (t.explosion = function (e, t) {
          (e.exploding = {
            stage: 1,
            keys: t,
          }),
            e.dom.redraw(),
            setTimeout(() => {
              o(e, 2), setTimeout(() => o(e, void 0), 120);
            }, 120);
        });
    }),
    ot = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.start = void 0),
        (t.start = function (e, t) {
          function o() {
            Ye.toggleOrientation(e), t();
          }
          return {
            set(t) {
              t.orientation && t.orientation !== e.orientation && o(),
                (t.fen ? Ze.anim : Ze.render)((e) => Je.configure(e, t), e);
            },
            state: e,
            getFen: () => Xe.write(e.pieces),
            toggleOrientation: o,
            setPieces(t) {
              Ze.anim((e) => Ye.setPieces(e, t), e);
            },
            selectSquare(t, o) {
              t
                ? Ze.anim((e) => Ye.selectSquare(e, t, o), e)
                : e.selected && (Ye.unselect(e), e.dom.redraw());
            },
            move(t, o) {
              Ze.anim((e) => Ye.baseMove(e, t, o), e);
            },
            newPiece(t, o) {
              Ze.anim((e) => Ye.baseNewPiece(e, t, o), e);
            },
            playPremove() {
              if (e.premovable.current) {
                if (Ze.anim(Ye.playPremove, e)) return !0;
                e.dom.redraw();
              }
              return !1;
            },
            playPredrop(t) {
              if (e.predroppable.current) {
                const o = Ye.playPredrop(e, t);
                return e.dom.redraw(), o;
              }
              return !1;
            },
            cancelPremove() {
              Ze.render(Ye.unsetPremove, e);
            },
            cancelPredrop() {
              Ze.render(Ye.unsetPredrop, e);
            },
            cancelMove() {
              Ze.render((e) => {
                Ye.cancelMove(e), et.cancel(e);
              }, e);
            },
            stop() {
              Ze.render((e) => {
                Ye.stop(e), et.cancel(e);
              }, e);
            },
            explode(t) {
              tt.explosion(e, t);
            },
            setAutoShapes(t) {
              Ze.render((e) => (e.drawable.autoShapes = t), e);
            },
            setShapes(t) {
              Ze.render((e) => (e.drawable.shapes = t), e);
            },
            getKeyAtDomPos: (t) =>
              Ye.getKeyAtDomPos(t, Ye.whitePov(e), e.dom.bounds()),
            redrawAll: t,
            dragNewPiece(t, o, n) {
              et.dragNewPiece(e, t, o, n);
            },
            destroy() {
              Ye.stop(e),
                e.dom.unbind && e.dom.unbind(),
                (e.dom.destroyed = !0);
            },
          };
        });
    }),
    nt = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.defaults = void 0),
        (t.defaults = function () {
          return {
            pieces: Xe.read(Xe.initial),
            orientation: 'white',
            turnColor: 'white',
            coordinates: !0,
            autoCastle: !0,
            viewOnly: !1,
            disableContextMenu: !1,
            resizable: !0,
            addPieceZIndex: !1,
            pieceKey: !1,
            highlight: {
              lastMove: !0,
              check: !0,
            },
            animation: {
              enabled: !0,
              duration: 200,
            },
            movable: {
              free: !0,
              color: 'both',
              showDests: !0,
              events: {},
              rookCastle: !0,
            },
            premovable: {
              enabled: !0,
              showDests: !0,
              castle: !0,
              events: {},
            },
            predroppable: {
              enabled: !1,
              events: {},
            },
            draggable: {
              enabled: !0,
              distance: 3,
              autoDistance: !0,
              showGhost: !0,
              deleteOnDropOff: !1,
            },
            dropmode: {
              active: !1,
            },
            selectable: {
              enabled: !0,
            },
            stats: {
              dragged: !('ontouchstart' in window),
            },
            events: {},
            drawable: {
              enabled: !0,
              visible: !0,
              defaultSnapToValidMove: !0,
              eraseOnClick: !0,
              shapes: [],
              autoShapes: [],
              brushes: {
                green: {
                  key: 'g',
                  color: '#15781B',
                  opacity: 1,
                  lineWidth: 10,
                },
                red: {
                  key: 'r',
                  color: '#882020',
                  opacity: 1,
                  lineWidth: 10,
                },
                blue: {
                  key: 'b',
                  color: '#003088',
                  opacity: 1,
                  lineWidth: 10,
                },
                yellow: {
                  key: 'y',
                  color: '#e68f00',
                  opacity: 1,
                  lineWidth: 10,
                },
                paleBlue: {
                  key: 'pb',
                  color: '#003088',
                  opacity: 0.4,
                  lineWidth: 15,
                },
                paleGreen: {
                  key: 'pg',
                  color: '#15781B',
                  opacity: 0.4,
                  lineWidth: 15,
                },
                paleRed: {
                  key: 'pr',
                  color: '#882020',
                  opacity: 0.4,
                  lineWidth: 15,
                },
                paleGrey: {
                  key: 'pgr',
                  color: '#4a4a4a',
                  opacity: 0.35,
                  lineWidth: 15,
                },
              },
              pieces: {
                baseUrl: 'https://lichess1.org/assets/piece/cburnett/',
              },
              prevSvgHash: '',
            },
            hold: ie.timer(),
          };
        });
    }),
    st = te(function (e, t) {
      function o(e) {
        return document.createElementNS('http://www.w3.org/2000/svg', e);
      }

      function n(e, t, o, n, s) {
        const r = e.dom.bounds(),
          i = new Map(),
          c = [];
        for (const e of t) i.set(e.hash, !1);
        let l,
          d = s.firstChild;
        for (; d; )
          (l = d.getAttribute('cgHash')),
            i.has(l) ? i.set(l, !0) : c.push(d),
            (d = d.nextSibling);
        for (const e of c) s.removeChild(e);
        for (const c of t) i.get(c.hash) || s.appendChild(a(e, c, o, n, r));
      }

      function s(
        { orig: e, dest: t, brush: o, piece: n, modifiers: s, customSvg: a },
        c,
        l,
        d
      ) {
        return [
          d.width,
          d.height,
          l,
          e,
          t,
          o,
          t && (c.get(t) || 0) > 1,
          n && r(n),
          s && ((u = s), '' + (u.lineWidth || '')),
          a && i(a),
        ]
          .filter((e) => e)
          .join(',');
        var u;
      }

      function r(e) {
        return [e.color, e.role, e.scale].filter((e) => e).join(',');
      }

      function i(e) {
        let t = 0;
        for (let o = 0; o < e.length; o++)
          t = ((t << 5) - t + e.charCodeAt(o)) >>> 0;
        return 'custom-' + t.toString();
      }

      function a(e, { shape: t, current: n, hash: s }, r, i, a) {
        let c;
        if (t.customSvg) {
          const n = d(ie.key2pos(t.orig), e.orientation);
          c = (function (e, t, n) {
            const { width: s, height: r } = n,
              i = s / 8,
              a = r / 8,
              c = t[0] * i,
              d = (7 - t[1]) * a,
              u = l(o('g'), {
                transform: `translate(${c},${d})`,
              }),
              p = l(o('svg'), {
                width: i,
                height: a,
                viewBox: '0 0 100 100',
              });
            return u.appendChild(p), (p.innerHTML = e), u;
          })(t.customSvg, n, a);
        } else if (t.piece)
          c = (function (e, t, n, s) {
            const r = m(t, s),
              i = (s.width / 8) * (n.scale || 1),
              a =
                n.color[0] +
                ('knight' === n.role ? 'n' : n.role[0]).toUpperCase();
            return l(o('image'), {
              className: `${n.role} ${n.color}`,
              x: r[0] - i / 2,
              y: r[1] - i / 2,
              width: i,
              height: i,
              href: e + a + '.svg',
            });
          })(
            e.drawable.pieces.baseUrl,
            d(ie.key2pos(t.orig), e.orientation),
            t.piece,
            a
          );
        else {
          const s = d(ie.key2pos(t.orig), e.orientation);
          if (t.dest) {
            let f = r[t.brush];
            t.modifiers && (f = u(f, t.modifiers)),
              (c = (function (e, t, n, s, r, i) {
                const a = (function (e, t) {
                    return ((t ? 20 : 10) / 512) * e.width;
                  })(i, r && !s),
                  c = m(t, i),
                  d = m(n, i),
                  u = d[0] - c[0],
                  f = d[1] - c[1],
                  g = Math.atan2(f, u),
                  v = Math.cos(g) * a,
                  b = Math.sin(g) * a;
                return l(o('line'), {
                  stroke: e.color,
                  'stroke-width': p(e, s, i),
                  'stroke-linecap': 'round',
                  'marker-end': 'url(#arrowhead-' + e.key + ')',
                  opacity: h(e, s),
                  x1: c[0],
                  y1: c[1],
                  x2: d[0] - v,
                  y2: d[1] - b,
                });
              })(
                f,
                s,
                d(ie.key2pos(t.dest), e.orientation),
                n,
                (i.get(t.dest) || 0) > 1,
                a
              ));
          } else
            c = (function (e, t, n, s) {
              const r = m(t, s),
                i = (function (e) {
                  const t = e.width / 512;
                  return [3 * t, 4 * t];
                })(s),
                a = (s.width + s.height) / 32;
              return l(o('circle'), {
                stroke: e.color,
                'stroke-width': i[n ? 0 : 1],
                fill: 'none',
                opacity: h(e, n),
                cx: r[0],
                cy: r[1],
                r: a - i[1] / 2,
              });
            })(r[t.brush], s, n, a);
        }
        return c.setAttribute('cgHash', s), c;
      }

      function c(e) {
        const t = l(o('marker'), {
          id: 'arrowhead-' + e.key,
          orient: 'auto',
          markerWidth: 4,
          markerHeight: 8,
          refX: 2.05,
          refY: 2.01,
        });
        return (
          t.appendChild(
            l(o('path'), {
              d: 'M0,0 V4 L3,2 Z',
              fill: e.color,
            })
          ),
          t.setAttribute('cgKey', e.key),
          t
        );
      }

      function l(e, t) {
        for (const o in t) e.setAttribute(o, t[o]);
        return e;
      }

      function d(e, t) {
        return 'white' === t ? e : [7 - e[0], 7 - e[1]];
      }

      function u(e, t) {
        return {
          color: e.color,
          opacity: Math.round(10 * e.opacity) / 10,
          lineWidth: Math.round(t.lineWidth || e.lineWidth),
          key: [e.key, t.lineWidth].filter((e) => e).join(''),
        };
      }

      function p(e, t, o) {
        return (((e.lineWidth || 10) * (t ? 0.85 : 1)) / 512) * o.width;
      }

      function h(e, t) {
        return (e.opacity || 1) * (t ? 0.9 : 1);
      }

      function m(e, t) {
        return [((e[0] + 0.5) * t.width) / 8, ((7.5 - e[1]) * t.height) / 8];
      }
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.setAttributes = t.renderSvg = t.createElement = void 0),
        (t.createElement = o),
        (t.renderSvg = function (e, t, o) {
          const r = e.drawable,
            i = r.current,
            a = i && i.mouseSq ? i : void 0,
            l = new Map(),
            d = e.dom.bounds();
          for (const e of r.shapes.concat(r.autoShapes).concat(a ? [a] : []))
            e.dest && l.set(e.dest, (l.get(e.dest) || 0) + 1);
          const p = r.shapes.concat(r.autoShapes).map((e) => ({
            shape: e,
            current: !1,
            hash: s(e, l, !1, d),
          }));
          a &&
            p.push({
              shape: a,
              current: !0,
              hash: s(a, l, !0, d),
            });
          const h = p.map((e) => e.hash).join(';');
          if (h === e.drawable.prevSvgHash) return;
          e.drawable.prevSvgHash = h;
          const m = t.querySelector('defs'),
            f = t.querySelector('g'),
            g = o.querySelector('g');
          !(function (e, t, o) {
            const n = new Map();
            let s;
            for (const o of t)
              o.shape.dest &&
                ((s = e.brushes[o.shape.brush]),
                o.shape.modifiers && (s = u(s, o.shape.modifiers)),
                n.set(s.key, s));
            const r = new Set();
            let i = o.firstChild;
            for (; i; ) r.add(i.getAttribute('cgKey')), (i = i.nextSibling);
            for (const [e, t] of n.entries()) r.has(e) || o.appendChild(c(t));
          })(r, p, m),
            n(
              e,
              p.filter((e) => !e.shape.customSvg),
              r.brushes,
              l,
              f
            ),
            n(
              e,
              p.filter((e) => e.shape.customSvg),
              r.brushes,
              l,
              g
            );
        }),
        (t.setAttributes = l);
    }),
    rt = te(function (e, t) {
      function o(e, t) {
        const o = ie.createEl('coords', t);
        let n;
        for (const t of e)
          (n = ie.createEl('coord')), (n.textContent = t), o.appendChild(n);
        return o;
      }
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.renderWrap = void 0),
        (t.renderWrap = function (e, t, n) {
          (e.innerHTML = ''), e.classList.add('cg-wrap');
          for (const o of re.colors)
            e.classList.toggle('orientation-' + o, t.orientation === o);
          e.classList.toggle('manipulable', !t.viewOnly);
          const s = ie.createEl('cg-helper');
          e.appendChild(s);
          const r = ie.createEl('cg-container');
          s.appendChild(r);
          const i = ie.createEl('cg-board');
          let a, c, l;
          if (
            (r.appendChild(i),
            t.drawable.visible &&
              !n &&
              ((a = st.setAttributes(st.createElement('svg'), {
                class: 'cg-shapes',
              })),
              a.appendChild(st.createElement('defs')),
              a.appendChild(st.createElement('g')),
              (c = st.setAttributes(st.createElement('svg'), {
                class: 'cg-custom-svgs',
              })),
              c.appendChild(st.createElement('g')),
              r.appendChild(a),
              r.appendChild(c)),
            t.coordinates)
          ) {
            const e = 'black' === t.orientation ? ' black' : '';
            r.appendChild(o(re.ranks, 'ranks' + e)),
              r.appendChild(o(re.files, 'files' + e));
          }
          return (
            t.draggable.showGhost &&
              !n &&
              ((l = ie.createEl('piece', 'ghost')),
              ie.setVisible(l, !1),
              r.appendChild(l)),
            {
              board: i,
              container: r,
              ghost: l,
              svg: a,
              customSvg: c,
            }
          );
        });
    }),
    it = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.drop = t.cancelDropMode = t.setDropMode = void 0),
        (t.setDropMode = function (e, t) {
          (e.dropmode = {
            active: !0,
            piece: t,
          }),
            et.cancel(e);
        }),
        (t.cancelDropMode = function (e) {
          e.dropmode = {
            active: !1,
          };
        }),
        (t.drop = function (e, t) {
          if (!e.dropmode.active) return;
          Ye.unsetPremove(e), Ye.unsetPredrop(e);
          const o = e.dropmode.piece;
          if (o) {
            e.pieces.set('a0', o);
            const n = ie.eventPosition(t),
              s = n && Ye.getKeyAtDomPos(n, Ye.whitePov(e), e.dom.bounds());
            s && Ye.dropNewPiece(e, 'a0', s);
          }
          e.dom.redraw();
        });
    }),
    at = te(function (e, t) {
      function o(e, t, o, n) {
        return (
          e.addEventListener(t, o, n), () => e.removeEventListener(t, o, n)
        );
      }

      function n(e, t, o) {
        return (n) => {
          e.drawable.current
            ? e.drawable.enabled && o(e, n)
            : e.viewOnly || t(e, n);
        };
      }
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.bindDocument = t.bindBoard = void 0),
        (t.bindBoard = function (e, t) {
          const o = e.dom.elements.board;
          if (!e.dom.relative && e.resizable && 'ResizeObserver' in window) {
            new window.ResizeObserver(t).observe(o);
          }
          if (e.viewOnly) return;
          const n = (function (e) {
            return (t) => {
              e.draggable.current
                ? et.cancel(e)
                : e.drawable.current
                ? Qe.cancel(e)
                : t.shiftKey || ie.isRightButton(t)
                ? e.drawable.enabled && Qe.start(e, t)
                : e.viewOnly ||
                  (e.dropmode.active ? it.drop(e, t) : et.start(e, t));
            };
          })(e);
          o.addEventListener('touchstart', n, {
            passive: !1,
          }),
            o.addEventListener('mousedown', n, {
              passive: !1,
            }),
            (e.disableContextMenu || e.drawable.enabled) &&
              o.addEventListener('contextmenu', (e) => e.preventDefault());
        }),
        (t.bindDocument = function (e, t) {
          const s = [];
          if (
            (e.dom.relative ||
              !e.resizable ||
              'ResizeObserver' in window ||
              s.push(o(document.body, 'chessground.resize', t)),
            !e.viewOnly)
          ) {
            const t = n(e, et.move, Qe.move),
              r = n(e, et.end, Qe.end);
            for (const e of ['touchmove', 'mousemove'])
              s.push(o(document, e, t));
            for (const e of ['touchend', 'mouseup']) s.push(o(document, e, r));
            const i = () => e.dom.bounds.clear();
            s.push(
              o(document, 'scroll', i, {
                capture: !0,
                passive: !0,
              })
            ),
              s.push(
                o(window, 'resize', i, {
                  passive: !0,
                })
              );
          }
          return () => s.forEach((e) => e());
        });
    }),
    ct = te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.updateBounds = t.render = void 0);
      const o = ie;

      function n(e) {
        return 'PIECE' === e.tagName;
      }

      function s(e) {
        return 'SQUARE' === e.tagName;
      }

      function r(e, t) {
        for (const o of t) e.dom.elements.board.removeChild(o);
      }

      function i(e, t) {
        let o = 2 + 8 * e[1] + (7 - e[0]);
        return t && (o = 67 - o), o + '';
      }

      function a(e) {
        return `${e.color} ${e.role}`;
      }

      function c(e, t, o) {
        const n = e.get(t);
        n ? e.set(t, `${n} ${o}`) : e.set(t, o);
      }

      function l(e, t, o) {
        const n = e.get(t);
        n ? n.push(o) : e.set(t, [o]);
      }
      (t.render = function (e) {
        const t = Ye.whitePov(e),
          d = e.dom.relative
            ? o.posToTranslateRel
            : o.posToTranslateAbs(e.dom.bounds()),
          u = e.dom.relative ? o.translateRel : o.translateAbs,
          p = e.dom.elements.board,
          h = e.pieces,
          m = e.animation.current,
          f = m ? m.plan.anims : new Map(),
          g = m ? m.plan.fadings : new Map(),
          v = e.draggable.current,
          b = (function (e) {
            var t;
            const o = new Map();
            if (e.lastMove && e.highlight.lastMove)
              for (const t of e.lastMove) c(o, t, 'last-move');
            e.check && e.highlight.check && c(o, e.check, 'check');
            if (
              e.selected &&
              (c(o, e.selected, 'selected'), e.movable.showDests)
            ) {
              const n =
                null === (t = e.movable.dests) || void 0 === t
                  ? void 0
                  : t.get(e.selected);
              if (n)
                for (const t of n)
                  c(o, t, 'move-dest' + (e.pieces.has(t) ? ' oc' : ''));
              const s = e.premovable.dests;
              if (s)
                for (const t of s)
                  c(o, t, 'premove-dest' + (e.pieces.has(t) ? ' oc' : ''));
            }
            const n = e.premovable.current;
            if (n) for (const e of n) c(o, e, 'current-premove');
            else
              e.predroppable.current &&
                c(o, e.predroppable.current.key, 'current-premove');
            const s = e.exploding;
            if (s) for (const e of s.keys) c(o, e, 'exploding' + s.stage);
            return o;
          })(e),
          y = new Set(),
          w = new Set(),
          k = new Map(),
          P = new Map();
        let M, C, T, x, S, O, _, A, j, L;
        for (C = p.firstChild; C; ) {
          if (((M = C.cgKey), n(C)))
            if (
              ((T = h.get(M)),
              (S = f.get(M)),
              (O = g.get(M)),
              (x = C.cgPiece),
              !C.cgDragging ||
                (v && v.orig === M) ||
                (C.classList.remove('dragging'),
                u(C, d(ie.key2pos(M), t)),
                (C.cgDragging = !1)),
              !O &&
                C.cgFading &&
                ((C.cgFading = !1), C.classList.remove('fading')),
              T)
            ) {
              if (S && C.cgAnimating && x === a(T)) {
                const e = ie.key2pos(M);
                (e[0] += S[2]),
                  (e[1] += S[3]),
                  C.classList.add('anim'),
                  u(C, d(e, t));
              } else
                C.cgAnimating &&
                  ((C.cgAnimating = !1),
                  C.classList.remove('anim'),
                  u(C, d(ie.key2pos(M), t)),
                  e.addPieceZIndex && (C.style.zIndex = i(ie.key2pos(M), t)));
              x !== a(T) || (O && C.cgFading)
                ? O && x === a(O)
                  ? (C.classList.add('fading'), (C.cgFading = !0))
                  : l(k, x, C)
                : y.add(M);
            } else l(k, x, C);
          else if (s(C)) {
            const e = C.className;
            b.get(M) === e ? w.add(M) : l(P, e, C);
          }
          C = C.nextSibling;
        }
        for (const [e, o] of b)
          if (!w.has(e)) {
            (j = P.get(o)), (L = j && j.pop());
            const n = d(ie.key2pos(e), t);
            if (L) (L.cgKey = e), u(L, n);
            else {
              const t = ie.createEl('square', o);
              (t.cgKey = e), u(t, n), p.insertBefore(t, p.firstChild);
            }
          }
        for (const [o, n] of h)
          if (((S = f.get(o)), !y.has(o)))
            if (((_ = k.get(a(n))), (A = _ && _.pop()), A)) {
              (A.cgKey = o),
                A.cgFading && (A.classList.remove('fading'), (A.cgFading = !1));
              const n = ie.key2pos(o);
              e.addPieceZIndex && (A.style.zIndex = i(n, t)),
                S &&
                  ((A.cgAnimating = !0),
                  A.classList.add('anim'),
                  (n[0] += S[2]),
                  (n[1] += S[3])),
                u(A, d(n, t));
            } else {
              const s = a(n),
                r = ie.createEl('piece', s),
                c = ie.key2pos(o);
              (r.cgPiece = s),
                (r.cgKey = o),
                S && ((r.cgAnimating = !0), (c[0] += S[2]), (c[1] += S[3])),
                u(r, d(c, t)),
                e.addPieceZIndex && (r.style.zIndex = i(c, t)),
                p.appendChild(r);
            }
        for (const t of k.values()) r(e, t);
        for (const t of P.values()) r(e, t);
      }),
        (t.updateBounds = function (e) {
          if (e.dom.relative) return;
          const t = Ye.whitePov(e),
            r = o.posToTranslateAbs(e.dom.bounds());
          let i = e.dom.elements.board.firstChild;
          for (; i; )
            ((n(i) && !i.cgAnimating) || s(i)) &&
              o.translateAbs(i, r(ie.key2pos(i.cgKey), t)),
              (i = i.nextSibling);
        });
    }),
    lt = te(function (e, t) {
      function o(e) {
        let t = !1;
        return () => {
          t ||
            ((t = !0),
            requestAnimationFrame(() => {
              e(), (t = !1);
            }));
        };
      }
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.Chessground = void 0),
        (t.Chessground = function (e, t) {
          const n = nt.defaults();

          function s() {
            const t = 'dom' in n ? n.dom.unbind : void 0,
              s = n.viewOnly && !n.drawable.visible,
              r = rt.renderWrap(e, n, s),
              i = ie.memo(() => r.board.getBoundingClientRect()),
              a = (e) => {
                ct.render(l),
                  !e && r.svg && st.renderSvg(l, r.svg, r.customSvg);
              },
              c = () => {
                i.clear(),
                  ct.updateBounds(l),
                  r.svg && st.renderSvg(l, r.svg, r.customSvg);
              },
              l = n;
            return (
              (l.dom = {
                elements: r,
                bounds: i,
                redraw: o(a),
                redrawNow: a,
                unbind: t,
                relative: s,
              }),
              (l.drawable.prevSvgHash = ''),
              a(!1),
              at.bindBoard(l, c),
              t || (l.dom.unbind = at.bindDocument(l, c)),
              l.events.insert && l.events.insert(r),
              l
            );
          }
          return Je.configure(n, t || {}), ot.start(s(), s);
        });
    }),
    dt = ee(
      te(function (e, t) {
        Object.defineProperty(t, '__esModule', {
          value: !0,
        });
        t.default = () => {
          const e = {
            blue: '#DEE3E6 #788a94',
            blue2: '#97b2c7 #546f82',
            blue3: '#d9e0e6 #315991',
            canvas: '#d7daeb #547388',
            wood: '#d8a45b #9b4d0f',
            wood2: '#a38b5d #6c5017',
            wood3: '#d0ceca #755839',
            wood4: '#caaf7d #7b5330',
            maple: '#e8ceab #bc7944',
            maple2: '#E2C89F #996633',
            leather: '#d1d1c9 #c28e16',
            green: '#FFFFDD #6d8753',
            brown: '#F0D9B5 #946f51',
            pink: '#E8E9B7 #ED7272',
            marble: '#93ab91 #4f644e',
            'blue-marble': '#EAE6DD #7C7F87',
            'green-plastic': '#f2f9bb #59935d',
            grey: '#b8b8b8 #7d7d7d',
            metal: '#c9c9c9 #727272',
            olive: '#b8b19f #6d6655',
            newspaper: '#fff #8d8d8d',
            purple: '#9f90b0 #7d4a8d',
            'purple-diag': '#E5DAF0 #957AB0',
            ic: '#ececec #c1c18e',
            horsey: '#F0D9B5 #946f51',
          };
          for (const t of document.body.className.split(' '))
            if (t in e) {
              const o = document.documentElement.style,
                n = e[t].split(' ');
              o.setProperty('--cg-coord-color-white', n[0]),
                o.setProperty('--cg-coord-color-black', n[1]),
                o.setProperty('--cg-coord-shadow', 'none');
            }
        };
      })
    ),
    ut = ee(
      te(function (e, t) {
        function o(e) {
          var t;
          return e.clientX || 0 === e.clientX
            ? [e.clientX, e.clientY]
            : (null === (t = e.targetTouches) || void 0 === t ? void 0 : t[0])
            ? [e.targetTouches[0].clientX, e.targetTouches[0].clientY]
            : void 0;
        }
        Object.defineProperty(t, '__esModule', {
          value: !0,
        }),
          (t.default = function (e, t, n, s) {
            if (0 === t) return;
            const r = document.createElement('cg-resize');
            e.container.appendChild(r);
            const i = (e) => {
              e.preventDefault();
              const t = 'touchstart' === e.type ? 'touchmove' : 'mousemove',
                n = 'touchstart' === e.type ? 'touchend' : 'mouseup',
                s = o(e),
                r = parseInt(
                  getComputedStyle(document.body).getPropertyValue('--zoom')
                );
              let i = r;
              const a = be.default(
                  () =>
                    se.text(`/pref/zoom?v=${100 + i}`, {
                      method: 'post',
                    }),
                  700
                ),
                c = (e) => {
                  const t = o(e),
                    n = t[0] - s[0] + t[1] - s[1];
                  (i = Math.round(Math.min(100, Math.max(0, r + n / 10)))),
                    document.body.setAttribute('style', '--zoom:' + i),
                    window.dispatchEvent(new Event('resize')),
                    a();
                };
              document.body.classList.add('resizing'),
                document.addEventListener(t, c),
                document.addEventListener(
                  n,
                  () => {
                    document.removeEventListener(t, c),
                      document.body.classList.remove('resizing');
                  },
                  {
                    once: !0,
                  }
                );
            };
            if (
              (r.addEventListener('touchstart', i, {
                passive: !1,
              }),
              r.addEventListener('mousedown', i, {
                passive: !1,
              }),
              1 === t)
            ) {
              const e = (e) => r.classList.toggle('none', s ? !s(e) : e >= 2);
              e(n), lichess.pubsub.on('ply', e);
            }
          });
      })
    );

  function pt(e) {
    const t = e.data,
      o = e.makeCgHooks(),
      n = ze(t, e.ply),
      s = e.isPlaying();
    return {
      fen: n.fen,
      orientation: mt(t, e.flip),
      turnColor: n.ply % 2 == 0 ? 'white' : 'black',
      lastMove: le(n.uci),
      check: !!n.check,
      coordinates: 0 !== t.pref.coords,
      addPieceZIndex: e.data.pref.is3d,
      highlight: {
        lastMove: t.pref.highlight,
        check: t.pref.highlight,
      },
      events: {
        move: o.onMove,
        dropNewPiece: o.onNewPiece,
        insert(o) {
          ut(o, e.data.pref.resizeHandle, e.ply), 1 === t.pref.coords && dt();
        },
      },
      movable: {
        free: !1,
        color: s ? t.player.color : void 0,
        dests: s ? pe(t.possibleMoves) : new Map(),
        showDests: t.pref.destination,
        rookCastle: t.pref.rookCastle,
        events: {
          after: o.onUserMove,
          afterNewPiece: o.onUserNewPiece,
        },
      },
      animation: {
        enabled: !0,
        duration: t.pref.animationDuration,
      },
      premovable: {
        enabled: t.pref.enablePremove,
        showDests: t.pref.destination,
        castle: 'antichess' !== t.game.variant.key,
        events: {
          set: o.onPremove,
          unset: o.onCancelPremove,
        },
      },
      predroppable: {
        enabled: t.pref.enablePremove && 'crazyhouse' === t.game.variant.key,
        events: {
          set: o.onPredrop,
          unset() {
            o.onPredrop(void 0);
          },
        },
      },
      draggable: {
        enabled: 0 !== t.pref.moveEvent,
        showGhost: t.pref.highlight,
      },
      selectable: {
        enabled: 1 !== t.pref.moveEvent,
      },
      drawable: {
        enabled: !0,
        defaultSnapToValidMove: '0' != (lichess.storage.get('arrow.snap') || 1),
      },
      disableContextMenu: !0,
    };
  }

  function ht(e, t, o) {
    const n = e.state.pieces.get(t);
    n &&
      'pawn' === n.role &&
      e.setPieces(
        new Map([
          [
            t,
            {
              color: n.color,
              role: o,
              promoted: !0,
            },
          ],
        ])
      );
  }

  function mt(e, t) {
    return 'racingKings' === e.game.variant.key
      ? t
        ? 'black'
        : 'white'
      : t
      ? e.opponent.color
      : e.player.color;
  }

  function ft(e) {
    return h('div.cg-wrap', {
      hook: de((t) => e.setChessground(lt.Chessground(t, pt(e)))),
    });
  }
  var gt = ee(
      te(function (e, t) {
        Object.defineProperty(t, '__esModule', {
          value: !0,
        });
        let o = [],
          n = !1;

        function s(e) {
          const t = lichess.storage.make('just-notified');
          if (document.hasFocus() || Date.now() - parseInt(t.get(), 10) < 1e3)
            return;
          t.set('' + Date.now()), $.isFunction(e) && (e = e());
          const s = new Notification('lichess.org', {
            icon: lichess.assetUrl('logo/lichess-favicon-256.png', {
              noVersion: !0,
            }),
            body: e,
          });
          (s.onclick = () => window.focus()),
            o.push(s),
            n ||
              ((n = !0),
              window.addEventListener('focus', () => {
                o.forEach((e) => e.close()), (o = []);
              }));
        }
        t.default = function (e) {
          !document.hasFocus() &&
            'Notification' in window &&
            'granted' === Notification.permission &&
            setTimeout(s, 10 + 500 * Math.random(), e);
        };
      })
    ),
    vt = ee(
      te(function (e, t) {
        Object.defineProperty(t, '__esModule', {
          value: !0,
        }),
          (t.default = function (e, t) {
            let o,
              n = 0;
            return function (...s) {
              const r = this,
                i = performance.now() - n;

              function a() {
                (o = void 0), (n = performance.now()), t.apply(r, s);
              }
              o && clearTimeout(o), i > e ? a() : (o = setTimeout(a, e - i));
            };
          });
      })
    ),
    bt = ee(
      te(function (e, t) {
        function o(e, t, n) {
          o.close();
          const s = $(
              '<div id="modal-wrap"><span class="close" data-icon="L"></span></div>'
            ),
            r = $(`<div id="modal-overlay" class="${t}">`).on('click', o.close);
          return (
            s.appendTo(r),
            e.clone().removeClass('none').appendTo(s),
            (o.onClose = n),
            s.find('.close').on('click', o.close),
            s.on('click', (e) => e.stopPropagation()),
            $('body').addClass('overlayed').prepend(r),
            s
          );
        }
        Object.defineProperty(t, '__esModule', {
          value: !0,
        }),
          (t.default = o),
          (o.close = () => {
            $('body').removeClass('overlayed'),
              $('#modal-overlay').each(function () {
                o.onClose && o.onClose(), $(this).remove();
              }),
              delete o.onClose;
          }),
          (o.onClose = void 0);
      })
    );
  const yt = (e) => se.json(e.data.url.round),
    wt = vt(1e3, (e) =>
      se.text('/pref/zen', {
        method: 'post',
        body: se.form({
          zen: e ? 1 : 0,
        }),
      })
    ),
    kt = (e) => vt(100, () => lichess.sound.play(e)),
    Pt = kt('move'),
    Mt = kt('capture'),
    Ct = kt('check'),
    Tt = kt('explosion');

  function xt(e, t, o) {
    let n,
      s = 0;
    return function (...r) {
      const i = this,
        a = performance.now() - s;

      function c() {
        (n = void 0), (s = performance.now()), (e *= t), o.apply(i, r);
      }
      n && clearTimeout(n), a > e ? c() : (n = setTimeout(c, e - a));
    };
  }
  const St = document.title;
  let Ot = 0;
  const _t = [
    '/assets/logo/lichess-favicon-32.png',
    '/assets/logo/lichess-favicon-32-invert.png',
  ].map((e, t) => () => {
    Ot !== t && ((document.getElementById('favicon').href = e), (Ot = t));
  });
  let At, jt, Lt;

  function Dt() {
    At && clearTimeout(At), (At = void 0), _t[0]();
  }

  function Et(e, t) {
    e.data.player.spectator ||
      (t ||
        (He.aborted(e.data) || He.finished(e.data)
          ? (t = e.noarg('gameOver'))
          : Ue.isPlayerTurn(e.data)
          ? ((t = e.noarg('yourTurn')),
            document.hasFocus() ||
              At ||
              (At = setTimeout(function e() {
                document.hasFocus() ||
                  (_t[1 - Ot](), (At = setTimeout(e, 1e3)));
              }, 200)))
          : ((t = e.noarg('waitingForOpponent')), Dt())),
      (document.title = `${t} - ${St}`));
  }

  function Nt(e, t, o, n, s) {
    return ht(e.chessground, o, n), e.sendMove(t, o, n, s), !0;
  }

  function $t(e, t, o, n = {}) {
    var s;
    const r = e.data,
      i = e.chessground.state.pieces.get(o),
      a = e.chessground.state.pieces.get(t);
    return (
      !(
        !((i && 'pawn' === i.role && !a) || (a && 'pawn' === a.role)) ||
        !(
          ('8' === o[1] && 'white' === r.player.color) ||
          ('1' === o[1] && 'black' === r.player.color)
        )
      ) &&
      (Lt && n && n.premove
        ? Nt(e, t, o, Lt, n)
        : n.ctrlKey ||
          jt ||
          !(
            3 === r.pref.autoQueen ||
            (2 === r.pref.autoQueen && a) ||
            (null === (s = e.keyboardMove) || void 0 === s
              ? void 0
              : s.justSelected())
          )
        ? ((jt = {
            move: [t, o],
            pre: !!a,
            meta: n,
          }),
          e.redraw(),
          !0)
        : (a ? Rt(e, o, 'queen') : Nt(e, t, o, 'queen', n), !0))
    );
  }

  function Rt(e, t, o) {
    (Lt = o),
      e.chessground.setAutoShapes([
        {
          orig: t,
          piece: {
            color: e.data.player.color,
            role: o,
            opacity: 0.8,
          },
          brush: '',
        },
      ]);
  }

  function Bt(e) {
    Lt && (e.chessground.setAutoShapes([]), (Lt = void 0), e.redraw());
  }

  function It(e) {
    Bt(e),
      e.chessground.cancelPremove(),
      jt && yt(e).then(e.reload, lichess.reload),
      (jt = void 0);
  }

  function qt(e, t, o, n, s) {
    let r = 12.5 * (7 - ie.key2pos(t)[0]);
    'white' === s && (r = 87.5 - r);
    return h(
      'div#promotion-choice.' + (n === s ? 'top' : 'bottom'),
      {
        hook: de((t) => {
          t.addEventListener('click', () => It(e)),
            t.addEventListener('contextmenu', (e) => (e.preventDefault(), !1));
        }),
      },
      o.map((t, o) =>
        h(
          'square',
          {
            attrs: {
              style: `top:${12.5 * (n === s ? o : 7 - o)}%;left:${r}%`,
            },
            hook: ue('click', (o) => {
              o.stopPropagation(),
                (function (e, t) {
                  if (jt) {
                    const o = jt;
                    (jt = void 0),
                      o.pre
                        ? Rt(e, o.move[1], t)
                        : Nt(e, o.move[0], o.move[1], t, o.meta),
                      e.redraw();
                  }
                })(e, t);
            }),
          },
          [h(`piece.${t}.${n}`)]
        )
      )
    );
  }
  const Ft = ['queen', 'knight', 'rook', 'bishop'];

  function Gt(e) {
    if (jt)
      return qt(
        e,
        jt.move[1],
        'antichess' === e.data.game.variant.key ? Ft.concat('king') : Ft,
        e.data.player.color,
        e.chessground.state.orientation
      );
  }
  let zt = 0,
    Kt = 0;

  function Ht() {
    return zt >= Kt;
  }
  var Vt = ee(
    te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      }),
        (t.default = function (e) {
          const t = e.trans.noarg,
            o = e.data;
          switch (o.game.status.name) {
            case 'started':
              return t('playingRightNow');
            case 'aborted':
              return t('gameAborted');
            case 'mate':
              return t('checkmate');
            case 'resign':
              return t(
                'white' == o.game.winner ? 'blackResigned' : 'whiteResigned'
              );
            case 'stalemate':
              return t('stalemate');
            case 'timeout':
              switch (o.game.winner) {
                case 'white':
                  return t('blackLeftTheGame');
                case 'black':
                  return t('whiteLeftTheGame');
              }
              return t('draw');
            case 'draw':
              return t('draw');
            case 'outoftime':
              return `${
                o.game.turns % 2 == 0 ? t('whiteTimeOut') : t('blackTimeOut')
              }${o.game.winner ? '' : ` • ${t('draw')}`}`;
            case 'noStart':
              return (
                ('white' == o.game.winner ? 'Black' : 'White') + " didn't move"
              );
            case 'cheat':
              return 'Cheat detected';
            case 'variantEnd':
              switch (o.game.variant.key) {
                case 'kingOfTheHill':
                  return t('kingInTheCenter');
                case 'threeCheck':
                  return t('threeChecks');
              }
              return t('variantEnding');
            case 'unknownFinish':
              return 'Finished';
            default:
              return o.game.status.name;
          }
        });
    })
  );
  const Ut = (e) => (t) => {
      !window.LichessSpeech && t
        ? lichess.loadModule('speech').then(() => Wt(e))
        : window.LichessSpeech && !t && (window.LichessSpeech = void 0);
    },
    Wt = (e) => {
      const t = Vt(e);
      if ('playingRightNow' == t)
        window.LichessSpeech.step(e.stepAt(e.ply), !1);
      else {
        Yt((e) => e.say(t, !1));
        const o = e.data.game.winner;
        o && Yt((t) => t.say(e.noarg(o + 'IsVictorious'), !1));
      }
    },
    Yt = (e) => window.LichessSpeech && e(window.LichessSpeech);
  var Xt = te(function (e, t) {
    function o(e, t, o) {
      return (
        (o ? '/embed/' : '/') + (e.game ? e.game.id : e) + (t ? '/' + t : '')
      );
    }
    Object.defineProperty(t, '__esModule', {
      value: !0,
    }),
      (t.cont = t.game = void 0),
      (t.game = o),
      (t.cont = function (e, t) {
        return o(e) + '/continue/' + t;
      });
  });

  function Jt(e) {
    const t = e.data,
      o =
        Xt.game(
          t,
          'racingKings' === (n = t).game.variant.key ? 'white' : n.player.color
        ) +
        '#' +
        e.ply;
    var n;
    return Ue.replayable(t)
      ? h(
          'a.fbt',
          {
            attrs: {
              href: o,
            },
            hook: ue('click', (e) => {
              location.pathname === o.split('#')[0] && location.reload();
            }),
          },
          e.noarg('analysis')
        )
      : null;
  }

  function Zt(e, t, o, n, s, r) {
    const i = () => !t || t(e.data);
    return h(
      'button.fbt.' + s,
      {
        attrs: {
          disabled: !i(),
          title: e.noarg(n),
        },
        hook: ue('click', (t) => {
          i() && (r ? r() : e.socket.sendLoading(s));
        }),
      },
      [h('span', 'offerDraw' == n ? ['½'] : e.nvui ? [e.noarg(n)] : ce(o))]
    );
  }

  function Qt(e) {
    const t = e.opponentGone();
    return !0 === t
      ? h('div.suggestion', [
          h(
            'p',
            {
              hook: go,
            },
            e.noarg('opponentLeftChoices')
          ),
          h(
            'button.button',
            {
              hook: ue('click', () => e.socket.sendLoading('resign-force')),
            },
            e.noarg('forceResignation')
          ),
          h(
            'button.button',
            {
              hook: ue('click', () => e.socket.sendLoading('draw-force')),
            },
            e.noarg('forceDraw')
          ),
        ])
      : t
      ? h('div.suggestion', [
          h(
            'p',
            e.trans.vdomPlural('opponentLeftCounter', t, h('strong', '' + t))
          ),
        ])
      : null;
  }
  const eo = (e, t) =>
      h('button.fbt.no', {
        attrs: {
          title: e.noarg('cancel'),
          'data-icon': 'L',
        },
        hook: ue('click', () => t(!1)),
      }),
    to = (e) =>
      h('div.act-confirm', [
        h('button.fbt.yes', {
          attrs: {
            title: e.noarg('resign'),
            'data-icon': 'b',
          },
          hook: ue('click', () => e.resign(!0)),
        }),
        eo(e, e.resign),
      ]),
    oo = (e) =>
      h('div.act-confirm', [
        h(
          'button.fbt.yes.draw-yes',
          {
            attrs: {
              title: e.noarg('offerDraw'),
            },
            hook: ue('click', () => e.offerDraw(!0)),
          },
          h('span', '½')
        ),
        eo(e, e.offerDraw),
      ]);

  function no(e) {
    return e.data.game.threefold
      ? h('div.suggestion', [
          h(
            'p',
            {
              hook: go,
            },
            e.noarg('threefoldRepetition')
          ),
          h(
            'button.button',
            {
              hook: ue('click', () => e.socket.sendLoading('draw-claim')),
            },
            e.noarg('claimADraw')
          ),
        ])
      : null;
  }

  function so(e) {
    return e.data.player.offeringDraw
      ? h('div.pending', [h('p', e.noarg('drawOfferSent'))])
      : null;
  }

  function ro(e) {
    return e.data.opponent.offeringDraw
      ? h('div.negotiation.draw', [
          co(e, () => e.socket.sendLoading('draw-no')),
          h('p', e.noarg('yourOpponentOffersADraw')),
          ao(e, 'draw-yes', () => e.socket.sendLoading('draw-yes')),
        ])
      : null;
  }

  function io(e) {
    return e.data.player.proposingTakeback
      ? h('div.pending', [
          h('p', e.noarg('takebackPropositionSent')),
          h(
            'button.button',
            {
              hook: ue('click', () => e.socket.sendLoading('takeback-no')),
            },
            e.noarg('cancel')
          ),
        ])
      : null;
  }

  function ao(e, t, o, n = 'accept') {
    const s = e.noarg(n);
    return e.nvui
      ? h(
          'button.' + t,
          {
            hook: ue('click', o),
          },
          s
        )
      : h('a.accept', {
          attrs: {
            'data-icon': 'E',
            title: s,
          },
          hook: ue('click', o),
        });
  }

  function co(e, t, o = 'decline') {
    const n = e.noarg(o);
    return e.nvui
      ? h(
          'button',
          {
            hook: ue('click', t),
          },
          n
        )
      : h('a.decline', {
          attrs: {
            'data-icon': 'L',
            title: n,
          },
          hook: ue('click', t),
        });
  }

  function lo(e) {
    return e.data.opponent.proposingTakeback
      ? h('div.negotiation.takeback', [
          co(e, () => e.socket.sendLoading('takeback-no')),
          h('p', e.noarg('yourOpponentProposesATakeback')),
          ao(e, 'takeback-yes', e.takebackYes),
        ])
      : null;
  }

  function uo(e) {
    var t;
    const o = e.data;
    return (null === (t = o.tournament) || void 0 === t ? void 0 : t.running)
      ? h('div.follow-up', [
          h(
            'a.text.fbt.strong.glowing',
            {
              attrs: {
                'data-icon': 'G',
                href: '/tournament/' + o.tournament.id,
              },
              hook: ue('click', e.setRedirecting),
            },
            e.noarg('backToTournament')
          ),
          h(
            'form',
            {
              attrs: {
                method: 'post',
                action: '/tournament/' + o.tournament.id + '/withdraw',
              },
            },
            [h('button.text.fbt.weak', ce('Z'), 'Pause')]
          ),
          Jt(e),
        ])
      : void 0;
  }

  function po(e) {
    var t;
    const o = e.data;
    return (null === (t = o.swiss) || void 0 === t ? void 0 : t.running)
      ? h('div.follow-up', [
          h(
            'a.text.fbt.strong.glowing',
            {
              attrs: {
                'data-icon': 'G',
                href: '/swiss/' + o.swiss.id,
              },
              hook: ue('click', e.setRedirecting),
            },
            e.noarg('backToTournament')
          ),
          Jt(e),
        ])
      : void 0;
  }

  function ho(e) {
    return Ue.moretimeable(e.data)
      ? h('a.moretime', {
          attrs: {
            title: e.data.clock
              ? e.trans('giveNbSeconds', e.data.clock.moretime)
              : e.noarg('giveMoreTime'),
            'data-icon': 'O',
          },
          hook: ue('click', e.socket.moreTime),
        })
      : null;
  }

  function mo(e) {
    const t = e.data,
      o =
        !t.game.rematch &&
        (He.finished(t) || He.aborted(t)) &&
        !t.tournament &&
        !t.simul &&
        !t.swiss &&
        !t.game.boosted,
      n =
        (He.finished(t) || He.aborted(t)) &&
        ('lobby' === t.game.source || 'pool' === t.game.source),
      s = e.challengeRematched
        ? [
            h(
              'div.suggestion.text',
              {
                hook: go,
              },
              e.noarg('rematchOfferSent')
            ),
          ]
        : o || t.game.rematch
        ? (function (e) {
            const t = e.data,
              o = !!t.player.offeringRematch,
              n = !!t.opponent.offeringRematch,
              s = e.noarg;
            return [
              n
                ? h(
                    'button.rematch-decline',
                    {
                      attrs: {
                        'data-icon': 'L',
                        title: s('decline'),
                      },
                      hook: ue('click', () => e.socket.send('rematch-no')),
                    },
                    e.nvui ? s('decline') : ''
                  )
                : null,
              h(
                'button.fbt.rematch.white',
                {
                  class: {
                    me: o,
                    glowing: n,
                    disabled:
                      !o &&
                      !(
                        t.opponent.onGame ||
                        (!t.clock && t.player.user && t.opponent.user)
                      ),
                  },
                  attrs: {
                    title: n
                      ? s('yourOpponentWantsToPlayANewGameWithYou')
                      : o
                      ? s('rematchOfferSent')
                      : '',
                  },
                  hook: ue(
                    'click',
                    (t) => {
                      const o = e.data;
                      o.game.rematch
                        ? (location.href = Xt.game(
                            o.game.rematch,
                            o.opponent.color
                          ))
                        : o.player.offeringRematch
                        ? ((o.player.offeringRematch = !1),
                          e.socket.send('rematch-no'))
                        : o.opponent.onGame
                        ? ((o.player.offeringRematch = !0),
                          e.socket.send('rematch-yes'))
                        : t.currentTarget.classList.contains('disabled') ||
                          e.challengeRematch();
                    },
                    e.redraw
                  ),
                },
                [
                  o
                    ? h(
                        'div.spinner',
                        {
                          'aria-label': 'loading',
                        },
                        [
                          h(
                            'svg',
                            {
                              attrs: {
                                viewBox: '0 0 40 40',
                              },
                            },
                            [
                              h('circle', {
                                attrs: {
                                  cx: 20,
                                  cy: 20,
                                  r: 18,
                                  fill: 'none',
                                },
                              }),
                            ]
                          ),
                        ]
                      )
                    : h('span', s('rematch')),
                ]
              ),
            ];
          })(e)
        : [];
    return h('div.follow-up', [
      ...s,
      t.tournament
        ? h(
            'a.fbt',
            {
              attrs: {
                href: '/tournament/' + t.tournament.id,
              },
            },
            e.noarg('viewTournament')
          )
        : null,
      t.swiss
        ? h(
            'a.fbt',
            {
              attrs: {
                href: '/swiss/' + t.swiss.id,
              },
            },
            e.noarg('viewTournament')
          )
        : null,
      n
        ? h(
            'a.fbt',
            {
              attrs: {
                href:
                  'pool' === t.game.source
                    ? ((r = t.clock),
                      (i = t.opponent.user),
                      '/#pool/' +
                        r.initial / 60 +
                        '+' +
                        r.increment +
                        (i ? '/' + i.id : ''))
                    : '/?hook_like=' + t.game.id,
              },
            },
            e.noarg('newOpponent')
          )
        : null,
      Jt(e),
    ]);
    var r, i;
  }

  function fo(e) {
    const t = e.data,
      o = [
        t.game.rematch
          ? h(
              'a.fbt.text',
              {
                attrs: {
                  href: `/${t.game.rematch}/${t.opponent.color}`,
                },
              },
              e.noarg('viewRematch')
            )
          : null,
        t.tournament
          ? h(
              'a.fbt',
              {
                attrs: {
                  href: '/tournament/' + t.tournament.id,
                },
              },
              e.noarg('viewTournament')
            )
          : null,
        t.swiss
          ? h(
              'a.fbt',
              {
                attrs: {
                  href: '/swiss/' + t.swiss.id,
                },
              },
              e.noarg('viewTournament')
            )
          : null,
        Jt(e),
      ];
    return o.find((e) => !!e) ? h('div.follow-up', o) : null;
  }
  const go = de((e) => lichess.pubsub.emit('round.suggestion', e.textContent));
  const vo = (e) => (e < 10 ? '0' : '') + e,
    bo = '<sep>:</sep>';

  function yo(e, t, o, n) {
    const s = new Date(e);
    if (n)
      return (
        (e >= 36e5 ? Math.floor(e / 36e5) + 'H:' : '') +
        s.getUTCMinutes() +
        'M:' +
        s.getUTCSeconds() +
        'S'
      );
    const r = s.getUTCMilliseconds(),
      i = o && r < 500 ? '<sep class="low">:</sep>' : bo,
      a = vo(s.getUTCMinutes()) + i + vo(s.getUTCSeconds());
    if (e >= 36e5) {
      return vo(Math.floor(e / 36e5)) + bo + a;
    }
    if (t) {
      let t = Math.floor(r / 100).toString();
      return (
        !o &&
          e < 1e3 &&
          (t += '<huns>' + (Math.floor(r / 10) % 10) + '</huns>'),
        a + '<tenths><sep>.</sep>' + t + '</tenths>'
      );
    }
    return a;
  }

  function wo(e, t) {
    const o = e.clock,
      n = (e) => {
        if (void 0 !== e.animate) {
          let n = o.elements[t].barAnim;
          (void 0 !== n && n.effect && n.effect.target === e) ||
            ((n = e.animate(
              [
                {
                  transform: 'scale(1)',
                },
                {
                  transform: 'scale(0, 1)',
                },
              ],
              {
                duration: o.barTime,
                fill: 'both',
              }
            )),
            (o.elements[t].barAnim = n));
          const s = o.millisOf(t);
          (n.currentTime = o.barTime - s),
            t === o.times.activeColor ? s > 0 && n.play() : n.pause();
        } else
          (o.elements[t].bar = e),
            (e.style.transform = 'scale(' + o.timeRatio(o.millisOf(t)) + ',1)');
      };
    return h('div.bar', {
      class: {
        berserk: !!e.goneBerserk[t],
      },
      hook: {
        insert: (e) => n(e.elm),
        postpatch: (e, t) => n(t.elm),
      },
    });
  }

  function ko(e, t) {
    return !!e.goneBerserk[t] && e.data.game.turns <= 1 && Ue.playable(e.data);
  }

  function Po(e, t, o) {
    return ko(e, t) ? h('div.berserked.' + o, ce('`')) : null;
  }

  function Mo(e) {
    if (Ue.berserkableBy(e.data) && !e.goneBerserk[e.data.player.color])
      return h('button.fbt.go-berserk', {
        attrs: {
          title: 'GO BERSERK! Half the time, no increment, bonus point',
          'data-icon': '`',
        },
        hook: ue('click', e.goBerserk),
      });
  }

  function Co(e, t, o) {
    var n, s;
    const r = e.data,
      i =
        (null === (n = r.tournament) || void 0 === n ? void 0 : n.ranks) ||
        (null === (s = r.swiss) || void 0 === s ? void 0 : s.ranks);
    return i && !ko(e, t)
      ? h(
          'div.tour-rank.' + o,
          {
            attrs: {
              title: 'Current tournament rank',
            },
          },
          '#' + i[t]
        )
      : null;
  }
  class To {
    constructor(e, t) {
      (this.opts = t),
        (this.emergSound = {
          play: () => lichess.sound.play('lowTime'),
          delay: 2e4,
          playable: {
            white: !0,
            black: !0,
          },
        }),
        (this.elements = {
          white: {},
          black: {},
        }),
        (this.timeRatio = (e) => Math.min(1, e * this.timeRatioDivisor)),
        (this.setClock = (e, t, o, n = 0) => {
          const s =
              Ue.playable(e) && (Ue.playedTurns(e) > 1 || e.clock.running),
            r = 10 * n;
          (this.times = {
            white: 1e3 * t,
            black: 1e3 * o,
            activeColor: s ? e.game.player : void 0,
            lastUpdate: performance.now() + r,
          }),
            s && this.scheduleTick(this.times[e.game.player], r);
        }),
        (this.addTime = (e, t) => {
          this.times[e] += 10 * t;
        }),
        (this.stopClock = () => {
          const e = this.times.activeColor;
          if (e) {
            const t = this.elapsed();
            return (
              (this.times[e] = Math.max(0, this.times[e] - t)),
              (this.times.activeColor = void 0),
              t
            );
          }
        }),
        (this.hardStopClock = () => (this.times.activeColor = void 0)),
        (this.scheduleTick = (e, t) => {
          void 0 !== this.tickCallback && clearTimeout(this.tickCallback),
            (this.tickCallback = setTimeout(
              this.tick,
              this.opts.nvui
                ? 1e3
                : (e % (this.showTenths(e) ? 100 : 500)) + 1 + t
            ));
        }),
        (this.tick = () => {
          this.tickCallback = void 0;
          const e = this.times.activeColor;
          if (void 0 === e) return;
          const t = performance.now(),
            o = Math.max(0, this.times[e] - this.elapsed(t));
          this.scheduleTick(o, 0),
            0 === o
              ? this.opts.onFlag()
              : (function (e, t, o) {
                  if (
                    (t.time &&
                      (t.time.innerHTML = yo(
                        o,
                        e.showTenths(o),
                        !0,
                        e.opts.nvui
                      )),
                    t.bar &&
                      (t.bar.style.transform =
                        'scale(' + e.timeRatio(o) + ',1)'),
                    t.clock)
                  ) {
                    const n = t.clock.classList;
                    o < e.emergMs
                      ? n.add('emerg')
                      : n.contains('emerg') && n.remove('emerg');
                  }
                })(this, this.elements[e], o),
            this.opts.soundColor === e &&
              (this.emergSound.playable[e]
                ? o < this.emergMs &&
                  !(t < this.emergSound.next) &&
                  (this.emergSound.play(),
                  (this.emergSound.next = t + this.emergSound.delay),
                  (this.emergSound.playable[e] = !1))
                : o > 1.5 * this.emergMs && (this.emergSound.playable[e] = !0));
        }),
        (this.elapsed = (e = performance.now()) =>
          Math.max(0, e - this.times.lastUpdate)),
        (this.millisOf = (e) =>
          this.times.activeColor === e
            ? Math.max(0, this.times[e] - this.elapsed())
            : this.times[e]),
        (this.isRunning = () => void 0 !== this.times.activeColor);
      const o = e.clock;
      if (0 === o.showTenths) this.showTenths = () => !1;
      else {
        const e = 1 === o.showTenths ? 1e4 : 36e5;
        this.showTenths = (t) => t < e;
      }
      (this.showBar = o.showBar && !this.opts.nvui),
        (this.barTime = 1e3 * (Math.max(o.initial, 2) + 5 * o.increment)),
        (this.timeRatioDivisor = 1 / this.barTime),
        (this.emergMs = 1e3 * Math.min(60, Math.max(10, 0.125 * o.initial))),
        this.setClock(e, o.white, o.black);
    }
  }
  class xo {
    constructor(e, t) {
      (this.ctrl = e),
        (this.key = t),
        (this.storage = lichess.storage.makeBoolean(this.key)),
        (this.toggle = () => {
          this.storage.toggle(), this.next(!0);
        }),
        (this.get = this.storage.get),
        (this.redirect = (e) => {
          this.ctrl.setRedirecting(), (window.location.href = e);
        }),
        (this.next = (e) => {
          const t = this.ctrl.data;
          !t.player.spectator &&
            Ue.isSwitchable(t) &&
            !Ue.isPlayerTurn(t) &&
            this.get() &&
            (e
              ? this.redirect('/round-next/' + t.game.id)
              : t.simul
              ? t.simul.hostId === this.ctrl.opts.userId &&
                t.simul.nbPlaying > 1 &&
                this.redirect('/round-next/' + t.game.id)
              : ((e) =>
                  se.json(`/whats-next/${e.data.game.id}${e.data.player.id}`))(
                  this.ctrl
                ).then((e) => {
                  e.next && this.redirect('/' + e.next);
                }));
        });
    }
  }
  class So {
    constructor(e) {
      (this.socket = e),
        (this.current = void 0),
        (this.register = () => {
          this.current = setTimeout(this.expire, 1e4);
        }),
        (this.clear = () => {
          this.current && clearTimeout(this.current);
        }),
        (this.expire = () => {
          se.text('/statlog?e=roundTransientExpire', {
            method: 'post',
          }),
            this.socket.reload({});
        });
    }
  }

  function Oo(e, t) {
    const o = [],
      n = new Map(),
      s = ie.key2pos(t),
      r = Math.max(0, s[0] - 1),
      i = Math.min(7, s[0] + 1),
      a = Math.max(0, s[1] - 1),
      c = Math.min(7, s[1] + 1);
    for (let s = r; s <= i; s++)
      for (let r = a; r <= c; r++) {
        const i = ie.pos2key([s, r]);
        o.push(i);
        const a = e.chessground.state.pieces.get(i);
        a && (i === t || 'pawn' !== a.role) && n.set(i, void 0);
      }
    e.chessground.setPieces(n), e.chessground.explode(o);
  }
  const _o = ['pawn', 'knight', 'bishop', 'rook', 'queen'];
  let Ao = !1,
    jo = !1,
    Lo = !1;

  function Do(e, t, o) {
    if (
      (0 === Eo.length ? (jo = !0) : ((Ao = !0), Lo || No(e)),
      !Ue.isPlayerTurn(e))
    )
      return !1;
    if ('pawn' === t && ('1' === o[1] || '8' === o[1])) return !1;
    const n = e.possibleDrops;
    if (null == n) return !0;
    return (n.match(/.{2}/g) || []).includes(o);
  }
  const Eo = [];

  function No(e) {
    const t = e.player.color[0];
    for (const e of 'PNBRQ')
      fetch(lichess.assetUrl(`piece/cburnett/${t}${e}.svg`));
    Lo = !0;
  }
  const $o = {
    P: 'pawn',
    N: 'knight',
    B: 'bishop',
    R: 'rook',
    Q: 'queen',
    K: 'king',
  };

  function Ro(e) {
    return h('div.keyboard-move', [
      h('input', {
        attrs: {
          spellcheck: !1,
          autocomplete: !1,
        },
        hook: de((t) =>
          lichess.loadModule('round.keyboardMove').then(() =>
            e.registerHandler(
              lichess.keyboardMove({
                input: t,
                ctrl: e,
              })
            )
          )
        ),
      }),
      e.hasFocus()
        ? h(
            'em',
            'Enter SAN (Nc3) or UCI (b1c3) moves, or type / to focus chat'
          )
        : h('strong', 'Press <enter> to focus'),
    ]);
  }

  function Bo(e, t) {
    return e.trans('aiNameLevelAiLevel', 'Stockfish', t);
  }

  function Io(e, t) {
    return t.user
      ? (t.user.title ? t.user.title + ' ' : '') + t.user.username
      : t.ai
      ? Bo(e, t.ai)
      : e.noarg('anonymous');
  }
  let qo = !1;
  const Fo = (e) => e.split(' ')[0];
  const Go = (e) => e.userJump(e.ply - 1),
    zo = (e) => e.userJump(e.ply + 1);
  class Ko {
    constructor(e, t) {
      var o;
      (this.opts = e),
        (this.redraw = t),
        (this.firstSeconds = !0),
        (this.flip = !1),
        (this.loading = !1),
        (this.redirecting = !1),
        (this.goneBerserk = {}),
        (this.resignConfirm = void 0),
        (this.drawConfirm = void 0),
        (this.autoScroll = () => {}),
        (this.challengeRematched = !1),
        (this.shouldSendMoveTime = !1),
        (this.sign = Math.random().toString(36)),
        (this.showExpiration = () => {
          this.data.expiration &&
            (this.redraw(), setTimeout(this.showExpiration, 250));
        }),
        (this.onUserMove = (e, t, o) => {
          (this.keyboardMove && this.keyboardMove.usedSan) || Be(this, o),
            $t(this, e, t, o) || this.sendMove(e, t, void 0, o);
        }),
        (this.onUserNewPiece = (e, t, o) => {
          !this.replaying() && Do(this.data, e, t)
            ? this.sendNewPiece(e, t, !!o.predrop)
            : this.jump(this.ply);
        }),
        (this.onMove = (e, t, o) => {
          o
            ? 'atomic' === this.data.game.variant.key
              ? (Tt(), Oo(this, t))
              : Mt()
            : Pt();
        }),
        (this.onPremove = (e, t, o) => {
          $t(this, e, t, o);
        }),
        (this.onCancelPremove = () => {
          Bt(this);
        }),
        (this.onPredrop = (e, t) => {
          (this.preDrop = e), this.redraw();
        }),
        (this.isSimulHost = () =>
          this.data.simul && this.data.simul.hostId === this.opts.userId),
        (this.lastPly = () => Fe(this.data)),
        (this.makeCgHooks = () => ({
          onUserMove: this.onUserMove,
          onUserNewPiece: this.onUserNewPiece,
          onMove: this.onMove,
          onNewPiece: Pt,
          onPremove: this.onPremove,
          onCancelPremove: this.onCancelPremove,
          onPredrop: this.onPredrop,
        })),
        (this.replaying = () => this.ply !== this.lastPly()),
        (this.userJump = (e) => {
          this.cancelMove(),
            this.chessground.selectSquare(null),
            e != this.ply && this.jump(e)
              ? ((e, t) => {
                  Yt((o) => o.step(e.stepAt(t), !0));
                })(this, this.ply)
              : this.redraw();
        }),
        (this.isPlaying = () => Ue.isPlayerPlaying(this.data)),
        (this.jump = (e) => {
          const t =
            (e = Math.max(qe(this.data), Math.min(this.lastPly(), e))) ===
            this.ply + 1;
          (this.ply = e), (this.justDropped = void 0), (this.preDrop = void 0);
          const o = this.stepAt(e),
            n = {
              fen: o.fen,
              lastMove: le(o.uci),
              check: !!o.check,
              turnColor: this.ply % 2 == 0 ? 'white' : 'black',
            };
          return (
            this.replaying()
              ? this.chessground.stop()
              : (n.movable = {
                  color: this.isPlaying() ? this.data.player.color : void 0,
                  dests: pe(this.data.possibleMoves),
                }),
            this.chessground.set(n),
            o.san &&
              t &&
              (o.san.includes('x') ? Mt() : Pt(), /[+#]/.test(o.san) && Ct()),
            this.autoScroll(),
            this.keyboardMove && this.keyboardMove.update(o),
            lichess.pubsub.emit('ply', e),
            !0
          );
        }),
        (this.replayEnabledByPref = () => {
          const e = this.data;
          return (
            2 === e.pref.replay ||
            (1 === e.pref.replay &&
              ('classical' === e.game.speed ||
                'unlimited' === e.game.speed ||
                'correspondence' === e.game.speed))
          );
        }),
        (this.isLate = () => this.replaying() && He.playing(this.data)),
        (this.playerAt = (e) =>
          this.flip ^ ('top' === e) ? this.data.opponent : this.data.player),
        (this.flipNow = () => {
          (this.flip = !this.nvui && !this.flip),
            this.chessground.set({
              orientation: mt(this.data, this.flip),
            }),
            this.redraw();
        }),
        (this.setTitle = () => Et(this)),
        (this.actualSendMove = (e, t, o = {}) => {
          const n = {
            sign: this.sign,
            ackable: !0,
          };
          if (this.clock)
            if (
              ((n.withLag =
                !this.shouldSendMoveTime || !this.clock.isRunning()),
              o.premove && this.shouldSendMoveTime)
            )
              this.clock.hardStopClock(), (n.millis = 0);
            else {
              const e = this.clock.stopClock();
              void 0 !== e && this.shouldSendMoveTime && (n.millis = e);
            }
          this.socket.send(e, t, n),
            (this.justDropped = o.justDropped),
            (this.justCaptured = o.justCaptured),
            (this.preDrop = void 0),
            this.transientMove.register(),
            this.redraw();
        }),
        (this.sendMove = (e, t, o, n) => {
          const s = {
            u: e + t,
          };
          o && (s.u += 'knight' === o ? 'n' : o[0]),
            Ht() && (s.b = 1),
            this.resign(!1),
            this.data.pref.submitMove && !n.premove
              ? ((this.moveToSubmit = s), this.redraw())
              : this.actualSendMove('move', s, {
                  justCaptured: n.captured,
                  premove: n.premove,
                });
        }),
        (this.sendNewPiece = (e, t, o) => {
          const n = {
            role: e,
            pos: t,
          };
          Ht() && (n.b = 1),
            this.resign(!1),
            this.data.pref.submitMove && !o
              ? ((this.dropToSubmit = n), this.redraw())
              : this.actualSendMove('drop', n, {
                  justDropped: e,
                  premove: o,
                });
        }),
        (this.showYourMoveNotification = () => {
          const e = this.data;
          Ue.isPlayerTurn(e)
            ? gt(() => {
                let t = this.noarg('yourTurn');
                const o = Io(this, e.opponent);
                if (this.ply < 1) t = `${o}\njoined the game.\n${t}`;
                else {
                  let n = e.steps[e.steps.length - 1].san;
                  (n = `${Math.floor((this.ply - 1) / 2) + 1}${
                    this.ply % 2 == 1 ? '.' : '...'
                  } ${n}`),
                    (t = `${o}\nplayed ${n}.\n${t}`);
                }
                return t;
              })
            : this.isPlaying() &&
              this.ply < 1 &&
              gt(() => Io(this, e.opponent) + '\njoined the game.');
        }),
        (this.playerByColor = (e) =>
          this.data[e === this.data.player.color ? 'player' : 'opponent']),
        (this.apiMove = (e) => {
          var t, o;
          const n = this.data,
            s = this.isPlaying();
          (n.game.turns = e.ply),
            (n.game.player = e.ply % 2 == 0 ? 'white' : 'black');
          const r = e.ply % 2 == 0 ? 'black' : 'white',
            i = n.player.color === n.game.player;
          if (
            (e.status && (n.game.status = e.status),
            e.winner && (n.game.winner = e.winner),
            (this.playerByColor('white').offeringDraw = e.wDraw),
            (this.playerByColor('black').offeringDraw = e.bDraw),
            (n.possibleMoves = i ? e.dests : void 0),
            (n.possibleDrops = i ? e.drops : void 0),
            (n.crazyhouse = e.crazyhouse),
            this.setTitle(),
            !this.replaying())
          ) {
            if ((this.ply++, e.role))
              this.chessground.newPiece(
                {
                  role: e.role,
                  color: r,
                },
                e.uci.substr(2, 2)
              );
            else {
              const n = le(e.uci),
                s = this.chessground.state.pieces;
              (!e.castle ||
                ('king' ===
                  (null === (t = s.get(e.castle.king[0])) || void 0 === t
                    ? void 0
                    : t.role) &&
                  'rook' ===
                    (null === (o = s.get(e.castle.rook[0])) || void 0 === o
                      ? void 0
                      : o.role))) &&
                this.chessground.move(n[0], n[1]);
            }
            if (e.enpassant) {
              const t = e.enpassant;
              this.chessground.setPieces(new Map([[t.key, void 0]])),
                'atomic' === n.game.variant.key
                  ? (!(function (e, t, o) {
                      const n = ie.key2pos(t),
                        s = [n[0], n[1] + ('white' === o ? -1 : 1)];
                      Oo(e, ie.pos2key(s));
                    })(this, t.key, t.color),
                    Tt())
                  : Mt();
            }
            e.promotion &&
              ht(this.chessground, e.promotion.key, e.promotion.pieceClass),
              this.chessground.set({
                turnColor: n.game.player,
                movable: {
                  dests: s ? pe(n.possibleMoves) : new Map(),
                },
                check: !!e.check,
              }),
              e.check && Ct(),
              (Kt = Date.now() + 1e3),
              lichess.pubsub.emit('ply', this.ply);
          }
          n.game.threefold = !!e.threefold;
          const a = {
            ply: this.lastPly() + 1,
            fen: e.fen,
            san: e.san,
            uci: e.uci,
            check: e.check,
            crazy: e.crazyhouse,
          };
          if (
            (n.steps.push(a),
            (this.justDropped = void 0),
            (this.justCaptured = void 0),
            Ue.setOnGame(n, r, !0),
            (this.data.forecastCount = void 0),
            e.clock)
          ) {
            this.shouldSendMoveTime = !0;
            const t = e.clock,
              o = s && i ? 0 : t.lag || 1;
            this.clock
              ? this.clock.setClock(n, t.white, t.black, o)
              : this.corresClock && this.corresClock.update(t.white, t.black);
          }
          if (
            (this.data.expiration &&
              (this.data.steps.length > 2
                ? (this.data.expiration = void 0)
                : (this.data.expiration.movedAt = Date.now())),
            this.redraw(),
            s &&
              r == n.player.color &&
              (this.transientMove.clear(),
              this.moveOn.next(),
              (function (e, t) {
                e.opponent.ai && lichess.storage.fire('ceval.fen', t.fen);
              })(n, e)),
            !this.replaying() && r != n.player.color)
          ) {
            const e = 'atomic' === n.game.variant.key ? 100 : 1;
            setTimeout(() => {
              this.chessground.playPremove() ||
                this.playPredrop() ||
                (It(this), this.showYourMoveNotification());
            }, e);
          }
          return (
            this.autoScroll(),
            this.onChange(),
            this.keyboardMove &&
              this.keyboardMove.update(a, r != n.player.color),
            this.music && this.music.jump(e),
            ((e) => {
              Yt((t) => t.step(e, !1));
            })(a),
            !0
          );
        }),
        (this.playPredrop = () =>
          this.chessground.playPredrop((e) => Do(this.data, e.role, e.key))),
        (this.reload = (e) => {
          e.steps.length !== this.data.steps.length &&
            (this.ply = e.steps[e.steps.length - 1].ply),
            Ke(e),
            (this.data = e),
            this.clearJust(),
            (this.shouldSendMoveTime = !1),
            this.clock && this.clock.setClock(e, e.clock.white, e.clock.black),
            this.corresClock &&
              this.corresClock.update(
                e.correspondence.white,
                e.correspondence.black
              ),
            this.replaying() ||
              (function (e) {
                e.chessground.set(pt(e));
              })(this),
            this.setTitle(),
            this.moveOn.next(),
            this.setQuietMode(),
            this.redraw(),
            this.autoScroll(),
            this.onChange(),
            this.setLoading(!1),
            this.keyboardMove &&
              this.keyboardMove.update(e.steps[e.steps.length - 1]);
        }),
        (this.endWithData = (e) => {
          var t, o;
          const n = this.data;
          if (
            ((n.game.winner = e.winner),
            (n.game.status = e.status),
            (n.game.boosted = e.boosted),
            this.userJump(this.lastPly()),
            this.chessground.stop(),
            e.ratingDiff &&
              ((n.player.ratingDiff = e.ratingDiff[n.player.color]),
              (n.opponent.ratingDiff = e.ratingDiff[n.opponent.color])),
            !n.player.spectator && n.game.turns > 1)
          ) {
            const s = e.winner
              ? n.player.color === e.winner
                ? 'victory'
                : 'defeat'
              : 'draw';
            lichess.sound.play(s),
              'victory' != s &&
                n.game.turns > 6 &&
                !n.tournament &&
                !n.swiss &&
                '1' == lichess.storage.get('courtesy') &&
                (null ===
                  (o =
                    null === (t = this.opts.chat) || void 0 === t
                      ? void 0
                      : t.instance) ||
                  void 0 === o ||
                  o.then((e) => e.post('Good game, well played')));
          }
          n.crazyhouse &&
            (function () {
              const e = lichess.storage.make('crazyKeyHist');
              if (Ao) e.set(10);
              else if (jo) {
                const t = parseInt(e.get());
                t > 0 && t <= 10 ? e.set(t - 1) : 0 !== t && e.set(3);
              }
            })(),
            this.clearJust(),
            this.setTitle(),
            this.moveOn.next(),
            this.setQuietMode(),
            this.setLoading(!1),
            this.clock &&
              e.clock &&
              this.clock.setClock(n, 0.01 * e.clock.wc, 0.01 * e.clock.bc),
            this.redraw(),
            this.autoScroll(),
            this.onChange(),
            n.tv && setTimeout(lichess.reload, 1e4),
            Wt(this);
        }),
        (this.challengeRematch = () => {
          var e;
          (this.challengeRematched = !0),
            ((e = this.data.game.id),
            se.json('/challenge/rematch-of/' + e, {
              method: 'post',
            })).then(
              () => {
                lichess.pubsub.emit('challenge-app.open'),
                  lichess.once('rematch-challenge') &&
                    setTimeout(() => {
                      lichess.hopscotch(function () {
                        window.hopscotch
                          .configure({
                            i18n: {
                              doneBtn: 'OK, got it',
                            },
                          })
                          .startTour({
                            id: 'rematch-challenge',
                            showPrevButton: !0,
                            steps: [
                              {
                                title: 'Challenged to a rematch',
                                content:
                                  'Your opponent is offline, but they can accept this challenge later!',
                                target: '#challenge-app',
                                placement: 'bottom',
                              },
                            ],
                          });
                      });
                    }, 1e3);
              },
              (e) => {
                this.challengeRematched = !1;
              }
            );
        }),
        (this.makeCorrespondenceClock = () => {
          this.data.correspondence &&
            !this.corresClock &&
            (this.corresClock = (function (e, t, o) {
              const n = 0.1 / t.increment;
              let s;

              function r(e, t) {
                s = {
                  white: 1e3 * e,
                  black: 1e3 * t,
                  lastUpdate: performance.now(),
                };
              }
              return (
                r(t.white, t.black),
                {
                  root: e,
                  data: t,
                  timePercent: (e) => Math.max(0, Math.min(100, s[e] * n)),
                  millisOf: (e) => Math.max(0, s[e]),
                  update: r,
                  tick: function (e) {
                    const t = performance.now();
                    (s[e] -= t - s.lastUpdate),
                      (s.lastUpdate = t),
                      s[e] <= 0 && o();
                  },
                }
              );
            })(this, this.data.correspondence, this.socket.outoftime));
        }),
        (this.corresClockTick = () => {
          this.corresClock &&
            Ue.playable(this.data) &&
            this.corresClock.tick(this.data.game.player);
        }),
        (this.setQuietMode = () => {
          const e = lichess.quietMode,
            t = this.isPlaying();
          e !== t &&
            ((lichess.quietMode = t),
            $('body')
              .toggleClass('playing', t)
              .toggleClass(
                'no-select',
                t &&
                  this.clock &&
                  this.clock.millisOf(this.data.player.color) <= 3e5
              ));
        }),
        (this.takebackYes = () => {
          this.socket.sendLoading('takeback-yes'),
            this.chessground.cancelPremove(),
            It(this);
        }),
        (this.resign = (e, t) => {
          e
            ? (this.resignConfirm || !this.data.pref.confirmResign || t
                ? (this.socket.sendLoading('resign'),
                  clearTimeout(this.resignConfirm))
                : (this.resignConfirm = setTimeout(() => this.resign(!1), 3e3)),
              this.redraw())
            : this.resignConfirm &&
              (clearTimeout(this.resignConfirm),
              (this.resignConfirm = void 0),
              this.redraw());
        }),
        (this.goBerserk = () => {
          this.socket.berserk(), lichess.sound.play('berserk');
        }),
        (this.setBerserk = (e) => {
          this.goneBerserk[e] ||
            ((this.goneBerserk[e] = !0),
            e !== this.data.player.color && lichess.sound.play('berserk'),
            this.redraw());
        }),
        (this.setLoading = (e, t = 1500) => {
          clearTimeout(this.loadingTimeout),
            e
              ? ((this.loading = !0),
                (this.loadingTimeout = setTimeout(() => {
                  (this.loading = !1), this.redraw();
                }, t)),
                this.redraw())
              : this.loading && ((this.loading = !1), this.redraw());
        }),
        (this.setRedirecting = () => {
          (this.redirecting = !0),
            (lichess.unload.expected = !0),
            setTimeout(() => {
              (this.redirecting = !1), this.redraw();
            }, 2500),
            this.redraw();
        }),
        (this.submitMove = (e) => {
          const t = this.moveToSubmit || this.dropToSubmit;
          e && t
            ? (this.moveToSubmit
                ? this.actualSendMove('move', this.moveToSubmit)
                : this.actualSendMove('drop', this.dropToSubmit),
              lichess.sound.play('confirmation'))
            : this.jump(this.ply),
            this.cancelMove(),
            t && this.setLoading(!0, 300);
        }),
        (this.cancelMove = () => {
          (this.moveToSubmit = void 0), (this.dropToSubmit = void 0);
        }),
        (this.onChange = () => {
          this.opts.onChange &&
            setTimeout(() => this.opts.onChange(this.data), 150);
        }),
        (this.setGone = (e) => {
          Ue.setGone(this.data, this.data.opponent.color, e),
            clearTimeout(this.goneTick),
            Number(e) > 1 &&
              (this.goneTick = setTimeout(() => {
                const e = Number(this.opponentGone());
                e > 1 && this.setGone(e - 1);
              }, 1e3)),
            this.redraw();
        }),
        (this.opponentGone = () => {
          const e = this.data;
          return (
            !1 !== e.opponent.gone &&
            !Ue.isPlayerTurn(e) &&
            Ue.resignable(e) &&
            e.opponent.gone
          );
        }),
        (this.canOfferDraw = () =>
          Ue.drawable(this.data) &&
          (this.lastDrawOfferAtPly || -99) < this.ply - 20),
        (this.offerDraw = (e) => {
          this.canOfferDraw() &&
            (this.drawConfirm
              ? (e && this.doOfferDraw(),
                clearTimeout(this.drawConfirm),
                (this.drawConfirm = void 0))
              : e &&
                (this.data.pref.confirmResign
                  ? (this.drawConfirm = setTimeout(() => {
                      this.offerDraw(!1);
                    }, 3e3))
                  : this.doOfferDraw())),
            this.redraw();
        }),
        (this.doOfferDraw = () => {
          (this.lastDrawOfferAtPly = this.ply),
            this.socket.sendLoading('draw-yes', null);
        }),
        (this.setChessground = (e) => {
          (this.chessground = e),
            this.data.pref.keyboardMove &&
              ((this.keyboardMove = (function (e, t, o) {
                let n,
                  s = !1,
                  r = t.fen,
                  i = performance.now();
                const a = e.chessground.state,
                  c = (t) => {
                    a.selected === t
                      ? e.chessground.cancelMove()
                      : (e.chessground.selectSquare(t, !0),
                        (i = performance.now()));
                  };
                let l = !1;
                return {
                  drop(t, o) {
                    const n = $o[o],
                      s = e.data.crazyhouse,
                      r = e.data.player.color;
                    n &&
                      s &&
                      !a.pieces.has(t) &&
                      s.pockets['white' === r ? 0 : 1][n] &&
                      Do(e.data, n, t) &&
                      (e.chessground.cancelMove(),
                      e.chessground.newPiece(
                        {
                          role: n,
                          color: r,
                        },
                        t
                      ),
                      e.sendNewPiece(n, t, !1));
                  },
                  promote(t, o, n) {
                    const s = $o[n];
                    s &&
                      'pawn' != s &&
                      (e.chessground.cancelMove(),
                      Nt(e, t, o, s, {
                        premove: !1,
                      }));
                  },
                  update(e, t = !1) {
                    n ? n(e.fen, a.movable.dests, t) : (r = e.fen);
                  },
                  registerHandler(e) {
                    (n = e), r && n(r, a.movable.dests);
                  },
                  hasFocus: () => s,
                  setFocus(e) {
                    (s = e), o();
                  },
                  san(t, o) {
                    (l = !0), e.chessground.cancelMove(), c(t), c(o);
                  },
                  select: c,
                  hasSelected: () => a.selected,
                  confirmMove() {
                    e.submitMove(!0);
                  },
                  usedSan: l,
                  jump(t) {
                    e.userJump(e.ply + t), o();
                  },
                  justSelected: () => performance.now() - i < 500,
                  clock: () => e.clock,
                  resign: e.resign,
                };
              })(this, this.stepAt(this.ply), this.redraw)),
              requestAnimationFrame(() => this.redraw()));
        }),
        (this.stepAt = (e) => ze(this.data, e)),
        (this.delayedInit = () => {
          const e = this.data;
          this.isPlaying() &&
            0 === Ue.nbMoves(e, e.player.color) &&
            !this.isSimulHost() &&
            lichess.sound.play('genericNotify'),
            lichess.requestIdleCallback(() => {
              const e = this.data;
              this.isPlaying() &&
                (e.simul ||
                  (e.steps.length > 2 || (Kt = Date.now() + 1e4),
                  window.addEventListener('focus', () => (zt = Date.now()))),
                window.addEventListener('focus', Dt),
                this.setTitle(),
                e.crazyhouse &&
                  (function (e) {
                    const t = window.Mousetrap;
                    let o;
                    const n = () => {
                      if (
                        (o && document.body.classList.remove(o), Eo.length > 0)
                      ) {
                        const t = _o[Eo[Eo.length - 1] - 1],
                          n = e.data.player.color,
                          s = e.data.crazyhouse;
                        if (!s) return;
                        const r = s.pockets['white' === n ? 0 : 1][t];
                        it.setDropMode(
                          e.chessground.state,
                          r > 0
                            ? {
                                color: n,
                                role: t,
                              }
                            : void 0
                        ),
                          (o = `cursor-${n}-${t}`),
                          document.body.classList.add(o);
                      } else
                        it.cancelDropMode(e.chessground.state), (o = void 0);
                    };
                    lichess.pubsub.on('ply', () => {
                      Eo.length > 0 && n();
                    });
                    for (let e = 1; e <= 5; e++) {
                      const o = e.toString();
                      t.bind(o, () => {
                        Eo.includes(e) || (Eo.push(e), n());
                      }).bind(
                        o,
                        () => {
                          const t = Eo.indexOf(e);
                          t >= 0 && (Eo.splice(t, 1), t === Eo.length && n());
                        },
                        'keyup'
                      );
                    }
                    const s = () => {
                      Eo.length > 0 && ((Eo.length = 0), n());
                    };
                    window.addEventListener('blur', s),
                      window.addEventListener(
                        'focus',
                        (e) => {
                          e.target && 'input' === e.target.localName && s();
                        },
                        {
                          capture: !0,
                        }
                      ),
                      '0' !== lichess.storage.get('crazyKeyHist') && No(e.data);
                  })(this),
                window.addEventListener('beforeunload', (e) => {
                  const t = this.data;
                  if (
                    lichess.unload.expected ||
                    this.nvui ||
                    !Ue.playable(t) ||
                    !t.clock ||
                    t.opponent.ai ||
                    this.isSimulHost()
                  )
                    return;
                  this.socket.send('bye2');
                  const o = 'There is a game in progress!';
                  return ((e || window.event).returnValue = o), o;
                }),
                !this.nvui &&
                  e.pref.submitMove &&
                  window.Mousetrap.bind('esc', () => {
                    this.submitMove(!1), this.chessground.cancelMove();
                  }).bind('return', () => this.submitMove(!0)),
                (function (e) {
                  var t;
                  e.data.opponent.ai ||
                    (!e.data.game.rated && e.opts.userId) ||
                    ('BOT' !=
                      (null === (t = e.data.player.user) || void 0 === t
                        ? void 0
                        : t.title) &&
                      (lichess.storage.fire('ceval.disable'),
                      lichess.storage.make('ceval.fen').listen((t) => {
                        const o = e.data,
                          n = Ge(e.data);
                        !qo &&
                          n.ply > 14 &&
                          e.isPlaying() &&
                          t.value &&
                          Fo(n.fen) == Fo(t.value) &&
                          (se.text(
                            `/jslog/${o.game.id}${o.player.id}?n=ceval`,
                            {
                              method: 'post',
                            }
                          ),
                          (qo = !0));
                      })));
                })(this)),
                this.nvui ||
                  ((e) => {
                    window.Mousetrap.bind(['left', 'h'], () => {
                      Go(e), e.redraw();
                    })
                      .bind(['right', 'l'], () => {
                        zo(e), e.redraw();
                      })
                      .bind(['up', 'k'], () => {
                        e.userJump(0), e.redraw();
                      })
                      .bind(['down', 'j'], () => {
                        e.userJump(e.data.steps.length - 1), e.redraw();
                      })
                      .bind('f', e.flipNow)
                      .bind('z', () => lichess.pubsub.emit('zen'));
                  })(this),
                ((e) => {
                  lichess.pubsub.on('speech.enabled', Ut(e)),
                    Ut(e)(lichess.sound.speech());
                })(this),
                this.onChange();
            }, 800);
        }),
        Ke(e.data);
      const n = (this.data = e.data);
      (this.ply = Fe(n)),
        (this.goneBerserk[n.player.color] = n.player.berserk),
        (this.goneBerserk[n.opponent.color] = n.opponent.berserk),
        setTimeout(() => {
          (this.firstSeconds = !1), this.redraw();
        }, 3e3),
        (this.socket = (function (e, t) {
          function o(e, s) {
            e && e.t
              ? (t.setLoading(!1), n[e.t](e.d))
              : yt(t).then((n) => {
                  lichess.socket.getVersion() > n.player.version
                    ? s
                      ? lichess.reload()
                      : o(e, !0)
                    : t.reload(n);
                }, lichess.reload);
          }
          lichess.socket.sign(t.sign);
          const n = {
            takebackOffers(e) {
              t.setLoading(!1),
                (t.data.player.proposingTakeback = e[t.data.player.color]),
                (t.data.opponent.proposingTakeback =
                  e[t.data.opponent.color]) &&
                  gt(t.noarg('yourOpponentProposesATakeback')),
                t.redraw();
            },
            move: t.apiMove,
            drop: t.apiMove,
            reload: o,
            redirect: t.setRedirecting,
            clockInc(e) {
              t.clock && (t.clock.addTime(e.color, e.time), t.redraw());
            },
            cclock(e) {
              t.corresClock &&
                ((t.data.correspondence.white = e.white),
                (t.data.correspondence.black = e.black),
                t.corresClock.update(e.white, e.black),
                t.redraw());
            },
            crowd(e) {
              ['white', 'black'].forEach((o) => {
                ne.defined(e[o]) && Ue.setOnGame(t.data, o, e[o]);
              }),
                t.redraw();
            },
            endData: t.endWithData,
            rematchOffer(e) {
              (t.data.player.offeringRematch = e === t.data.player.color),
                (t.data.opponent.offeringRematch =
                  e === t.data.opponent.color) &&
                  gt(t.noarg('yourOpponentWantsToPlayANewGameWithYou')),
                t.redraw();
            },
            rematchTaken(e) {
              (t.data.game.rematch = e),
                t.data.player.spectator ? t.redraw() : t.setLoading(!0);
            },
            drawOffer(e) {
              if (
                (t.isPlaying() &&
                  ((t.data.player.offeringDraw = e === t.data.player.color),
                  (t.data.opponent.offeringDraw =
                    e === t.data.opponent.color) &&
                    gt(t.noarg('yourOpponentOffersADraw'))),
                e)
              ) {
                let o = t.lastPly();
                ('white' == e) == (o % 2 == 0) && o++,
                  (t.data.game.drawOffers = (
                    t.data.game.drawOffers || []
                  ).concat([o]));
              }
              t.redraw();
            },
            berserk(e) {
              t.setBerserk(e);
            },
            gone: t.setGone,
            goneIn: t.setGone,
            checkCount(e) {
              (t.data.player.checks =
                'white' == t.data.player.color ? e.white : e.black),
                (t.data.opponent.checks =
                  'white' == t.data.opponent.color ? e.white : e.black),
                t.redraw();
            },
            simulPlayerMove(e) {
              t.opts.userId &&
                t.data.simul &&
                t.opts.userId == t.data.simul.hostId &&
                e !== t.data.game.id &&
                t.moveOn.get() &&
                !Ue.isPlayerTurn(t.data) &&
                (t.setRedirecting(), Pt(), (location.href = '/' + e));
            },
            simulEnd(e) {
              lichess.loadCssPath('modal'),
                bt(
                  $(
                    `<p>Simul complete!</p><br /><br /><a class="button" href="/simul/${e.id}">Back to ${e.name} simul</a>`
                  )
                );
            },
          };
          return (
            lichess.pubsub.on('ab.rep', (t) =>
              e('rep', {
                n: t,
              })
            ),
            {
              send: e,
              handlers: n,
              moreTime: vt(300, () => e('moretime')),
              outoftime: xt(500, 1.1, () => e('flag', t.data.game.player)),
              berserk: vt(200, () =>
                e('berserk', null, {
                  ackable: !0,
                })
              ),
              sendLoading(o, n) {
                t.setLoading(!0), e(o, n);
              },
              receive: (e, t) => !!n[e] && (n[e](t), !0),
              reload: o,
            }
          );
        })(e.socketSend, this)),
        lichess.RoundNVUI && (this.nvui = lichess.RoundNVUI(t)),
        n.clock
          ? (this.clock = new To(n, {
              onFlag: this.socket.outoftime,
              soundColor:
                n.simul || n.player.spectator || !n.pref.clockSound
                  ? void 0
                  : n.player.color,
              nvui: !!this.nvui,
            }))
          : (this.makeCorrespondenceClock(),
            setInterval(this.corresClockTick, 1e3)),
        this.setQuietMode(),
        (this.moveOn = new xo(this, 'move-on')),
        (this.transientMove = new So(this.socket)),
        (this.trans = lichess.trans(e.i18n)),
        (this.noarg = this.trans.noarg),
        setTimeout(this.delayedInit, 200),
        setTimeout(this.showExpiration, 350),
        (null === (o = document.referrer) || void 0 === o
          ? void 0
          : o.includes('/serviceWorker.')) ||
          setTimeout(this.showYourMoveNotification, 500),
        lichess.pubsub.on('jump', (e) => {
          this.jump(parseInt(e)), this.redraw();
        }),
        lichess.pubsub.on('sound_set', (e) => {
          this.music ||
            'music' !== e ||
            lichess.loadScript('javascripts/music/play.js').then(() => {
              this.music = lichess.playMusic();
            }),
            this.music && 'music' !== e && (this.music = void 0);
        }),
        lichess.pubsub.on('zen', () => {
          if (this.isPlaying()) {
            const e = !$('body').hasClass('zen');
            $('body').toggleClass('zen', e),
              window.dispatchEvent(new Event('resize')),
              wt(e);
          }
        }),
        this.isPlaying() && Ie(this);
    }
    clearJust() {
      (this.justDropped = void 0),
        (this.justCaptured = void 0),
        (this.preDrop = void 0);
    }
  }
  const Ho = ['mousedown', 'touchstart'];

  function Vo(e, t, o) {
    const n = ze(e.data, e.ply);
    if (!n.crazy) return;
    const s = e.justDropped,
      r = e.preDrop,
      i = n.crazy.pockets['white' === t ? 0 : 1],
      a = o === (e.flip ? 'top' : 'bottom') && !e.replaying() && e.isPlaying(),
      c = t === e.data.player.color,
      l = e.justCaptured,
      d = l && (l.promoted ? 'pawn' : l.role);
    return h(
      'div.pocket.is2d.pocket-' + o,
      {
        class: {
          usable: a,
        },
        hook: de((t) =>
          Ho.forEach((n) =>
            t.addEventListener(n, (t) => {
              o === (e.flip ? 'top' : 'bottom') &&
                0 == Eo.length &&
                (function (e, t) {
                  if (void 0 !== t.button && 0 !== t.button) return;
                  if (e.replaying() || !e.isPlaying()) return;
                  const o = t.target,
                    n = o.getAttribute('data-role'),
                    s = o.getAttribute('data-color'),
                    r = o.getAttribute('data-nb');
                  n &&
                    s &&
                    '0' !== r &&
                    (t.stopPropagation(),
                    t.preventDefault(),
                    et.dragNewPiece(
                      e.chessground.state,
                      {
                        color: s,
                        role: n,
                      },
                      t
                    ));
                })(e, t);
            })
          )
        ),
      },
      _o.map((e) => {
        let o = i[e] || 0;
        return (
          c && (s === e && o--, d === e && o++),
          h(
            'div.pocket-c1',
            h(
              'div.pocket-c2',
              h('piece.' + e + '.' + t, {
                class: {
                  premove: c && r === e,
                },
                attrs: {
                  'data-role': e,
                  'data-color': t,
                  'data-nb': o,
                },
              })
            )
          )
        );
      })
    );
  }
  const Uo = (e, t) => (e / Math.pow(10, t)).toFixed(t).substr(2),
    Wo = (e) => `<b>${e}</b>`;

  function Yo(e, t, o, n, s) {
    const r = e.millisOf(o),
      i = (e) => {
        e.innerHTML = (function (e, t) {
          const o = new Date(t),
            n = Uo(o.getUTCMinutes(), 2),
            s = Uo(o.getSeconds(), 2);
          let r,
            i = '';
          if (t >= 864e5) {
            const t = o.getUTCDate() - 1;
            (r = o.getUTCHours()),
              (i += (1 === t ? e('oneDay') : e.plural('nbDays', t)) + ' '),
              0 !== r && (i += e.plural('nbHours', r));
          } else
            t >= 36e5
              ? ((r = o.getUTCHours()), (i += Wo(Uo(r, 2)) + ':' + Wo(n)))
              : (i += Wo(n) + ':' + Wo(s));
          return i;
        })(t, r);
      },
      a = e.root.data.player.color === o;
    return h(
      'div.rclock.rclock-correspondence.rclock-' + n,
      {
        class: {
          outoftime: r <= 0,
          running: s === o,
        },
      },
      [
        e.data.showBar
          ? h('div.bar', [
              h('span', {
                attrs: {
                  style: `width: ${e.timePercent(o)}%`,
                },
              }),
            ])
          : null,
        h('div.time', {
          hook: {
            insert: (e) => i(e.elm),
            postpatch: (e, t) => i(t.elm),
          },
        }),
        a ? null : ho(e.root),
      ]
    );
  }
  var Xo = ee(
    te(function (e, t) {
      Object.defineProperty(t, '__esModule', {
        value: !0,
      });
      let o = 'init';
      t.default = function () {
        return (
          'string' == typeof o &&
            ('init' == o &&
              (window.addEventListener('resize', () => {
                o = 'rec';
              }),
              navigator.userAgent.indexOf('Edge/') > -1 &&
                requestAnimationFrame(() => {
                  o = 'rec';
                })),
            (o = !!getComputedStyle(document.body).getPropertyValue('--col1'))),
          o
        );
      };
    })
  );
  const Jo = 'u8t',
    Zo = 'i5z'.toUpperCase(),
    Qo = vt(100, (e, t) =>
      window.requestAnimationFrame(() => {
        if (t.data.steps.length < 7) return;
        let o;
        if (t.ply < 3) o = 0;
        else if (t.ply == Fe(t.data)) o = 99999;
        else {
          const t = e.querySelector('.a1t');
          t &&
            (o = Xo()
              ? t.offsetLeft - e.offsetWidth / 2 + t.offsetWidth / 2
              : t.offsetTop - e.offsetHeight / 2 + t.offsetHeight / 2);
        }
        'number' == typeof o &&
          (99999 == o
            ? (e.scrollLeft = e.scrollTop = o)
            : Xo()
            ? (e.scrollLeft = o)
            : (e.scrollTop = o));
      })
    );

  function en(e, t, o, n) {
    return e
      ? h(
          Jo,
          {
            class: {
              a1t: e.ply === t,
            },
          },
          [
            'P' === e.san[0] ? e.san.slice(1) : e.san,
            n.has(e.ply)
              ? h(
                  'draw',
                  {
                    attrs: {
                      title: 'Draw offer',
                    },
                  },
                  '½?'
                )
              : void 0,
          ]
        )
      : o
      ? h(Jo, '…')
      : void 0;
  }

  function tn(e) {
    let t;
    if (He.finished(e.data))
      switch (e.data.game.winner) {
        case 'white':
          t = '1-0';
          break;
        case 'black':
          t = '0-1';
          break;
        default:
          t = '½-½';
      }
    if (t || He.aborted(e.data)) {
      const o = e.data.game.winner;
      return h('div.result-wrap', [
        h('p.result', t || ''),
        h(
          'p.status',
          {
            hook: de(() => {
              e.autoScroll
                ? e.autoScroll()
                : setTimeout(() => e.autoScroll(), 200);
            }),
          },
          [Vt(e), o ? ' • ' + e.noarg(o + 'IsVictorious') : '']
        ),
      ]);
    }
  }

  function on(e) {
    const t = e.data.forecastCount;
    return Ue.userAnalysable(e.data)
      ? h(
          'a.fbt.analysis',
          {
            class: {
              text: !!t,
            },
            attrs: {
              title: e.noarg('analysis'),
              href: Xt.game(e.data, e.data.player.color) + '/analysis#' + e.ply,
              'data-icon': 'A',
            },
          },
          t ? ['' + t] : []
        )
      : void 0;
  }

  function nn(e) {
    const t = e.data,
      o = qe(t),
      n = Fe(t);
    return h(
      'div.buttons',
      {
        hook: ue(
          'mousedown',
          (o) => {
            const n = o.target,
              s = parseInt(n.getAttribute('data-ply') || '');
            if (isNaN(s)) {
              'flip' ===
                (n.getAttribute('data-act') ||
                  n.parentNode.getAttribute('data-act')) &&
                (t.tv
                  ? (location.href =
                      '/tv/' + t.tv.channel + (t.tv.flip ? '' : '?flip=1'))
                  : t.player.spectator
                  ? (location.href = Xt.game(t, t.opponent.color))
                  : e.flipNow());
            } else e.userJump(s);
          },
          e.redraw
        ),
      },
      [
        h('button.fbt.flip', {
          class: {
            active: e.flip,
          },
          attrs: {
            title: e.noarg('flipBoard'),
            'data-act': 'flip',
            'data-icon': 'B',
          },
        }),
        ...[
          ['W', o],
          ['Y', e.ply - 1],
          ['X', e.ply + 1],
          ['V', n],
        ].map((t, s) => {
          const r = e.ply !== t[1] && t[1] >= o && t[1] <= n;
          return h('button.fbt', {
            class: {
              glowing: 3 === s && e.isLate(),
            },
            attrs: {
              disabled: !r,
              'data-icon': t[0],
              'data-ply': r ? t[1] : '-',
            },
          });
        }),
        on(e) || h('div.noop'),
      ]
    );
  }

  function sn(e, t) {
    return Ue.playable(e) && 0 === e.game.turns && !e.player.spectator
      ? h('div.message', ce(''), [
          h('div', [
            t(
              'white' === e.player.color
                ? 'youPlayTheWhitePieces'
                : 'youPlayTheBlackPieces'
            ),
            ...('white' === e.player.color
              ? [h('br'), h('strong', t('itsYourTurn'))]
              : []),
          ]),
        ])
      : null;
  }

  function rn(e, t, o, n) {
    return n
      ? null
      : h('button.fbt', {
          attrs: {
            disabled: n,
            'data-icon': o,
            'data-ply': e.ply + t,
          },
          hook: ue('mousedown', (o) => {
            o.preventDefault(), e.userJump(e.ply + t), e.redraw();
          }),
        });
  }

  function an(e) {
    const t = e.data,
      o =
        e.replayEnabledByPref() &&
        h(
          'l4x',
          {
            hook: de((t) => {
              t.addEventListener('mousedown', (t) => {
                let o = t.target,
                  n = -2;
                if (o.tagName === Jo.toUpperCase())
                  for (; (o = o.previousSibling); )
                    if ((n++, o.tagName === Zo)) {
                      e.userJump(2 * parseInt(o.textContent || '') + n),
                        e.redraw();
                      break;
                    }
              }),
                (e.autoScroll = () => Qo(t, e)),
                e.autoScroll();
            }),
          },
          (function (e) {
            const t = e.data.steps,
              o = qe(e.data),
              n = Fe(e.data),
              s = new Set(e.data.game.drawOffers || []);
            if (void 0 === n) return [];
            const r = [];
            let i = 1;
            o % 2 == 1 && (r.push([null, t[1]]), (i = 2));
            for (let e = i; e < t.length; e += 2) r.push([t[e], t[e + 1]]);
            const a = [],
              c = e.ply;
            for (let e = 0; e < r.length; e++)
              a.push(h('i5z', e + 1 + '')),
                a.push(en(r[e][0], c, !0, s)),
                a.push(en(r[e][1], c, !1, s));
            return a.push(tn(e)), a;
          })(e)
        );
    return e.nvui
      ? void 0
      : h('rm6', [
          nn(e),
          sn(t, e.trans.noarg) ||
            (o
              ? Xo()
                ? h('div.col1-moves', [
                    rn(e, -1, 'Y', e.ply == qe(t)),
                    o,
                    rn(e, 1, 'X', e.ply == Fe(t)),
                  ])
                : o
              : tn(e)),
        ]);
  }
  let cn = !1;

  function ln(e) {
    const t = Ue.playable(e.data) && e.data.expiration;
    if (!t) return;
    const o = Math.max(0, t.movedAt - Date.now() + t.millisToMove),
      n = Math.floor(o / 1e3),
      s = Ue.isPlayerTurn(e.data),
      r = s && o < 8e3;
    !cn && r && (lichess.sound.play('lowTime'), (cn = !0));
    return h(
      'div.expiration.expiration-' + (s != e.flip ? 'bottom' : 'top'),
      {
        class: {
          emerg: r,
          'bar-glider': s,
        },
      },
      e.trans.vdomPlural('nbSecondsToPlayTheFirstMove', n, h('strong', '' + n))
    );
  }

  function dn(e, t) {
    const o = e.playerAt(t);
    return e.nvui
      ? void 0
      : o.ai
      ? h('div.user-link.online.ruser.ruser-' + t, [
          h('i.line'),
          h('name', Bo(e, o.ai)),
        ])
      : (function (e, t, o) {
          const n = e.data,
            s = t.user,
            r = s ? s.perfs[n.game.perf] : null,
            i = t.rating ? t.rating : r && r.rating,
            a = t.ratingDiff,
            c =
              0 === a
                ? h('span', '±0')
                : a && a > 0
                ? h('good', '+' + a)
                : a && a < 0
                ? h('bad', '−' + -a)
                : void 0;
          if (s) {
            const n = !t.onGame && e.firstSeconds && s.online;
            return h(
              `div.ruser-${o}.ruser.user-link`,
              {
                class: {
                  online: t.onGame,
                  offline: !t.onGame,
                  long: s.username.length > 16,
                  connecting: n,
                },
              },
              [
                h('i.line' + (s.patron ? '.patron' : ''), {
                  attrs: {
                    title: n
                      ? 'Connecting to the game'
                      : t.onGame
                      ? 'Joined the game'
                      : 'Left the game',
                  },
                }),
                h(
                  'a.text.ulpt',
                  {
                    attrs: Object.assign(
                      {
                        'data-pt-pos': 's',
                        href: '/@/' + s.username,
                      },
                      e.isPlaying()
                        ? {
                            target: '_blank',
                            rel: 'noopener',
                          }
                        : {}
                    ),
                  },
                  s.title
                    ? [
                        h(
                          'span.utitle',
                          'BOT' == s.title
                            ? {
                                attrs: {
                                  'data-bot': !0,
                                },
                              }
                            : {},
                          s.title
                        ),
                        ' ',
                        s.username,
                      ]
                    : [s.username]
                ),
                i ? h('rating', i + (t.provisional ? '?' : '')) : null,
                c,
                t.engine
                  ? h('span', {
                      attrs: {
                        'data-icon': 'j',
                        title: e.noarg('thisAccountViolatedTos'),
                      },
                    })
                  : null,
              ]
            );
          }
          const l = !t.onGame && e.firstSeconds;
          return h(
            `div.ruser-${o}.ruser.user-link`,
            {
              class: {
                online: t.onGame,
                offline: !t.onGame,
                connecting: l,
              },
            },
            [
              h('i.line', {
                attrs: {
                  title: l
                    ? 'Connecting to the game'
                    : t.onGame
                    ? 'Joined the game'
                    : 'Left the game',
                },
              }),
              h('name', t.name || e.noarg('anonymous')),
            ]
          );
        })(e, o, t);
  }
  const un = (e) => e.loading || e.redirecting,
    pn = () => h('i.ddloader'),
    hn = (e, t) => [an(e), t.find((e) => !!e) ? h('div.rcontrols', t) : null],
    mn = (e) => hn(e, [un(e) ? pn() : uo(e) || po(e) || mo(e)]),
    fn = (e) => hn(e, [un(e) ? pn() : Ue.playable(e.data) ? void 0 : fo(e)]),
    gn = (e) => {
      const t = e.data,
        o = un(e),
        n = (function (e) {
          return e.moveToSubmit || e.dropToSubmit
            ? h('div.negotiation.move-confirm', [
                co(e, () => e.submitMove(!1), 'cancel'),
                h('p', e.noarg('confirmMove')),
                ao(e, 'confirm-yes', () => e.submitMove(!0)),
              ])
            : void 0;
        })(e),
        s =
          o || n
            ? []
            : [
                Ue.abortable(t)
                  ? Zt(e, void 0, 'L', 'abortGame', 'abort')
                  : Zt(
                      e,
                      Ue.takebackable,
                      'i',
                      'proposeATakeback',
                      'takeback-yes',
                      e.takebackYes
                    ),
                e.drawConfirm
                  ? oo(e)
                  : Zt(e, e.canOfferDraw, '2', 'offerDraw', 'draw-yes', () =>
                      e.offerDraw(!0)
                    ),
                e.resignConfirm
                  ? to(e)
                  : Zt(e, Ue.resignable, 'b', 'resign', 'resign', () =>
                      e.resign(!0)
                    ),
                on(e),
              ],
        r = o ? [pn()] : n ? [n] : [Qt(e), no(e), so(e), ro(e), io(e), lo(e)];
      return [
        an(e),
        h('div.rcontrols', [
          ...r,
          h(
            'div.ricons',
            {
              class: {
                confirm: !(!e.drawConfirm && !e.resignConfirm),
              },
            },
            s
          ),
        ]),
      ];
    };

  function vn(e, t) {
    const o = e.playerAt(t);
    return e.clock
      ? (function (e, t, o) {
          const n = e.clock,
            s = n.millisOf(t.color),
            r = e.data.player.color === t.color,
            i = t.color === n.times.activeColor,
            a = (e) => {
              const o = n.elements[t.color],
                s = n.millisOf(t.color),
                r = t.color === n.times.activeColor;
              (o.time = e),
                (o.clock = e.parentElement),
                (e.innerHTML = yo(s, n.showTenths(s), r, n.opts.nvui));
            },
            c = {
              insert: (e) => a(e.elm),
              postpatch: (e, t) => a(t.elm),
            };
          return h(
            'div.rclock.rclock-' + o,
            {
              class: {
                outoftime: s <= 0,
                running: i,
                emerg: s < n.emergMs,
              },
            },
            n.opts.nvui
              ? [
                  h('div.time', {
                    attrs: {
                      role: 'timer',
                    },
                    hook: c,
                  }),
                ]
              : [
                  n.showBar && Ue.bothPlayersHavePlayed(e.data)
                    ? wo(e, t.color)
                    : void 0,
                  h('div.time', {
                    class: {
                      hour: s > 36e5,
                    },
                    hook: c,
                  }),
                  Po(e, t.color, o),
                  r ? Mo(e) : ho(e),
                  Co(e, t.color, o),
                ]
          );
        })(e, o, t)
      : e.data.correspondence && e.data.game.turns > 1
      ? Yo(e.corresClock, e.trans, o.color, t, e.data.game.player)
      : (function (e, t, o) {
          const n = e.data;
          if (!He.finished(n) && !He.aborted(n))
            return h('div.rclock.rclock-turn.rclock-' + o, [
              n.game.player === t
                ? h(
                    'div.rclock-turn__text',
                    n.player.spectator
                      ? e.trans(n.game.player + 'Plays')
                      : e.trans(
                          n.game.player === n.player.color
                            ? 'yourTurn'
                            : 'waitingForOpponent'
                        )
                  )
                : null,
            ]);
        })(e, o.color, t);
  }
  const bn = (e) => [
    h('div.round__app__table'),
    ln(e),
    dn(e, 'top'),
    ...(e.data.player.spectator ? fn(e) : Ue.playable(e.data) ? gn(e) : mn(e)),
    dn(e, 'bottom'),
    vn(e, 'top'),
    vn(e, 'bottom'),
  ];

  function yn(e, t, o, n) {
    const s = [];
    let r, i;
    for (r in e)
      if (e[r] > 0) {
        const t = [];
        for (i = 0; i < e[r]; i++) t.push(h('mpiece.' + r));
        s.push(h('div', t));
      }
    if (n) for (i = 0; i < n; i++) s.push(h('div', h('mpiece.king')));
    return (
      t > 0 && s.push(h('score', '+' + t)), h('div.material.material-' + o, s)
    );
  }
  const wn = {
    white: {},
    black: {},
  };

  function kn(e) {
    const t = e.data,
      o = e.chessground && e.chessground.state,
      n = t[e.flip ? 'player' : 'opponent'].color,
      s = t[e.flip ? 'opponent' : 'player'].color;
    let r,
      i = 0;
    if (t.pref.showCaptured) {
      const t = o ? o.pieces : Xe.read(ze(e.data, e.ply).fen);
      (r = (function (e) {
        const t = {
          white: {
            king: 0,
            queen: 0,
            rook: 0,
            bishop: 0,
            knight: 0,
            pawn: 0,
          },
          black: {
            king: 0,
            queen: 0,
            rook: 0,
            bishop: 0,
            knight: 0,
            pawn: 0,
          },
        };
        for (const o of e.values()) {
          const e = t[ie.opposite(o.color)];
          e[o.role] > 0 ? e[o.role]-- : t[o.color][o.role]++;
        }
        return t;
      })(t)),
        (i =
          (function (e) {
            let t = 0;
            for (const o of e.values())
              t += ae[o.role] * ('white' === o.color ? 1 : -1);
            return t;
          })(t) * ('white' === s ? 1 : -1));
    } else r = wn;
    const a =
      t.player.checks || t.opponent.checks
        ? (function (e, t) {
            const o = Object.assign({}, he);
            for (const n of e) {
              if (t < n.ply) break;
              n.check && (n.ply % 2 == 1 ? o.white++ : o.black++);
            }
            return o;
          })(e.data.steps, e.ply)
        : he;
    return e.nvui
      ? e.nvui.render(e)
      : h(
          'div.round__app.variant-' + t.game.variant.key,
          {
            class: {
              'move-confirm': !(!e.moveToSubmit && !e.dropToSubmit),
            },
          },
          [
            h(
              'div.round__app__board.main-board' +
                (e.data.pref.blindfold ? '.blindfold' : ''),
              {
                hook:
                  'ontouchstart' in window
                    ? void 0
                    : ue(
                        'wheel',
                        (t) =>
                          (function (e, t) {
                            e.isPlaying() ||
                              (t.preventDefault(),
                              t.deltaY > 0 ? zo(e) : t.deltaY < 0 && Go(e),
                              e.redraw());
                          })(e, t),
                        void 0,
                        !1
                      ),
              },
              [ft(e), Gt(e)]
            ),
            Vo(e, n, 'top') || yn(r[n], -i, 'top', a[n]),
            ...bn(e),
            Vo(e, s, 'bottom') || yn(r[s], i, 'bottom', a[s]),
            e.keyboardMove ? Ro(e.keyboardMove) : null,
          ]
        );
  }
  const Pn = u([C, P]);
  return (
    (window.LichessChat = Se),
    (window.Chessground = lt.Chessground),
    (e.app = function (e) {
      const t = new Ko(e, s),
        o = kn(t);
      e.element.innerHTML = '';
      let n = Pn(e.element, o);

      function s() {
        n = Pn(n, kn(t));
      }
      return (
        window.addEventListener('resize', s),
        t.isPlaying() && Oe(),
        {
          socketReceive: t.socket.receive,
          moveOn: t.moveOn,
        }
      );
    }),
    (e.boot = function (e) {
      var t;
      const o = document.querySelector('.round__app'),
        n = e.data;

      function s() {
        n.tournament &&
          $('.game__tournament .clock').each(function () {
            $(this).clock({
              time: parseFloat($(this).data('time')),
            });
          });
      }

      function r(e) {
        if (!e.player.spectator)
          return e.steps.length < 4
            ? 'start'
            : e.game.status.id >= 30
            ? 'end'
            : void 0;
      }
      n.tournament && $('body').data('tournament-id', n.tournament.id),
        (lichess.socket = new lichess.StrongSocket(
          n.url.socket,
          n.player.version,
          {
            params: {
              userTv: n.userTv && n.userTv.id,
            },
            receive(e, t) {
              i.socketReceive(e, t);
            },
            events: {
              tvSelect(e) {
                n.tv && n.tv.channel == e.channel
                  ? lichess.reload()
                  : $('.tv-channels .' + e.channel + ' .champion').html(
                      e.player
                        ? [e.player.title, e.player.name, e.player.rating]
                            .filter((e) => e)
                            .join('&nbsp')
                        : 'Anonymous'
                    );
              },
              end() {
                se.text(
                  `${n.tv ? '/tv' : ''}/${n.game.id}/${n.player.color}/sides`
                ).then((e) => {
                  const t = $(e),
                    o = t.find('.game__meta');
                  o.length && $('.game__meta').replaceWith(o),
                    $('.crosstable').replaceWith(t.find('.crosstable')),
                    s(),
                    lichess.contentLoaded();
                });
              },
              tourStanding(t) {
                var o, n, s;
                (null === (o = e.chat) || void 0 === o ? void 0 : o.plugin) &&
                  (null ===
                    (s =
                      null === (n = e.chat) || void 0 === n
                        ? void 0
                        : n.instance) ||
                    void 0 === s ||
                    s.then((o) => {
                      e.chat.plugin.set(t), o.redraw();
                    }));
              },
            },
          }
        )),
        (e.element = o),
        (e.socketSend = lichess.socket.send);
      const i = window.LichessRound.app(e),
        a = e.chat;
      var c, l;
      a &&
        ((null === (t = n.tournament) || void 0 === t ? void 0 : t.top)
          ? ((a.plugin =
              ((c = n.tournament.top),
              (l = n.tournament.team),
              {
                set(e) {
                  c = e;
                },
                tab: {
                  key: 'tourStanding',
                  name: e.i18n.standing,
                },
                view: () =>
                  h(
                    'div',
                    {
                      hook: de((e) => {
                        lichess.loadCssPath('round.tour-standing');
                      }),
                    },
                    [
                      l
                        ? h(
                            'h3.text',
                            {
                              attrs: {
                                'data-icon': 'f',
                              },
                            },
                            l.name
                          )
                        : null,
                      h('table.slist', [
                        h(
                          'tbody',
                          c.map((e, t) =>
                            h('tr.' + e.n, [
                              h('td.name', [
                                h('span.rank', '' + (t + 1)),
                                h(
                                  'a.user-link.ulpt',
                                  {
                                    attrs: {
                                      href: `/@/${e.n}`,
                                    },
                                  },
                                  (e.t ? e.t + ' ' : '') + e.n
                                ),
                              ]),
                              h(
                                'td.total',
                                e.f
                                  ? {
                                      class: {
                                        'is-gold': !0,
                                      },
                                      attrs: {
                                        'data-icon': 'Q',
                                      },
                                    }
                                  : {},
                                '' + e.s
                              ),
                            ])
                          )
                        ),
                      ]),
                    ]
                  ),
              })),
            (a.alwaysEnabled = !0))
          : n.simul || n.swiss || ((a.preset = r(n)), (a.parseMoves = !0)),
        a.noteId && (a.noteAge || 0) < 10 && (a.noteText = ''),
        (a.instance = lichess.makeChat(a)),
        n.tournament ||
          n.simul ||
          n.swiss ||
          (e.onChange = (e) =>
            a.instance.then((t) => t.preset.setGroup(r(e))))),
        s(),
        $('.round__now-playing .move-on input')
          .on('change', i.moveOn.toggle)
          .prop('checked', i.moveOn.get())
          .on('click', 'a', () => ((lichess.unload.expected = !0), !0)),
        0 === location.pathname.lastIndexOf('/round-next/', 0) &&
          history.replaceState(null, '', '/' + n.game.id),
        $('#zentog').on('click', () => lichess.pubsub.emit('zen')),
        lichess.storage.make('reload-round-tabs').listen(lichess.reload);
    }),
    Object.defineProperty(e, '__esModule', {
      value: !0,
    }),
    e
  );
})({});

globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"ae-hLVBrSrDdpIw3Xl0dJPRkupPepQ\"",
		"mtime": "2026-11-15T04:53:37.955Z",
		"size": 174,
		"path": "../public/robots.txt"
	},
	"/assets/blackout-BAXgsGMH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5a2-mbkD9SqetXFr3u7ORzYtmTAJb8o\"",
		"mtime": "2026-11-15T05:28:57.065Z",
		"size": 1442,
		"path": "../public/assets/blackout-BAXgsGMH.js"
	},
	"/assets/arrow-up-right-DmS16sIM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7-sUYVCklVsHhRk0ATBlBYGpoCU7g\"",
		"mtime": "2026-11-15T05:28:57.064Z",
		"size": 167,
		"path": "../public/assets/arrow-up-right-DmS16sIM.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-11-15T04:53:37.954Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/circle-check-DQPP_1Bo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-D4zgDOn71EOKKrji10j91HRQla8\"",
		"mtime": "2026-11-15T05:28:57.068Z",
		"size": 178,
		"path": "../public/assets/circle-check-DQPP_1Bo.js"
	},
	"/assets/button-DH_EFbKl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f3b-QqnrHZYDDDEUoZPylilpGudUkWA\"",
		"mtime": "2026-11-15T05:28:57.067Z",
		"size": 32571,
		"path": "../public/assets/button-DH_EFbKl.js"
	},
	"/assets/DonationPledgeForm-ERcApV33.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d98-1ezTrrQWmY9rlPUKT/E/DuXCMh4\"",
		"mtime": "2026-11-15T05:28:57.058Z",
		"size": 7576,
		"path": "../public/assets/DonationPledgeForm-ERcApV33.js"
	},
	"/assets/donate-C19Q4bOp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"156d-SGzyxbnUBKux/Krqxpu0hSX8Hwo\"",
		"mtime": "2026-11-15T05:28:57.071Z",
		"size": 5485,
		"path": "../public/assets/donate-C19Q4bOp.js"
	},
	"/assets/ClientOnly-CSuM2lI8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"125-CpxhGx4ZLv5Cg5gZY3hFyD/ywXU\"",
		"mtime": "2026-11-15T05:28:57.057Z",
		"size": 293,
		"path": "../public/assets/ClientOnly-CSuM2lI8.js"
	},
	"/assets/createLucideIcon-wv_2as3S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19d7-9fsiA9nCJezZuupFWaGAiRqaJYk\"",
		"mtime": "2026-11-15T05:28:57.070Z",
		"size": 6615,
		"path": "../public/assets/createLucideIcon-wv_2as3S.js"
	},
	"/assets/lazyRouteComponent-CJkKfcck.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11a8-qn9ZzPssse/9FkuURNPRQvJ6ry4\"",
		"mtime": "2026-11-15T05:28:57.074Z",
		"size": 4520,
		"path": "../public/assets/lazyRouteComponent-CJkKfcck.js"
	},
	"/assets/jsx-runtime-ByaQ0wya.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2246-Gj4fxED/klRTPlxoTWmHhxgF1NQ\"",
		"mtime": "2026-11-15T05:28:57.073Z",
		"size": 8774,
		"path": "../public/assets/jsx-runtime-ByaQ0wya.js"
	},
	"/assets/map-pin-Bp_9b9lh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-JVraMP/KIiIbLYX52Jr5nFtMVeI\"",
		"mtime": "2026-11-15T05:28:57.078Z",
		"size": 259,
		"path": "../public/assets/map-pin-Bp_9b9lh.js"
	},
	"/assets/IncidentMap-DvXeZY9w.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"3ea-XZJs5AfbLnBo4MLq50T2ycM1teE\"",
		"mtime": "2026-11-15T05:28:57.098Z",
		"size": 1002,
		"path": "../public/assets/IncidentMap-DvXeZY9w.css"
	},
	"/assets/MapView-Jwcv7dwN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a6-tKZ9LofBmW+MNettLuRnPQ5OWdM\"",
		"mtime": "2026-11-15T05:28:57.060Z",
		"size": 1190,
		"path": "../public/assets/MapView-Jwcv7dwN.js"
	},
	"/assets/missions-BEDE4Jx2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1411-KWPODtTaezcgAHX2CBjPvIM3b+A\"",
		"mtime": "2026-11-15T05:28:57.080Z",
		"size": 5137,
		"path": "../public/assets/missions-BEDE4Jx2.js"
	},
	"/assets/missions-CbUuySNw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a3-hhyhoChexKvR6k8bU8R4ZEnBhSM\"",
		"mtime": "2026-11-15T05:28:57.081Z",
		"size": 1187,
		"path": "../public/assets/missions-CbUuySNw.js"
	},
	"/assets/link-5zQd3Q-V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b7b-/u5PuPxMKQNymBZKMUHoEOjrdwk\"",
		"mtime": "2026-11-15T05:28:57.076Z",
		"size": 11131,
		"path": "../public/assets/link-5zQd3Q-V.js"
	},
	"/assets/preload-helper-Czpn1I53.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ac-sE+5KsaRXTMfwOfrOATQajMSGV4\"",
		"mtime": "2026-11-15T05:28:57.082Z",
		"size": 1196,
		"path": "../public/assets/preload-helper-Czpn1I53.js"
	},
	"/assets/MissionDetail-hGyYqh0A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e9c-jtfJUQ9mBW7T7Xji/SLdw0IZGiQ\"",
		"mtime": "2026-11-15T05:28:57.062Z",
		"size": 7836,
		"path": "../public/assets/MissionDetail-hGyYqh0A.js"
	},
	"/assets/IncidentMap-DMO3aBsQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"266e6-L64syQVdq/rUZfGjg3Fg5CZeg1w\"",
		"mtime": "2026-11-15T05:28:57.059Z",
		"size": 157414,
		"path": "../public/assets/IncidentMap-DMO3aBsQ.js"
	},
	"/assets/report-fo0XYWRe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1728-o6SRFotMw9uTm/KiJTJWQ7M16Bo\"",
		"mtime": "2026-11-15T05:28:57.088Z",
		"size": 5928,
		"path": "../public/assets/report-fo0XYWRe.js"
	},
	"/assets/index-Dhw_eo55.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"549c6-CtPLS3mM9wQhj3zKJjuU9ifZ984\"",
		"mtime": "2026-11-15T05:28:57.056Z",
		"size": 346566,
		"path": "../public/assets/index-Dhw_eo55.js"
	},
	"/assets/radio-B_ruO1mi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"176-NfmacEXwT+zpkHLyYUNrXX+SbCQ\"",
		"mtime": "2026-11-15T05:28:57.084Z",
		"size": 374,
		"path": "../public/assets/radio-B_ruO1mi.js"
	},
	"/assets/react-dom-CdSXV3qk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f17-fwQbzvS5NMb8H+JnqMaEBd5y92Q\"",
		"mtime": "2026-11-15T05:28:57.086Z",
		"size": 3863,
		"path": "../public/assets/react-dom-CdSXV3qk.js"
	},
	"/assets/rescue-C0rymY1e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11c-RIWK8vE8J+sQIXe4EWrVM6pUZHw\"",
		"mtime": "2026-11-15T05:28:57.089Z",
		"size": 284,
		"path": "../public/assets/rescue-C0rymY1e.js"
	},
	"/assets/search-Bft6jYY-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-VrJ+evqeYBYPyE278JvoainBwlA\"",
		"mtime": "2026-11-15T05:28:57.092Z",
		"size": 174,
		"path": "../public/assets/search-Bft6jYY-.js"
	},
	"/assets/store-Dp3qVwIE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a91-IPaORwl56Mm4SH6RJaME/bJ+Mag\"",
		"mtime": "2026-11-15T05:28:57.093Z",
		"size": 2705,
		"path": "../public/assets/store-Dp3qVwIE.js"
	},
	"/assets/routes-BOOF1Tkb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c18-FdYfq+IwHOE3J0xEI8f7rBuMvRs\"",
		"mtime": "2026-11-15T05:28:57.091Z",
		"size": 15384,
		"path": "../public/assets/routes-BOOF1Tkb.js"
	},
	"/assets/teams-DrxuVCZ-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce0-s/hU/9g3S9SO0X4xOBetKF5OLEk\"",
		"mtime": "2026-11-15T05:28:57.094Z",
		"size": 3296,
		"path": "../public/assets/teams-DrxuVCZ-.js"
	},
	"/assets/track-BN6ugO5C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"af7-JgPubk8eCIJZm7K9kNXyGbn407s\"",
		"mtime": "2026-11-15T05:28:57.095Z",
		"size": 2807,
		"path": "../public/assets/track-BN6ugO5C.js"
	},
	"/assets/styles-DVHh1eUc.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"21271-+mHNfSdT+MIy1hLbEUqbjdHijM8\"",
		"mtime": "2026-11-15T05:28:57.100Z",
		"size": 135793,
		"path": "../public/assets/styles-DVHh1eUc.css"
	},
	"/assets/x-BlQJnUOM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-xDttwIKO2rKOM41GYKaQHQoQg1Q\"",
		"mtime": "2026-11-15T05:28:57.097Z",
		"size": 154,
		"path": "../public/assets/x-BlQJnUOM.js"
	},
	"/assets/track-piKISoe9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b3-2NjwlVVsf+RAZL9Qz5yPKiFDYpw\"",
		"mtime": "2026-11-15T05:28:57.096Z",
		"size": 1203,
		"path": "../public/assets/track-piKISoe9.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_isA24y = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_isA24y
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };

import { n as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { t as DemoProvider } from "./store-5hcFn97k.mjs";
import { S as ArrowUpRight, l as Radio, m as LifeBuoy, r as Waypoints } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-B2wejuZy.mjs";
import { _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as useRouter, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$5 } from "./missions-DlOKH4Jq.mjs";
import { t as Route$6 } from "./track-BgckL5pi.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DbGOQlYq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DVHh1eUc.css";
var links = [{
	to: "/",
	label: "Report Emergency",
	icon: LifeBuoy
}];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "app-shell support-shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "topbar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "brand",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "brand-mark",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waypoints, { size: 26 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"RESCUE",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "brand-accent",
								children: "GRID"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "COMMUNITY HELP NETWORK" })
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Main navigation",
						children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							className: pathname === l.to ? "nav-active" : "",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: l.to,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(l.icon, { size: 17 }), l.label]
							})
						}, l.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "header-controls",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "demo-chip",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), "DEMO MODE"]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "demo-strip",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { size: 13 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "PROTOTYPE ENVIRONMENT" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "strip-divider" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fictional reports & donation pledges. Not an emergency service." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "demo-role-note",
					children: "Do not enter sensitive personal information"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "app-footer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "online-dot" }), "LOCAL DEMONSTRATION DATA"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "RESCUEGRID · Help requests & community donations" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Not connected to emergency services ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 11 })] })
				]
			})
		]
	});
}
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message: describeThrown(error),
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var MAX_SERIALIZED_LENGTH = 2e3;
function describeThrown(error) {
	if (error instanceof Response) return `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
	if (error instanceof Error) return error.message;
	if (typeof error === "string") return error;
	const { message } = error ?? {};
	if (typeof message === "string" && message.length > 0) return message;
	try {
		return JSON.stringify(error)?.slice(0, MAX_SERIALIZED_LENGTH) ?? String(error);
	} catch {
		return String(error);
	}
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$4 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "RESCUEGRID" },
			{
				name: "description",
				content: "Community Help Requests and Donations Demo"
			},
			{
				name: "author",
				content: "RESCUEGRID"
			},
			{
				property: "og:title",
				content: "RESCUEGRID"
			},
			{
				property: "og:description",
				content: "Community Help Requests and Donations Demo"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$4.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) })
	});
}
var $$splitComponentImporter$3 = () => import("./routes-BDSBMKSU.mjs");
var Route$3 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "RESCUEGRID | Community Emergency & Aid" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./donate-BQxZsuOg.mjs");
var Route$2 = createFileRoute("/donate")({
	head: () => ({ meta: [{ title: "Donation Hub | RESCUEGRID" }, {
		name: "description",
		content: "Offer fictional supplies and volunteer support for community recovery."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./report-C38lK4CH.mjs");
var Route$1 = createFileRoute("/report")({
	head: () => ({ meta: [
		{ title: "Report Emergency | RESCUEGRID" },
		{
			name: "description",
			content: "Submit a fictional emergency assistance request in the RESCUEGRID demonstration."
		},
		{
			property: "og:title",
			content: "RESCUEGRID Emergency Report"
		},
		{
			property: "og:description",
			content: "Create a demonstration report. This does not contact or dispatch real emergency services."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./teams-DdvY0i_D.mjs");
var Route = createFileRoute("/teams")({
	head: () => ({ meta: [
		{ title: "Team Command | RESCUEGRID" },
		{
			name: "description",
			content: "Coordinate the fictional Alpha, Bravo and Charlie rescue teams."
		},
		{
			property: "og:title",
			content: "RESCUEGRID Team Command"
		},
		{
			property: "og:description",
			content: "See team availability, active tasks and mission coordination history."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	DonateRoute: Route$2.update({
		id: "/donate",
		path: "/donate",
		getParentRoute: () => Route$4
	}),
	MissionsRoute: Route$5.update({
		id: "/missions",
		path: "/missions",
		getParentRoute: () => Route$4
	}),
	ReportRoute: Route$1.update({
		id: "/report",
		path: "/report",
		getParentRoute: () => Route$4
	}),
	TeamsRoute: Route.update({
		id: "/teams",
		path: "/teams",
		getParentRoute: () => Route$4
	}),
	TrackRoute: Route$6.update({
		id: "/track",
		path: "/track",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };

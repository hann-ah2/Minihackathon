import { n as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useDemo } from "./store-5hcFn97k.mjs";
import { _ as Crosshair, c as Search, x as Check } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-B2wejuZy.mjs";
import { r as statusLabels } from "./rescue-BjDPxC68.mjs";
import { n as PriorityBadge, t as MissionDetail } from "./MissionDetail-DhVzGu6J.mjs";
import { t as Route } from "./track-BgckL5pi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/track-CVUYHuFE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Track() {
	const { reports } = useDemo();
	const params = Route.useSearch();
	const [query, setQuery] = (0, import_react.useState)(params.reference ?? "");
	const [reference, setReference] = (0, import_react.useState)(params.reference ?? "");
	const report = reports.find((r) => r.id.toUpperCase() === reference.trim().toUpperCase());
	const states = [
		"new",
		"assigned",
		"in_progress",
		"resolved"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "standard-page track-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "page-heading",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "eyebrow",
						children: "RESIDENT STATUS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["Track My Request", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "heading-dot",
						children: "."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Stay connected to your mission, from report to recovery." })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "track-search",
				onSubmit: (e) => {
					e.preventDefault();
					setReference(query);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crosshair, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						"aria-label": "Report reference",
						placeholder: "Enter your report reference, e.g. RG-1041",
						value: query,
						onChange: (e) => setQuery(e.target.value),
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {}), "Track request"] })
				]
			}),
			report ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "track-summary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { report }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: report.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						report.id,
						" · ",
						report.location_name
					] })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "progress-steps",
					children: states.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: i <= states.indexOf(report.status) ? "complete-step" : "",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i < states.indexOf(report.status) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 15 }) : i + 1 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: statusLabels[s] })]
					}, s))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionDetail, { report })] }) : reference ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "empty-state",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Request not found" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Check the reference and try again. Only this browser’s fictional reports are available." })]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "empty-state",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crosshair, { size: 40 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Your recovery mission, in view." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Enter the reference from your demo report acknowledgment." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-note",
				children: "Demo tracking only. Reports are stored in this browser, not sent to emergency services."
			})
		]
	});
}
//#endregion
export { Track as component };

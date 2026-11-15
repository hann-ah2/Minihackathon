import { n as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useDemo } from "./store-5hcFn97k.mjs";
import { S as ArrowUpRight, a as Shield, i as Users, l as Radio } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-B2wejuZy.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as statusLabels } from "./rescue-BjDPxC68.mjs";
import { n as PriorityBadge, t as MissionDetail } from "./MissionDetail-DhVzGu6J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teams-DdvY0i_D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Teams() {
	const { teams, reports } = useDemo();
	const [selected, setSelected] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "standard-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "eyebrow",
						children: "RESPONSE NETWORK"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["Team Command", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "heading-dot",
						children: "."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The right people, working together, where they’re needed." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "page-total",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
						teams.length,
						" fictional response teams"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "team-grid",
				children: teams.map((t, i) => {
					const assigned = reports.filter((r) => r.assigned_team_id === t.id);
					const active = assigned.filter((r) => r.status !== "resolved");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "team-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "team-card-heading",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "team-avatar",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { size: 24 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `availability ${t.status}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "status-dot" }), t.status === "available" ? "Available" : "Responding"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "eyebrow",
								children: ["RESPONSE UNIT 0", i + 1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "team-specialty",
								children: [
									"Search & rescue · Flood evacuation",
									"Medical support · Field assessment",
									"Relief supplies · Community recovery"
								][i]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "team-stats",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: active.length.toString().padStart(2, "0") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Active tasks" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: assigned.filter((r) => r.status === "resolved").length.toString().padStart(2, "0") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Completed" })] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { size: 14 }), "Assigned missions"] }),
							assigned.length ? assigned.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								className: "team-mission",
								onClick: () => setSelected(r.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { report: r }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: r.title }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `status-text ${r.status}`,
										children: statusLabels[r.status]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 16 })]
							}, r.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "team-empty",
								children: "Ready for a new mission."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								className: "w-full mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/missions",
									children: ["Review mission queue", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
								})
							})
						]
					}, t.id);
				})
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "team-detail-layout",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionDetail, {
					report: reports.find((r) => r.id === selected),
					onClose: () => setSelected("")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-note",
				children: "Select an assigned mission to review its history or explicitly reassign its response team."
			})
		]
	});
}
//#endregion
export { Teams as component };

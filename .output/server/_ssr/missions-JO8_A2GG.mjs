import { n as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useDemo } from "./store-5hcFn97k.mjs";
import { S as ArrowUpRight, c as Search, i as Users, p as MapPin, y as ClipboardList } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-B2wejuZy.mjs";
import { t as Route } from "./missions-DlOKH4Jq.mjs";
import { r as statusLabels } from "./rescue-BjDPxC68.mjs";
import { n as PriorityBadge, t as MissionDetail } from "./MissionDetail-DhVzGu6J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/missions-JO8_A2GG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Missions() {
	const { reports, teams, role, teamId } = useDemo();
	const searchParams = Route.useSearch();
	const [selectedId, setSelectedId] = (0, import_react.useState)(searchParams.mission ?? "");
	const [status, setStatus] = (0, import_react.useState)("active");
	const [priority, setPriority] = (0, import_react.useState)("all");
	const [team, setTeam] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const [sort, setSort] = (0, import_react.useState)("priority");
	const base = reports.filter((r) => role !== "responder" || r.assigned_team_id === teamId);
	const filtered = base.filter((r) => (status === "all" || (status === "active" ? r.status !== "resolved" : r.status === status)) && (priority === "all" || r.priority === priority) && (team === "all" || (team === "unassigned" ? !r.assigned_team_id : r.assigned_team_id === team)) && `${r.id} ${r.title} ${r.location_name}`.toLowerCase().includes(search.toLowerCase())).sort((a, b) => sort === "priority" ? a.priority.localeCompare(b.priority) || b.created_at.localeCompare(a.created_at) : b.created_at.localeCompare(a.created_at));
	const selected = reports.find((r) => r.id === selectedId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "standard-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-heading",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "eyebrow",
					children: "MISSION COORDINATION"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [role === "responder" ? "Assigned Missions" : "Recovery Missions", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "heading-dot",
					children: "."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every request has a mission. Every mission has a path forward." })
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "page-total",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {}),
					base.length,
					" fictional missions"
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mission-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mission-board",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "status-tabs",
						children: [
							["active", "Active"],
							["new", "New"],
							["assigned", "Assigned"],
							["in_progress", "In Progress"],
							["resolved", "Resolved"],
							["all", "All"]
						].map(([v, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							className: status === v ? "tab-active" : "",
							onClick: () => setStatus(v),
							children: [l, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: base.filter((r) => v === "all" || (v === "active" ? r.status !== "resolved" : r.status === v)).length })]
						}, v))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "board-filters",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "search-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									"aria-label": "Search missions",
									placeholder: "Search mission ID or location…",
									value: search,
									onChange: (e) => setSearch(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								"aria-label": "Priority filter",
								value: priority,
								onChange: (e) => setPriority(e.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All priorities"
								}), [
									"P1",
									"P2",
									"P3",
									"P4"
								].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: p }, p))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								"aria-label": "Team filter",
								value: team,
								onChange: (e) => setTeam(e.target.value),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "all",
										children: "All teams"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "unassigned",
										children: "Unassigned"
									}),
									teams.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: t.id,
										children: t.name
									}, t.id))
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								"aria-label": "Sort missions",
								value: sort,
								onChange: (e) => setSort(e.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "priority",
									children: "Priority first"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "recent",
									children: "Newest first"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mission-table-head",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "MISSION / LOCATION" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PRIORITY" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "STATUS" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TEAM" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
						]
					}),
					filtered.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						className: `mission-row ${selectedId === r.id ? "selected-incident" : ""}`,
						onClick: () => setSelectedId(r.id),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mission-id",
									children: [
										r.id,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `verification-text ${r.verification_status}`,
											children: r.verification_status
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: r.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "location-line",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 12 }),
										r.location_name,
										" · ",
										r.affected_people,
										" people"
									]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { report: r }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `status-text ${r.status}`,
								children: statusLabels[r.status]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "row-team",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 13 }), teams.find((t) => t.id === r.assigned_team_id)?.name ?? "Unassigned"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 17 })
						]
					}, r.id)),
					!filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "empty-state",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { size: 30 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "No missions in this view" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: role === "responder" ? "Your selected team has no matching missions." : "Try another filter or create a demo report." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "board-footer",
						children: [filtered.length, " missions · Fictional demonstration data · Highest-priority unresolved missions first"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionDetail, {
				report: selected,
				onClose: () => setSelectedId("")
			})]
		})]
	});
}
//#endregion
export { Missions as component };

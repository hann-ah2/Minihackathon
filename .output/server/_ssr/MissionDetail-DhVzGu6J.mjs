import { n as __toESM } from "../_runtime.mjs";
import { t as mockService } from "./mock-data-RlLiAucn.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useDemo } from "./store-5hcFn97k.mjs";
import { S as ArrowUpRight, b as CircleCheck, f as MessageSquare, i as Users, o as ShieldCheck, p as MapPin, t as X, u as Play, v as Clock3, x as Check } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-B2wejuZy.mjs";
import { n as priorityLabels, r as statusLabels } from "./rescue-BjDPxC68.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MissionDetail-DhVzGu6J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PriorityBadge({ report }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `priority-badge ${report.status === "resolved" ? "resolved" : report.priority}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "status-dot" }),
			report.priority,
			" · ",
			priorityLabels[report.priority]
		]
	});
}
function MissionDetail({ report, onClose }) {
	const { teams, role, teamId, refresh } = useDemo();
	const [assignment, setAssignment] = (0, import_react.useState)("alpha");
	const [note, setNote] = (0, import_react.useState)("");
	const [updates, setUpdates] = (0, import_react.useState)([]);
	const [message, setMessage] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMessage("");
		setConfirm(false);
		setAssignment(report?.assigned_team_id ?? "alpha");
		if (report) mockService.getMissionUpdates(report.id).then(setUpdates);
	}, [report]);
	async function action(fn, success) {
		setBusy(true);
		setMessage("");
		try {
			await fn();
			await refresh();
			setMessage(success);
		} catch (e) {
			setMessage(e instanceof Error ? e.message : "Something went wrong.");
		} finally {
			setBusy(false);
		}
	}
	if (!report) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "detail-panel empty-detail",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 34 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Ready to coordinate" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Select an incident to review its mission." })
		]
	});
	const canRespond = role === "coordinator" || role === "responder" && report.assigned_team_id === teamId;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "detail-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "MISSION DETAILS"
				}), onClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					title: "Close mission details",
					"aria-label": "Close mission details",
					onClick: onClose,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { report }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mission-id",
					children: report.id
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "detail-title",
				children: report.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "location-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 14 }), report.location_name]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "detail-facts",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Mission status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: `status-text ${report.status}`,
						children: statusLabels[report.status]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "People affected" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 15 }),
						report.affected_people,
						" people"
					] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Incident category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: report.category })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reported at" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: new Date(report.created_at).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					}) })] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `verification ${report.verification_status}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: report.verification_status === "verified" ? "Verified in demo scenario" : "Unverified resident report" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "detail-section",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Situation report" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: report.description }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "detail-label",
						children: "ASSISTANCE REQUESTED"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: report.assistance_needed })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "detail-section",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 16 }), "Response team"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "assigned-team",
						children: [teams.find((t) => t.id === report.assigned_team_id)?.name ?? "Awaiting assignment", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: report.assigned_team_id ? "Assigned" : "Unassigned" })]
					}),
					role === "coordinator" && report.status !== "resolved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: "assign-team",
							children: "Response team"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "assign-team",
							value: assignment,
							onChange: (e) => setAssignment(e.target.value),
							children: teams.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: t.id,
								children: [
									t.name,
									" · ",
									t.status
								]
							}, t.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "w-full mt-3",
							disabled: busy || assignment === report.assigned_team_id,
							onClick: () => {
								if (report.assigned_team_id) {
									if (!window.confirm("Explicitly reassign this mission to another team?")) return;
									action(() => mockService.reassignTeam(report.id, assignment), "Mission reassigned.");
								} else action(() => mockService.assignTeam(report.id, assignment), "Team assigned successfully.");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {}), report.assigned_team_id ? "Reassign team" : "Assign mission"]
						})
					] }),
					canRespond && report.status === "assigned" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "w-full mt-3",
						variant: "secondary",
						disabled: busy,
						onClick: () => action(() => mockService.updateMissionStatus(report.id, "in_progress"), "Mission is now in progress."),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}), "Mark In Progress"]
					}),
					role === "coordinator" && report.status === "in_progress" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: !confirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "w-full mt-3",
						variant: "secondary",
						onClick: () => setConfirm(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Resolve mission"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "confirmation",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Confirm everyone is safe and assistance is complete in this demo?" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								disabled: busy,
								onClick: () => action(() => mockService.updateMissionStatus(report.id, "resolved"), "Mission resolved and confirmed."),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}), "Confirm resolution"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: () => setConfirm(false),
								children: "Cancel"
							})
						]
					}) }),
					role === "coordinator" && report.verification_status === "unverified" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						className: "w-full mt-2",
						disabled: busy,
						onClick: () => action(() => mockService.updateReport(report.id, { verification_status: "verified" }), "Report verified in demo."),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Mark demo report verified"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "detail-section",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 16 }),
						"Coordination timeline ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "count-label",
							children: updates.length
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "timeline",
						children: updates.slice().reverse().map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "timeline-item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "timeline-dot" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [u.author_name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: new Date(u.created_at).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit"
								}) })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: u.note }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "timeline-status",
									children: statusLabels[u.status]
								})
							] })]
						}, u.id))
					}),
					canRespond && report.status !== "resolved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							action(async () => {
								await mockService.addMissionUpdate({
									report_id: report.id,
									author_name: role === "coordinator" ? "Demo coordinator" : teams.find((t) => t.id === teamId)?.name ?? "Demo responder",
									note,
									status: report.status
								});
								setNote("");
							}, "Coordination update added.");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							"aria-label": "Coordination note",
							placeholder: "Add a coordination update…",
							value: note,
							onChange: (e) => setNote(e.target.value),
							required: true,
							rows: 3
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							className: "w-full mt-2",
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {}), "Add update"]
						})]
					})
				]
			}),
			message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "action-feedback",
				role: "status",
				children: message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "detail-disclaimer",
				children: "FICTIONAL DEMONSTRATION · Provisional priority, not professional triage."
			})
		]
	});
}
//#endregion
export { PriorityBadge as n, MissionDetail as t };

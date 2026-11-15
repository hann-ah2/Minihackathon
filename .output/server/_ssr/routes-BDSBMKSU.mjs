import { n as __toESM } from "../_runtime.mjs";
import { t as mockService } from "./mock-data-RlLiAucn.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useDemo } from "./store-5hcFn97k.mjs";
import { r as formatDonationContribution, t as DonationPledgeForm } from "./DonationPledgeForm-DXxDIV3m.mjs";
import { n as WifiOff, s as ShieldAlert, t as X } from "../_libs/lucide-react.mjs";
import { n as priorityLabels } from "./rescue-BjDPxC68.mjs";
import { t as MapView } from "./MapView-Cxb5qtQa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BDSBMKSU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var toRadians = (degrees) => degrees * Math.PI / 180;
function distanceMeters(a, b) {
	const R = 6371e3;
	const dLat = toRadians(b.latitude - a.latitude);
	const dLon = toRadians(b.longitude - a.longitude);
	const latA = toRadians(a.latitude);
	const latB = toRadians(b.latitude);
	const q = Math.sin(dLat / 2) ** 2 + Math.cos(latA) * Math.cos(latB) * Math.sin(dLon / 2) ** 2;
	return 2 * R * Math.atan2(Math.sqrt(q), Math.sqrt(1 - q));
}
/**
* Density-connected clustering (DBSCAN-like), min 3 nearby unreachable devices.
* Recalculate whenever the set of stale heartbeats changes.
*/
function computeSilentZones(devices, neighborhoodMeters = 350, minimumDevices = 3) {
	const visited = /* @__PURE__ */ new Set();
	const assigned = /* @__PURE__ */ new Set();
	const zones = [];
	const neighborsOf = (i) => devices.map((other, j) => distanceMeters(devices[i], other) <= neighborhoodMeters ? j : -1).filter((j) => j >= 0);
	for (let i = 0; i < devices.length; i++) {
		if (visited.has(i)) continue;
		visited.add(i);
		const initial = neighborsOf(i);
		if (initial.length < minimumDevices) continue;
		const members = /* @__PURE__ */ new Set();
		const queue = [...initial];
		while (queue.length) {
			const candidate = queue.shift();
			if (assigned.has(candidate)) continue;
			members.add(candidate);
			if (!visited.has(candidate)) {
				visited.add(candidate);
				const nearby = neighborsOf(candidate);
				if (nearby.length >= minimumDevices) {
					for (const next of nearby) if (!queue.includes(next) && !members.has(next)) queue.push(next);
				}
			}
		}
		if (members.size < minimumDevices) continue;
		const points = [...members].map((index) => devices[index]);
		for (const index of members) assigned.add(index);
		const latitude = points.reduce((sum, d) => sum + d.latitude, 0) / points.length;
		const longitude = points.reduce((sum, d) => sum + d.longitude, 0) / points.length;
		const center = {
			latitude,
			longitude
		};
		const radius_meters = Math.max(200, ...points.map((d) => distanceMeters(center, d) + 75));
		zones.push({
			id: `silent-zone-${zones.length + 1}`,
			latitude,
			longitude,
			radius_meters,
			device_count: points.length
		});
	}
	return zones;
}
/** Simulated last-known device locations around Subang / Sunway. */
function simulateSeismicBlackout(now = Date.now()) {
	return [
		[3.0726, 101.5968],
		[3.0734, 101.5976],
		[3.0715, 101.5982],
		[3.0741, 101.5962],
		[3.0722, 101.599],
		[3.0676, 101.6062],
		[3.0685, 101.6078],
		[3.0669, 101.6086],
		[3.0689, 101.6068],
		[3.0804, 101.5905],
		[3.0814, 101.591],
		[3.0794, 101.5913],
		[3.056, 101.5808],
		[3.0885, 101.6182]
	].map(([latitude, longitude], i) => ({
		id: `DEMO-LKL-${String(i + 1).padStart(3, "0")}`,
		latitude,
		longitude,
		last_seen_at: (/* @__PURE__ */ new Date(now - (4 + i * 3 % 17) * 6e4)).toISOString(),
		status: "unreachable",
		simulated: true
	}));
}
var incidents = [
	{
		name: "Trapped / Rescue",
		label: "Trapped Persons",
		emoji: "🆘",
		help: "Evacuation / Rescue"
	},
	{
		name: "Medical Assistance",
		label: "Medical Help",
		emoji: "🩺",
		help: "Medical support"
	},
	{
		name: "Flood",
		label: "Flooding",
		emoji: "🌊",
		help: "Evacuation / Rescue"
	},
	{
		name: "Landslide",
		label: "Landslide",
		emoji: "⛰️",
		help: "Recovery / Cleanup"
	},
	{
		name: "Power Outage",
		label: "Power Outage",
		emoji: "⚡",
		help: "Essential supplies"
	},
	{
		name: "Shelter",
		label: "Shelter Needs",
		emoji: "⛺",
		help: "Temporary shelter"
	}
];
var resources = [
	"Evacuation / Rescue",
	"Medical support",
	"Food / Drinking water",
	"Temporary shelter",
	"Essential supplies",
	"Recovery / Cleanup",
	"Other assistance"
];
var priorities = [
	"P1",
	"P2",
	"P3",
	"P4"
];
var colors = {
	P1: "bg-red-500",
	P2: "bg-orange-500",
	P3: "bg-yellow-400",
	P4: "bg-green-500"
};
var field = "w-full rounded-lg border border-[#334155] bg-[#0f172a] px-3 py-2.5 text-sm text-white outline-none focus:border-sky-400";
var label = "mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-300";
function CommunityDashboard() {
	const { reports, donations, loading } = useDemo();
	const [formMode, setFormMode] = (0, import_react.useState)("report");
	const [feedMode, setFeedMode] = (0, import_react.useState)("reports");
	const [category, setCategory] = (0, import_react.useState)("Trapped / Rescue");
	const [assistance, setAssistance] = (0, import_react.useState)("Evacuation / Rescue");
	const [danger, setDanger] = (0, import_react.useState)("unsure");
	const [coords, setCoords] = (0, import_react.useState)(null);
	const [priorityFilter, setPriorityFilter] = (0, import_react.useState)("all");
	const [blackoutDevices, setBlackoutDevices] = (0, import_react.useState)([]);
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => reports.filter((r) => priorityFilter === "all" || r.priority === priorityFilter).sort((a, b) => a.priority.localeCompare(b.priority) || b.created_at.localeCompare(a.created_at)), [reports, priorityFilter]);
	const selectedReport = reports.find((r) => r.id === selectedId);
	const silentZoneCount = (0, import_react.useMemo)(() => computeSilentZones(blackoutDevices).length, [blackoutDevices]);
	async function submitReport(e) {
		e.preventDefault();
		setError("");
		setMessage("");
		if (!coords) {
			setError("Click the real map to select the report location first.");
			return;
		}
		const form = e.currentTarget;
		setBusy(true);
		try {
			const created = await mockService.createReport({
				title: `${category} - ${assistance}`,
				category,
				description: `Assistance requested: ${assistance}. Immediate danger: ${danger}.`,
				location_name: `Pinned on map (${coords[0].toFixed(5)}, ${coords[1].toFixed(5)})`,
				latitude: coords[0],
				longitude: coords[1],
				affected_people: 1,
				immediate_danger: danger,
				assistance_needed: assistance
			});
			setMessage(`Demo report ${created.id} saved. It is now shown on the real map.`);
			setPriorityFilter("all");
			setFeedMode("reports");
			setSelectedId(created.id);
			form.reset();
			setCoords(null);
			setDanger("unsure");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not save this report.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "rescue-dashboard mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-6 p-4 lg:grid-cols-12 lg:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex min-w-0 flex-col gap-4 lg:col-span-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-xl border border-[#334155] bg-[#1e293b] shadow-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-1.5 border-b border-[#334155] bg-[#0f172a] p-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setFormMode("report");
							setError("");
							setMessage("");
						},
						className: `rounded-lg px-2 py-3 text-xs font-bold sm:text-sm ${formMode === "report" ? "bg-red-500 text-white" : "text-slate-400 hover:text-white"}`,
						children: "🆘 Report Emergency"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setFormMode("donate");
							setError("");
							setMessage("");
						},
						className: `rounded-lg px-2 py-3 text-xs font-bold sm:text-sm ${formMode === "donate" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"}`,
						children: "♡ Pledge Aid (Donor)"
					})]
				}), formMode === "report" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submitReport,
					className: "space-y-4 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-slate-700 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base font-bold text-white",
								children: "Emergency SOS & Resource Request"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-slate-400",
								children: "Report a fictional emergency and select its position on the map."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: label,
							children: "1. Select Disaster Type *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
							children: incidents.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setCategory(item.name);
									setAssistance(item.help);
								},
								className: `flex h-17 flex-col justify-between rounded-lg p-2.5 text-left text-xs ${category === item.name ? "border-2 border-red-500 bg-red-500/20 text-white" : "border border-[#334155] bg-[#0f172a] text-slate-300 hover:border-slate-500"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-lg",
									children: item.emoji
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.label })]
							}, item.name))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "rescue-resource",
							className: label,
							children: "2. Emergency Resource Needed *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "rescue-resource",
							value: assistance,
							onChange: (e) => setAssistance(e.target.value),
							className: field,
							children: resources.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: x }, x))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: label,
								children: "3. Is Anyone in Immediate Danger? *"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 gap-2",
								children: [
									["yes", "Yes · Critical"],
									["unsure", "Unsure"],
									["no", "No"]
								].map(([value, text]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setDanger(value),
									className: `rounded-lg border px-1 py-2.5 text-xs font-bold ${danger === value ? "border-red-500 bg-red-500/20 text-white" : "border-[#334155] bg-[#0f172a] text-slate-400"}`,
									children: text
								}, value))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-[11px] text-slate-400",
								children: "Urgency is provisional; professional triage is not performed."
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-[#334155] bg-[#0f172a] p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: label,
									children: "4. Pin Your Location on the Map *"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-sky-400",
									children: "Click anywhere on the real map to place your location pin. You can click again to move it."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 grid grid-cols-2 gap-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded border border-slate-700 bg-[#1e293b] p-2",
										children: ["Latitude ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "block font-mono text-sky-300",
											children: coords ? coords[0].toFixed(5) : "Not selected"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded border border-slate-700 bg-[#1e293b] p-2",
										children: ["Longitude ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "block font-mono text-sky-300",
											children: coords ? coords[1].toFixed(5) : "Not selected"
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: busy,
							type: "submit",
							className: "w-full rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-4 py-3 font-bold text-white hover:from-red-500 hover:to-red-400 disabled:opacity-60",
							children: busy ? "Saving…" : "Submit Emergency SOS (Demo)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-400",
							children: "Not a live dispatch service. For actual emergencies in Malaysia, call 999."
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "text-sm text-red-400",
							children: error
						}),
						message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "status",
							className: "text-sm text-emerald-300",
							children: message
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonationPledgeForm, { onSuccess: () => {
					setFeedMode("donations");
					setError("");
					setMessage("");
				} })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-[#334155] bg-[#1e293b]/80 p-4 text-xs text-slate-300",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "mb-1 block uppercase tracking-wider text-sky-400",
					children: "Community Support Network"
				}), "Request assistance or pledge useful supplies. All data shown here is fictional."]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex min-w-0 flex-col gap-5 lg:col-span-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-[#334155] bg-[#1e293b] p-4 shadow-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base font-bold text-white",
								children: "Community Emergency Map"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-slate-400",
								children: "Real OpenStreetMap tiles · select a pin, or click the map to set report coordinates."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded border border-sky-500/30 bg-sky-500/10 px-2 py-1 text-[11px] text-sky-300",
								children: "Sunway / Petaling Jaya"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex flex-wrap items-center gap-2 border-t border-slate-700 pt-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mr-1 text-[11px] uppercase text-slate-400",
									children: "Filter Pins:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setPriorityFilter("all"),
									className: `rounded-full px-3 py-1 text-xs font-bold ${priorityFilter === "all" ? "bg-sky-500 text-slate-950" : "border border-[#334155] bg-[#0f172a] text-slate-300"}`,
									children: "All"
								}),
								priorities.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setPriorityFilter(p),
									className: `flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${priorityFilter === p ? "border-sky-400 bg-slate-700 text-white" : "border-[#334155] bg-[#0f172a] text-slate-300"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: `h-2 w-2 rounded-full ${colors[p]}` }), priorityLabels[p]]
								}, p))
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-purple-500/40 bg-purple-500/10 px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, {
									size: 18,
									className: "mt-0.5 shrink-0 text-purple-300"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-xs text-purple-100",
									children: "Last-Ping Blackout Radar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[11px] text-purple-200/80",
									children: blackoutDevices.length ? `${blackoutDevices.length} simulated unreachable devices · ${silentZoneCount} silent concentration zones` : "Simulate lost device check-ins and map their last known locations."
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setBlackoutDevices((current) => current.length ? [] : simulateSeismicBlackout()),
								"aria-pressed": blackoutDevices.length > 0,
								className: "rounded-lg border border-purple-400/50 bg-purple-600 px-3 py-2 text-xs font-bold text-white hover:bg-purple-500",
								children: blackoutDevices.length ? "Reset Simulation" : "Simulate Seismic Blackout"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "community-map-wrap relative h-[430px] overflow-hidden rounded-xl border-2 border-[#334155] bg-[#0b1325]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapView, {
								reports: filtered,
								selectedId: selectedId ?? void 0,
								onSelect: setSelectedId,
								onPick: setCoords,
								position: coords ?? void 0,
								blackoutDevices
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute left-3 top-3 z-[500] rounded border border-slate-700 bg-slate-900/90 px-2.5 py-1 text-[10px] text-slate-200",
								children: "REAL MAP · FICTIONAL INCIDENTS"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-slate-300",
							children: [
								priorities.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: `h-2.5 w-2.5 rounded-full ${colors[p]}` }), priorityLabels[p]]
								}, p)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "h-2.5 w-2.5 rounded-full bg-slate-500" }), "Resolved"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2 text-purple-300",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "h-2.5 w-2.5 rounded-full bg-purple-500" }), "Last Ping (simulation)"]
								})
							]
						}),
						selectedReport && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 rounded-lg border border-slate-600 bg-slate-900 p-3 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-sm text-white",
										children: selectedReport.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setSelectedId(null),
										"aria-label": "Close details",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-slate-300",
									children: selectedReport.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sky-300",
									children: [
										selectedReport.location_name,
										" · ",
										selectedReport.assistance_needed
									]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 overflow-hidden rounded-xl border border-[#334155] bg-[#1e293b] shadow-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2 border-b border-[#334155] bg-[#0f172a] px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setFeedMode("reports"),
								className: `rounded-lg px-3 py-2 text-xs font-bold ${feedMode === "reports" ? "border border-red-500/40 bg-red-500/20 text-red-300" : "text-slate-400"}`,
								children: [
									"Active Emergency Reports (",
									reports.length,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setFeedMode("donations"),
								className: `rounded-lg px-3 py-2 text-xs font-bold ${feedMode === "donations" ? "border border-emerald-500/40 bg-emerald-500/20 text-emerald-300" : "text-slate-400"}`,
								children: [
									"Community Donations Inventory (",
									donations.length,
									")"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] text-slate-400",
							children: "LOCAL DEMO DATA"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-h-[290px] overflow-auto p-4",
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate-400",
							children: "Loading demo data…"
						}) : feedMode === "reports" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[580px] text-left text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "border-b border-slate-700 text-[11px] uppercase text-slate-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3",
										children: "ID"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3",
										children: "Disaster Type"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3",
										children: "Resource Needed"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3",
										children: "Criticality"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3",
										children: "Coordinates"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								onClick: () => setSelectedId(r.id),
								className: "cursor-pointer border-b border-slate-700/50 hover:bg-slate-700/30",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-2 font-mono text-slate-400",
										children: r.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "pr-2 font-semibold text-white",
										children: r.category
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "pr-2 text-slate-300",
										children: r.assistance_needed
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "pr-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: `h-2 w-2 rounded-full ${r.status === "resolved" ? "bg-slate-500" : colors[r.priority]}` }), r.status === "resolved" ? "Resolved" : priorityLabels[r.priority]]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "font-mono text-[11px] text-slate-400",
										children: [
											r.latitude.toFixed(4),
											", ",
											r.longitude.toFixed(4)
										]
									})
								]
							}, r.id)) })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[550px] text-left text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "border-b border-slate-700 text-[11px] uppercase text-slate-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3",
										children: "ID"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3",
										children: "Category"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3",
										children: "Contribution"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3",
										children: "Donor"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3",
										children: "Status"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: donations.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-slate-700/50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-2 font-mono text-emerald-400",
										children: d.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "pr-2 text-white",
										children: d.category
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "pr-2 text-slate-300",
										children: formatDonationContribution(d)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "pr-2 text-slate-300",
										children: d.donor_name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "font-semibold text-emerald-400",
										children: d.status
									})
								]
							}, d.id)) })]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-2 text-xs text-slate-400",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
						size: 17,
						className: "mt-0.5 shrink-0 text-amber-400"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Prototype only. No emergency service is contacted. The map pins are fictional, and donation pledges are simulated. For actual emergencies in Malaysia, call 999." })]
				})
			]
		})]
	});
}
//#endregion
export { CommunityDashboard as component };

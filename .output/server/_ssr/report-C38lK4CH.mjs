import { n as __toESM } from "../_runtime.mjs";
import { t as mockService } from "./mock-data-RlLiAucn.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { C as ArrowRight, b as CircleCheck, p as MapPin, s as ShieldAlert } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-B2wejuZy.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as priorityLabels, t as categories } from "./rescue-BjDPxC68.mjs";
import { t as MapView } from "./MapView-Cxb5qtQa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/report-C38lK4CH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Report() {
	const [position, setPosition] = (0, import_react.useState)();
	const [danger, setDanger] = (0, import_react.useState)("unsure");
	const [result, setResult] = (0, import_react.useState)();
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		setError("");
		if (!position) {
			setError("Select a location on the map before submitting.");
			return;
		}
		const f = new FormData(e.currentTarget);
		setBusy(true);
		try {
			const notes = String(f.get("notes") ?? "");
			const r = await mockService.createReport({
				title: String(f.get("title")),
				category: String(f.get("category")),
				description: String(f.get("description")) + (notes ? `\nAdditional notes: ${notes}` : ""),
				location_name: String(f.get("location")),
				latitude: position[0],
				longitude: position[1],
				affected_people: Number(f.get("people")),
				immediate_danger: danger,
				assistance_needed: String(f.get("assistance"))
			});
			setResult(r);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Unable to submit report.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "standard-page report-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "page-heading",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "eyebrow",
						children: "RESIDENT ASSISTANCE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["Report an Emergency", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "heading-dot",
						children: "."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Tell the community what you need. Your request will appear on the shared needs map." })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "safety-notice",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Prototype demonstration only." }), " For real emergencies, contact the appropriate local emergency services. Submitting this form does not dispatch rescuers. Use fictional information only."] })]
			}),
			result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "report-success",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 48 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "eyebrow",
						children: "DEMO REPORT RECEIVED"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Your request is on the grid." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your fictional request is now visible on the needs map for the community." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "reference-code",
						children: result.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Provisional urgency: ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
							result.priority,
							" · ",
							priorityLabels[result.priority]
						] }),
						" · Unverified"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap justify-center gap-3 mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								children: ["View community map", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => {
								setResult(void 0);
								setPosition(void 0);
							},
							children: "Submit another demo report"
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "report-form",
				onSubmit: submit,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "form-main",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "step-number",
							children: "01"
						}), "Incident details"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Incident category", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							name: "category",
							required: true,
							children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Short incident title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "title",
							placeholder: "e.g. Family stranded by rising floodwater",
							required: true,
							maxLength: 100
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Describe the situation", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							name: "description",
							placeholder: "What happened and what help is needed? Use fictional details.",
							required: true,
							minLength: 10,
							rows: 4
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["People affected", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								name: "people",
								min: 1,
								max: 1e4,
								defaultValue: 1,
								required: true
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Assistance needed", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								name: "assistance",
								required: true,
								children: [
									"Evacuation / Rescue",
									"Medical support",
									"Food / Drinking water",
									"Temporary shelter",
									"Essential supplies",
									"Recovery / Cleanup",
									"Other assistance"
								].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: a }, a))
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Is anyone in immediate danger?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "danger-options",
							children: [
								"yes",
								"no",
								"unsure"
							].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: danger === v ? "danger-selected" : "",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "danger",
									value: v,
									checked: danger === v,
									onChange: () => setDanger(v)
								}), v === "yes" ? "Yes, immediate danger" : v === "no" ? "No immediate danger" : "Unsure"]
							}, v))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
							"Additional notes ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "muted-label",
								children: "(optional)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								name: "notes",
								placeholder: "Other relevant, non-private information",
								rows: 2
							})
						] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "form-location",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "step-number",
							children: "02"
						}), "Incident location"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Location name or address", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "location",
							placeholder: "e.g. PJS 7, Bandar Sunway",
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "picker-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 14 }), "Select the fictional incident location"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapView, {
							picker: true,
							position,
							onPick: setPosition
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "coordinates",
							children: position ? `${position[0].toFixed(5)}° N · ${position[1].toFixed(5)}° E` : "No location selected · click a point on the map"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-note",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No real ID numbers, medical records or private contact details. This report is a demonstration." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							className: "w-full",
							size: "lg",
							disabled: busy,
							children: [busy ? "Submitting…" : "Submit demo report", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "form-error",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "form-submit-note",
							children: "Creates a fictional help request. Does not dispatch responders."
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { Report as component };

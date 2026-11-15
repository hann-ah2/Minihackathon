import { n as __toESM } from "../_runtime.mjs";
import { t as mockService } from "./mock-data-RlLiAucn.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-5hcFn97k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "rescuegrid-donations-v1";
var seed = [
	{
		id: "GIVE-201",
		donor_name: "Sunway Community Pantry",
		category: "Food & Water",
		item_name: "Drinking water bottles",
		quantity: 60,
		unit: "bottles",
		location_name: "Bandar Sunway",
		notes: "Demo offer — bottled drinking water.",
		status: "available",
		created_at: (/* @__PURE__ */ new Date(Date.now() - 36e5)).toISOString()
	},
	{
		id: "GIVE-202",
		donor_name: "Neighbourhood Volunteers",
		category: "Shelter & Bedding",
		item_name: "Blankets",
		quantity: 24,
		unit: "pieces",
		location_name: "PJS 11",
		notes: "Demo offer — clean blankets.",
		status: "available",
		created_at: (/* @__PURE__ */ new Date(Date.now() - 72e5)).toISOString()
	},
	{
		id: "GIVE-203",
		donor_name: "Local Support Group",
		category: "Volunteer Time",
		item_name: "Cleanup volunteers",
		quantity: 5,
		unit: "volunteers",
		location_name: "Subang Jaya",
		notes: "Demo offer — afternoon cleanup support.",
		status: "available",
		created_at: (/* @__PURE__ */ new Date(Date.now() - 108e5)).toISOString()
	}
];
function read() {
	if (typeof window === "undefined") return [];
	try {
		const saved = localStorage.getItem(KEY);
		if (!saved) {
			localStorage.setItem(KEY, JSON.stringify(seed));
			return [...seed];
		}
		const value = JSON.parse(saved);
		return Array.isArray(value) ? value : [...seed];
	} catch {
		return [...seed];
	}
}
function write(rows) {
	localStorage.setItem(KEY, JSON.stringify(rows));
	window.dispatchEvent(new Event("rescuegrid-change"));
}
var donationService = {
	async getDonations() {
		return structuredClone(read());
	},
	async createDonation(input) {
		const isMoney = input.category === "Cash / Bank Transfer";
		const validAmount = Number.isFinite(input.quantity) && input.quantity > 0 && input.quantity <= 1e5 && (isMoney || Number.isInteger(input.quantity));
		if (!input.item_name.trim() || !validAmount) throw new Error("Please enter a valid donation item, quantity, or amount.");
		const offer = {
			...input,
			donor_name: input.donor_name.trim() || "Anonymous contributor",
			item_name: input.item_name.trim(),
			location_name: input.location_name.trim(),
			id: `GIVE-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
			status: "available",
			created_at: (/* @__PURE__ */ new Date()).toISOString()
		};
		write([offer, ...read()]);
		return structuredClone(offer);
	},
	async setStatus(id, status) {
		const rows = read();
		const offer = rows.find((x) => x.id === id);
		if (!offer) throw new Error("Offer not found.");
		offer.status = status;
		write(rows);
	}
};
var Context = (0, import_react.createContext)(null);
function DemoProvider({ children }) {
	const [reports, setReports] = (0, import_react.useState)([]);
	const [donations, setDonations] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	async function refresh() {
		const [r, d] = await Promise.all([mockService.getReports(), donationService.getDonations()]);
		setReports(r);
		setDonations(d);
		setLoading(false);
	}
	(0, import_react.useEffect)(() => {
		refresh();
		const changed = () => {
			refresh();
		};
		window.addEventListener("rescuegrid-change", changed);
		window.addEventListener("storage", changed);
		return () => {
			window.removeEventListener("rescuegrid-change", changed);
			window.removeEventListener("storage", changed);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, {
		value: {
			reports,
			donations,
			loading,
			refresh
		},
		children
	});
}
function useDemo() {
	const context = (0, import_react.useContext)(Context);
	if (!context) throw new Error("Missing demo provider");
	return context;
}
//#endregion
export { donationService as n, useDemo as r, DemoProvider as t };

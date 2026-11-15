import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/missions-DlOKH4Jq.js
var $$splitComponentImporter = () => import("./missions-JO8_A2GG.mjs");
var Route = createFileRoute("/missions")({
	validateSearch: (search) => ({ mission: typeof search.mission === "string" ? search.mission : void 0 }),
	head: () => ({ meta: [
		{ title: "Recovery Missions | RESCUEGRID" },
		{
			name: "description",
			content: "Review, assign and coordinate fictional community rescue missions."
		},
		{
			property: "og:title",
			content: "RESCUEGRID Recovery Missions"
		},
		{
			property: "og:description",
			content: "A shared mission queue from report to confirmed resolution."
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
//#endregion
export { Route as t };

import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/track-BgckL5pi.js
var $$splitComponentImporter = () => import("./track-CVUYHuFE.mjs");
var Route = createFileRoute("/track")({
	validateSearch: (search) => ({ reference: typeof search.reference === "string" ? search.reference : void 0 }),
	head: () => ({ meta: [
		{ title: "Track My Request | RESCUEGRID" },
		{
			name: "description",
			content: "Track a fictional assistance request, team assignment and mission updates."
		},
		{
			property: "og:title",
			content: "RESCUEGRID Request Tracking"
		},
		{
			property: "og:description",
			content: "Follow your demonstration request through the recovery mission workflow."
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

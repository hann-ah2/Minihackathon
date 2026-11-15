import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { S as ClientOnly } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MapView-Cxb5qtQa.js
var import_jsx_runtime = require_jsx_runtime();
function MapView(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, { fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "map-loading",
		children: "Preparing community map…"
	}) });
}
//#endregion
export { MapView as t };

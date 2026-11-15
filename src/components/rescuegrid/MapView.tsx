import { lazy, Suspense } from 'react';
import { ClientOnly } from '@tanstack/react-router';
import type { ComponentProps } from 'react';
const IncidentMap = lazy(() => import('./IncidentMap'));
export function MapView(props: ComponentProps<typeof IncidentMap>) { return <ClientOnly fallback={<div className="map-loading">Preparing community map…</div>}><Suspense fallback={<div className="map-loading">Loading map…</div>}><IncidentMap {...props}/></Suspense></ClientOnly>; }

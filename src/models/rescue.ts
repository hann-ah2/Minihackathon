export type Priority = 'P1' | 'P2' | 'P3' | 'P4';
export type MissionStatus = 'new' | 'assigned' | 'in_progress' | 'resolved';
export type VerificationStatus = 'unverified' | 'verified';
export interface EmergencyReport {
 id: string; title: string; category: string; description: string; location_name: string;
 latitude: number; longitude: number; affected_people: number; immediate_danger: 'yes' | 'no' | 'unsure';
 assistance_needed: string; priority: Priority; verification_status: VerificationStatus;
 status: MissionStatus; assigned_team_id: string | null; created_at: string; updated_at: string;
}
export interface RescueTeam { id: string; name: string; status: 'available' | 'busy' }
export interface MissionUpdate { id: string; report_id: string; author_name: string; note: string; status: MissionStatus; created_at: string }
export type DemoRole = 'resident' | 'responder' | 'coordinator';
export const categories = ['Flood', 'Medical Assistance', 'Trapped / Rescue', 'Landslide', 'Earthquake', 'Power Outage', 'Food / Water', 'Shelter', 'Other'];
export const statusLabels: Record<MissionStatus, string> = { new: 'New', assigned: 'Assigned', in_progress: 'In Progress', resolved: 'Resolved' };
export const priorityLabels: Record<Priority, string> = { P1: 'Critical', P2: 'High', P3: 'Moderate', P4: 'Low' };

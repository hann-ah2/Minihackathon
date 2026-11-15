import type { DonationOffer, DonationInput } from '@/models/donation';
import { supabase } from '@/lib/supabase';

const KEY = 'rescuegrid-donations-v1';
const seed: DonationOffer[] = [
  { id: 'GIVE-201', donor_name:'Sunway Community Pantry', category:'Food & Water', item_name:'Drinking water bottles', quantity:60, unit:'bottles', location_name:'Bandar Sunway', notes:'Demo offer — bottled drinking water.', status:'available', created_at:new Date(Date.now()-3600000).toISOString() },
  { id: 'GIVE-202', donor_name:'Neighbourhood Volunteers', category:'Shelter & Bedding', item_name:'Blankets', quantity:24, unit:'pieces', location_name:'PJS 11', notes:'Demo offer — clean blankets.', status:'available', created_at:new Date(Date.now()-7200000).toISOString() },
  { id: 'GIVE-203', donor_name:'Local Support Group', category:'Volunteer Time', item_name:'Cleanup volunteers', quantity:5, unit:'volunteers', location_name:'Subang Jaya', notes:'Demo offer — afternoon cleanup support.', status:'available', created_at:new Date(Date.now()-10800000).toISOString() },
];
function read(): DonationOffer[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(KEY);
    if (!saved) { localStorage.setItem(KEY, JSON.stringify(seed)); return [...seed]; }
    const value: unknown = JSON.parse(saved);
    return Array.isArray(value) ? value as DonationOffer[] : [...seed];
  } catch { return [...seed]; }
}
function write(rows: DonationOffer[]) {
  localStorage.setItem(KEY,JSON.stringify(rows));
  window.dispatchEvent(new Event('rescuegrid-change'));
}
export const donationService = {
  async getDonations(): Promise<DonationOffer[]> {
    if (supabase) {
      const { data, error } = await supabase.from('donation_pledges').select('*').order('created_at', { ascending: false }).limit(500);
      if (error) throw new Error(`Cannot load cloud pledges: ${error.message}`);
      return data as DonationOffer[];
    }
    return structuredClone(read());
  },
  async createDonation(input: DonationInput): Promise<DonationOffer> {
    const isMoney = input.category === 'Cash / Bank Transfer';
    const validAmount = Number.isFinite(input.quantity) && input.quantity > 0 && input.quantity <= 100000 &&
      (isMoney ? Number(input.quantity.toFixed(2)) === input.quantity : Number.isInteger(input.quantity));
    if (!input.item_name.trim() || !validAmount) throw new Error('Please complete the required donation fields with a valid quantity or amount.');
    const offer: DonationOffer = {...input, donor_name:input.donor_name.trim() || 'Anonymous contributor', item_name:input.item_name.trim(), location_name:input.location_name.trim(), id:`GIVE-${crypto.randomUUID().slice(0,8).toUpperCase()}`, status: isMoney ? 'pledged' : 'available', created_at:new Date().toISOString()};
    if (supabase) {
      const { data, error } = await supabase.from('donation_pledges').insert(offer).select().single();
      if (error) throw new Error(`Cannot save pledge: ${error.message}`);
      window.dispatchEvent(new Event('rescuegrid-change'));
      return data as DonationOffer;
    }
    write([offer,...read()]);
    return structuredClone(offer);
  },
  async setStatus(id: string, status: DonationOffer['status']) {
    // Public anonymous demo users may create pledges, but cannot change other users' statuses.
    if (supabase) throw new Error('Changing pledge status requires coordinator authentication.');
    const rows=read(); const offer=rows.find(x=>x.id===id); if (!offer) throw new Error('Offer not found.');
    offer.status=status;write(rows);
  },
};

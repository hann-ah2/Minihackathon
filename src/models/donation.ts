export type DonationCategory = 'Food & Water' | 'Shelter & Bedding' | 'Medical & Hygiene' | 'Clothing' | 'Transport' | 'Volunteer Time' | 'Other' | 'Cash / Bank Transfer';
export type DonationStatus = 'available' | 'pledged' | 'fulfilled';
export interface DonationOffer {
  id: string;
  donor_name: string;
  category: DonationCategory;
  item_name: string;
  quantity: number;
  unit: string;
  location_name: string;
  notes: string;
  status: DonationStatus;
  created_at: string;
}
export type DonationInput = Omit<DonationOffer, 'id' | 'status' | 'created_at'>;
export const donationCategories: DonationCategory[] = ['Food & Water', 'Shelter & Bedding', 'Medical & Hygiene', 'Clothing', 'Transport', 'Volunteer Time', 'Other', 'Cash / Bank Transfer'];

export function formatDonationContribution(offer: DonationOffer): string {
  return offer.category === 'Cash / Bank Transfer'
    ? `${offer.unit} ${offer.quantity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `${offer.quantity} ${offer.unit}`;
}

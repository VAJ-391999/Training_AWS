export const locationFields = ['Country', 'State', 'District', 'City'];

export enum LocationField {
  COUNTRY = 'Country',
  STATE = 'State',
  DISTRICT = 'District',
  CITY = 'City',
}

export const locationFieldAction = ['Add', 'Edit', 'Delete'];

export interface LocationTimeStamp {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Country extends LocationTimeStamp {
  code: string;
}

export interface State extends LocationTimeStamp {
  country: string;
}

export interface District extends LocationTimeStamp {
  country: string;
  state: string;
}

export interface City extends LocationTimeStamp {
  country: string;
  state: string;
  district: string;
}

export interface RetrieveLocation<L> {
  key: string | null;
  value: L;
}

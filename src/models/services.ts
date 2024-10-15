import db from '../database';

export interface Services {
  id?: number;
  service: string;
}

export const ServiceModel = {
  getAll: () => db<Services>('services').select('*'),
  create: (service: Services) => db<Services>('services').insert(service)
};

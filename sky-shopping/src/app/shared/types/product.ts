export interface Product {
  id: string;
  _id: string;
  name: string;
  unitPrice: number;
  imageUrl: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
export type CreateProduct = Omit<
  Product,
  'id' | '_id' | 'createdAt' | 'updatedAt'
>;

export type EditProduct = Partial<CreateProduct>;

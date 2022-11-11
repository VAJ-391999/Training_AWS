import { Product } from 'src/app/shared/types/product';

export const productList: Product[] = [
  {
    id: 'P1',
    _id: 'P1',
    name: 'test1',
    unitPrice: 10,
    imageUrl: 'test1',
    description: 'test1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const newProduct = {
  id: 'P2',
  _id: 'P2',
  name: 'test2',
  unitPrice: 10,
  imageUrl: 'test2',
  description: 'test2',
  createdAt: new Date(),
  updatedAt: new Date(),
};

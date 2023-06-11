export enum SortMethod {
  age = 'Новіші',
  name = 'Ім`я',
  price = 'Ціна',
}

export type SortKeys = keyof typeof SortMethod;

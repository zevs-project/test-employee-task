export type TPosition = ['Developer', 'PM', 'Delivery', 'TL'];

export type TPositionKeys = keyof TPosition;

export type TTokenType = 'global' | 'isFavourite';

export interface INextToken {
  nextToken: string | null,
  page: number
}

export type TokensMap = Partial<Record<TTokenType, INextToken[]>> | null

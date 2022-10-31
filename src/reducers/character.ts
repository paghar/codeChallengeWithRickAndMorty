export interface ICharacterPage {
  characters: { id: string; name: string; }[],
  page: number,
}

export enum CharacterTypeKeys {
  SET_PAGE = "character/SET_PAGE",
  SET_CHARACTERS = "character/SET_CHARACTERS",
}

export interface ISetPage {
  type: CharacterTypeKeys.SET_PAGE,
  data: number,
}

export interface ISetCharacters {
  type: CharacterTypeKeys.SET_CHARACTERS,
  data: {
    id: string;
    name: string;
  }[],
}

export const initialCharacterState: ICharacterPage = {
  page: 1,
  characters: []
}

export type CharacterActionType =
  | ISetPage
  | ISetCharacters;

export const characterState = (state: ICharacterPage = initialCharacterState, action: CharacterActionType) => {
  switch(action.type) {
    case CharacterTypeKeys.SET_CHARACTERS:
      return { ...state, characters: action.data }
    case CharacterTypeKeys.SET_PAGE:
      return { ...state, page: action.data }
    default:
      return state
  }
}
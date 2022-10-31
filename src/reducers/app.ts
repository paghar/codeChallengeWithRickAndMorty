import { setFavoriteCookie } from "../functions/cookie";
import { saveFavoritesToDB } from "../functions/favorites";

export interface IAppState {
  favorites?: string[];
}

export enum AppTypeKeys {
  ADD_FAVORITE = "app/ADD_FAVORITE",
  REMOVE_FAVORITE = "app/REMOVE_FAVORITE",
  SET_FAVORITE_BY_COOKIE = "app/SET_FAVORITE_BY_COOKIE",
  SET_FAVORITE_BY_DATABASE = "app/SET_FAVORITE_BY_DATABASE",
  MERGE_FAVORITE = "app/MERGE_FAVORITE"
}

export interface IAddFavorite {
  type: AppTypeKeys.ADD_FAVORITE,
  data: string;
}

export interface IRemoveFavorite {
  type: AppTypeKeys.REMOVE_FAVORITE,
  data: string;
}

export interface ISetFavoriteByCookie {
  type: AppTypeKeys.SET_FAVORITE_BY_COOKIE,
  data: string[];
}

export interface ISetFavoriteByDatabase {
  type: AppTypeKeys.SET_FAVORITE_BY_DATABASE,
  data: string[];
}

export interface IMergeFavorite {
  type: AppTypeKeys.MERGE_FAVORITE,
  data: string[];
}

export type AppActionType =
  | IAddFavorite
  | IRemoveFavorite
  | ISetFavoriteByCookie
  | ISetFavoriteByDatabase
  | IMergeFavorite;

export const initialAppState: IAppState = {};

export const appState = (state: IAppState = initialAppState, action: AppActionType) => {
  switch (action.type) {
    case AppTypeKeys.ADD_FAVORITE:
      let newFavList: string[] = [];
      if(state.favorites) {
        newFavList = state.favorites;
      }
      if(newFavList.indexOf(action.data) < 0) {
        newFavList.push(action.data)
        setFavoriteCookie(newFavList);
        saveFavoritesToDB(newFavList);
      }
      return {...state, favorites: newFavList };
    case AppTypeKeys.REMOVE_FAVORITE:
      let newRedFavList: string[] = state.favorites ? state.favorites : [];
      if(state.favorites && state.favorites.length > 1) {
        newRedFavList?.splice(state.favorites?.indexOf(action.data), 1)
      } else if(state.favorites && state.favorites.length == 1 && state.favorites[0] == action.data) {
        newRedFavList = [];
      }
      setFavoriteCookie(newRedFavList);
      saveFavoritesToDB(newRedFavList);
      return {...state, favorites: newRedFavList};
    case AppTypeKeys.MERGE_FAVORITE:
      setFavoriteCookie(action.data);
      saveFavoritesToDB(action.data);
      return {...state, favorites: action.data}
    case AppTypeKeys.SET_FAVORITE_BY_COOKIE:
      saveFavoritesToDB(action.data);
      return {...state, favorites: action.data}
    case AppTypeKeys.SET_FAVORITE_BY_DATABASE:
      setFavoriteCookie(action.data);
      return {...state, favorites: action.data}
    default:
      return state;
  }
}
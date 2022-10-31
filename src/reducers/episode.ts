export interface IEpisodePage {
  episodes: { id: string; name: string; }[],
  page: number;
}

export enum EpisodeTypeKeys {
  SET_PAGE = "character/SET_PAGE",
  SET_EPISODES = "character/SET_EPISODES",
}

export interface ISetPage {
  type: EpisodeTypeKeys.SET_PAGE,
  data: number,
}

export interface ISetEpisodes {
  type: EpisodeTypeKeys.SET_EPISODES,
  data: {
    id: string;
    name: string;
  }[],
}

export const initialEpisodeState: IEpisodePage = {
  page: 1,
  episodes: []
}

export type EpisodeActionType =
  | ISetPage
  | ISetEpisodes;

export const episodeState = (state: IEpisodePage = initialEpisodeState, action: EpisodeActionType) => {
  switch(action.type) {
    case EpisodeTypeKeys.SET_EPISODES:
      return { ...state, episodes: action.data }
    case EpisodeTypeKeys.SET_PAGE:
      return { ...state, page: action.data }
    default:
      return state
  }
}
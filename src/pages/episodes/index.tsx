import { GetStaticProps } from "next";
import { useReducer } from "react";
import { episodeState, EpisodeTypeKeys, initialEpisodeState } from "../../reducers/episode";
import Navigation from "../../ui/characters/navigation";
import EpisodeList from "../../ui/episodes/episodeList";

interface IEpisodesPageProperties {
  episodes: {
    id: string;
    name: string;
  }[];
  pages: string;
  addFavorite: (index: string) => void;
  removeFavorite: (index: string) => void;
}

const Episodes = (properties: IEpisodesPageProperties) => {
  initialEpisodeState.episodes = properties.episodes;
  const [episodeComponentState, dispatch] = useReducer(episodeState, initialEpisodeState);

  const loadPage = async (pageNumber: number) => {
    const episodesRes = await fetch(
      "https://rickandmortyapi.com/graphql",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              episodes(page: ${pageNumber}) {
                results {
                  id,
                  name
                }
              }
            }
          `,
        }),
      }
    )
    .then((res) => res.json())
    .then((result) => {return result.data.episodes});
  
    dispatch({
      type: EpisodeTypeKeys.SET_PAGE,
      data: pageNumber
    });
    dispatch({
      type: EpisodeTypeKeys.SET_EPISODES,
      data: episodesRes.results
    })
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium leading-6 text-gray-900">Episodes overview Page</h2>
      </div>
      
      <EpisodeList
        episodes={episodeComponentState.episodes}
      />
      <div>
        <Navigation
          page={episodeComponentState.page}
          pages={properties.pages}
          loadPage={loadPage}
        />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const episodesRes = await fetch(
    "https://rickandmortyapi.com/graphql",
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            episodes {
              info {
                pages
              }
              results {
                id,
                name
              }
            }
          }
        `,
      }),
    }
  )
  .then((res) => res.json())
  .then((result) => {return result.data.episodes});

  const episodes = episodesRes.results;
  const pages = episodesRes.info.pages

  return {
    props: {
      episodes,
      pages
    },
    revalidate: 10,
  }
}
export default Episodes;
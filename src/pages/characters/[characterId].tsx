import { GetStaticProps } from "next";
import Image from "next/image";
import { useCallback } from "react";
import EpisodeList from "../../ui/episodes/episodeList";

interface IcharacterDetailsProps {
  characterDetail: {
    id: string;
    name: string;
    species: string;
    image: string;
    gender: string;
    location: {
      name: string;
    }
    episode: {
      id: string;
      name: string;
    }[];
  }
  addFavorite: (index: string) => void;
  removeFavorite: (index: string) => void;
  favoriteList: string[];
}

const CharacterDetails = ({
  characterDetail,
  addFavorite,
  removeFavorite,
  favoriteList
}: IcharacterDetailsProps) => {
  const toggleFavorite = useCallback((charId: string) => () => {
    if(favoriteList?.indexOf(`${charId}`) >= 0) {
      removeFavorite(charId);
    } else {
      addFavorite(charId);
    }
  }, [favoriteList, addFavorite, removeFavorite]);

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 clearfix">
        <div className="description">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              <span className="floatLeft">{characterDetail.name}&nbsp;&nbsp;</span>
                <Image
                  src={favoriteList?.indexOf(`${characterDetail.id}`) >= 0 ? "/static/herz_red.png" : "/static/herz.png"}
                  onClick={toggleFavorite(characterDetail.id)}
                  width="16"
                  height="16"
                  alt="Favorite"
                />
              </h2>
          </div>
          <div className="px-4 py-2 sm:px-6">
            Species: {characterDetail.species}
          </div>
          <div className="px-4 py-2 sm:px-6">
            Gender: {characterDetail.gender}
          </div>
          <div className="px-4 py-2 sm:px-6">
            Location: {characterDetail.location.name}
          </div>
        </div>
        <Image
          className="sm:rounded-lg"
          src={characterDetail.image}
          width="300"
          height="300"
          alt={characterDetail.name}
        />
      </div>
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">List of episodes:</h3>
      </div>
      <EpisodeList
        episodes={characterDetail.episode}
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const characterDetail = await fetch(
    "https://rickandmortyapi.com/graphql",
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            character(id: ${params?.characterId}) {
              id,
              name,
              species,
              image,
              gender,
              location {
                name
              },
              episode {
                id,
                name
              }
            }
          }
        `,
      }),
    }
  )
  .then(res => res.json())
  .then(result => { return result.data.character })
  
  return {
    props: {
      characterDetail
    },
    revalidate: 10,
  }
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking"
  }
}

export default CharacterDetails;
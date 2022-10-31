import { GetStaticProps } from "next";
import CharacterList from "../../ui/characters/characterList";

interface IEpisodeDetail {
  name: string;
  characters: {
    id: string;
    name: string;
  }[];
}

interface IcharacterDetailsProps {
  episodeDetail: IEpisodeDetail;
  addFavorite: (index: string) => void;
  removeFavorite: (index: string) => void;
  favoriteList: string[];
}

const EpisodeDetails = (props: IcharacterDetailsProps) => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 clearfix">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium leading-6 text-gray-900">Episodename: {props.episodeDetail.name}</h2>
        </div>
      </div>
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">List of characters:</h3>
      </div>
      <CharacterList
        characters={props.episodeDetail.characters}
        favoriteList={props.favoriteList}
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const episodeDetail = await fetch(
    "https://rickandmortyapi.com/graphql",
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            episode(id: ${params?.episodeId}) {
              name,
              characters {
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
  .then(result => { return result.data.episode })
  
  return {
    props: {
      episodeDetail
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

export default EpisodeDetails;
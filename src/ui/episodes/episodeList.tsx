import EpisodeLinkItem from "./episodeLinkItem";

interface EpisodeProperties {
  id: string;
  name: string;
}

interface EpisodeListProps {
  episodes: EpisodeProperties[]
}

const EpisodeList = (props: EpisodeListProps) => {
  const generateLinkList = (list: EpisodeProperties[]) => {
    const linkList = list.map((linkItem, index) => {
      return (
        <EpisodeLinkItem
          key={`episode_${index}`}
          id={linkItem.id}
          name={linkItem.name}
        />
      );
    });

    return linkList;
  }

  return (
    <>
      {generateLinkList(props.episodes)}
    </>
  )
};

export default EpisodeList;
import CharacterLinkItem from "./characterLinkItem";

interface CharacterProperties {
  id: string;
  name: string;
}

interface CharacterListProps {
  characters: CharacterProperties[]
  favoriteList: string[];
}

const CharacterList = (props: CharacterListProps) => {
  const generateLinkList = (list: CharacterProperties[]) => {
    const linkList = list.map((linkItem, index) => {
      return (
        <CharacterLinkItem
          key={`char_${index}`}
          id={linkItem.id}
          name={linkItem.name}
          favoriteList={props.favoriteList}
        />
      );
    });

    return linkList;
  }

  return (
    <>
      {generateLinkList(props.characters)}
    </>
  )
};

export default CharacterList;
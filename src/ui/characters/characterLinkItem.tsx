import Image from "next/image";
import Link from "next/link";

interface ICharacterLinkItem {
  id: string;
  name: string;
  favoriteList: string[];
}

const CharacterLinkItem = (props: ICharacterLinkItem) => {
  return (
    <div className="px-4 py-1 sm:px6">
      <Link href={`/characters/${props.id}`}>
        <a>{props.name} <Image src={props.favoriteList?.indexOf(`${props.id}`) >= 0 ? "/static/herz_red.png" : "/static/herz.png"} width="16" height="16" alt="Favorite" /></a>
      </Link>
    </div>
  );
};

export default CharacterLinkItem;
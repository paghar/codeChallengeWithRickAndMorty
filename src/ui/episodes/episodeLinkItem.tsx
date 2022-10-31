import Link from "next/link";

interface IepisodeLinkItem {
  id: string;
  name: string;
}

const EpisodeLinkItem = (props: IepisodeLinkItem) => {
  return (
    <div className="px-4 py-1 sm:px6">
      <Link href={`/episodes/${props.id}`}>
        <a>{props.name}</a>
      </Link>
    </div>
  );
};

export default EpisodeLinkItem;
import type { NextPage } from "next";
import IndexAboveFold from "../ui/Index/IndexAboveFold";

const Home: NextPage = () => {
  return (
    <>
      <IndexAboveFold />
      <h1 className="text-center font-medium leading-6 text-gray-900">Das könnte eure Startseite sein.</h1>
    </>
  );
};

export default Home;
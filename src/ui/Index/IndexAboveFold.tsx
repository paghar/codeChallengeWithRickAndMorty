import IndexAboveFoldModuleCss from "./IndexAboveFold.module.css";

const IndexAboveFold = () => {
  return (
    <div className={IndexAboveFoldModuleCss.aboveFoldWrapper}>
      <img
        src="./static/indexAboveFold.jpg"
        className={IndexAboveFoldModuleCss.imageIndex}
      />
    </div>
  );
};

export default IndexAboveFold;
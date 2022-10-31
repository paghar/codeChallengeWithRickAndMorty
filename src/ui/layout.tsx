import Header from "./Header/header";

interface ILayoutProps {
  children? :React.ReactNode;
}

const Layout = (props: ILayoutProps) => {
  return (
    <>
      <Header />
      <main className="main">
        {props.children}
      </main>
    </>
  );
}

export default Layout;
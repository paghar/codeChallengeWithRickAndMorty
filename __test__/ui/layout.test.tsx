import { SessionProvider } from 'next-auth/react';
import renderer from 'react-test-renderer';
import Layout from "../../src/ui/layout";

describe('>>>Testing layout',() => {
  test('+++ Snapshot of Layout', () => {
    const component: any = renderer.create(
      <SessionProvider session={null}>
        <Layout><div>Test</div></Layout>
      </SessionProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
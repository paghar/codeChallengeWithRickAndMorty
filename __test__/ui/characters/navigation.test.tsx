import renderer from 'react-test-renderer';
import Navigation from '../../../src/ui/characters/navigation';

describe('>>>Testing navigation', () => {
  test('+++Snapshot of navigation', () => {
    const component: any = renderer.create(
      <Navigation
        loadPage={jest.fn()}
        page={6}
        pages="12"
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('+++first page no previous button', () => {
    const component: any = renderer.create(
      <Navigation
        loadPage={jest.fn()}
        page={1}
        pages="12"
      />
    );
    let tree = component.toJSON();
    expect(tree.children[0].ariaLabel).toBeUndefined();
  });
  test('+++first page no previous button', () => {
    const component: any = renderer.create(
      <Navigation
        loadPage={jest.fn()}
        page={12}
        pages="12"
      />
    );
    let tree = component.toJSON();
    expect(tree.children[6].ariaLabel).toBeUndefined();
  });
})
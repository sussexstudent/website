import ColoursPage from './design/Colours';
import ButtonComponentPage from './components/Button';


function createSection(name, slug, pages) {
  return { name, slug, pages };
}

function page(component) {
  return component;
}

export default [
  createSection('Design', 'design', [
    page(ColoursPage),
  ]),
  createSection('Components', 'component', [
    page(ButtonComponentPage),
  ]),
];

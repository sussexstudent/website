import ColoursPage from './design/Colours';
import TypographyPage from './design/Typography';

import BEMPrimerPage from './development/BEMPrimer';

import ButtonComponentPage from './components/Button';
import HeadingsComponentPage from './components/Headings';
import TrailComponentPage from './components/Trail';
import NewsBlockComponentPage from './components/NewsBlock';
import DeckchairComponentPage from './components/Deckchair';


function createSection(name, slug, pages) {
  return { name, slug, pages };
}

function page(component) {
  return component;
}

export default [
  createSection('Design', 'design', [
    page(ColoursPage),
    page(TypographyPage),
  ]),
  createSection('Development', 'development', [
    page(BEMPrimerPage),
  ]),
  createSection('Components', 'component', [
    page(ButtonComponentPage),
    page(HeadingsComponentPage),
    page(TrailComponentPage),
    page(NewsBlockComponentPage),
    page(DeckchairComponentPage),
  ]),
];

import React from 'react';
import Immutable from 'immutable';
import flatMap from 'lodash/flatMap';
import Renderer from '../../components/Renderer';
import TreeEditor from '../../components/TreeEditor';
import './style.css';
// components
import FigureCollection from '../../../../generator/components/FigureCollection';
import FigureCollectionFigure from '../../../../generator/components/FigureCollectionFigure';
import PrefooterMenu from '../../../../generator/components/PrefooterMenu';
import HomepageEventsList from '../../../../generator/components/HomepageEventsList';
import HeadingImage from '../../../../generator/components/HeadingImage';
import SelectionGrid from '../../../../generator/components/SelectionGrid';
import SelectionGridItem from '../../../../generator/components/SelectionGridItem';
import Deckchair from '../../../../generator/components/Deckchair';

const components = {
  FigureCollection,
  FigureCollectionFigure,
  PrefooterMenu,
  HomepageEventsList,
  HeadingImage,
  SelectionGrid,
  SelectionGridItem,
  Deckchair,
};


function createDefaultForComponent(componentsList, key) {
  const component = componentsList[key];

  const dict = {
    component: key,
  };

  if (component.propTypes) {
    const props = {};
    Object.keys(component.propTypes).forEach((propKey) => {
      if (propKey === 'children') {
        dict.children = [];
      } else if (propKey === 'imageURL') {
        props[propKey] = 'https://www.sussexstudent.com/pageassets/get-involved/get-involved.jpg';
      } else {
        props[propKey] = '';
      }
    });
    dict.props = props;
  }

  return dict;
}

class EditorPage extends React.Component {
  constructor() {
    super();

    this.state = {
      document: Immutable.List([]),
    };

    this.handleDocumentChange = (change) => {
      const path = change.path;
      const index = path.pop();
      let document;

      if (change.type === 'CHANGE') {
        document = this.state.document.setIn([...flatMap(path, part => [part, 'children']), index, 'props', change.name], change.value);
      } else if (change.type === 'INSERT') {
        const created = Immutable.fromJS(createDefaultForComponent(components, change.component));
        document = this.state.document.updateIn(flatMap(path, part => [part, 'children']), point => point.insert(index, created));
      } else if (change.type === 'MOVE') {
        throw new Error('not implemented move yet. soz');
      } else if (change.type === 'DELETE') {
        document = this.state.document.deleteIn([...flatMap(path, part => [part, 'children']), index]);
      }

      this.setState({ document });
    };
  }

  render() {
    const { document } = this.state;
    return (
      <div className="Editor">
        <div className="Editor__renderer">
          <Renderer components={components} document={document} />
        </div>
        <div className="Editor__tree">
          <TreeEditor components={components} document={document} onInsert={this.handleInsert} onChange={this.handleDocumentChange} />
        </div>
      </div>
    );
  }
}

export default EditorPage;

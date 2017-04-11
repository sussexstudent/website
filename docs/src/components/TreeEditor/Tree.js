import React from 'react';

/* eslint-disable */

const PropField = ({ name, value, component, path, onChange }) => {
  const change = event => onChange({ name, path, type: 'CHANGE', value: event.target.value  });

  return (
    <input type="text" value={value} onChange={change}/>
  );
};

const BooleanPropField = ({ name, value, component, path, onChange }) => (
  <div />
);


const NodePropsEditor = ({ component, node, path, onChange }) => {
  if (!node.props) {
    return null;
  }

  return (
    <div>
      {Object.keys(node.props).map(key => (
        <div>
          {key}<br />
          <PropField name={key} value={node.props[key]} component={component} path={path} onChange={onChange} />
        </div>
      ))}
    </div>
  );
};

const NodeChildrenEditor = ({ component, components, node, path, onChange }) => {
  if (!node.children) {
    return null;
  }

  return (
    <div>
      <Tree tree={node.children} onChange={onChange} parent={component} path={path} components={components} />
    </div>
  );
};

const Tree = ({ onChange, components, parent, tree, path }) => {
    const list = [];
    const singleTypeChild = (parent && parent.ui && parent.ui.children && parent.ui.children.allowed && parent.ui.children.allowed.length === 1) ? parent.ui.children.allowed[0] : false;
    console.log({ parent, singleTypeChild });
    const handleAddComponent = (position) => onChange({ type: 'INSERT', path: [...path, position], ...(singleTypeChild ? { component: singleTypeChild } : {}) });
    const AddButton = ({ position }) => <li><button className="AddButton" onClick={handleAddComponent.bind(this, position)}>+ {singleTypeChild ? singleTypeChild : 'component'}</button></li>
    tree.forEach((node, index) => {
      list.push(<AddButton position={index} key={`add_${index}`} />);
      list.push(<TreeNode components={components} node={node} key={`node_${index}`} path={[...path, index]} onChange={onChange} />);
    });
    list.push(<AddButton position={tree.length} key={'add_last'} />);

  return (
    <ul className="Tree">
      {list}
    </ul>
  );
};

const TreeNode = ({ components, node, path, onChange }) => {
  const handleDelete = () => onChange({ type: 'DELETE', path });
  const handleUp = () => onChange({ type: 'MOVE', delta: -1, path });
  const handleDown = () => onChange({ type: 'MOVE', path });
  return (
    <li className="Tree__node TreeNode">
      <div className="TreeNode__name">
        {node.component}
        <button className="AddButton AddButton--danger" onClick={handleDelete}>⨯</button>
        <button className="AddButton AddButton--dull" onClick={handleUp}>↑</button>
        <button className="AddButton AddButton--dull" onClick={handleDown}>↓</button>
      </div>
      <div><NodePropsEditor component={components[node.component]} node={node} path={path} onChange={onChange} /></div>
      <div><NodeChildrenEditor component={components[node.component]} components={components} node={node} path={path} onChange={onChange} /></div>
    </li>
  );
}
/* eslint-enable */

export default Tree;

const MSLTag = (name, properties = null) => {
  let props = '';

  if (properties !== null) {
    props = Object.keys(properties).map(propName => `${propName}="${properties[propName]}" `).join(' ');
  }

  if (global.mslInject && global.mslInject[name]) {
    return global.mslInject[name];
  }


  return `<MSL:${name} ${props}/>`;
};

export default MSLTag;

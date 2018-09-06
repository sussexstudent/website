interface PropertyMap {
  [key: string]: string | number | undefined;
}

const MSLTag = (name: string, properties: PropertyMap | null = null) => {
  let props = '';

  if (properties !== null) {
    props = Object.keys(properties)
      .map((propName) => `${propName}="${properties[propName]}" `)
      .join(' ');
  }

  if ((global as any).mslInject && (global as any).mslInject[name]) {
    return (global as any).mslInject[name];
  }

  return `<MSL:${name} ${props}/>`;
};

export default MSLTag;

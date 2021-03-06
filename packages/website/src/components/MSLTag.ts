interface PropertyMap {
  [key: string]: string | number | undefined;
}

export const MSLTag = (name: string, properties: PropertyMap | null = null) => {
  if (process.env.TARGET_ENV === 'SANGUINE') {
    return '';
  }

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

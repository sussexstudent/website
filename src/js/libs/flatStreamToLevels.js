import get from 'lodash/get';

// TODO: this doesn't accept streams, might be confusing, initial called that due to
// use in Wagtail StreamField handling
export default function flatStreamToLevels(itemToLevelFunc, flatItemArray) {
  // holds our index pointer for each level
  let lastLevel = [];

  // the multi dimensional array we'll return
  const result = [];

  // gets the current children array for a given level
  function getPathForLevel(level) {
    // if we are on level 0, no path management is needed.
    if (level === 0) {
      return result;
    }

    // for each level we are down, compose a path string of the [index].children
    let path = '';
    for (let index = 0; index <= level - 1; index += 1) {
      // no needed for a period if the string is empty
      if (path !== '') {
        path += '.';
      }
      path += `${lastLevel[index] || 0}.children`;
    }

    return get(result, path);
  }

  flatItemArray.forEach(item => {
    const level = itemToLevelFunc(item);
    const resultLevel = getPathForLevel(level);

    resultLevel.push({ value: item, children: [] });
    lastLevel[level] = resultLevel.length - 1;

    // remove any indexes below the current level as their parent is no longer above
    lastLevel = lastLevel.slice(0, level + 1);
  });

  return result;
}

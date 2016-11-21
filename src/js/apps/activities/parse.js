import exampleImage3 from './example3.png';

function generateExampleLogo() {
  return {
    alt: 'Hello',
    src: exampleImage3,
  };
}

function parseLogo(liElement) {
  const img = liElement.querySelector('img');

  if (img.src.indexOf('67fc461a61a4482cae44fb89fd670903') >= 0) {
    return generateExampleLogo();
  }

  return {
    src: `https://sussexstudent.com/${img.getAttribute('src').split('?')[0]}`,
    alt: img.alt,
  };
}

function parseAttributes(attrEl) {
  const items = [...attrEl.children];
  const map = {};
  let currentSetName = null;

  items.forEach((item) => {
    if (item.classList.contains('msl-gl-attributeset')) {
      currentSetName = item.textContent;
    }

    if (item.classList.contains('msl-gl-attribute')) {
      if (!Object.hasOwnProperty.call(map, currentSetName)) {
        map[currentSetName] = [];
      }

      map[currentSetName].push(item.textContent);
    }
  });

  return map;
}


export default class ActivitiesParser {
  constructor(widgetElement) {
    const listOfElements = [...widgetElement.querySelectorAll('li')];
    this.attrStore = {
      sets: [],
      setMap: {},
    };

    this.setNames = {
      Category: {
        id: 32,
        attr: {

        },
      },
    };

    this.setMap = [
      [43, 23],
    ];

    this.attrNames = {
      43: 'Indoor',
      46: 'Outdoor',
    };

    this.attrMap = {
      43: [32, 34, 55, 19, 37],
      46: [32, 34, 32, 84, 38, 99], // key: values - attributue id: organisation ids
    };

    this.orgMap = this.parse(listOfElements);
  }

  getSetIdFromName(setName) {
    if (!Object.hasOwnProperty.call(this.setNames, setName)) {
      const setIndex = this.setMap.push([]);
      this.setNames[setName] = { id: setIndex, attr: {} };

      return setIndex;
    }

    return this.setNames[setName];
  }
  getAttrIdFromSetAndName(setId, attrName) {
    if (!Object.hasOwnProperty.call(this.attrNames, attrName)) {
      //
    }
  }

  addOrgToAttr(orgId, setName, attrName) {
    const setId = this.getSetIdFromName(setName);
    const attrId = this.getAttrIdFromSetAndName(setId, attrName);
    if (!this.attrMap[attrId]) {
      this.attrMap[attrId] = [];
    }
    this.attrMap[attrId].push(orgId);
  }

  getOrgMap() {
    return this.orgMap;
  }

  getAllOrgIds() {
    return Object.keys(this.orgMap);
  }

  getAllOrgs() {
    return this.getAllOrgIds().map(id => this.orgMap[id]);
  }

  parse() {
    const listOfElements = [...document.querySelectorAll('.msl_organisation_list li')];
    const organisationList = {};

    let lastImage = null;

    listOfElements.forEach((li) => {
      if (li.classList.contains('msl-gl-logo')) {
        lastImage = parseLogo(li);
      } else {
        const org = this.parseOrganisation(li);

        if (lastImage !== null) {
          org.image = lastImage;
          lastImage = null;
        } else {
          org.image = generateExampleLogo();
        }

        organisationList[org.id] = org;
      }
    });

    return organisationList;
  }

  storeAttrForOrg(id, map) {
    console.log('name m8', map);
    Object.keys(map).forEach(setName => map[setName].forEach(attrName => this.addOrgToAttr(id, setName, attrName)));
  }

  parseOrganisation(liElement) {
    const id = liElement.dataset.mslGroupingId;
    const anchor = liElement.querySelector('a');
    const description = liElement.querySelector('.msl-gl-description');
    console.log(anchor);

    const attrMap = parseAttributes(liElement.querySelector('.msl-gl-attributes'));
    const orgAttr = this.storeAttrForOrg(id, attrMap);

    return {
      id,
      name: anchor.text,
      link: anchor.href,
      attr: orgAttr,
      description: description ? description.textContent.trim() : null,
    };
  }

}

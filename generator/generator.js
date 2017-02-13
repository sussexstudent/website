import fs from 'fs';
import React from 'react';
import ReactDOM from 'react-dom/server';
import throttle from 'lodash/throttle';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import chalk from 'chalk';
import assets from '../webpack-assets.json';
import ncp from 'copy-paste';
import * as ui from './generator/ui';
import { createChangesGenerator } from './generator/changes';
import config from './setup';

const render = (Element, other) => {
  return ReactDOM.renderToStaticMarkup(<Element {...other} />);
};

function renderTemplates(templates) {
  const renderedTemplates = {};
  Object.keys(templates).forEach((templateName) => {
    renderedTemplates[templateName] = {
      name: templateName,
      head: templates[templateName].head(assets),
      templateLoggedIn: render(templates[templateName].templateLoggedIn, { assets, loggedIn: true }),
      templateLoggedOut: render(templates[templateName].templateLoggedOut, { assets, loggedIn: false }),
    };
  });

  return renderedTemplates;
}

function renderPages(pages) {
  const renderedPages = {};
  Object.keys(pages).forEach((pageName) => {
    renderedPages[pageName] = {
      name: pageName,
      content: render(pages[pageName]),
    };
  });

  return renderedPages;
}

function doDiff(next, previous) {
  const dirtyTemplates = [];
  const dirtyPages = [];

  Object.keys(next.templates).forEach((templateName) => {
    const nextTemplate = next.templates[templateName];
    const previousTemplate = previous.templates[templateName];
    if (previousTemplate === undefined) {
      dirtyTemplates.push({ name: templateName, isNew: true });
    } else {
      const dirtyHead = nextTemplate.head !== previousTemplate.head;
      const dirtyTemplateLoggedIn = nextTemplate.templateLoggedIn !== previousTemplate.templateLoggedIn;
      const dirtyTemplateLoggedOut = nextTemplate.templateLoggedOut !== previousTemplate.templateLoggedOut;
      if (dirtyHead || dirtyTemplateLoggedIn || dirtyTemplateLoggedOut) {
        dirtyTemplates.push({ name: templateName, dirtyHead, dirtyTemplateLoggedIn, dirtyTemplateLoggedOut });
      }
    }
  });

  Object.keys(next.pages).forEach((pageName) => {
    if (!Object.hasOwnProperty.call(previous.pages, pageName) || next.pages[pageName].content !== previous.pages[pageName].content) {
      dirtyPages.push(pageName);
    }
  });

  return { dirtyTemplates, dirtyPages };
}

const next = {
  templates: renderTemplates(config.templates),
  pages: renderPages(config.pages),
};


let previousFile;

try {
  const file = fs.readFileSync('./previous.json', { encoding: 'utf-8', flag: 'r+' });
  previousFile = JSON.parse(file);
} catch (e) {
  previousFile = { templates: {}, pages: {} };
}

if (!isObject(previousFile)) {
  previousFile = {};
}

previousFile = { templates: {}, pages: {}, ...previousFile };


function saveState(state) {
  fs.writeFileSync('./previous.json', JSON.stringify(state), { encoding: 'utf-8' });
}

const differences = doDiff(next, previousFile);

function differencesUI(differences) {
  // exit if nothing
  if (differences.dirtyTemplates.length <= 0 && differences.dirtyPages.length <= 0) {
    console.log(`${chalk.red('No changes!')}. Use ${chalk.blue('-f')} to force all, ${chalk.blue('-p')} to name pages and ${chalk.blue('-t')} for templates`);
    return;
  }

  ui.renderDifferencesList(differences);


  console.log('Press enter to start.');

  const stdin = process.openStdin();
  const changes = createChangesGenerator(differences, next);

  function nextAction() {
    const change = changes.next();
    if (change && change.done) {
      console.log('All done!');
      saveState(next);
      console.log(chalk.green('Saved to state file. 👍'));
      process.exit(0);
    }

    const { type, name, part, content } = change.value;
    ncp.copy(content, () => {
      if (type === 'template') {
        console.log(`📋  ${chalk.underline('Template')} ${chalk.blue(name)}: ${chalk.green(part)}. ${chalk.italic('Paste away!')}`);
      } else if (type === 'page') {
        console.log(`📋  ${chalk.underline('Page')} ${chalk.blue(name)}.  ${chalk.italic('Paste away!')}`);
      }
    });
  }

  nextAction();
  stdin.on('data', throttle(nextAction, 300));
}

differencesUI(differences);

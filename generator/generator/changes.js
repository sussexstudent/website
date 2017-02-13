function* getTemplateChanges(differences, renders) {
  for (const template of differences.dirtyTemplates) {
    const d = { type: 'template', name: template.name };
    if (template.dirtyHead || template.isNew) {
      yield { ...d, part: 'head', content: renders.templates[template.name].head };
    }

    if (template.dirtyTemplateLoggedIn || template.isNew) {
      yield { ...d, part: 'templateLoggedIn', content: renders.templates[template.name].templateLoggedIn };
    }

    if (template.dirtyTemplateLoggedOut || template.isNew) {
      yield { ...d, part: 'templateLoggedOut', content: renders.templates[template.name].templateLoggedOut };
    }
  }
}

function* getPageChanges(differences, renders) {
  for (const page of differences.dirtyPages) {
    console.log(page);
    yield { type: 'page', name: page, content: renders.pages[page] };
  }
}

export function* createChangesGenerator(differences, renders) {
  yield* getTemplateChanges(differences, renders);
  yield* getPageChanges(differences, renders);
}

import chalk from 'chalk';

export function renderDifferencesList(differences) {
  console.log(chalk.underline('Templates'));
  differences.dirtyTemplates.forEach((template) => {
    let changes;
    if (template.isNew) {
      changes = 'NEW';
    } else {
      changes = [];
      if (template.head) {
        changes.push('<head>');
      }

      if (template.dirtyTemplateLoggedIn) {
        changes.push('Logged in template');
      }

      if (template.dirtyTemplateLoggedOut) {
        changes.push('Logged out template');
      }

      changes = `${changes.join(', ')} changed`;
    }
    console.log(`• ${chalk.blue(template.name)} - ${chalk.green(changes)}`);
  });

  console.log(chalk.underline('\nPages'));

  differences.dirtyPages.forEach((page) => {
    console.log(`• ${chalk.blue(page)}`);
  });
}

# Getting started
Basil is pre-complied when being consumed by other packages.

You can start the development Storybook with
```
$ yarn storybook
```

To build basil
```
$ yarn build
```

# Components
Please follow our React and JavaScript advice first.

Components should exist within a directory of their name.

```
@ussu/basil
└── src
    ├── Button
    │   ├── Button.stories.tsx
    │   └── index.tsx
    │   ...
    └── index.ts
```

It is okay to export multiple components from the same component file, if they are only used together or are similar. They should all start with the root component name.

The following are acceptable
```typescript jsx
export const ButtonLink = ...
export const Button = ...
// or
export const Card = ...
export const CardTitle = ...
export const CardAction = ...
```


A Storybook stories file should be created to add the component to our Storybook.

Basil components should not use any other @ussu/* package-specific tools, as they should be not be tied to any particular project.

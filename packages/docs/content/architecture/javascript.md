---
title: JavaScript
root: '/docs/architecture'
parents: ['Architecture']
---

TypeScript is preferred for large or longstanding projects.

## React
- We prefer to use named exports for components, these should be globally unique.
- The props interface should be exported and called `[ComponentName]Props`
- Use the arrow function syntax

```typescript jsx
import React from 'react';

export interface ButtonProps {
  name: string
}

export const ShoutyButton: React.FC<ButtonProps> = ({ name }) => {
    
    return (
        <button>HELLO THERE {name.toUpperCase()}</button>
    )
}
```



### Browser compatibility
We use Pollyfill.io a service created by the Financial Times that acts as a polyfill CDN that performs UA sniffing to only deliver the required polyfills for the client. This means that on evergreen browsers, the polyfill bundle returned \<2KB.

## Linting & code style
Prettier is used to auto format code styling. A pre-commit git hook should run prettier for you. You can also run prettier at anytime with `yarn run format`

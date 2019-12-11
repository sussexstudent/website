---
title: CSS
---

## Emotion/React

We are increasingly moving towards using [Emotion](https://emotion.sh/docs/introduction) for styling React components.

@ussu/basil exports useful constants such as colors and typefaces helpers.

- Please use the template style for Emotion  <!-- what do you mean by this -->



## Legacy CSS

### BEM
We follow the [BEM](https://css-tricks.com/bem-101/) naming pattern for our CSS.

### Typography

We've been inspired by the [BBC's GEL](https://www.bbc.co.uk/gel/guidelines/typography) typographic scale.

#### CSS Classes
CSS classes are available for use in components, allowing reduced CSS parse size.

The classes are of the syntax `.type-[size]`.

#### Mixin
A mixin is available to correctly set the type.

`@mixin type [size] [...additionalFlags]`

The additional flags are:

- ##### without-line-height
	Doesn't set the line-height property. For use when line-height needs to be set to something specific. Used in the AnodyneMenu.

- ##### highlight
	Sets the line-height to the type size. Used for the 'yellow highlight' design pattern.

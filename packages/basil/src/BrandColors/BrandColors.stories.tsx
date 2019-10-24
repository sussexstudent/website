import { storiesOf } from '@storybook/react';
import { BrandColorCard } from './index';
import { colors } from '../colors';

storiesOf('Brand Color', module)
  .add('Green', () => <BrandColorCard color={colors.BrandGreen} />)
  .add('Yellow', () => <BrandColorCard color={colors.BrandYellow} />)
  .add('Blue', () => <BrandColorCard color={colors.BrandBlue} />)
  .add('Red', () => <BrandColorCard color={colors.BrandRed} />)
  .add('Pink', () => <BrandColorCard color={colors.BrandPink} />)
  .add('GreySadSlate', () => <BrandColorCard color={colors.GreySadSlate} />)
  .add('GreySlate', () => <BrandColorCard color={colors.GreySlate} />)
  .add('GreyWorstDayOfWinter', () => (
    <BrandColorCard color={colors.GreyWorstDayOfWinter} />
  ))
  .add('GreyWinter', () => <BrandColorCard color={colors.GreyWinter} />)
  .add('GreySpring', () => <BrandColorCard color={colors.GreySpring} />)
  .add('GreySummer', () => <BrandColorCard color={colors.GreySummer} />)
  .add('GreyBackground', () => (
    <BrandColorCard color={colors.GreyBackground} />
  ));

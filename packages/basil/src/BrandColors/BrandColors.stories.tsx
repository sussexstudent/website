import { storiesOf } from '@storybook/react';
import { BrandColorCard } from './index';
import { colors } from '../colors';

storiesOf('Brand Color', module).add('All colors', () => (
  <div>
    <BrandColorCard color={colors.BrandGreen} />
    <BrandColorCard color={colors.BrandYellow} />
    <BrandColorCard color={colors.BrandBlue} />
    <BrandColorCard color={colors.BrandRed} />
    <BrandColorCard color={colors.BrandPink} />
    <BrandColorCard color={colors.GreySadSlate} />
    <BrandColorCard color={colors.GreySlate} />
    <BrandColorCard color={colors.GreyWorstDayOfWinter} />
    <BrandColorCard color={colors.GreyWinter} />
    <BrandColorCard color={colors.GreySpring} />
    <BrandColorCard color={colors.GreySummer} />
    <BrandColorCard color={colors.GreyBackground} />
  </div>
));

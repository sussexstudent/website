import { BrandColorCard } from './index';
import { COLORS } from '../style';

export default { title: 'System|Brand Color' };

export const AllColors = () => (
  <div>
    {Object.entries(COLORS).map(([name, color]) => (
      <BrandColorCard color={color} name={name} />
    ))}
  </div>
);

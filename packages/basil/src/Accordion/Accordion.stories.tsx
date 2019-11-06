import { Accordion } from './index';

export default { title: 'Navigation|Accordion' };
export const Closed = () => <Accordion isOpen={false} />;
export const Open = () => <Accordion isOpen={true} />;

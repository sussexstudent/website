import { Accordion } from './index';

export default { title: 'Accordion' };
export const Closed = () => <Accordion isOpen={false} />;
export const Open = () => <Accordion isOpen={true} />;

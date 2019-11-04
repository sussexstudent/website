import { Modal } from '../../../website/src/components/Modal';

export default { title: 'Modal' };

export const Small = () => (
  <Modal isOpen={true} size="small">
    <div>
      <h1>Hello there</h1>
      <h2>This is a small modal with content inside.</h2>
    </div>
  </Modal>
);

export const Normal = () => (
  <Modal isOpen={true} size="normal">
    <div>
      <h1>Hello there</h1>
      <h2>This is a normal modal with content inside.</h2>
    </div>
  </Modal>
);

export const Full = () => (
  <Modal isOpen={true} size="full">
    <div>
      <h1>Hello there</h1>
      <h2>This is a full modal with content inside.</h2>
    </div>
  </Modal>
);

export const FooterButton = () => (
  <Modal isOpen={true} size="full" footerClose={true}>
    <div>
      <h1>Hello there</h1>
      <h2>This is a modal with footer.</h2>
    </div>
  </Modal>
);

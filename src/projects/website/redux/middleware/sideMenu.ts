import { PAGE_TOGGLE_MOBILE_MENU } from '../../ducks/page';

export const sideMenuMiddleware = () => (next: any) => (action: any) => {
  if (action.type === PAGE_TOGGLE_MOBILE_MENU) {
    if (typeof window === 'undefined') {
      return next(action);
    }

    if (!document.documentElement) {
      return;
    }

    if (action.payload.isOpen) {
      document.documentElement.classList.add('html--modal', 'html--side-menu');
    } else {
      document.documentElement.classList.remove(
        'html--modal',
        'html--side-menu',
      );
    }
  }

  return next(action);
};

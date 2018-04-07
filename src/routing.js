import page from 'page';
import { subscribe } from './state';
import { renderView } from './view';

export const router = (root, ...routes) => {
  for (const route of routes) {
    const last = route.length - 1;
    const viewExp = route[last];
    if (typeof viewExp === 'function') {
      route[last] = () => renderView(root, viewExp());
    }
    page(...route);
  }

  subscribe(root.render);
  return page;
};

import { makeSingle } from '../../utils';
import template from './footer.html';

export const Footer = (node) => {
  return makeSingle(node, template, () => ({
    content: node.innerHTML,
  }), 'footer');
}

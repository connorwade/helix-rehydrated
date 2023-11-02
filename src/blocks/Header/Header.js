import { makeSingle } from '../../utils';
import template from './header.html';

export const Header = (node) => {
  return makeSingle(node, template, () => ({
    content: node.innerHTML,
  }), 'header');
}

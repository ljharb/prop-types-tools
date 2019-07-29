import getFunctionName from 'function.prototype.name';
import { isForwardRef, Element } from 'react-is';

export default function getComponentName(Component) {
  if (typeof Component === 'string') {
    return Component;
  }
  if (typeof Component === 'function') {
    return Component.displayName || getFunctionName(Component);
  }
  if (isForwardRef({ type: Component, $$typeof: Element })) {
    return Component.displayName;
  }
  return null;
}

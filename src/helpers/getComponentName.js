export default function getComponentName(Component) {
  if (typeof Component === 'string') {
    return Component;
  }
  if (typeof Component === 'function') {
    const { displayName, name } = Component;
    return displayName || name;
  }
  return null;
}

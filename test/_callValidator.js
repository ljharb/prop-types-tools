import ReactPropTypesSecretExtraArgs from './_reactPropTypeSecretArgs';

export default function callValidator(
  validator,
  { props },
  propName = '',
  componentName = '',
  location = '',
  propFullName = '',
) {
  return validator(
    props,
    propName,
    componentName,
    location,
    propFullName,
    ...ReactPropTypesSecretExtraArgs,
  );
}

import assign from 'object.assign';

export default function wrapValidator(validator, typeName, typeChecker = null) {
  return assign(validator.bind(), {
    typeName,
    typeChecker,
    isRequired: assign(validator.isRequired.bind(), {
      typeName,
      typeChecker,
      typeRequired: true,
    }),
  });
}

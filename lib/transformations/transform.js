const jsonata = require('jsonata');
const userToOih = require('./userToOih');

// This function serves as the primary interface for transformations.
// It acts as the first step in each (potential) transformation, deciding which mapping (if any) to use

function transform(object, cfg, meta, defaultMapping) {
  let transformedObject = object;

  // If transformation is set to be skipped, simply return original object, wrapped in the expected data key
  if (cfg.noTransformation) {
    return { data: transformedObject };
  }

  // If a custom mapping was injected, use it instead
  if (cfg.customMapping) {
    const expression = jsonata(cfg.customMapping);
    transformedObject = expression.evaluate(transformedObject);
    return transformedObject;
  }

  // Otherwise, use the desired default mapping
  // Using a switch here is only to demonstrate one possible way of selecting the right default mapping
  switch (defaultMapping) {
    case 'userToOih':
      transformedObject = userToOih(transformedObject, meta);
      break;
    default:
      break;
  }

  return transformedObject;
}

module.exports = {
  transform,
};

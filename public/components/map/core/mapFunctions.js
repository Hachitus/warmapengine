export function addPrototype (name, functionToAdd) {
  this.superPrototype[name] = functionToAdd;
}
export function DefEnum(ev) {
  const keys = Object.keys(ev);
  keys.forEach(key => (ev[ev[key]] = key));
  Object.defineProperty(ev, "_keys", {
    value: keys,
    enumerable: false
  });
  return ev;
}

export function toQSelectOptions(enums) {
  if (!enums._keys) {
    return [];
  }
  return enums._keys.map(key => ({ label: enums[key], value: key }));
}

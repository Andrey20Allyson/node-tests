export function getFlag(from: string[], flagName: string) {
  const flagIndex = from.indexOf('/' + flagName);

  return from.at(flagIndex + 1);
}
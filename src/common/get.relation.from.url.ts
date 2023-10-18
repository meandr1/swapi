export function relLinksToIDs(rel: string[]): string[] {
  return rel.map((rel) => rel.split('/').at(-2) || '');
}

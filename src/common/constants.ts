export const ITEMS_PER_PAGE = 10;
export const SORT_ORDER: 'ASC' | 'DESC' = 'DESC';
export const FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
export const MAX_FILES_SIZE = 20 * 1024 * 1024; /* 20Mb */
export const FILE_TYPES_STR = FILE_TYPES.map((type) =>
  type.split('/').pop()?.toUpperCase()
).join(', ');
export const SWAPI_URL = 'https://swapi.dev/api/';
export const SALT_ROUNDS = 10;

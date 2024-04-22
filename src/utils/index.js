// eslint-disable-next-line import/prefer-default-export, no-unused-vars
function randomString(length = 16, chars = '0123456789abcdef') {
  let result = '';
  // eslint-disable-next-line no-plusplus
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

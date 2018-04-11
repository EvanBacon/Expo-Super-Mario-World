import replaceValueForKeyInJson from './replaceValueForKeyInJson';
export default (json, provider) =>
  replaceValueForKeyInJson(json, 'image', provider);

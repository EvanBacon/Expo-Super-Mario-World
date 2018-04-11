import AssetUtils from 'expo-asset-utils';
import { FileSystem } from 'expo';

async function jsonFromResourceAsync(resource) {
  const jsonUrl = await AssetUtils.uriAsync(resource);
  const jsonString = await FileSystem.readAsStringAsync(jsonUrl);
  return JSON.parse(jsonString);
}

export default jsonFromResourceAsync;

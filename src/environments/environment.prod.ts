import {getExtraConfig} from '../app/shared/config/config';

const envConfig = {
  production: true,
  local_storage_prefix: 'rayei-prod',
};

const config = getExtraConfig(envConfig);

// Merging objects to environment
export const environment = { ...envConfig, ...config };

import { postgresConfig, setEnvironmentVariables } from './app/utils/config.js';

setEnvironmentVariables();

/*  const option = {
  transform: {
    ...postgres.camel,
    undefined: null,
  },
}; */

export default postgresConfig;

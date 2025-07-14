import logger from '@rhiz.om/shared/utils/logger';

export async function register() {
  if (process.env.NODE_ENV === 'development') {
    logger.info("rhiz.om server started");
  }
}

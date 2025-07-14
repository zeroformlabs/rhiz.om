export async function register() {
  if (process.env.NEXT_RUNTIME !== 'edge') {
    const logger = (await import('@rhiz.om/shared/utils/logger')).default;
    if (process.env.NODE_ENV === 'development') {
      logger.info("rhiz.om server started");
    }
  }
}
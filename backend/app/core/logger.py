import logging

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger(__name__)

from app.core.logger import logger

logger.info("User Registered")

logger.info("Booking Created")

logger.error("Invalid Login")
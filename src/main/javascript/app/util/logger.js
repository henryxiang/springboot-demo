import log4javascript from 'log4javascript';
import Cookies from 'js-cookie';

// Check the cookie 'enableLog' to enable logger
if (!Cookies.get('enableLog')) {
  log4javascript.setEnabled(false);  
}


// Configure log appender and output format
const logFormat = "%d{HH:mm:ss} %-5p %c - %m%n";
const popUpAppender = new log4javascript.PopUpAppender();
const popUpLayout = new log4javascript.PatternLayout(logFormat);

// Create a log4javascript logger
export const getLogger = (loggerName) => {
  const log = log4javascript.getLogger(loggerName);
  popUpAppender.setLayout(popUpLayout);
  log.addAppender(popUpAppender);
  return log;
}

// Pretty print JavaScript objects
export const dump = (data) => {
  return JSON.stringify(data, null, 2);
}

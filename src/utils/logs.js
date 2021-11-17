/**
 * Logs a notification on the browser dev tools
 * @param {string} value
 */
 export const log = (value) => {
    console.log(`%c${value}`, "color:blue; font-weight:bold");
  };
  
  /**
   * Logs a success notification on the browser dev tools.
   * Success prefix on display
   * @param {string} message
   */
  export const success = (message) => {
    console.log(
      `%c------------------------\n%cSUCCESS%c ${message}\n------------------------`,
      "color:green; font-weight:bold",
      "background-color:green; color: white; font-weight:bold",
      "color:green; font-weight:bold"
    );
  };
  
  /**
   * Logs a notification on the browser dev tools
   * Error prefix on display
   * @param {string} reason
   */
  export const error = (status, reason) => {
    console.log(
      `%c------------------------\n%cAPI ERROR ${status}%c ${reason}\n------------------------`,
      "color:red; font-weight:bold",
      "background-color:red; color: white; font-weight:bold",
      "color:red; font-weight:bold"
    );
  };
  
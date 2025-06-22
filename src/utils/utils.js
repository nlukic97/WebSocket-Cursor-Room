/**
 * @spec
 * createMessage(type, data)
 *
 * - Serializes a message object for WebSocket communication.
 * - @param {string} type - The type of the message (e.g., 'UPDATE_COORDS', 'REMOVE_CIRCLE').
 * - @param {Object} data - The payload to be sent with the message.
 * - @returns {string} - A JSON string containing the type and data.
 */
export function createMessage(type, data) {
  return JSON.stringify({ type, data });
}

/**
 * @spec
 * generateRandomRgbColor()
 *
 * - Generates a random RGB color string in the format "rgb(r,g,b)".
 * - Each color component (r, g, b) is an integer from 0 and 221.
 * - @returns {string} - A string representing the random RGB color.
 */
export function generateRandomRgbColor() {
  const r = Math.floor(Math.random() * 221);
  const g = Math.floor(Math.random() * 221);
  const b = Math.floor(Math.random() * 221);

  return "rgb(" + r + "," + g + "," + b + ")";
}

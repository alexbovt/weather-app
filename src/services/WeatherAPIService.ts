export const mockAPICall = () =>
  new Promise(res => setTimeout(() => res("Pong"), 1500));

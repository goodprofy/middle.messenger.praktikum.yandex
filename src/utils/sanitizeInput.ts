export function sanitizeInput(text: string) {
  const temp = document.createElement('div');
  temp.textContent = text;
  return temp.innerHTML;
}

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string): void => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  const types: string[] = ['chrome', 'node', 'electron'];
  for (const type of types) {
    replaceText(`${type}-version`, (process.versions as Record<string, string>)[type]);
  }
});

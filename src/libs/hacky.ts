export function removePageContainer() {
  const pageContainer = document.querySelector('.js-page-container.LokiContainer');
  if (pageContainer) {
    pageContainer.classList.remove('LokiContainer');
  }
}

export function parseNews(root: HTMLElement) {
  return Array.prototype.slice
    .call(root.querySelectorAll('.news_item'))
    .map((item, index) => {
      const anchor = item.querySelector('h5 a');
      const image = item.querySelector('.news_image img');
      const dateEl = item.querySelector('.msl_pubdate');
      return {
        id: index,
        title: anchor.textContent.replace(' ', ' ').replace('&nbsp;', ' '),
        link: anchor.href,
        led: item.querySelector('.leader').textContent,
        publishedDate: dateEl ? new Date(dateEl.textContent) : null,
        imageURL: image ? image.src : null,
      };
    });
}

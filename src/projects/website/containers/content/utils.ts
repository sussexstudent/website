import {isString, flatten} from 'lodash';
import htmr from 'htmr';
import {
  StreamFieldBlockData,
  StreamFieldData
} from "~website/containers/content/types";

export function normaliseContentLink(link: string) {
  return link
    .replace('https://www.sussexstudent.com/', '/')
    .replace('https://sussexstudent.com/', '/');
}

export function getTextFromElementChildren(children: any | any[]): string {
  const elementChildren = Array.isArray(children) ? children : [children];
  return elementChildren.map((e: any) => isString(e) ? e : getTextFromElement(e)).join(' ');
}

export function getTextFromElement(element: React.ReactElement<any>) {
  if (element.props.children) {
    return getTextFromElementChildren(element.props.children)
  }
  return '';
}

export function getHeadingsFromHtmlString(html: string): string[] {
  const res = htmr(html);

  const elements = Array.isArray(res) ? res : [res];

  return elements.filter(e => e && e.type === 'h2').map(getTextFromElement)
}

export function getHeadingsFromStreamField(stream: StreamFieldData) {
  return flatten(
    stream
      .filter(block => block.type === 'text')
      .map((block: StreamFieldBlockData<{ value: string }>) => getHeadingsFromHtmlString((block).value.value))
  );
}

//
//   return R.pipe(); //stream.filter().map(b getHeadingsFromHtmlString);
// }

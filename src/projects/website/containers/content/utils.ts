import { isString, castArray } from 'lodash';
import htmr from 'htmr';
import {
  StreamFieldBlockData,
  StreamFieldData,
} from '~website/containers/content/types';

export function normaliseContentLink(link: string | null) {
  if (link === null) {
    return '';
  }

  return link
    .replace('https://www.sussexstudent.com/', '/')
    .replace('https://sussexstudent.com/', '/');
}

export function getTextFromElementChildren(children: any | any[]): string {
  return castArray(children)
    .map((e: any) => (isString(e) ? e : getTextFromElement(e)))
    .join(' ');
}

export function getTextFromElement(element: React.ReactElement<any>) {
  if (element.props.children) {
    return getTextFromElementChildren(element.props.children);
  }
  return '';
}

export function getHeadingsFromHtmlString(html: string): string[] {
  const res = htmr(html);

  return castArray(res)
    .filter((e) => e && e.type === 'h2')
    .map(getTextFromElement);
}

export function getHeadingsFromStreamField(stream: StreamFieldData): string[] {
  return ([] as string[]).concat.apply(
    [],
    stream
      .filter((block) => block.type === 'text')
      .map((block: StreamFieldBlockData<{ value: string }>) =>
        getHeadingsFromHtmlString(block.value.value),
      ),
  );
}

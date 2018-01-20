export interface Article {
  title: string;
  slug: string;
  main: any;
  topic: Topic;
}

export interface Topic {
  title: string;
  slug: string;
  section: Section;
  articles: Array<Article>;
}

export interface Section {
  title: string;
  slug: string;
  topics: Array<Topic>;
}

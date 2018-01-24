export interface Article {
  title: string;
  slug: string;
  main: any;
  topic: Topic;
  lastPublishedAt: string;
}

export interface Topic {
  title: string;
  slug: string;
  section: Section;
  articles: Article[];
}

export interface Section {
  title: string;
  slug: string;
  topics: Topic[];
}

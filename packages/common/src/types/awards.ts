export interface Grade {
  title: string;
  color: string;
}

export type GradeMap = { [authoritySlug: string]: Grade[] };

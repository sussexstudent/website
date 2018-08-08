export interface AwardAuthority {
  id: string;
  name: string;
  slug: string;
}

export interface Award {
  id: string;
  name: string;
  link: string;
  description: string;
  authority: AwardAuthority;
  icon: string;
}

export interface AwardPeriod {
  id: string;
  displayName: string;
  startDate: string;
  endDate: string;
  authority: AwardAuthority;
  awarded: GroupAward[];
}

export interface GroupAward {
  id: string;
  award: Award;
  period: AwardPeriod;
  grade: number;
}

export interface Group {
  awards: AwardPeriod[];
}

export interface Grade {
  title: string;
  color: string;
}

export type GradeMap = { [authoritySlug: string]: Grade[] };

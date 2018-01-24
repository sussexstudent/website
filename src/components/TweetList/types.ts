interface TwitterUser {
  screen_name: string;
  name: string;
}

export interface Entity {
  indices: number[];
  _type: string;
}

export interface HashtagEntity extends Entity {
  text: string;
}

export interface MediaEntity extends Entity {
  media_url_https: string;
}

export interface UserEntity extends TwitterUser, Entity {}

export interface URLEntity extends Entity {
  url: string;
  display_url: string;
}
export type Entities = HashtagEntity | MediaEntity | UserEntity | URLEntity;

export interface TwitterEntityMap {
  media: MediaEntity[];
  user_mentions: UserEntity[];
  urls: URLEntity[];
  hashtags: HashtagEntity[];
}

export interface TweetData {
  full_text: string;
  retweeted_status?: TweetData;
  quoted_status?: TweetData;
  user: TwitterUser;
  entities: TwitterEntityMap;
  id_str: string;
  created_at: string;
  display_text_range: number[];
}

export interface EntityHandler {
  (entity: Entities, replaced: string[]): any;
}

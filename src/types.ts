
export interface Emoji {
  name: string;
  unified: string;
  non_qualified: string | null;
  docomo: string | null;
  au: string | null;
  softbank: string | null;
  google: string | null;
  image: string;
  sheet_x: number;
  sheet_y: number;
  short_name: string;
  short_names: string[];
  text: string | null;
  texts: string[] | null;
  category: string;
  subcategory: string;
  sort_order: number;
  added_in: string;
  has_img_apple: boolean;
  has_img_google: boolean;
  has_img_twitter: boolean;
  has_img_facebook: boolean;
  obsoleted_by: string | null;
}

export type Category = 'smileys_and_emotion' | 'people_and_body' | 'animals_and_nature' | 'food_and_drink' | 'travel_and_places' | 'activities' | 'objects' | 'symbols' | 'flags' | 'recents' | 'recents';

export interface TranslationLangObject  {
  categories: Record<Category, string>;
  textInput: {
    placeholder: string;
  };
}

export type Translation = Record<string, TranslationLangObject>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
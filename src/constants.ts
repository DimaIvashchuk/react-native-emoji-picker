import emojies = require('emoji-datasource');
import { Category, Emoji, Translation } from "./types";
import { mightRenderAsMultiple } from "./utils";

export const STORAGE_KEY = 'emoji-picker-recent';

export const translation: Translation = {
  en: {
    categories: {
      smileys_and_emotion: 'Smileys & Emotion',
      people_and_body: 'People & Body',
      animals_and_nature: 'Animals & Nature',
      food_and_drink: 'Food & Drink',
      travel_and_places: 'Travel & Places',
      activities: 'Activities',
      objects: 'Objects',
      symbols: 'Symbols',
      flags: 'Flags',
      recents: 'Recent',
    },
    textInput: {
      placeholder: 'Search emojis...',
    }
  },
  uk: {
    categories: {
      smileys_and_emotion: 'Смайлики та емоції',
      people_and_body: 'Люди та тіло',
      animals_and_nature: 'Тварини та природа',
      food_and_drink: 'Їжа та напої',
      travel_and_places: 'Подорожі та місця',
      activities: 'Діяльність',
      objects: 'Об\'єкти',
      symbols: 'Символи',
      flags: 'Прапори',
      recents: 'Останні',
    },
    textInput: {
      placeholder: 'Пошук емодзі...',
    }
  }
}

export const Categories: Record<Category, {
  dataName: string;
} >= {
  recents: { dataName: 'Recents' },
  smileys_and_emotion: { dataName: 'Smileys & Emotion' },
  people_and_body: { dataName: 'People & Body' },
  animals_and_nature: { dataName: 'Animals & Nature' },
  food_and_drink: { dataName: 'Food & Drink' },
  travel_and_places: { dataName: 'Travel & Places' },
  activities: { dataName: 'Activities' },
  objects: { dataName: 'Objects' },
  symbols: { dataName: 'Symbols' },
  flags: { dataName: 'Flags' },
};

export const emojiesData: Emoji[] = (emojies as Emoji[]).filter(
  (e: Emoji) => !e.obsoleted_by && !mightRenderAsMultiple(e.unified),
);
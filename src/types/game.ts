export interface Game {
  id: string;
  title: string;
  description: string;
  instructions: string;
  categories: string[];
  imageSmall: string;
  imageLarge: string;
  iframeUrl: string;
  sourceUrl?: string;
}
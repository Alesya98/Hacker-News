export type NewsType = {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  url: string;
  descendants: number;
  kids?: number[];
  text: string;
};

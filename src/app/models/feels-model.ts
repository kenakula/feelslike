export interface SecondaryFeels {
  parent: string;
  list: string[];
}

export interface FeelsModel {
  primary: string[];
  secondary: SecondaryFeels[];
}

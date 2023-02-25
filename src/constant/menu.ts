export interface IMenu {
  label: string;
  path: string;
  subChildren?: Array<{
    label: string;
    path: string;
  }>;
}

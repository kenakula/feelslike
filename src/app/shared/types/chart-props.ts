export interface DatasetProps {
  data: number[];
  backgroundColor?: string[] | string;
  borderColor?: string[] | string;
  borderWidth?: number;
  label?: string;
}

export interface ChartProps {
  labels?: string[];
  datasets: DatasetProps[];
}

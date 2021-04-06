declare module '*.svg' {
  const content: string
  export default content
}

type RecordItem = {
  id: number | undefined;
  tag: Tag | undefined;
  notes: string;
  type: string;
  amount: number;
  date: string | undefined;
}

type Tag = {
  id: number;
  type: string;
  iconName: string;
  text: string;
}

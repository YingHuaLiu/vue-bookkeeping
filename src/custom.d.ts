declare module '*.svg' {
  const content: string
  export default content
}

type RecordItem = {
  tag: Tag;
  notes: string;
  type: string;
  amount: number;
  date?: string;
}

type Tag = {
  id: number;
  iconName: string;
  text: string;
}

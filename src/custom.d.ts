declare module '*.svg' {
  const content: String;
  export default content;

}

type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: string;
}

type Tag = {
  id: string;
  name: string;
}

interface window {

}
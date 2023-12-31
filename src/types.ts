// types.ts
interface DataItem {
    category: string;
    comments: number;
    datePublished: string;
    description: string;
    id: number;
    img: string;
    likes: number;
    species: string;
    status: string;
    title: string;
    views: number;
}

type SortKeys = "views" | "likes" | "comments" | "datePublished";

export { DataItem, SortKeys };


export function isSortKey(key: string): key is SortKeys {
    return ["views", "likes", "comments", "datePublished"].includes(key);
  }
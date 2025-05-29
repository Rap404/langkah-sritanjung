export interface Destination{
    id: number;
    name: string;
    slug: string;
    location: string;
    actions: Array<string>;
    image: string;
    timelist: string;
    category_id: number;
    created_at: number;
}
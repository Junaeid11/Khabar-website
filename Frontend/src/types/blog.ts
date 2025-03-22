export interface TBlog {
    title: string;
    content: string;
    author: string;
    publishedDate?:string
    image:string
    ingredients: string[];
    instructions: string[]; 
    servings: number;  
      category: string;
       
    tags?: string[] | undefined;       

    isPublished?: boolean;
    
}
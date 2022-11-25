import { Type } from "class-transformer";

export class SearchResult {
    totalResults!: string;
    searchTerms!: string;
    count!: number;
    startIndex!: number;
    @Type(() => SearchResult)
    items?: Item[];
}

export class Item {
    title?:       string;
    source?:      string;
    htmlTitle?:   string;
    link?:        string;
    snippet?:     string;
    htmlSnippet?: string;
    thumbnail?:   string;
}

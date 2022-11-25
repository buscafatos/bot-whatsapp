export interface SearchResult {
    totalResults: string;
    searchTerms:  string;
    count:        number;
    startIndex:   number;
    items:        Item[];
}

export interface Item {
    title:       string;
    source:      string;
    htmlTitle:   string;
    link:        string;
    snippet:     string;
    htmlSnippet: string;
    thumbnail:   string;
}

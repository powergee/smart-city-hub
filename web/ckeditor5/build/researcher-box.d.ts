import { Plugin } from "@ckeditor/ckeditor5-core";
export declare class ResearcherBox extends Plugin {
    static get requires(): (typeof ResearcherBoxUI)[];
}
declare class ResearcherBoxUI extends Plugin {
    init(): void;
}
export {};

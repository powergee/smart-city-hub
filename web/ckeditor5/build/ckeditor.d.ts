/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import { Bold, Italic, Strikethrough, Underline } from "@ckeditor/ckeditor5-basic-styles";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import type { EditorConfig } from "@ckeditor/ckeditor5-core";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { FontColor, FontFamily, FontSize } from "@ckeditor/ckeditor5-font";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { GeneralHtmlSupport, FullPage } from "@ckeditor/ckeditor5-html-support";
import { HorizontalLine } from "@ckeditor/ckeditor5-horizontal-line";
import { Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar, ImageUpload } from "@ckeditor/ckeditor5-image";
import { Indent, IndentBlock } from "@ckeditor/ckeditor5-indent";
import { Link } from "@ckeditor/ckeditor5-link";
import { List } from "@ckeditor/ckeditor5-list";
import { MediaEmbed } from "@ckeditor/ckeditor5-media-embed";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { PasteFromOffice } from "@ckeditor/ckeditor5-paste-from-office";
import { SpecialCharacters, SpecialCharactersEssentials } from "@ckeditor/ckeditor5-special-characters";
import { SourceEditing } from "@ckeditor/ckeditor5-source-editing";
import { Style } from "@ckeditor/ckeditor5-style";
import { Table, TableToolbar, TableCellProperties, TableProperties } from "@ckeditor/ckeditor5-table";
import { TextTransformation } from "@ckeditor/ckeditor5-typing";
import { Undo } from "@ckeditor/ckeditor5-undo";
import { Base64UploadAdapter } from "@ckeditor/ckeditor5-upload";
import { ResearcherBox } from "./researcher-box";
declare class Editor extends ClassicEditor {
    static builtinPlugins: (typeof ResearcherBox | typeof Alignment | typeof Autoformat | typeof Base64UploadAdapter | typeof BlockQuote | typeof Bold | typeof Essentials | typeof FullPage | typeof GeneralHtmlSupport | typeof FontColor | typeof FontFamily | typeof FontSize | typeof Heading | typeof HorizontalLine | typeof Image | typeof ImageCaption | typeof ImageResize | typeof ImageStyle | typeof ImageToolbar | typeof ImageUpload | typeof Indent | typeof IndentBlock | typeof Italic | typeof Link | typeof List | typeof MediaEmbed | typeof Paragraph | typeof PasteFromOffice | typeof SpecialCharacters | typeof SpecialCharactersEssentials | typeof Strikethrough | typeof SourceEditing | typeof Style | typeof Table | typeof TableCellProperties | typeof TableProperties | typeof TableToolbar | typeof TextTransformation | typeof Underline | typeof Undo)[];
    static defaultConfig: EditorConfig;
}
export default Editor;

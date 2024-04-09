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
import {
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
} from "@ckeditor/ckeditor5-image";
import { Indent, IndentBlock } from "@ckeditor/ckeditor5-indent";
import { Link } from "@ckeditor/ckeditor5-link";
import { List } from "@ckeditor/ckeditor5-list";
import { MediaEmbed } from "@ckeditor/ckeditor5-media-embed";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { PasteFromOffice } from "@ckeditor/ckeditor5-paste-from-office";
import {
  SpecialCharacters,
  SpecialCharactersEssentials,
} from "@ckeditor/ckeditor5-special-characters";
import { SourceEditing } from "@ckeditor/ckeditor5-source-editing";
import { Style } from "@ckeditor/ckeditor5-style";
import {
  Table,
  TableToolbar,
  TableCellProperties,
  TableProperties,
} from "@ckeditor/ckeditor5-table";
import { TextTransformation } from "@ckeditor/ckeditor5-typing";
import { Undo } from "@ckeditor/ckeditor5-undo";
import { Base64UploadAdapter } from "@ckeditor/ckeditor5-upload";

import { ResearcherBox } from "./researcher-box";

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends ClassicEditor {
  public static override builtinPlugins = [
    Alignment,
    Autoformat,
    Base64UploadAdapter,
    BlockQuote,
    Bold,
    Essentials,
    FullPage,
    GeneralHtmlSupport,
    FontColor,
    FontFamily,
    FontSize,
    Heading,
    HorizontalLine,
    Image,
    ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    MediaEmbed,
    Paragraph,
    PasteFromOffice,
    SpecialCharacters,
    SpecialCharactersEssentials,
    Strikethrough,
    SourceEditing,
    Style,
    Table,
    TableCellProperties,
    TableProperties,
    TableToolbar,
    TextTransformation,
    Underline,
    Undo,
    ResearcherBox,
  ];

  public static override defaultConfig: EditorConfig = {
    toolbar: {
      items: [
        "fontFamily",
        "fontSize",
        "fontColor",
        "alignment",
        "|",
        "bold",
        "italic",
        "strikethrough",
        "underline",
        "specialCharacters",
        "horizontalLine",
        "|",
        "bulletedList",
        "numberedList",
        "|",
        "outdent",
        "indent",
        "|",
        "link",
        "blockQuote",
        "imageUpload",
        "mediaEmbed",
        "insertTable",
        "-",
        "heading",
        "|",
        "style",
        "|",
        "sourceEditing",
        "researcherBox",
        "undo",
        "redo",
      ],
      shouldNotGroupWhenFull: true,
    },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
      ],
    },
    language: "en",
    image: {
      toolbar: [
        "imageTextAlternative",
        "toggleImageCaption",
        "imageStyle:inline",
        "imageStyle:block",
        "imageStyle:side",
      ],
    },
    fontSize: {
      options: [9, 11, 13, "default", 17, 19, 21],
    },
    fontColor: {
      /**
        "uos-signiture-blue": "#004094",
        "uos-blue": "#005EB8",
        "uos-blue-light": "#0077C8",
        "uos-blue-soft": "#9BCBEB",
        "uos-emerald": "#00B398",
        "uos-emerald-light": "#2CD5C4",
        "uos-emerald-soft": "#9CDBD9",
        "uos-emerald-mist": "#DCEBEC",
        "uos-gray": "#63666A",
        "uos-gray-light": "#BBBCBC",
        "uos-gray-soft": "#D9D9D6",
        "uos-gray-mist": "#E7E7E0",
        "global-gray-light": "#F5F6FA",
        "global-gray-soft": "#F9F9FB",
       */
      colors: [
        {
          color: "#004094",
          label: "UOS Signature Blue",
        },
        {
          color: "#005EB8",
          label: "UOS Blue",
        },
        {
          color: "#0077C8",
          label: "UOS Blue Light",
        },
        {
          color: "#9BCBEB",
          label: "UOS Blue Soft",
        },
        {
          color: "#00B398",
          label: "UOS Emerald",
        },
        {
          color: "#2CD5C4",
          label: "UOS Emerald Light",
        },
        {
          color: "#9CDBD9",
          label: "UOS Emerald Soft",
        },
        {
          color: "#DCEBEC",
          label: "UOS Emerald Mist",
        },
        {
          color: "#63666A",
          label: "UOS Gray",
        },
        {
          color: "#BBBCBC",
          label: "UOS Gray Light",
        },
        {
          color: "#D9D9D6",
          label: "UOS Gray Soft",
        },
        {
          color: "#E7E7E0",
          label: "UOS Gray Mist",
        },
        {
          color: "#F5F6FA",
          label: "Global Gray Light",
        },
        {
          color: "#F9F9FB",
          label: "Global Gray Soft",
        },
      ],
    },
    style: {
      definitions: [
        {
          name: "Introduction Item Box",
          element: "p",
          classes: ["pa-intro-item-box"],
        },
        {
          name: "Global Main Header",
          element: "h2",
          classes: ["pa-main-header"],
        },
        {
          name: "Global Sub Header",
          element: "h3",
          classes: ["pa-sub-header"],
        },
      ],
    },
  };
}

export default Editor;

import { Command, Plugin } from "@ckeditor/ckeditor5-core";
import { Writer } from "@ckeditor/ckeditor5-engine";
import { ButtonView } from "@ckeditor/ckeditor5-ui";
import { Widget, toWidget, toWidgetEditable } from "@ckeditor/ckeditor5-widget";

export class ResearcherBox extends Plugin {
  static get requires() {
    return [ResearcherBoxEditing, ResearcherBoxUI];
  }
}

class ResearcherBoxUI extends Plugin {
  init() {
    const editor = this.editor;
    const t = editor.t;

    // The "researcherBox" button must be registered among the UI components of the editor
    // to be displayed in the toolbar.
    editor.ui.componentFactory.add("researcherBox", (locale) => {
      // The button will be an instance of ButtonView.
      const buttonView = new ButtonView(locale);
      buttonView.set({
        label: t("Researcher Box"),
        withText: true,
        tooltip: true,
      });

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, "execute", () => editor.execute("insertResearcherBox"));
      return buttonView;
    });
  }
}

class ResearcherBoxEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this.defineSchema();
    this.defineConverters();
    this.editor.commands.add("insertResearcherBox", new InsertResearcherBoxCommand(this.editor));
  }

  defineSchema() {
    const schema = this.editor.model.schema;

    schema.register("researcherBox", {
      inheritAllFrom: "$blockObject",
    });

    schema.register("researcherImage", {
      isLimit: true, // Cannot be split or left by the caret.
      allowIn: "researcherBox",
      allowContentOf: "$root",
    });

    schema.register("researcherDescription", {
      isLimit: true, // Cannot be split or left by the caret.
      allowIn: "researcherBox",
      allowContentOf: "$root",
    });

    schema.addChildCheck((context, childDefinition) => {
      if (context.endsWith("researcherDescription") && childDefinition.name == "researcherBox") {
        return false;
      }
    });
  }

  defineConverters() {
    const conversion = this.editor.conversion;

    // <researcherBox> converters
    conversion.for("upcast").elementToElement({
      model: "researcherBox",
      view: {
        name: "section",
        classes: "pa-researcher-box",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "researcherBox",
      view: {
        name: "section",
        classes: "pa-researcher-box",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "researcherBox",
      view: (modelElement, { writer: viewWriter }) => {
        const section = viewWriter.createContainerElement("section", {
          class: "pa-researcher-box",
        });
        return toWidget(section, viewWriter, { label: "Researcher Box Widget" });
      },
    });

    // <researcherImage> converters
    conversion.for("upcast").elementToElement({
      model: "researcherImage",
      view: {
        name: "div",
        classes: "pa-researcher-image",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "researcherImage",
      view: {
        name: "div",
        classes: "pa-researcher-image",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "researcherImage",
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement("div", { class: "pa-researcher-image" });
        return toWidgetEditable(div, viewWriter);
      },
    });

    // <researcherDescription> converters
    conversion.for("upcast").elementToElement({
      model: "researcherDescription",
      view: {
        name: "div",
        classes: "pa-researcher-description",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "researcherDescription",
      view: {
        name: "div",
        classes: "pa-researcher-description",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "researcherDescription",
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement("div", { class: "pa-researcher-description" });
        return toWidgetEditable(div, viewWriter);
      },
    });
  }
}

class InsertResearcherBoxCommand extends Command {
  override execute() {
    this.editor.model.change((writer) => {
      this.editor.model.insertObject(createResearcherBox(writer));
    });
  }

  override refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition()!,
      "researcherBox"
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createResearcherBox(writer: Writer) {
  const researcherBox = writer.createElement("researcherBox");
  const researcherImage = writer.createElement("researcherImage");
  const researcherDescription = writer.createElement("researcherDescription");

  writer.append(researcherImage, researcherBox);
  writer.append(researcherDescription, researcherBox);

  // There must be at least one paragraph for the description to be editable.
  // See https://github.com/ckeditor/ckeditor5/issues/1464.
  writer.appendElement("paragraph", researcherImage);
  writer.appendElement("paragraph", researcherDescription);

  return researcherBox;
}

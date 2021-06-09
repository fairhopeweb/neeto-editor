import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Dropcursor from "@tiptap/extension-dropcursor";

import ImageExtension from "./CustomExtensions/Image/ExtensionConfig";
import SlashCommands from "./CustomExtensions/SlashCommands/ExtensionConfig";
import CodeBlock from "./CustomExtensions/CodeBlock/ExtensionConfig";
import ImageUploader from "./CustomExtensions/Image/Uploader";
import BubbleMenu from "./CustomExtensions/BubbleMenu";
import Embeds from "./CustomExtensions/Embeds";
import "./EditorStyles.css";

const Tiptap = (
  {
    hideBlockSelector = false,
    hideBubbleMenu = false,
    formatterOptions = ["bold", "italic", "code", "highlight", "strike"],
    ...otherProps
  },
  ref
) => {
  let extensions;
  if (otherProps.extensions) {
    extensions = otherProps.extensions;
  } else {
    extensions = [
      StarterKit,
      Typography,
      Highlight,
      Placeholder,
      CodeBlock,
      ImageExtension,
      Dropcursor,
      Embeds,
    ];
  }

  if (!hideBlockSelector) {
    extensions = [...extensions, SlashCommands];
  }

  const editor = useEditor({
    extensions,
    content:
      "Select me to see the toolbar!<br />Press <code>cmd+b</code> for bold.<br/>Create a new line after this to see the custom blocks in action.",
    injectCSS: false,
    editorProps: {
      attributes: {
        class: "prose focus:outline-none whitespace-pre-wrap",
      },
    },
  });

  /* Make editor object available to the parent */
  React.useImperativeHandle(ref, () => ({
    editor: editor,
  }));

  return (
    <>
      {!hideBubbleMenu && (
        <BubbleMenu editor={editor} formatterOptions={formatterOptions} />
      )}
      <ImageUploader editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default React.forwardRef(Tiptap);

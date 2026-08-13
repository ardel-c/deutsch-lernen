import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';

export default function RichTextEditor({ value, onChange, placeholder }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder || 'Type your notes here...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
      },
    },
  });

  // Update editor if value changes externally (e.g. initial load)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  return (
    <div className="rich-text-editor-container" style={{ border: '1px solid var(--border)', borderRadius: '10px', background: 'var(--bg-color)', overflow: 'hidden' }}>
      <style>{`
        .tiptap-editor {
          min-height: 80px;
          padding: 0.75rem;
          color: var(--text-color);
          font-family: inherit;
          outline: none;
        }
        .tiptap-editor p {
          margin: 0;
        }
        .tiptap-editor p.is-editor-empty:first-child::before {
          color: var(--text-color);
          opacity: 0.5;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
      `}</style>
      <EditorContent editor={editor} />
    </div>
  );
}

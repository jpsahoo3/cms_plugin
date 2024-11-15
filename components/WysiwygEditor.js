// components/WysiwygEditor.js

import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const WysiwygEditor = ({ content, setContent }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (state) => {
        setEditorState(state);
        const contentState = state.getCurrentContent();
        setContent(contentState.getPlainText()); // Save plain text or convert to HTML as needed
    };

    return (
        <div>
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'history'],
                }}
            />
        </div>
    );
};

export default WysiwygEditor;
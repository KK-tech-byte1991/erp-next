import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const EditorText = (props: any) => {

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            matchVisual: false,
        }
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ];
    return (
        <div>
            <ReactQuill
                theme="snow"
                onChange={(e)=>{props.handleEditorValue(e)}}
                value={props.text}
                modules={modules}
                formats={formats}
                placeholder={props.placeholder}
            />
            {props.handleNext && <button className="configNextButton" type="submit" onClick={props.handleNext}>Next</button>}
        </div>

    )
}

export default EditorText;
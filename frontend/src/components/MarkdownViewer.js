import React from 'react';
import ReactMarkdown from 'react-markdown';
import RemarkMathPlugin from 'remark-math';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import emoji from 'emoji-dictionary';
import "./MarkdownViewer.scss"

const MarkdownViewer = props => {
    const newProps = {
        escapeHtml: false,
        plugins: [
            RemarkMathPlugin
        ],

        renderers: {
            heading: (props) => {
                if (props.level === 1) {
                    return <h1 className="markdown_heading">{props.children}</h1>
                } else if (props.level === 2) {
                    return <h2 className="markdown_heading">{props.children}</h2>
                } else if (props.level === 3) {
                    return <h3 className="markdown_heading">{props.children}</h3>
                } else if (props.level === 4) {
                    return <h4 className="markdown_heading">{props.children}</h4>
                } else if (props.level === 5) {
                    return <h5 className="markdown_heading">{props.children}</h5>
                } else if (props.level === 6) {
                    return <h6 className="markdown_heading">{props.children}</h6>
                }
            },
            text: (props) => props.value.replace(/:[^:\s]*(?:::[^:\s]*)*:/gi, name => emoji.getUnicode(name)),
            break: (props) => <br></br>,
            paragraph: (props) => <p className="markdown_paragraph">{props.children}</p>,
            emphasis: (props) => <em className="markdown_emphasis">{props.children}</em>,
            link: (props) => <a className="markdown_link" href={props.href}>{props.children}</a>,
            linkReference: (props) => <a className="markdown_link" href={props.href}>{props.children}</a>,
            strong: (props) => <strong className="markdown_strong">{props.children}</strong>,
            delete: (props) => <del>{props.children}</del>,
            list: (props) => props.start ? <ol className="markdown_ol">{props.children}</ol> : <ul className="markdown_ul">{props.children}</ul>,
            listItem: (props) => <li className="markdown_list_item">{props.children}</li>,
            blockquote: (props) => (
                <blockquote className="markdown_blockquote">
                    {props.children}
                </blockquote>),
            code: (props) => (
                <pre className="markdown_pre">
                    <code>
                        {props.value}
                    </code>
                </pre>),
            table: (props) => (
                <table className="markdown_table">{props.children}</table>
            ),
            tableCell: (props) => {
                let style = {
                    textAlign: props.align ? props.align : 'center',
                    padding: "6px 13px"
                };

                style.border = '1px solid #dfe2e5';
                if (props.isHeader) {
                    style.background = '#f2f2f2'   
                }

                return <td style={style}>{props.children}</td>
            },
            inlineCode: (props) => <code className="markdown_inline_code">{props.value}</code>,
            math: (props) => <BlockMath>{props.value}</BlockMath>,
            inlineMath: (props) => <InlineMath>{props.value}</InlineMath>
        }
    };

    return (
        <ReactMarkdown className="markdown_viewer" {...props} {...newProps}></ReactMarkdown>
    );
};

export default MarkdownViewer;
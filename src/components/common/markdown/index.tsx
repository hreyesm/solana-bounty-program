import ReactMarkdown from 'react-markdown';
import { createElement } from 'react';

type MarkdownProps = {
    as?: string;
    children: string;
};

/**
 * Parses a Markdown string to styled HTML according to
 * `@tailwindcss/typography` rules.
 */
const Markdown = ({ as = 'div', children }: MarkdownProps) =>
    createElement(
        as,
        { className: 'prose w-full' },
        <ReactMarkdown>{children}</ReactMarkdown>,
    );

export default Markdown;

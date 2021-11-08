declare module '*.md' {
    const content: string;
    export default content;
}

declare module '*.json' {
    const content: string;
    export default content;
}

declare module '!json!*' {
    const value: any;
    export default value;
}

declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}

declare module '*.jpg' {
    const content: string;
    export default content;
}

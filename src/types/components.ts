export interface ComponentPage{
    id: string;
    slug: string;
    title: string;
    description: string;
    tags: string[];
    cli?: string; 
    dependencies: string[];
    /** When true, component page uses fullscreen layout: no sidebar, demo fills viewport, nav in drawer, Code/Preview toggle */
    fullscreen?: boolean;
    demoComponent: React.ComponentType<Record<string, unknown>>;
    sourceCode?: string; // Made optional since we'll fetch from GitHub
    demoSourcePath?: string; // New: GitHub path for demo component source
    githubFiles?: GitHubComponentFile[]; // New: GitHub file paths
    files?: ComponentFile[]; // Deprecated: will be removed
    props: PropSection[];
    isNew?: boolean;
}

export interface ComponentFile {
    name: string;
    path: string;
    content: string;
}

export interface GitHubComponentFile {
    name: string;
    githubPath: string; // Path in the GitHub repository
    displayName?: string; // Optional display name for the file
}

export interface PropSection{
    title: string;
    props: Props[];
}

export interface Props{
    property: string;
    type: string;
    required: boolean;
    defaultValue?: string;
    description: string;
}
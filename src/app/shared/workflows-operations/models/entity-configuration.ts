export interface EntityConfiguration {
    name: string;
    collection: string;
    IDProperty: string;
    workflows: WorkflowConfig[];
}

export interface WorkflowConfig {
    name: string;
    caption: string;
    dagId: string;
    processParameters: ProcessParameter[];
}

export interface ProcessParameter {
    name: string;
    caption: string;
    type: string;
    values?: string[];
}

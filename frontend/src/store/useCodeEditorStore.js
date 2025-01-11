import {create} from 'zustand';
import { LANGUAGE_CONFIG } from '../constants';
import { useMonaco } from '@monaco-editor/react';

export const useCodeEditorStore = create((set, get) => {
    const initialState = {
        language: "javascript",
        theme: "vs-dark",
        fontSize: 14,
    }

    return {
        ...initialState,
        output: "",
        isRunning: false,
        error: null,
        editor: null,
        executionResult: null,
        
        getCode: () => get().editor?.getValue() || "",

        setEditor: (editor) => {
            set({editor});
        },

        setLanguage: (language) => {
            set({
                language,
                output: "",
                error: null})
        },
    }
});

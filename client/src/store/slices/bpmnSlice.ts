import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BpmnState {
  diagramXML: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: BpmnState = {
  diagramXML: null,
  loading: false,
  error: null,
};

const bpmnSlice = createSlice({
  name: 'bpmn',
  initialState,
  reducers: {
    setDiagramXML: (state, action: PayloadAction<string | null>) => {
      state.diagramXML = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setDiagramXML, setLoading, setError } = bpmnSlice.actions;
export default bpmnSlice.reducer;


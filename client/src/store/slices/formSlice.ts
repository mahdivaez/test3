import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  formSchema: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: FormState = {
  formSchema: null,
  loading: false,
  error: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormSchema: (state, action: PayloadAction<any>) => {
      state.formSchema = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setFormSchema, setLoading, setError } = formSlice.actions;
export default formSlice.reducer;


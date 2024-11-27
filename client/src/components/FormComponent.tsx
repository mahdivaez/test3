import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@formio/react';
import { RootState } from '../store/store';
import { setFormSchema, setLoading, setError } from '../store/slices/formSlice';

const FormComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { formSchema, loading, error } = useSelector((state: RootState) => state.form);
  const userToken = useSelector((state: RootState) => state.auth.userToken);

  useEffect(() => {
    const fetchFormData = async () => {
      if (!userToken) {
        dispatch(setError('No user token available'));
        return;
      }

      dispatch(setLoading(true));
      try {
        const response = await fetch('http://localhost:5000/fetch-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: userToken,
            fileId: 2,
            language: 'en',
            fileType: 'formio-file',
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received form data:', data);
        
        if (data && data.data) {
          let parsedSchema;
          if (typeof data.data === 'string') {
            parsedSchema = JSON.parse(data.data);
          } else {
            parsedSchema = data.data;
          }
          dispatch(setFormSchema(parsedSchema));
        } else {
          dispatch(setError('Invalid or missing form schema data'));
        }
      } catch (err) {
        console.error('Error fetching form data:', err);
        dispatch(setError(err.message || 'Error fetching form data'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchFormData();
  }, [dispatch, userToken]);

  const handleSubmit = async (submission: any) => {
    console.log('Form submitted:', submission);
    // Implement form submission logic here
  };

  if (loading) return <div className="text-center mt-5">Loading form...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;
  if (!formSchema) return <div className="alert alert-warning mt-5">No form data available</div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white text-center">
              <h2 className="mb-0">Leave Request Form</h2>
            </div>
            <div className="card-body">
              <Form form={formSchema} onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;


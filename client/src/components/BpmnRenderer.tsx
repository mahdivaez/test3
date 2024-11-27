import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BpmnViewer from 'bpmn-js';
import { RootState } from '../store/store';
import { setDiagramXML, setLoading, setError } from '../store/slices/bpmnSlice';

const BpmnRenderer: React.FC = () => {
  const dispatch = useDispatch();
  const { diagramXML, loading, error } = useSelector((state: RootState) => state.bpmn);
  const userToken = useSelector((state: RootState) => state.auth.userToken);
  const bpmnContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!userToken) {
        dispatch(setError('No user token available'));
        return;
      }

      dispatch(setLoading(true));
      try {
        const response = await fetch("http://localhost:5000/fetch-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: userToken,
            fileId: 1,
            language: 'fa',
            fileType: 'bpmn-file',
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.data) {
          dispatch(setDiagramXML(data.data));
        } else {
          dispatch(setError("No XML data found in response"));
        }
      } catch (error) {
        console.error('Error fetching BPMN data:', error);
        dispatch(setError("Error fetching BPMN data: " + error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch, userToken]);

  useEffect(() => {
    if (diagramXML && bpmnContainerRef.current) {
      const viewer = new BpmnViewer({ container: bpmnContainerRef.current });

      viewer
        .importXML(diagramXML)
        .then(() => {
          console.log("BPMN diagram rendered successfully");
          const canvas = viewer.get('canvas') as any;
          canvas.zoom('fit-viewport');
        })
        .catch((error: Error) => console.error("Error rendering BPMN diagram:", error));
    }
  }, [diagramXML]);

  if (loading) return <div className="text-center mt-5">Loading BPMN diagram...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div>
      <h1>BPMN Diagram</h1>
      <div
        ref={bpmnContainerRef}
        style={{ width: "100%", height: "500px", border: "1px solid #000" }}
      />
    </div>
  );
};

export default BpmnRenderer;


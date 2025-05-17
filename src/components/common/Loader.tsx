import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

const Loader: React.FC = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <div className="text-center">
        <Spinner
          animation="border"
          role="status"
          style={{
            width: '50px',
            height: '50px',
            margin: 'auto',
            display: 'block',
            color: 'var(--primary)'
          }}
        />
        <span className="sr-only mt-2 d-block">Loading...</span>
      </div>
    </Container>
  );
};

export default Loader;
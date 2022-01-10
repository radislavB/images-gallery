import React from 'react';

const Welcome = () => {
  return (
    <div className="container-fluid bg-light text-dark p-5">
      <div className="container bg-light p-5">
        <h1 className="display-4 fw-bold">Images gallery</h1>
        <hr />
        <p>
          This is simple application that retrieves photos using Unsplash API.
        </p>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://unsplash.com"
          className="btn btn-primary"
        >
          Learn more
        </a>
      </div>
    </div>
  );
};

export default Welcome;

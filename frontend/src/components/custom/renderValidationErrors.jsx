import React from 'react';

// helpers/renderValidationErrors.jsx
export default function renderValidationErrors(errors, field) {
    return errors?.[field]?.map((error, index) => (
        <div key={index} className="text-white mt-2 rounded p-2 bg-danger">
            {error}
        </div>
    )) || null;
}


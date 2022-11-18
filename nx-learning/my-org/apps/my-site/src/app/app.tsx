import { Route, Routes, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ApiResponse, API_URL } from '@my-org/api-interface'

export function App() {
  const [apiResponse, setApiResponse] = useState<ApiResponse>({ message: 'Loading...'});

  useEffect(() => {
    fetch(API_URL).then((r) => r.json()).then(setApiResponse)
  }, [])
  return (
    <>
      <main>
        <p>
          { apiResponse.message }
        </p>
      </main>

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </>
  );
}

export default App;

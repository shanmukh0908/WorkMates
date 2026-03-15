import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  console.log(error);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Something went wrong.</p>

      {/* Displays error details */}
      <p>
        <i>{error.statusText || error.message}</i>
      </p>

      {/* Router-based errors include "status" and "statusText" */}
      {error.status && (
        <p>
          <b>Status:</b> {error.status}
        </p>
      )}
    </div>
  );
}
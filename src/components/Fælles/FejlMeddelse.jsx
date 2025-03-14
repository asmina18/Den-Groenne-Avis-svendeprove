import { Spinner, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

/**
 * 🔹 Komponent: FejlMeddelelse
 * - Viser en loader (spinner), hvis data indlæses.
 * - Viser en fejlbesked, hvis der er opstået en fejl.
 */
export function FejlMeddelelse({ error, isLoading }) {
  return (
    <div className="mt-4 text-center">
      {/* 🔹 Loader-animation, hvis data indlæses */}
      {isLoading && <Spinner animation="border" className="mx-auto d-block" role="status">
        <span className="visually-hidden">Indlæser...</span>
      </Spinner>}

      {/* 🔹 Fejlbesked, hvis der opstår en fejl */}
      {error && (
        <Alert variant="danger" role="alert" aria-live="assertive">
          Fejl: {error}
        </Alert>
      )}
    </div>
  );
}

// 🔹 PropTypes validering
FejlMeddelelse.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
};

import { useEffect, useState } from "react";

type loadingModalProps = {
  loading: boolean;
  setIsCancelled: React.Dispatch<React.SetStateAction<boolean>>;
};
export const LoadingModal: React.FC<loadingModalProps> = ({
  loading,
  setIsCancelled,
}) => {
  const [buttonIsVisible, SetButtonIsVisible] = useState<boolean>(false);

  const handleRefresh = () => {
    window.location.reload(); // Refresh the window
  };

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        SetButtonIsVisible(true);
      }, 15000);
    }
  }, [loading]);

  return loading ? (
    <div className="LoadingModal">
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h2 className="loading-text">Generating..</h2>
      </div>
      {buttonIsVisible ? (
        <div className="cancel-container">
          <div className="container">
            <p className="red-text">
              The request seems to be taking a long time
            </p>
            <button onClick={() => handleRefresh()} className="cancel-button">
              Cancel Request
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  ) : (
    ""
  );
};

type loadingModalProps = {
  loading: boolean;
};
export const LoadingModal: React.FC<loadingModalProps> = ({ loading }) => {
  return loading ? (
    <div className="LoadingModal">
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h2 className="loading-text">Generating..</h2>
      </div>
    </div>
  ) : (
    ""
  );
};

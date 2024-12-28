import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  return (
    <>
      <div>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span> Loading...</span>
      </div>
    </>
  );
};

export default Loader;
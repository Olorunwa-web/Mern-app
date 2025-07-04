import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  return (
    <>
      <div>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        {/* <span> Loading...</span> */}
      </div>
    </>
  );
};

export default Loader;
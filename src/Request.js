import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import RequestException from "./requestException";

const Request = ({ method, base, route, body, config, children }) => {
  const [respone, setResponse] = useState({
    loading: true,
    data: null,
    error: null
  });

  const url = base + (route && `/${route}`);

  const handleData = ({ data }) => {
    const newResponse = { ...respone, data, loading: false, error: null };
    setResponse(newResponse);
    return newResponse;
  };

  const handleError = error => {
    const newResponse = { ...respone, error, loading: false, data: null };
    setResponse(newResponse);
    return newResponse;
  };

  const requestCallback = async props => {
    try {
      if (!(body || props)) {
        throw new RequestException("Request body is reqired");
      }
      const result = await Axios[method.toLowerCase()](
        url,
        body || props,
        config
      );
      return handleData(result);
    } catch (error) {
      return handleError(error);
    }
  };

  useEffect(() => {
    if (method === "get") {
      Axios.get(url, config)
        .then(handleData)
        .catch(handleError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children({ ...respone, requestCallback });
};

Request.propTypes = {
  children: PropTypes.func.isRequired,
  base: PropTypes.string.isRequired,
  method: PropTypes.oneOf(["get", "post", "patch", "put", "delete"]),
  route: PropTypes.string,
  config: PropTypes.object,
  body: PropTypes.object
};

Request.defaultProps = {
  method: "get",
  route: "",
  body: null,
  config: null
};

export default Request;

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Axios from "axios";

export const Request = ({ method, base, route, body, config, children }) => {
  const [response, setResponse] = useState({
    loading: true,
    data: null,
    error: null
  });

  const url = base + (route && `/${route}`);

  const handleData = ({ data }) => {
    const newResponse = { ...response, data, loading: false, error: null };
    setResponse(newResponse);
    return newResponse;
  };

  const handleError = error => {
    const newResponse = { ...response, error, loading: false, data: null };
    setResponse(newResponse);
    return newResponse;
  };

  const requestCallback = async props => {
    setResponse({ ...response, loading: true });
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

  return children({ ...response, requestCallback });
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

export class RequestException extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = "RequestException";
  }
}

const ReactAxiosRequest = { Request, RequestException };

export default ReactAxiosRequest;

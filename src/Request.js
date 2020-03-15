import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import RequestException from "./RequestException";

const Request = ({ method, base, route, body, config, children }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const url = base + route;

  const handleData = ({ data }) => {
    setData(data);
    return data;
  };

  const handleError = error => {
    setError(error);
    return error;
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
  }, [method, url, config]);

  return children({ data, error, requestCallback });
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
  route: "/",
  body: null,
  config: null
};

export default Request;

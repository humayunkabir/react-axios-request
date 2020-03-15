import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import RequestException from "./RequestException";

const Request = ({ method, base, route, path, body, children }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const url = base && route ? `${base}/${route}` : path;

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
      const result = await Axios[method.toLowerCase()](url, body || props);
      return handleData(result);
    } catch (error) {
      return handleError(error);
    }
  };

  useEffect(() => {
    if (method === "get") {
      Axios.get(url)
        .then(handleData)
        .catch(handleError);
    }
  }, [method, url]);

  return children({ data, error, requestCallback });
};

Request.propTypes = {
  children: PropTypes.func.isRequired,
  method: PropTypes.oneOf(["get", "post", "patch", "put", "delete"]),
  base: PropTypes.string,
  route: PropTypes.string,
  path: PropTypes.string,
  body: PropTypes.object
};

Request.defaultProps = {
  method: "get",
  base: "./",
  route: "",
  path: "./",
  body: null
};

export default Request;

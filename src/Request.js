import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import RequestException from "./RequestException";

const Request = ({ type, base, route, path, body, children }) => {
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

  const rcb = async props => {
    try {
      if (!(body || props)) {
        throw new RequestException("Request body is reqired");
      }
      const result = await Axios[type.toLowerCase()](url, body || props);
      return handleData(result);
    } catch (error) {
      return handleError(error);
    }
  };

  useEffect(() => {
    if (type === "GET") {
      Axios.get(url)
        .then(handleData)
        .catch(handleError);
    }
  }, [type, url]);

  return children({ data, error, rcb });
};

Request.propTypes = {
  children: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["GET", "POST", "PATCH", "DELTE"]),
  base: PropTypes.string,
  route: PropTypes.string,
  path: PropTypes.string,
  body: PropTypes.object
};

Request.defaultProps = {
  type: "GET",
  base: "./",
  route: "",
  path: "./",
  body: null
};

export default Request;

# React Axios Request

Promise based HTTP client for ReactJS,

You can perform these requests:

- `get`
- `post`
- `patch`
- `put`
- `delete`

### Example

<!-- Let's start with the basic example.

```
import React from "react";
import Request from "react-axios-request/Request"
import { apiBaseUrl } from "./config"

const UserUpdate = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const cleanState = () => {
    setName("");
    setAge("");
  };

  return (
    <Request
      method="post"
      base={apiBaseUrl}
      route="users/1"
      body={{ name, age }}
    >
      {({ data, error, requestCallback }) => {


        return (
          <form
            onSubmit={e => {
              e.preventDefault();
              login(requestCallback, cleanState);
            }}
          >
            <input
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <input
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <button disabled={!username || !password}>
              Login
            </button>

            {error && (
              <p>
                Username and/or Passowrd do(es)n't match. Please try again.
                <br />
                <small>{error.message}</small>
              </p>
            )}
          </form>
        )
      }}
    </Request>
  )
}

export default UserUpdate
``` -->

Let's create a `Login` compoentet using `Request`

#### Authentication Hook

```
const useAuth = () => {
  const login = async (requestCallback, loginCallback) => {
    const response = await requestCallback() // Assume we get an access token in response

    if (response?.data) {
       const { accessToken, ...rest } = response.data;
      // Do whatever you want with this accessToken
      localStorage.setItem("accessToken", accessToken)

      // Now calling the callback which is passed from the Login component
      !!loginCallback && loginCallback()
    }
  };

  const logout = () => {
    // Logout code
    localStorage.removeItem("accessToken")
  };

  return { login, logout }
}
```

#### Login Component

```
import React, { useState } from "react";
import Request from "react-axios-request/Request"

const Login = () => {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const cleanState = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <Request
      method="post"
      base={apiBaseUrl}
      route="auth/login"
      body={{ username, password }}
    >
      {({ error, requestCallback }) => (
        <form
          onSubmit={e => {
            e.preventDefault();
            login(requestCallback, cleanState);
          }}
        >
          <input
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <button disabled={!username || !password}>
            Login
          </button>

          {error && (
            <p>
              Username and/or Passowrd do(es)n't match. Please try again.
              <br />
              <small>{error.message}</small>
            </p>
          )}
        </form>
      )}
    </Request>
  )
};

export default Login;
```

#### Get Request

In `Request` component, `default` method is `get`. To make a `get` request, you don't have to pass `method='get'` to `Request` component.

```
import React from "react";
import Request from "react-axios-request/Request"
import { apiBaseUrl } from "./config"

const requestConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
  }
};

const App = () => (
  <Request base={apiBaseUrl} config={requestConfig}>
    {({ data, error, requestCallback }) => (
      <h4>{data?.title}</h4>
      <p>{data?.description}</p>
    )}
  </Request>
)

export default App
```

### Configuration

Make a component `ReactAxiosRequest` and use this component insted of `Request`. Now you don't have to pass `base` and `config` everytime you use this component like you have to pass in `Request` component.

```
import React from "react";
import Request from "react-axios-request/Request"
import { apiBaseUrl } from "./config";

const ReactAxiosRequest = props => {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  };

  return <Request base={apiBaseUrl} config={requestConfig} {...props} />;
};

export default ReactAxiosRequest;
```
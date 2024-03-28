import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
// import * as Yup from "yup";
import { loginRequest } from "../serviceHandle";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  flexDirection: "column",
};

const formContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "25px",
};

const cardStyle = {
  width: "500px",
  height: "500px",
  alignItems: "center",
  justifyContent: "center",
};

function SignIn() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      submit: null,
    },
    onSubmit: async (values, helpers) => {
      try {
        const data = {
          username: values.username,
          password: values.password,
        };
        const { access_token, refresh_token } = await loginRequest(data);
        if (access_token) {
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
          navigate(`/customer`);
        } else {
          console.log("error in login");
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({
          submit: err.response?.data?.error || "Login Failed.",
        });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <div className="container" style={containerStyle}>
      <h1 style={{ textAlign: "center", marginBottom: "25px" }}>
        Welcome to InvoicePro
      </h1>
      <div className="card" style={cardStyle}>
        <div style={{ width: "450px" }}>
          <form style={formContainerStyle} onSubmit={formik.handleSubmit}>
            <p className="h5 fw-normal">Please sign in</p>

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              <label>Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <label>Password</label>
            </div>
            {formik.errors.submit && (
              <p style={{ color: "red" }} sx={{ mt: 3 }} variant="body2">
                {formik.errors.submit}
                {/* Login Failed. */}
              </p>
            )}
            <button className="btn btn-primary w-100 py-2" type="submit">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

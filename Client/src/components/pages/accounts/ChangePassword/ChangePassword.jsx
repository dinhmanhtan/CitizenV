import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@mui/material";
import "./ChangePassword.css";
import CloseIcon from "@mui/icons-material/Close";
const ChangePassword = ({ setOpen }) => {
  const [form, setForm] = useState({ pass: "", repass: "" });
  const { pass, repass } = form;
  const [isError, setIsError] = useState(false);
  const submit = (e) => {
    e.preventDefault();

    if (pass !== repass) {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (repass.length === 0 || repass === pass) {
      setIsError(false);
    }
  }, [repass]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <Paper sx={{ position: "relative", marginBottom: "50px" }}>
      <h3 className="label">Đổi mật khẩu</h3>
      <CloseIcon className="close-icon" onClick={() => setOpen(false)} />

      <form className="form-change-pass" onSubmit={submit}>
        <TextField
          name="pass"
          label="Mật Khẩu"
          variant="standard"
          value={pass}
          onChange={handleChange}
          type="password"
          required
        />
        {isError ? (
          <TextField
            error
            name="repass"
            label="Xác Nhận"
            variant="standard"
            value={repass}
            onChange={handleChange}
            type="password"
            helperText="Xác nhận mật khẩu không khớp"
            required
          />
        ) : (
          <TextField
            name="repass"
            label="Xác Nhận"
            variant="standard"
            value={repass}
            onChange={handleChange}
            type="password"
            required
          />
        )}
        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default ChangePassword;

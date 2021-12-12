import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import "./ChangePassword.css";
const ChangePassword = ({ setOpen }) => {
  return (
    <form
      className="form-change-pass"
      onSubmit={(e) => {
        e.preventDefault();
        setOpen(false);
      }}
    >
      <TextField id="outlined-basic" label="Mật Khẩu" variant="standard" />
      <TextField id="filled-basic" label="Xác Nhận" variant="standard" />
      <Button type="submit" variant="outlined">
        Submit
      </Button>
    </form>
  );
};

export default ChangePassword;

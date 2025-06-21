
const example = () => {
  return (
    <div className="box">
      <span className="borderline"></span>
      <form className="" action="">
        <label className="signin">Sign in</label>
        <div className="inputBox">
          <input type="text" />
          <span className="">Username</span>
          <i></i>
        </div>
        <div className="inputBox">
          <input type="password" />
          <span>Password</span>
          <i></i>
        </div>
        <div className="links">
          <a href="#">Forgot Password?</a>
          <a href="#">Sign Up</a>
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default example;

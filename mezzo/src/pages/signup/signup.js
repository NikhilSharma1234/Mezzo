import "./signup.scoped.css";

const Signup = () => {

  return(
    <div>
      <form method="post" action='/api/user'>
        <input type="hidden" name="_method" value="put" />
        <label>
          Email:
          <input type="text" name="email"/>
        </label>


        <label>
          Username:
          <input type="text" name="username"/>
        </label>

        <label>
          Password:
          <input type="text" name="password"/>
        </label>
        <input type="submit" value="Signup" />
      </form>
    </div>
  );
};

export default Signup
function Login() {
  const [show, setShow] = React.useState(true)
  const [status, setStatus] = React.useState("")

  if (Cookies.get("email") === true) {
    setShow(false)
  }

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={
        show ? (
          <LoginForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <LoginMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  )
}

function isLoggedout() {
  if (Cookies.get("email") === undefined) {
    window.location.reload()
  }
}

function LoginMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          Cookies.remove("email")
          isLoggedout()
        }}
      >
        Logout
      </button>
    </>
  )
}

function LoginForm(props) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  function handle() {
    fetch(`/account/login/${email}/${password}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text)
          console.log("JSON:", data)
          // Cookies.set('loggedInUser', true);
          // Cookies.set('name', data.name);
          Cookies.set("email", data.email, { expires: 10 })
          // Cookies.set('token', data.token);
          props.setStatus("")
          props.setShow(false)
          window.location.reload()
        } catch (err) {
          props.setStatus("You need to enter correct login credentials")
        }
      })
  }

  return (
    <>
      Email
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Login
      </button>
      <br></br>
      <br></br>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          Cookies.remove("email")
          isLoggedout()
        }}
      >
        Logout
      </button>
    </>
  )
}

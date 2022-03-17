function Balance() {
  const [show, setShow] = React.useState(true)
  const [status, setStatus] = React.useState("")

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={
        show ? (
          <BalanceForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <BalanceMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  )
}

function BalanceMsg(props) {
  return (
    <>
      <h5>Your Balance:</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true)
          props.setStatus(`New balance: ${data.value.balance}`)
        }}
      >
        Check balance again
      </button>
    </>
  )
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState("")
  const [balance, setBalance] = React.useState("")

  function handle() {
    fetch(`/account/findOne/${Cookies.get("email")}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text)
          props.setStatus(`Your balance is: ${data.balance}`)
          props.setShow(false)
        } catch (err) {
          props.setStatus(text)
          console.log("err:", text)
        }
      })
  }

  return (
    <>
      User is {Cookies.get("email")}
      <br />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Check Balance
      </button>
    </>
  )
}

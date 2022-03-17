function Deposit() {
  const [show, setShow] = React.useState(true)
  const [status, setStatus] = React.useState("")

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={
        show ? (
          <DepositForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <DepositMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  )
}

function DepositMsg(props) {
  return (
    <>
      <h5>Success! A penny saved is a penny earned!</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true)
          props.setStatus("")
        }}
      >
        Deposit again
      </button>
    </>
  )
}

function DepositForm(props) {
  const [email, setEmail] = React.useState("")
  const [amount, setAmount] = React.useState("")

  function handle() {
    fetch(`/account/update/${Cookies.get("email")}/${amount}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text)
          props.setStatus(`New balance: ${data.value.balance}`)
          props.setShow(false)
          console.log("JSON:", data)
        } catch (err) {
          props.setStatus("You might want to try logging in!")
          console.log("err:", text)
        }
      })
  }

  return (
    <>
      User is {Cookies.get("email")}
      <br />
      <br />
      Amount
      <br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Deposit
      </button>
    </>
  )
}

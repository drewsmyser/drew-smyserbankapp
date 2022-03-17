function Withdraw() {
  const [show, setShow] = React.useState(true)
  const [status, setStatus] = React.useState("")

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <WithdrawForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <WithdrawMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  )
}

function WithdrawMsg(props) {
  return (
    <>
      <h5>Success! Don't go spendin' it all in one place!</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true)
          props.setStatus("")
        }}
      >
        Withdraw again
      </button>
    </>
  )
}

function WithdrawForm(props) {
  const [email, setEmail] = React.useState("")
  const [amount, setAmount] = React.useState("")

  function handle() {
    fetch(`/account/update/${Cookies.get("email")}/${-amount}`)
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
        Withdraw
      </button>
    </>
  )
}

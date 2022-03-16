function Home() {
  return (
    <Card
      txtcolor="black"
      header="This is my dog's bank"
      title="Welcome to StrudelBank"
      text="'This is my bank... but you can look around if you'd like.' -Strudel (Bank President and dog)"
      body={
        <img
          src="strudzbank.jpeg"
          className="img-fluid"
          alt="Responsive image"
        />
      }
    />
  )
}

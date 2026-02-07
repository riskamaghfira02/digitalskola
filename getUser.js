let token;

describe("Test Login", function () {
  it("Valid Login", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/login",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: "admin",
          password: "admin",
        }),
      }
    );

    //  assert.strictEqual(response.status, 200);
    expect(response.status).to.equal(200);

    // Mencetak Response Body
    const data = await response.json();
    // console.log(data);
    expect(data.message).to.eql("Login successful");

    // Simpan Token
    token = data.token;
    //console.log(token);
  });
});
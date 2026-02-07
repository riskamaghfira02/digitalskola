const { describe } = require("mocha");
const assert = require("assert");
const { expect } = require("chai");

let token;
 //tambah timeout

describe("Test Login and Get User", function () {
//----------------------------------------------------Positive Test [Method : POST]------------------------------------------------
  it("Valid Login", async function () {
    this.timeout(15000);
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
    console.log("Assert 1: Status 200 OK");

    // Mencetak Response Body
    const data = await response.json();
    // console.log(data);
    expect(data.message).to.eql("Login successful");
    console.log ("Assert 2 : Login Successful");
    // Simpan Token
    token = data.token;
    //console.log(token);
  });
//----------------------------------------------------Positive Test [Method : GET]------------------------------------------------
  it("Get User", async function () {
    this.timeout(15000);
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/users",
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    //  assert.strictEqual(response.status, 200);
    expect(response.status).to.equal(200);
    console.log("Assert 1: Status 200 OK");
    // Mencetak Response Body
    const data = await response.json();
    expect(data).to.not.be.null;
    console.log("Assert 2: Get User berhasil");
    console.log("Data Response", data);
  });
//----------------------------------------------------Negative Test [Method : POST]------------------------------------------------
    it("Invalid Login", async function () {
      this.timeout(15000);
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/login",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: "Riska",
          password: "admin1",
        }),
      }
    );

    //  assert.strictEqual(response.status, 401);
    expect(response.status).to.equal(401);
    console.log("Assert 1: 401 Unauthorized");

    // Mencetak Response Body
    const data = await response.json();
    // console.log(data);
    //memastikan pesan response sesuai dengan yang diharapkan
    expect(data.message).to.eql("Invalid username or password!");
    console.log(data);

    // Simpan Token
    token = data.token;
    //console.log(token);
  });

});
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
//Pengujian : Menginput/mengisi Age dengan text, bukan numeric
//Expected result : harusnya memberikan pesan error bahwa Age harus diisi dengan Numeric

     it("Invalid Age", async function () {
      this.timeout(15000);
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/add-user",
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          username: "riska1",
          age: "30",
        }),
      }
    );

  

    assert.strictEqual(response.status, 400);
    expect(response.status).to.equal(400);
    console.log("Assert 1: 400 Bad Request");

    // Mencetak Response Body
    const data = await response.json();
    // console.log(data);

    //memastikan pesan response sesuai dengan yang diharapkan
    expect(data.message).to.eql("Assert 2: Age must be NUMERIC");
    console.log(data);

    // Simpan Token
    token = data.token;
    //console.log(token);
  });
});
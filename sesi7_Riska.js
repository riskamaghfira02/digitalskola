const { describe, it } = require("mocha");
const { expect } = require("chai");
const {api_schema} = require ("./apischema");

const Ajv = require("ajv").default;
const ajv = new Ajv();

let token;

describe("Test API dengan JSON Schema Validation", function () {
  // Set timeout global
   beforeEach(function() {
    this.timeout(20000);
  });

  //----------------------------------------------------Positive Test [Login]------------------------------------------------
  it("Valid Login dengan Schema Validation", async function () {
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

    // Assert status code
    expect(response.status).to.equal(200);
    console.log("✓ Status 200 OK");

    // Parse response
    const data = await response.json();
    
    // Validasi dengan JSON Schema
    const validateLogin = ajv.compile(api_schema.schema_loginuser);
    const isValidLogin = validateLogin(data);

    expect(isValidLogin).to.be.true;
    console.log("✓ Schema validation passed");
        
    // Validasi pesan
    expect(data.message).to.equal("Login successful");
    console.log("✓ Message: 'Login successful'");
  
    
    // Simpan token
    token = data.token;
  });

  //----------------------------------------------------Positive Test [Get Users]------------------------------------------------
  it("Get User dengan Schema Validation", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/users",
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        method : "GET",
      }
    );

    expect(response.status).to.equal(200);
    console.log("✓ Status 200 OK");

    const responseData = await response.json(); // Ganti nama variabel untuk kejelasan
    
    // Validasi dengan JSON Schema
    const validateUsers = ajv.compile(api_schema.schema_getuser);
    const isValidUsers = validateUsers(responseData);

    expect(isValidUsers).to.be.true;
    console.log("✓ Schema validation passed");
    
      // Additional validation
    expect(responseData).to.have.property("status");
    expect(responseData.status).to.equal(200);
    expect(responseData).to.have.property("users");
    expect(responseData.users).to.be.an("array");
    expect(responseData.users.length).to.be.greaterThan(0);
    
    // Validasi setiap user dalam array
   responseData.users.forEach((user, index) => {
        expect(user).to.have.property("userId");
        expect(user.userId).to.be.a("string");
        expect(user).to.have.property("username");
        expect(user.username).to.be.a("string");
        expect(user).to.have.property("age");
        expect(user.age).to.be.a("number");

        if (user.hasOwnProperty("protected")) {
            expect(user.protected).to.be.a("boolean");
        }

        console.log(`✓ User ${index + 1}: ${user.username}, Age: ${user.age}, ID: ${user.userId}`);
    });
  });
});

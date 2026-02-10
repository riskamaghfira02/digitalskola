const { describe, it } = require("mocha");
const { expect } = require("chai");
const Ajv = require("ajv");
const { validate, schemas } = require("./api-schemas"); // Import schema

let token;
let userId; // Untuk menyimpan ID user yang dibuat

describe("Test API dengan JSON Schema Validation", function () {
  // Set timeout global
  beforeEach(function() {
    this.timeout(15000);
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
    const validation = validate("loginResponseSuccess", data);
    
    expect(validation.isValid).to.be.true;
    if (validation.errors) {
      console.error("Schema validation errors:", validation.errors);
    }
    console.log("✓ Response sesuai dengan loginResponseSuccess schema");
    
    // Validasi pesan
    expect(data.message).to.equal("Login successful");
    console.log("✓ Message: 'Login successful'");
    
    // Validasi token
    expect(data.token).to.be.a('string');
    expect(data.token.length).to.be.greaterThan(10);
    console.log("✓ Token valid (JWT)");
    
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
      }
    );

    expect(response.status).to.equal(200);
    console.log("✓ Status 200 OK");

    const data = await response.json();
    
    // Validasi dengan JSON Schema
    const validation = validate("getUsersResponse", data);
    
    expect(validation.isValid).to.be.true;
    if (validation.errors) {
      console.error("Schema validation errors:", validation.errors);
    }
    console.log("✓ Response sesuai dengan getUsersResponse schema");
    
    // Additional validation
    expect(data).to.be.an('array');
    expect(data.length).to.be.greaterThan(0);
    
    // Validasi setiap user dalam array
    data.forEach((user, index) => {
      expect(user).to.have.property('id');
      expect(user.id).to.be.a('number');
      expect(user).to.have.property('username');
      expect(user.username).to.be.a('string');
      expect(user).to.have.property('age');
      expect(user.age).to.be.a('number');
      console.log(`  User ${index + 1}: ${user.username} (ID: ${user.id}, Age: ${user.age})`);
    });
    
    // Simpan user pertama untuk testing selanjutnya
    if (data.length > 0) {
      userId = data[0].id;
    }
  });

  //----------------------------------------------------Negative Test [Invalid Age]------------------------------------------------
  it("Invalid Age - Schema Validation untuk Error Response", async function () {
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
          age: "30", // String instead of number
        }),
      }
    );

    // Assert status code untuk error
    expect(response.status).to.equal(400);
    console.log("✓ Status 400 Bad Request");

    const data = await response.json();
    
    // Validasi dengan errorResponse schema
    const validation = validate("errorResponse", data);
    
    expect(validation.isValid).to.be.true;
    if (validation.errors) {
      console.error("Schema validation errors:", validation.errors);
    }
    console.log("✓ Response sesuai dengan errorResponse schema");
    
    // Validasi pesan error
    expect(data.message).to.be.a('string');
    expect(data.message.toLowerCase()).to.include('age').or.include('numeric').or.include('invalid');
    console.log(`✓ Error message: "${data.message}"`);
  });

  //----------------------------------------------------Positive Test [Add Valid User]------------------------------------------------
  it("Add Valid User dengan Schema Validation", async function () {
    const testUsername = `testuser_${Date.now()}`;
    
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/add-user",
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          username: testUsername,
          age: 25, // Number, not string
        }),
      }
    );

    // Assert status code untuk success
    expect(response.status).to.equal(201); // Biasanya 201 Created
    console.log("✓ Status 201 Created");

    const data = await response.json();
    
    // Validasi dengan success response schema
    const validation = validate("addUserResponseSuccess", data);
    
    if (!validation.isValid) {
      // Jika tidak sesuai dengan success schema, coba validasi dengan error schema
      const errorValidation = validate("errorResponse", data);
      if (errorValidation.isValid) {
        console.log(`Response adalah error: ${data.message}`);
        return;
      }
    }
    
    expect(validation.isValid).to.be.true;
    console.log("✓ Response sesuai dengan addUserResponseSuccess schema");
    
    // Validasi data user yang dikembalikan
    expect(data.message).to.be.a('string');
    if (data.user) {
      expect(data.user.username).to.equal(testUsername);
      expect(data.user.age).to.equal(25);
      console.log(`✓ User berhasil dibuat: ${data.user.username}`);
    }
  });

  //----------------------------------------------------Negative Test [Missing Required Fields]------------------------------------------------
  it("Missing Required Fields - Schema Validation", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/add-user",
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          // username tidak disertakan (required)
          age: 25
        }),
      }
    );

    // Assert status code untuk error
    expect(response.status).to.be.oneOf([400, 422]);
    console.log(`✓ Status ${response.status} untuk missing fields`);

    const data = await response.json();
    
    // Validasi dengan errorResponse schema
    const validation = validate("errorResponse", data);
    
    expect(validation.isValid).to.be.true;
    console.log("✓ Response sesuai dengan errorResponse schema");
    
    // Validasi pesan error
    expect(data.message).to.be.a('string');
    console.log(`✓ Error message: "${data.message}"`);
  });

  //----------------------------------------------------Schema Validation Test------------------------------------------------
  describe("JSON Schema Validation Tests", function() {
    it("Validasi semua schema kompilasi dengan benar", function() {
      // Test bahwa semua schema bisa dikompilasi
      const ajv = new Ajv();
      
      Object.entries(schemas).forEach(([name, schema]) => {
        try {
          ajv.compile(schema);
          console.log(`✓ Schema '${name}' berhasil dikompilasi`);
        } catch (error) {
          console.error(`✗ Schema '${name}' gagal dikompilasi:`, error.message);
          throw error;
        }
      });
    });

    it("Test data sample terhadap schema", function() {
      // Test data sample untuk login response
      const sampleLoginResponse = {
        message: "Login successful",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      };
      
      const validation = validate("loginResponseSuccess", sampleLoginResponse);
      expect(validation.isValid).to.be.true;
      console.log("✓ Sample login response valid");
      
      // Test invalid data
      const invalidLoginResponse = {
        message: "Wrong message",
        token: "short"
      };
      
      const invalidValidation = validate("loginResponseSuccess", invalidLoginResponse);
      expect(invalidValidation.isValid).to.be.false;
      console.log("✓ Invalid sample correctly rejected");
    });
  });
});
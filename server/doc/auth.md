# Auth API Spec

## POST `/api/auth/register`

### Deskripsi
Registrasi user baru.

### Request

**Headers**
```http
Content-Type: application/json
```

**Body**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Response

#### 201 Created
```json
{
  "message": "User registered"
}
```

#### 400 Bad Request (jika email sudah terdaftar)
```json
{
  "message": "User exists"
}
```

#### 500 Internal Server Error
```json
{
  "message": "Server error"
}
```

---

## POST `/api/auth/login`

### Deskripsi
Autentikasi user dan mendapatkan JWT token.

### Request

**Headers**
```http
Content-Type: application/json
```

**Body**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Response

#### 200 OK
```json
{
    "id": 4,
    "email": "exmple@gmail.com",
    "name":"exmple",
    "token": "your.jwt.token.here"
}   
```

#### 404 Not Found (jika user tidak ditemukan)
```json
{
  "message": "User not found"
}
```

#### 401 Unauthorized (jika password salah)
```json
{
  "message": "Wrong password"
}
```

#### 500 Internal Server Error
```json
{
  "message": "Server error"
}
```


## POST `/api/auth/user/:id`

### Deskripsi
mendapat user data

### Request

**Headers**
```http
Content-Type: application/json
```

### Response

#### 200 OK
```json
{
    "id": 4,
    "email": "exemple@gmail.com",
    "files": [
        {
            "id": 8,
            "filename": "Screenshot 2025-07-16 131651.png",
            "filepath": "1753948299383-Screenshot 2025-07-16 131651.png",
            "mimetype": "image/png",
            "size": 380342,
            "uploadedAt": "2025-07-31T07:51:42.712Z",
            "userId": 4
        },
        {
            "id": 9,
            "filename": "Screenshot 2025-07-16 131651.png",
            "filepath": "1753948340163-Screenshot 2025-07-16 131651.png",
            "mimetype": "image/png",
            "size": 380342,
            "uploadedAt": "2025-07-31T07:52:22.215Z",
            "userId": 4
        }
    ]
}
```
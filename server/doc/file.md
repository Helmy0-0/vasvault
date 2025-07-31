# File Management API Spec

## Base URL


## POST `/api/files/upload`

### Deskripsi
Mengunggah file ke server.

### Headers
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

### Body (form-data)
| Field | Type | Keterangan |
|-------|------|------------|
| `file` | `File` | File yang ingin diunggah |

### Response

#### 201 Created
```json
{
  "id": 1,
  "filename": "contoh.pdf",
  "filepath": "1690812361289-contoh.pdf",
  "mimetype": "application/pdf",
  "size": 204800,
  "userId": 123,
  "uploadedAt": "2025-07-31T08:30:00.000Z"
}
```

#### 500 Internal Server Error
```json
{
  "message": "Upload failed"
}
```

---

## GET `/api/files`

### Deskripsi
Mengambil daftar file milik user yang sedang login.

### Headers
```
Authorization: Bearer <token>
```

### Response

#### 200 OK
```json
{
    "id": 7,
    "filename": "Screenshot 2025-07-16 131651.png",
    "filepath": "1753947367706-Screenshot 2025-07-16 131651.png",
    "mimetype": "image/png",
    "size": 380342,
    "uploadedAt": "2025-07-31T07:36:09.910Z",
    "userId": 4
}
```

#### 500 Internal Server Error
```json
{
  "message": "Failed to fetch files"
}
```

---

## GET `/api/files/:id`

### Deskripsi
Mengunduh file berdasarkan ID.

### Headers
```
Authorization: Bearer <token>
```

### Parameter
| Param | Tipe | Contoh |
|-------|------|--------|
| `id` | `integer` | `1` |

### Response

#### 200 OK
- File akan dikirim sebagai attachment (download otomatis)

#### 403 Forbidden
```json
{
  "message": "Access denied"
}
```

#### 500 Internal Server Error
```json
{
  "message": "Download failed"
}
```

---

## DELETE `/api/files/:id`

### Deskripsi
Menghapus file berdasarkan ID.

### Headers
```
Authorization: Bearer <token>
```

### Parameter
| Param | Tipe | Contoh |
|-------|------|--------|
| `id` | `integer` | `1` |

### Response

#### 200 OK
```json
{
  "message": "File deleted"
}
```

#### 403 Forbidden
```json
{
  "message": "Access denied"
}
```

#### 500 Internal Server Error
```json
{
  "message": "Delete failed"
}
```

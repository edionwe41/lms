from pydantic import BaseModel, EmailStr


# -------------------------
# LOGIN SCHEMAS
# -------------------------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

    class Config:
        from_attributes = True


# -------------------------
# REGISTER SCHEMAS
# -------------------------
class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "student"


class RegisterResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True

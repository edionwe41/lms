from pydantic import BaseModel
from typing import Optional

# Avoid binding `ConfigDict` name in class namespace (Pydantic inspects class
# namespace for fields). Import it under a private name at module level.
try:
    from pydantic import ConfigDict as _ConfigDict
except Exception:
    _ConfigDict = None


class UserCreate(BaseModel):
    username: str
    full_name: Optional[str]
    password: str
    role: Optional[str] = "student"

class UserResponse(BaseModel):
    id: int
    username: str
    full_name: Optional[str]
    role: str
    is_active: bool

    # Configure ORM-mode compatibility for Pydantic v1 and v2.
    if _ConfigDict is not None:
        model_config = _ConfigDict(from_attributes=True)
    else:
        class Config:
            orm_mode = True

class UserLogin(BaseModel):
    username: str
    password: str
    
class Token(BaseModel):
    access_token: str
    token_type: str 

class TokenData(BaseModel):
    username: Optional[str] = None  
    
    class LoginRequestSchema(BaseModel):
    username: str
    password: str  

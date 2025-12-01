from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# v2/v1 compatibility check
try:
    from pydantic import ConfigDict
    _V2 = True
except ImportError:
    ConfigDict = None
    _V2 = False


class BorrowRequest(BaseModel):
    book_id: int


class BorrowRead(BaseModel):
    id: int
    user_id: int
    book_id: int
    borrowed_at: datetime
    due_date: datetime
    returned_at: Optional[datetime]
    fee_applied: int

    # Pydantic v2
    if _V2:
        model_config = ConfigDict(from_attributes=True)
    else:               # Pydantic v1 fallback
        class Config:
            orm_mode = True

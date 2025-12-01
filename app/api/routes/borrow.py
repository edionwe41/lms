from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.api.depend import get_current_user
from app.db.session import get_db
from app.schemas.borrow_schema import BorrowRequest, BorrowRead
from app.services.borrow_books import BorrowService
from app.services.notification import NotificationManager
from app.crud.borrow_crud import list_user_borrows

router = APIRouter()


@router.post("/", response_model=BorrowRead)
def borrow_book(
    req: BorrowRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    service = BorrowService(db)
    try:
        borrow = service.borrow(current_user, req.book_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    NotificationManager.get_instance().push({
        "type": "borrowed",
        "user_id": current_user.id,
        "book_id": req.book_id
    })

    return borrow


@router.post("/return/{borrow_id}", response_model=BorrowRead)
def return_book(
    borrow_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    service = BorrowService(db)

    try:
        # match the correct service signature: (borrow_id, user_id)
        borrow = service.return_book(borrow_id, current_user.id)

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Push notification after successful return
    NotificationManager.get_instance().push({
        "type": "returned",
        "borrow_id": borrow.id
    })

    return borrow



@router.get("/me", response_model=List[BorrowRead])
def my_borrows(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    records = list_user_borrows(db, current_user.id)
    return records

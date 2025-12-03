from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.api.depend import get_current_user
from backend.app.db.session import get_db
from backend.app.schemas.borrow_schema import BorrowRequest, BorrowRead
from backend.app.services.borrow_books import BorrowService
from backend.app.services.notification import NotificationManager
from backend.app.crud.borrow_crud import list_user_borrows

router = APIRouter()

@router.post("/", response_model=BorrowRead)
def borrow_book(req: BorrowRequest, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    service = BorrowService(db)
    try:
        borrow = service.borrow(current_user, req.book_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    NotificationManager.get_instance().push({"type": "borrowed", "user_id": current_user.id, "book_id": req.book_id})
    return borrow

@router.post("/return/{borrow_id}", response_model=BorrowRead)
def return_book(
    borrow_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    service = BorrowService(db)

    try:
        # This must return a Borrow object, not an ID
        borrow = service.return_book(borrow_id, current_user.id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Now borrow is a full model instance
    NotificationManager.get_instance().push({
        "type": "returned",
        "borrow_id": borrow.id
    })

    return borrow



@router.get("/", response_model=list)
def get_all_borrows(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    """Get all borrows - only accessible by librarians/admins"""
    from backend.app.db import models
    
    # Check if user is librarian or admin
    if current_user.role not in ["librarian", "admin"]:
        raise HTTPException(status_code=403, detail="Only librarians can view all borrows")
    
    # Join borrows with books and users to get full details
    results = db.query(models.Borrow, models.Book, models.User).join(
        models.Book, models.Book.id == models.Borrow.book_id
    ).join(
        models.User, models.User.id == models.Borrow.user_id
    ).all()
    
    # Format the response to include book and user details
    formatted_results = []
    for borrow, book, user in results:
        formatted_results.append({
            "id": borrow.id,
            "book_id": borrow.book_id,
            "user_id": borrow.user_id,
            "borrowed_at": borrow.borrowed_at,
            "due_date": borrow.due_date,
            "returned_at": borrow.returned_at,
            "fee_applied": borrow.fee_applied,
            "book_title": book.title,
            "book_author": book.author,
            "book_isbn": book.isbn,
            "user_name": user.full_name,
            "user_email": user.email
        })
    
    return formatted_results


@router.get("/me", response_model=list)
def my_borrows(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    from backend.app.db import models
    
    # Join borrows with books to get book details
    results = db.query(models.Borrow, models.Book).join(
        models.Book, models.Book.id == models.Borrow.book_id
    ).filter(models.Borrow.user_id == current_user.id).all()
    
    # Format the response to include book details
    formatted_results = []
    for borrow, book in results:
        formatted_results.append({
            "id": borrow.id,
            "book_id": borrow.book_id,
            "user_id": borrow.user_id,
            "borrowed_at": borrow.borrowed_at,
            "due_date": borrow.due_date,
            "returned_at": borrow.returned_at,
            "fee_applied": borrow.fee_applied,
            "book_title": book.title,
            "book_author": book.author,
            "book_isbn": book.isbn
        })
    
    return formatted_results

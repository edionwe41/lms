from app.db import models
from app.crud import borrow_crud as crud_borrow, books_crud as crud_book
from sqlalchemy.orm import Session
from datetime import datetime


class BorrowService:
    def __init__(self, db: Session):
        self.db = db

    def borrow(self, user, book_id: int):
        book = crud_book.get_book(self.db, book_id)
        if not book:
            raise ValueError("book not found")

        if book.available_copies <= 0:
            raise ValueError("no copies available")

        # Active borrows check
        active = (
            self.db.query(models.Borrow)
            .filter(models.Borrow.user_id == user.id,
                    models.Borrow.returned_at == None)
            .count()
        )

        if hasattr(user, "max_borrow_limit") and active >= user.max_borrow_limit():
            raise ValueError("borrow limit reached")

        # Decrement book available copies
        book.available_copies -= 1
        self.db.add(book)
        self.db.commit()

        return crud_borrow.create_borrow(self.db, user.id, book_id)

    def return_book(self, borrow_id: int, user_id: int):
        # Fetch borrow record (correct call)
        borrow = crud_borrow.get_borrow(self.db, borrow_id)

        if not borrow:
            raise ValueError("borrow record not found")

        if borrow.user_id != user_id:
            raise ValueError("not authorized to return this borrow")

        if borrow.returned_at:
            raise ValueError("already returned")

        # Mark as returned
        borrow = crud_borrow.set_returned(self.db, borrow)

        # Restore book quantity
        book = self.db.query(models.Book).filter(models.Book.id == borrow.book_id).first()
        if book and book.available_copies < book.total_copies:
            book.available_copies += 1
            self.db.add(book)
            self.db.commit()

        # Late fee calculation
        if borrow.returned_at > borrow.due_date:
            overdue_days = (borrow.returned_at - borrow.due_date).days
            borrow.fee_applied = overdue_days * 1  # £1/day
            self.db.add(borrow) 
            self.db.commit()

        return borrow


class FeeDecorator:
    def __init__(self, service: BorrowService, fee_per_day: int = 1):
        self.service = service
        self.fee_per_day = fee_per_day

    def borrow(self, user, book_id: int):
        return self.service.borrow(user, book_id)

    def return_book(self, borrow_id: int, user_id: int = None):
        return self.service.return_book(borrow_id, user_id)

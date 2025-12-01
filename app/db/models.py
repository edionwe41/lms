from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.base import Base


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    author = Column(String, index=True, nullable=False)
    isbn = Column(String, unique=True, index=True, nullable=False)
    total_copies = Column(Integer, default=1)
    available_copies = Column(Integer, default=1)
    description = Column(Text, nullable=True)

    borrows = relationship("Borrow", back_populates="book")
    reservations = relationship("Reservation", back_populates="book")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=True)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="student")
    is_active = Column(Boolean, default=True)

    borrows = relationship("Borrow", back_populates="user")
    reservations = relationship("Reservation", back_populates="user")


class Borrow(Base):
    __tablename__ = "borrows"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False)

    borrowed_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )

    due_date = Column(DateTime(timezone=True), nullable=False)
    returned_at = Column(DateTime(timezone=True), nullable=True)
    fee_applied = Column(Integer, default=0)

    user = relationship("User", back_populates="borrows")
    book = relationship("Book", back_populates="borrows")


class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )

    user = relationship("User", back_populates="reservations")
    book = relationship("Book", back_populates="reservations")
def max_borrow_limit(self):
        if self.role == "student":
            return 5
        elif self.role == "faculty":
            return 10
         
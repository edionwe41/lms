from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import Request, Form, Depends
from starlette.background import BackgroundTasks
import os

from app.core.config import settings
from app.db.session import engine, SessionLocal, get_db
from app.db import base
from app.api.routes import auth as routes_auth
from app.api.routes import user as routes_users
from app.api.routes import books as routes_books
from app.api.routes import borrow as routes_borrow
from app.services.notification import NotificationManager
from app.crud import user_crud
from app.crud import books_crud
from app.core.security import verify_password, create_access_token, decode_access_token

app = FastAPI(title=settings.PROJECT_NAME)

# static files
static_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "static")
if os.path.isdir(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")

# templates
templates = Jinja2Templates(directory=os.path.join(os.path.dirname(os.path.abspath(__file__)), "templates"))

# ---- CORS for React Frontend ----
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    base.Base.metadata.create_all(bind=engine)
    NotificationManager.get_instance().start_worker()

@app.on_event("shutdown")
def on_shutdown():
    NotificationManager.get_instance().stop_worker()

# ---- API Routers ----
app.include_router(routes_auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(routes_users.router, prefix="/api/users", tags=["users"])
app.include_router(routes_books.router, prefix="/api/books", tags=["books"])
app.include_router(routes_borrow.router, prefix="/api/borrows", tags=["borrows"])


@app.get("/login")
async def login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

@app.get("/register")
async def register_page(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})

@app.post("/web-login")
def web_login(request: Request, username: str = Form(...), password: str = Form(...), db=Depends(get_db)):
    user = user_crud.get_user_by_username(db, username)
    if not user or not verify_password(password, user.hashed_password):
        return templates.TemplateResponse("login.html", {"request": request, "error": "Invalid credentials"})

    token = create_access_token(subject=user.username, role=user.role)
    resp = RedirectResponse(url="/home", status_code=302)
    resp.set_cookie("access_token", token, httponly=True)
    return resp


def _get_token_from_request(request: Request):
    token = request.cookies.get("access_token") or request.query_params.get("token")
    return token

@app.get("/home")
def home_page(request: Request, db=Depends(get_db)):
    token = _get_token_from_request(request)
    if not token:
        return RedirectResponse(url="/login")
    try:
        payload = decode_access_token(token)
    except Exception:
        return RedirectResponse(url="/login")

    username = payload.get("sub")
    role = payload.get("role", "student")

    try:
        books = books_crud.list_books(db)
    except Exception:
        books = []

    return templates.TemplateResponse("home.html", {"request": request, "username": username, "role": role, "books": books})

@app.get("/logout")
def logout(request: Request):
    resp = RedirectResponse(url="/login")
    resp.delete_cookie("access_token")
    return resp

@app.get("/default")
def default():
    return {"status": "ok"}

@app.get("/api/test-books")
def test_books():
    return [
        {"id": 1, "title": "Harry Potter"},
        {"id": 2, "title": "Things Fall Apart"},
        {"id": 3, "title": "The Great Gatsby"},
    ]

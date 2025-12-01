from fastapi import APIRouter
from fastapi.responses import HTMLResponse
import os

router = APIRouter()

@router.get("/", response_class=HTMLResponse)
async def serve_frontend():
    # Go to project root (LMS folder)
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    # Path to templates/index.html
    file_path = os.path.join(project_root, "templates", "index.html")
    file_path = os.path.abspath(file_path)

    print("SERVING HTML FILE FROM:", file_path)

    if not os.path.exists(file_path):
        return HTMLResponse("<h1>ERROR: index.html NOT FOUND</h1>", status_code=500)

    with open(file_path, "r", encoding="utf-8") as f:
        html = f.read()

    return HTMLResponse(html)

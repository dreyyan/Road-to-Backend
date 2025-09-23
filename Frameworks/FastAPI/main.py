from fastapi import FastAPI
from fastapi.templating import Jinja2Templates # for HTML templates
from fastapi.staticfiles import StaticFiles # for JS functionalities
from fastapi.requests import Request
from fastapi.responses import JSONResponse, RedirectResponse
from pydantic import BaseModel  # for User Model

app = FastAPI() # Create FastAPI application
templates = Jinja2Templates(directory="templates") # Specify HTML directory

# Mount static folder for JS/CSS
app.mount("/static", StaticFiles(directory="static"), name="static")

# Create "fake" database
user_information = {}

# Pydantic model for validation (used to validate data structures)
class User(BaseModel):
    name: str

# Routing
@app.get("/")
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
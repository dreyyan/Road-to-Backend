from fastapi import FastAPI
from fastapi.responses import HTMLResponse # to serve HTML pages

app = FastAPI()

@app.get("/", response_class=HTMLResponse) # HTTP GET request
def read_root():
    return """
    <html>
        <head>
            <title>My Website</title>
        </head>
        <body>
            <h1>Welcome to my website!</h1>
            <p>This is served by FastAPI.</p>
        </body>
    </html>
    """

@app.get("/items/{item_id}") # Path parameter
def read_item(item_id: int, q: str = None): # Query parameter
    return {"item_id": item_id, "q": q}
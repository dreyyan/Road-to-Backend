# FastAPI Guide

## Installation
### Install FastAPI /w ASGI Server (Uvicorn)
``` powershell
pip install --user fastapi uvicorn
```

### Install Jinja2 (for HTML Templates)
``` powershell
pip install jinja2
```

### Install CORS (Cross-Origin Resource Sharing)
``` powershell
pip install "fastapi[all]"
```
- then, enable CORS:

``` py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],    # React app URL
    allow_credentials=True,
    allow_methods=["*"],                        # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],                        # Allow all headers
)
```

## Connection
### Start Server
``` powershell
py -3.13 -m uvicorn main:app --reload
```
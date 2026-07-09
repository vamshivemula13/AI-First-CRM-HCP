from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.api.hcp import router as hcp_router
from app.api.interaction import router as interaction_router
from app.api.chat import router as chat_router


app = FastAPI(
    title="AI First CRM HCP",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register API routers
app.include_router(hcp_router)
app.include_router(interaction_router)
app.include_router(chat_router)


@app.get("/")
def root():
    return {
        "message": "AI First CRM HCP Backend Running Successfully"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
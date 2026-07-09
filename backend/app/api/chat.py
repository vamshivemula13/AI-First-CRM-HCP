from fastapi import APIRouter

from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
)

from app.langgraph.workflow import crm_graph

router = APIRouter(
    prefix="/api/chat",
    tags=["AI Chat"],
)


@router.post("/", response_model=ChatResponse)
def chat(request: ChatRequest):

    result = crm_graph.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": request.message
                }
            ]
        }
    )

    return ChatResponse(
        response=result["messages"][-1].content
    )
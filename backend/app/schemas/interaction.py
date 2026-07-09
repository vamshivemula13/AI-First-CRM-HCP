from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class InteractionBase(BaseModel):

    hcp_id: int

    interaction_type: str

    summary: str

    follow_up_date: Optional[str] = None

    status: Optional[str] = "Pending"



class InteractionCreate(InteractionBase):

    pass



class InteractionResponse(InteractionBase):

    id: int

    created_at: datetime


    class Config:
        from_attributes = True
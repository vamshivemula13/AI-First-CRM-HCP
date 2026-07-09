from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class HCPBase(BaseModel):
    name: str
    specialization: str
    hospital: Optional[str] = None
    location: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    notes: Optional[str] = None


class HCPCreate(HCPBase):
    pass


class HCPResponse(HCPBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
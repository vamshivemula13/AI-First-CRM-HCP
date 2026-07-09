from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class HCP(Base):
    __tablename__ = "hcps"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    specialization = Column(String(100), nullable=False)

    hospital = Column(String(150), nullable=True)

    location = Column(String(150), nullable=True)

    phone = Column(String(20), nullable=True)

    email = Column(String(100), nullable=True)

    notes = Column(Text, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )